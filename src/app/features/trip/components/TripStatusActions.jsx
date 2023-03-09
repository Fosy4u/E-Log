import Typography from "@mui/material/Typography";

import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  MenuItem,
  Select,
  Step,
  StepLabel,
  Stepper,
  useMediaQuery,
} from "@mui/material";
import { Small, Tiny } from "../../../components/Typography";
import organisationsApi from "../../../services/organisationsApi.slice";
import Loader from "../../../utils/Loader";
import { useSelector } from "react-redux";
import { globalSelectors } from "../../../global/global.slice";
import { useParams } from "react-router-dom";
import { Transition } from "../../../utils/transition";
import Banner from "../../../utils/Banner";
import TripCancelResume from "./TripCancelResume";
import displayDay from "../../../utils/displayDay";

const steps = [
  {
    label: "Created",
    id: 1,
    action: "created",
  },
  {
    label: "Vehicle Assigned",
    id: 2,
    action: "assign vehicle",
  },
  {
    label: "Loaded",
    id: 3,
    action: "mark loaded",
  },
  {
    label: "En Route",
    id: 4,
    action: "mark en route",
  },
  {
    label: "At Destination",
    id: 5,
    action: "mark at destination",
  },
  {
    label: "Delivered",
    id: 6,
    action: "mark delivered",
  },
];

export default function TripStatusActions({ trip }) {
  const timeLine = trip?.timeline;
  const matches = useMediaQuery("(min-width:600px)");
  const currentUser = useSelector(globalSelectors.selectCurrentUser);
  const token = useSelector(globalSelectors.selectAuthToken);
  const status = trip?.status;

  const { organisationId } = useParams();
  const [activeStep, setActiveStep] = useState(0);
  const [vehicle, setVehicle] = useState();
  const [showBanner, setShowBanner] = useState(false);
  const [error, setError] = useState();
  const [showAssignVehicle, setShowAssignVehicle] = useState(false);
  const [openCancelModal, setOpenCancelModal] = useState(false);

  const getTrucksQuery = organisationsApi.useGetAvailableTrucksQuery(
    {
      organisationId,
    },
    { skip: !organisationId || !token }
  );
  const trucks = getTrucksQuery?.data?.data;

  const [actionTrip, actionTripStatus] =
    organisationsApi.useActionTripMutation();

  useEffect(() => {
    steps.forEach((step, index) => {
      if (step?.label?.toLowerCase() === status?.toLowerCase()) {
        setActiveStep(step.id);
      }
    });
  }, [status]);

  const renderAction = (payload) => {
    actionTrip({
      payload,
    })
      .unwrap()
      .then((data) => {
        if (data?.data) {
          setShowAssignVehicle(false);
          setError("");
          setShowBanner(false);
        }
      })
      .catch((e) => {
        setShowBanner(true);
        setError(e?.data?.error);
      });
  };

  const handleNext = () => {
    const action = nextAction();
    const payload = {
      tripId: trip?._id,
      action,
      vehicleId: vehicle?._id,
      userId: currentUser?._id,
    };

    if (action === "assign vehicle" && !vehicle) {
      setShowAssignVehicle(true);
      return;
    }
    return renderAction(payload);
  };

  const nextAction = () => {
    if (status.toLowerCase() === "pending") {
      return "assign vehicle";
    }
    if (status === "Vehicle Assigned") {
      return "mark loaded";
    }
    if (status === "Loaded") {
      return "mark en route";
    }
    if (status === "En Route") {
      return "mark arrived at destination";
    }
    if (status === "At Destination") {
      return "mark delivered";
    }
    if (status === "Delivered") {
      return null;
    }
  };
  const getActionDate = (action) => {
    const findAction = timeLine?.find(
      (item) => item?.action?.toLowerCase() === action?.toLowerCase()
    );
    if (findAction) {
      return displayDay(findAction?.date);
    }
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Loader showLoading={actionTripStatus?.isLoading} />

      <Stepper
        activeStep={activeStep}
        alternativeLabel={matches ? true : false}
        orientation={matches ? "horizontal" : "vertical"}
      >
        {steps.map((item, index) => {
          const stepProps = {};
          const labelProps = {};

          return (
            <Step key={item?.label} {...stepProps}>
              <StepLabel {...labelProps}>{item?.label}</StepLabel>
              <Tiny className="d-flex justify-content-center">
                {getActionDate(item?.action)}
              </Tiny>
            </Step>
          );
        })}
      </Stepper>
      {error && showBanner && (
        <div className="w-100 d-flex text-center justify-content-center m-2">
          <Banner
            show={showBanner}
            severity={"error"}
            handleClose={() => setShowBanner(false)}
          >
            <Small>{error}</Small>
          </Banner>
        </div>
      )}
      {activeStep === steps.length ? (
        <>
          <Typography sx={{ mt: 2, mb: 1 }}>
            All steps completed - Thank You!
          </Typography>
        </>
      ) : (
        <>
          <Typography sx={{ mt: 2, mb: 1 }}>Step {activeStep + 1}</Typography>
          <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
            {status.toLowerCase() === "cancelled" && (
              <Button
                color="error"
                onClick={() => setOpenCancelModal(true)}
                sx={{ mr: 1 }}
              >
                Resume
              </Button>
            )}
            {status?.toLowerCase() !== "cancelled" &&
              status?.toLowerCase() !== "delivered" && (
                <Button
                  color="error"
                  onClick={() => setOpenCancelModal(true)}
                  sx={{ mr: 1 }}
                >
                  Cancel
                </Button>
              )}

            <Box sx={{ flex: "1 1 auto" }} />

            <Button onClick={handleNext}>{nextAction()}</Button>
          </Box>
        </>
      )}
      <Dialog open={showAssignVehicle} TransitionComponent={Transition}>
        <DialogTitle>Assign Vehicle</DialogTitle>
        <DialogContent>
          {trucks?.length > 0 && (
            <DialogContentText>
              <Tiny className="text-danger">
                Only activated trucks not currently on trip will be available
                for selection
              </Tiny>
            </DialogContentText>
          )}
          {trucks?.length === 0 && (
            <div className="w-100 d-flex text-center justify-content-center ">
              <Banner show={true} severity={"error"}>
                <Small>
                  No available truck to assign to this trip. Please activate the
                  truck or make sure the truck is not currently on a trip
                </Small>
              </Banner>
            </div>
          )}
          {trucks?.length > 0 && (
            <Select
              value={vehicle || ""}
              onChange={(e) => setVehicle(e.target.value)}
              fullWidth
            >
              {trucks?.map((truck) => (
                <MenuItem value={truck} key={truck?._id}>
                  {truck?.manufacturer} {truck?.model}-{truck?.regNo}
                </MenuItem>
              ))}
            </Select>
          )}
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setShowAssignVehicle(false);
              setVehicle();
            }}
          >
            Cancel
          </Button>
          <Button disabled={!vehicle} onClick={handleNext}>
            Assign
          </Button>
        </DialogActions>
      </Dialog>
      <TripCancelResume
        open={openCancelModal}
        setOpen={setOpenCancelModal}
        userId={currentUser?._id}
        tripId={trip?._id}
        action={status.toLowerCase() === "cancelled" ? "resume" : "cancel"}
        renderAction={renderAction}
        status={status}
      />
    </Box>
  );
}

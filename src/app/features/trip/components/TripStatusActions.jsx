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
import TripStatusActionsModal from "./TripStatusActionsModal";

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
  const [showMarkDeliveryForm, setShowMarkDeliveryForm] = useState(false);
  const [showUploadDeliveryWaybill, setShowUploadDeliveryWaybill] =
    useState(false);
  const [showUploadRequestWaybill, setShowUploadRequestWaybill] =
    useState(false);
  const [actualFuelCost, setActualFuelCost] = useState();
  const [actualFuelLitres, setActualFuelLitres] = useState();
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
          setShowMarkDeliveryForm(false);
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
      actualFuelCost,
      actualFuelLitres,
    };

    if (action === "assign vehicle" && !vehicle) {
      setShowAssignVehicle(true);
      return;
    }
    if (action === "mark en route" && !trip?.requestedWaybilImageUrl?.link) {
      setShowUploadRequestWaybill(true);
      return;
    }
    if (action === "mark delivered" && !trip?.deliveredWaybilImageUrl?.link) {
      setShowUploadDeliveryWaybill(true);
      return;
    }
    if (action === "mark delivered" && !showMarkDeliveryForm) {
      setShowMarkDeliveryForm(true);
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

      <TripStatusActionsModal
        instruction="Only activated trucks not currently on trip will be available
                for selection"
        open={showAssignVehicle}
        close={() => setShowAssignVehicle(false)}
        setVehicle={setVehicle}
        vehicle={vehicle}
        trucks={trucks}
        handleNext={handleNext}
        title="Assign Vehicle"
        actionType={"assign vehicle"}
        actionButtonLabel={"Assign"}
        showActionButton
      />
      <TripStatusActionsModal
        instruction="This fields are optional but filling them will help you track your fuel consumption, cost and other expenses. It helps in better trip analysis and planning"
        open={showMarkDeliveryForm}
        close={() => setShowMarkDeliveryForm(false)}
        actualFuelCost={actualFuelCost}
        setActualFuelCost={setActualFuelCost}
        actualFuelLitres={actualFuelLitres}
        setActualFuelLitres={setActualFuelLitres}
        handleNext={handleNext}
        title="Mark Delivered"
        actionType={"mark delivered"}
        actionButtonLabel={"Delivered"}
        showActionButton
      />
      <TripStatusActionsModal
        open={showUploadDeliveryWaybill || showUploadRequestWaybill}
        close={() => {
          setShowUploadDeliveryWaybill(false);
          setShowUploadRequestWaybill(false);
        }}
        trip={trip}
        actionType={
          showUploadDeliveryWaybill
            ? "upload delivered waybill"
            : "upload requested waybill"
        }
        title={
          showUploadDeliveryWaybill
            ? "Upload Delivered Waybill"
            : "Upload Load Waybill"
        }
        instruction={
          showUploadDeliveryWaybill
            ? "First upload the signed waybill for the delivered goods. This will help you track your delivered goods and also help you in case of any dispute"
            : "First upload the waybill for the load before you mark the trip as en route. This will help you track your loaded goods and also help you in case of any dispute"
        }
      />

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

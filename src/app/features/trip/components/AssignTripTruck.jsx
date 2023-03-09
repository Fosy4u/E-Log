import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  Grid,
  InputLabel,
  NativeSelect,
  Slide,
} from "@mui/material";
import React, { forwardRef, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { Small, Tiny } from "../../../components/Typography";
import { globalSelectors } from "../../../global/global.slice";
import organisationsApi from "../../../services/organisationsApi.slice";
import Banner from "../../../utils/Banner";
import Loader from "../../../utils/Loader";
import TruckCard from "../../truck/components/TruckCard";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const AssignTripTruck = ({ trip }) => {
  const { organisationId } = useParams();
  const token = useSelector(globalSelectors.selectAuthToken);
  const currentUser = useSelector(globalSelectors.selectCurrentUser);
  const action = "assign vehicle";
  const [showModal, setShowModal] = useState(false);
  const [truckId, setTruckId] = useState(trip?.vehicleId || "");
  const [showBanner, setShowBanner] = useState(false);
  const [error, setError] = useState();
  const [trucks, setTrucks] = useState([]);

  const [actionTrip, actionTripStatus] =
    organisationsApi.useActionTripMutation();

  const getAssignedTruckQuery = organisationsApi.useGetTruckQuery(
    {
      organisationId,
      truckId: trip?.vehicleId,
    },
    { skip: !organisationId || !token || !trip?.vehicleId }
  );
  const assignedTruck = getAssignedTruckQuery?.data?.data;

  const getTrucksQuery = organisationsApi.useGetAvailableTrucksQuery(
    {
      organisationId,
    },
    { skip: !organisationId || !token }
  );
  const trucksQuerry = getTrucksQuery?.data?.data;

  useEffect(() => {
    let allTrucks = [];
    if (trucksQuerry?.length > 0) {
      allTrucks = [...trucksQuerry];
    }
    if (assignedTruck) {
      allTrucks.push(assignedTruck);
    }
    setTrucks(allTrucks);
  }, [trucksQuerry, assignedTruck]);

  const validate = () => {
    if (!truckId) {
      setError("Please select a truck");
      setShowBanner(true);
      return false;
    }

    return true;
  };

  const handleAssign = () => {
    if (!validate()) {
      return;
    }
    const payload = {
      tripId: trip?._id,
      action,
      vehicleId: truckId,
      userId: currentUser?._id,
    };

    actionTrip({
      payload,
      successHandler: (success, data) => {},
    })
      .then((data) => {
        if (data?.data?.data) {
          setShowModal(false);
          setTruckId();
        }
      })
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      .catch((e) => {
        console.error(e.data);
      });
  };

  return (
    <div
      className="w-100 d-flex flex-column text-center justify-content-center "
      style={{ backgroundColor: "rgba(0, 5, 145, 0.09)" }}
    >
      <Loader
        showLoading={
          getTrucksQuery?.isLoading || getAssignedTruckQuery?.isLoading
        }
      />

      {trip && !assignedTruck && !actionTripStatus.isLoading && (
        <div className="w-100 d-flex text-center justify-content-center">
          <Banner show={trip && !assignedTruck && !actionTripStatus.isLoading}>
            <p>
              <Small>No truck assigned to trip</Small>
            </p>
          </Banner>
        </div>
      )}

      {assignedTruck && (
        <Grid className="d-flex flex-wrap justify-content-center">
          <TruckCard
            truck={assignedTruck}
            bgColor="white"
            organisationId={organisationId}
          />
        </Grid>
      )}

      <div className=" d-flex flex-column text-center justify-content-center m-3 ">
        <Button
          size="small"
          variant="contained"
          onClick={() => setShowModal(true)}
        >
          {trip &&
            !assignedTruck &&
            !actionTripStatus.isLoading &&
            "Assign Truck"}
          {trip && trip.vehicleId && assignedTruck && "Reassign Truck"}
        </Button>
      </div>

      {showModal && (
        <div>
          <Dialog
            open={showModal}
            onClose={() => {
              setShowModal(false);
            }}
            TransitionComponent={Transition}
            keepMounted
            aria-describedby="alert-dialog-slide-description"
          >
            <DialogTitle className="secondaryBrandColor">
              Assign Truck to Trip
            </DialogTitle>
            <DialogContent>
              <Loader
                showLoading={
                  getTrucksQuery?.isLoading && actionTripStatus?.isLoading
                }
              />
              {trip && trucks?.length > 0 && (
                <DialogContentText>
                  <Tiny className="text-danger">
                    Only activated trucks not currently on trip will be
                    available for selection
                  </Tiny>
                </DialogContentText>
              )}

              {error && showBanner && (
                <div className="w-100 d-flex text-center justify-content-center ">
                  <Banner
                    show={showBanner}
                    severity={"error"}
                    handleClose={() => setShowBanner(false)}
                  >
                    <Small>{error}</Small>
                  </Banner>
                </div>
              )}
              {trip && trucks?.length === 0 && (
                <div className="w-100 d-flex text-center justify-content-center ">
                  <Banner show={true} severity={"error"}>
                    <Small>
                      No available truck to assign to this trip. Please activate
                      the truck or make sure the truck is not currently on a
                      trip
                    </Small>
                  </Banner>
                </div>
              )}

              {trip && trucks?.length > 0 && (
                <div className=" d-flex text-center justify-content-center m-3">
                  <FormControl fullWidth>
                    <InputLabel
                      variant="standard"
                      htmlFor="uncontrolled-native"
                    >
                      {" "}
                      Select Truck{" "}
                    </InputLabel>
                    <NativeSelect
                      value={truckId}
                      inputProps={{ name: "age", id: "uncontrolled-native" }}
                      onChange={(e) => setTruckId(e.target.value)}
                    >
                      <option></option>
                      {trucks.map((truck) => (
                        <option value={truck._id}>
                          {" "}
                          {truck?.manufacturer + "-" + truck?.model}-
                          {truck?.regNo}{" "}
                        </option>
                      ))}
                    </NativeSelect>
                  </FormControl>
                </div>
              )}
            </DialogContent>
            <DialogActions>
              <Button
                variant="outlined"
                onClick={() => {
                  setShowModal(false);
                }}
                type="submit"
                className="me-1"
              >
                Cancel
              </Button>
              <Button
                className="ms-1"
                variant="contained"
                disabled={
                  actionTripStatus?.isLoading || getTrucksQuery?.isLoading
                }
                onClick={() => handleAssign()}
                type="submit"
                color="error"
              >
                Save
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      )}
    </div>
  );
};

export default AssignTripTruck;

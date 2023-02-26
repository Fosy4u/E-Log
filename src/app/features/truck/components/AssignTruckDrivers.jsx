import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  InputLabel,
  NativeSelect,
  Slide,
} from "@mui/material";
import React, { forwardRef, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { Small } from "../../../components/Typography";
import { globalSelectors } from "../../../global/global.slice";
import organisationsApi from "../../../services/organisationsApi.slice";
import Banner from "../../../utils/Banner";
import Loader from "../../../utils/Loader";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const AssignTruckDrivers = ({ truck, driver }) => {
  const { organisationId } = useParams();
  const disabled = false;
  const token = useSelector(globalSelectors.selectAuthToken);
  const [showModal, setShowModal] = useState(false);
  const [truckId, setTruckId] = useState(driver?.assignedTruckId || "");
  const [driverId, setDriverId] = useState(truck?.assignedDriverId || "");
  const [showBanner, setShowBanner] = useState(false);
  const [error, setError] = useState();
  const getTrucksQuery = organisationsApi.useGetTrucksQuery(
    {
      _id: organisationId,
      disabled,
    },
    { skip: !organisationId || !token }
  );
  const trucks = getTrucksQuery?.data?.data.filter((t) => t.active);

  const getDriversQuery = organisationsApi.useGetDriversQuery(
    {
      organisationId,
      disabled,
    },
    { skip: !organisationId || !token }
  );
  const drivers = getDriversQuery?.data?.data.filter((d) => d.active);
  const [assignTruckDriver, assignTruckDriverStatus] =
    organisationsApi.useAssignTruckDriverMutation();

  const assignedTruck =
    trucks?.find((item) => driver?.assignedTruckId === item._id) || {};
  const assignedDriver =
    drivers?.find((item) => truck?.assignedDriverId === item._id) || {};

  const validate = () => {
    if (!truckId && driver) {
      setError("Please select a truck");
      setShowBanner(true);
      return false;
    }
    if (!driverId && truck) {
      setError("Please select a driver");
      setShowBanner(true);
      return false;
    }

    if (truck && !truck?.active) {
      setError("Truck is not active. Please activate truck first");
      setShowBanner(true);
      return false;
    }
    if (driver && !driver?.active) {
      setError("Driver is not active. Please activate driver first");
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
      truckId: truckId || truck._id,
      driverId: driverId || driver._id,
    };

    assignTruckDriver({
      payload,
      successHandler: (success, data) => {},
    })
      .then((data) => {
        if (data?.data?.data) {
          setShowModal(false);
          setDriverId();
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
        showLoading={getTrucksQuery?.isLoading || getDriversQuery?.isLoading}
      />

      {driver && !driver?.assignedTruckId && (
        <div className="w-100 d-flex text-center justify-content-center m-3">
          <Banner show={driver && !driver?.assignedTruckId}>
            <p>
              <Small>No truck assigned to driver</Small>
            </p>
          </Banner>
        </div>
      )}
      {truck && !truck.assignedDriverId && (
        <div className="w-100 d-flex text-center justify-content-center">
          <Banner show={truck && !truck.assignedDriverId}>
            <p>
              <Small>No truck assigned to driver</Small>
            </p>
          </Banner>
        </div>
      )}
      {driver && driver?.assignedTruckId && (
        <div className="w-100 d-flex text-center justify-content-center m-3">
          <Banner show={driver && driver?.assignedTruckId} severity="success">
            <Link to={`/e-log/${organisationId}/truck/${truckId}`}>
              {assignedTruck?.manufacturer + "-" + assignedTruck?.model}-
              {assignedTruck?.regNo}
            </Link>
          </Banner>
        </div>
      )}
      {truck && truck.assignedDriverId && (
        <div className="w-100 d-flex text-center justify-content-center m-3">
          <Banner show={truck && truck.assignedDriverId} severity="success">
            <Link to={`/e-log/${organisationId}/driver/${driverId}`}>
              {assignedDriver?.firstName + " " + assignedDriver?.lastName}
            </Link>
          </Banner>
        </div>
      )}
      <div className=" d-flex text-center justify-content-center m-3 w-100">
        <Button
          size="small"
          variant="contained"
          onClick={() => setShowModal(true)}
        >
          {truck && !truck.assignedDriverId && "Assign Driver"}
          {driver && !driver?.assignedTruckId && "Assign Truck"}
          {truck && truck.assignedDriverId && "Reassign Truck"}
          {driver && driver?.assignedTruckId && "Reassign Driver"}
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
              Assign Truck to Driver
            </DialogTitle>
            <DialogContent>
              <Loader
                showLoading={
                  getTrucksQuery?.isLoading || getDriversQuery?.isLoading
                }
              />
              <DialogContentText>
                Note that you can only assign one truck to a driver at a time
                and vice versa. Also both truck and driver have to be activated.
              </DialogContentText>
              {driver && trucks?.length === 0 && (
                <div className="w-100 d-flex text-center justify-content-center m-3">
                  <Banner show={driver && trucks?.length === 0}>
                    <p>
                      <Small>
                        No activated trucks to assign. Please ensure you have
                        activated trucks in the system
                      </Small>
                    </p>
                  </Banner>
                </div>
              )}
              {truck && drivers?.length === 0 && (
                <div className="w-100 d-flex text-center justify-content-center m-3">
                  <Banner show={truck && drivers?.length === 0}>
                    <p>
                      <Small>
                        No activated drivers to assign. Please ensure you have
                        activated drivers in the system
                      </Small>
                    </p>
                  </Banner>
                </div>
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

              {truck && drivers?.length > 0 && (
                <div className=" d-flex text-center justify-content-center m-3">
                  <FormControl fullWidth>
                    <InputLabel
                      variant="standard"
                      htmlFor="uncontrolled-native"
                    >
                      Select Driver
                    </InputLabel>
                    <NativeSelect
                      value={driverId}
                      inputProps={{
                        name: "age",
                        id: "uncontrolled-native",
                      }}
                      onChange={(e) => setDriverId(e.target.value)}
                    >
                      <option></option>
                      {drivers.map((driver) => (
                        <option value={driver._id}>
                          {driver?.firstName + " " + driver?.lastName}
                        </option>
                      ))}
                    </NativeSelect>
                  </FormControl>
                </div>
              )}
              {driver && trucks?.length > 0 && (
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
                  assignTruckDriverStatus?.isLoading ||
                  getTrucksQuery?.isLoading ||
                  getDriversQuery?.isLoading
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

export default AssignTruckDrivers;

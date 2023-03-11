import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import React from "react";
import { Button } from "react-bootstrap";
import { Small, Tiny } from "../../../components/Typography";
import Banner from "../../../utils/Banner";
import { Transition } from "../../../utils/transition";
import TripWaybill from "./TripWaybill";

const TripStatusActionsModal = ({
  open,
  trucks,
  close,
  vehicle,
  setVehicle,
  handleNext,
  instruction,
  title,
  actionType,
  actionButtonLabel,
  actualFuelCost,
  setActualFuelCost,
  actualFuelLitres,
  setActualFuelLitres,
  showActionButton,
  trip,
}) => {
  return (
    <>
      <Dialog open={open} TransitionComponent={Transition}>
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
          {instruction && (
            <DialogContentText>
              <Tiny className="text-danger">{instruction}</Tiny>
            </DialogContentText>
          )}
          {trucks?.length === 0 &&
            actionType ===
              "assign vehicle"(
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

          {actionType === "mark delivered" && (
            <span className="d-flex">
              <FormControl sx={{ width: "50%" }} className="me-1">
                <TextField
                  margin="normal"
                  size="small"
                  fullWidth
                  label="Actual Fuel Liters"
                  type="number"
                  value={actualFuelLitres || ""}
                  onChange={(e) => setActualFuelLitres(e.target.value)}
                />
              </FormControl>
              <FormControl sx={{ width: "50%" }} className="ms-1">
                <TextField
                  margin="normal"
                  size="small"
                  fullWidth
                  label="Actual Fuel Cost"
                  type="number"
                  value={actualFuelCost || ""}
                  onChange={(e) => setActualFuelCost(e.target.value)}
                />
              </FormControl>
            </span>
          )}

          {(actionType === "upload delivered waybill" ||
            actionType === "upload requested waybill") &&
            trip && (
              <span className="d-flex justify-content-center partnerAccordionDetails ">
                <TripWaybill
                  title={" Upload Waybill"}
                  image={
                    actionType === "upload delivered waybill"
                      ? trip?.deliveredWaybilImageUrl
                      : trip?.requestedWaybilImageUrl
                  }
                  field={
                    actionType === "upload delivered waybill"
                      ? "deliveredWaybilImageUrl"
                      : "requestedWaybilImageUrl"
                  }
                  tripId={trip._id}
                  callback={() => {
                    close();
                  }}
                />
              </span>
            )}
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              close();
              setVehicle();
            }}
          >
            Cancel
          </Button>
          {showActionButton && (
            <Button
              disabled={!vehicle && actionType === "assign vehicle"}
              onClick={handleNext}
            >
              {actionButtonLabel || "Next"}
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </>
  );
};

export default TripStatusActionsModal;

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Slide,
} from "@mui/material";
import React, { forwardRef, useRef, useState } from "react";

import PersonAddIcon from "@mui/icons-material/PersonAdd";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import VendorAgentForm from "./VendorAgentForm";
import { Box } from "@mui/system";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const AddEditVendorAgent = ({
  showModal,
  setShowModal,
  mode = "create",
  vendorAgent,
}) => {
  const childRef = useRef(null);
  const [value, setValue] = useState(0);
  const [disableSave, setDisableSave] = useState(true);

  const handleNextClick = () => {
    childRef.current.handleNextClick();
  };
  const handleSaveCick = () => {
    childRef.current.handleSaveCick();
  };
  const validateForm = () => {
    return childRef.current.validateForm();
  };
  const resetStates = () => {
    childRef.current.resetStates(vendorAgent);
  };
 
  return (
    <Dialog
      open={showModal}
      // onClose={() => {
      //   setShowModal(false);
      // }}
      TransitionComponent={Transition}
      keepMounted
      fullWidth={true}
      maxWidth="sm"
    >
      <DialogTitle className="text-primary d-flex justify-content-between">
        {" "}
        <span>
          {" "}
          {mode === "create" ? (
            <PersonAddIcon className="me-2" />
          ) : (
            <ModeEditIcon className="me-2" />
          )}
          {mode === "create" ? "Add New Vendor" : "Edit Vendor"}
        </span>
        <Button
          onClick={() => {
            resetStates();
            setShowModal(false);
          }}
        >
          Close{" "}
        </Button>
      </DialogTitle>
      <DialogContent>
        <Box sx={{ width: "100%" }}>
          <VendorAgentForm
            ref={childRef}
            value={value}
            setValue={setValue}
            vendorAgent={vendorAgent}
            mode={mode}
            setDisableSave={setDisableSave}
            callback={() => {
              setShowModal(false);
            }}
          />
        </Box>
      </DialogContent>
      <div className="d-flex justify-content-between m-4">
        <div className="d-flex justify-content-between">
          <Button
            size="small"
            onClick={() => handleNextClick()}
            disabled={value === 3}
          >
            Next{" "}
          </Button>
          <Button
            size="small"
            onClick={() => setValue(value - 1)}
            disabled={value === 0}
          >
            Back{" "}
          </Button>
        </div>
        <DialogActions className="d-flex">
          <Button
            size="small"
            variant="contained"
            onClick={() => {
              validateForm() && handleSaveCick();
            }}
            className="me-2"
            disabled={disableSave}
          >
            Save
          </Button>

          <Button
            size="small"
            className="ms-2"
            variant="outlined"
            onClick={() => {
              resetStates();
            }}
          >
            Reset{" "}
          </Button>
        </DialogActions>
        {/* <Button
            onClick={() => {
              resetStates();
              setShowModal(false);
            }}
          >
            Close{' '}
          </Button> */}
      </div>
    </Dialog>
  );
};

export default AddEditVendorAgent;

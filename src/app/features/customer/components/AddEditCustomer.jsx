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
import CustomerForm from "./CustomerForm";
import { Box } from "@mui/system";


const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const AddEditCustomer = ({ showModal, setShowModal, mode = "create", customer }) => {
  const childRef = useRef(null);
  const [value, setValue] = useState(0);
 

 


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
    childRef.current.resetStates(customer);
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
          {mode === "create" ? "Add New Customer" : "Edit Customer"}
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
          <CustomerForm
            ref={childRef}
            value={value}
            setValue={setValue}
            customer={customer }
            mode={mode}
            callback={() => { setShowModal(false) }}
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

export default AddEditCustomer;

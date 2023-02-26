import PropTypes from "prop-types";
//import Button from 'react-bootstrap/Button';
//import Modal from '../Modal/Modal';
import {
  Dialog,
  DialogActions,
  DialogContent,
  Button,
  Slide,
  DialogTitle,
  TextField,
} from "@mui/material";
import { forwardRef, useEffect, useState } from "react";
import LoadingButton from "@mui/lab/LoadingButton";
import Banner from "./Banner";
import Loader from "./Loader";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const FooterChildren = ({
  handleClose,
  handleDelete,
  cancelButtonText,
  confirmButtonText,
  showSpinner,
  disabled,
  actionButtonColor,
  mode,
}) => {
  return (
    <>
      <Button
        variant="outline-primary"
        className="me-2"
        onClick={handleClose}
        disabled={showSpinner}
      >
        {cancelButtonText}
      </Button>
      <Loader showLoading={showSpinner} />
      <LoadingButton
        loading={showSpinner}
        variant="contained"
        onClick={handleDelete}
        color={actionButtonColor}
        disabled={disabled || showSpinner}
      >
        {showSpinner ? mode : confirmButtonText}
      </LoadingButton>
      {/* <Button onClick={handleDelete} disabled={showSpinner || disabled}>
        {confirmButtonText}
      </Button> */}
    </>
  );
};

const DefaultChildren = ({ itemToDelete }) => {
  return (
    <div className="d-flex flex-column">
      <span className="mb-2">
        <b>{itemToDelete}</b>?
      </span>
      <span></span>
    </div>
  );
};

const ConfirmationModal = ({
  title,
  show,
  showSpinner,
  handleClose,
  handleDelete,
  itemToDelete,
  confirmButtonText,
  cancelButtonText,
  childrenElement: ChildrenElement,
  size,
  errorMessage,
  disabled,
  fullWidth,
  mode,
  actionButtonColor,
  reason,
  setReason,
  showReason,
  onCloseBanner,
  ...props
}) => {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    if (showReason) {
      setShowBanner(true);
    }
  }, [showReason]);

  return (
    <Dialog
      open={show}
      onClose={handleClose}
      fullWidth={fullWidth || false}
      maxWidth={size}
      TransitionComponent={Transition}
      keepMounted
      {...props}
    >
      <DialogTitle className="text-primary">{title}</DialogTitle>
      <DialogContent className="d-flex flex-column justify-content-center">
        <div style={{ flexGrow: 1, textAlign: "center" }}>
          <Banner
            show={errorMessage ? true : false}
            variant="warning"
            className="mb-4"
            severity="error"
            handleClose={onCloseBanner}
          >
            <p>{errorMessage}</p>
          </Banner>
        </div>
        {showReason && (
          <>
            <div style={{ flexGrow: 1, textAlign: "center" }}>
              <Banner
                show={showBanner && !reason}
                variant="warning"
                severity="warning"
                className="mb-4"
                handleClose={() => setShowBanner(false)}
              >
                <p>Please enter a reason for modification</p>
              </Banner>
            </div>

            <TextField
              autoFocus
              margin="dense"
              value={reason || ""}
              onChange={(e) => setReason(e.target.value)}
              label="Reason"
              fullWidth
              variant="standard"
            />
          </>
        )}

        {ChildrenElement ? (
          <>
            <ChildrenElement />
          </>
        ) : (
          <>
            {" "}
            <DefaultChildren itemToDelete={itemToDelete} />
          </>
        )}
      </DialogContent>
      <DialogActions>
        <FooterChildren
          confirmButtonText={confirmButtonText}
          cancelButtonText={cancelButtonText}
          handleClose={handleClose}
          handleDelete={handleDelete}
          showSpinner={showSpinner}
          disabled={disabled}
          actionButtonColor={actionButtonColor}
          mode={mode === "restore" ? "restoring..." : "deleting..."}
        />
      </DialogActions>
    </Dialog>
  );
};

DefaultChildren.propTypes = {
  itemToDelete: PropTypes.string,
};

DefaultChildren.defaultProps = {
  itemToDelete: "this item",
};

FooterChildren.propTypes = {
  handleClose: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
  cancelButtonText: PropTypes.string,
  confirmButtonText: PropTypes.string,
  showSpinner: PropTypes.bool,
  disabled: PropTypes.bool,
};

FooterChildren.defaultProps = {
  cancelButtonText: "Cancel",
  confirmButtonText: "Confirm",
  showSpinner: false,
  disabled: false,
};

ConfirmationModal.propTypes = {
  title: PropTypes.string,
  handleClose: PropTypes.func.isRequired,
  handleDelete: PropTypes.func,
  show: PropTypes.bool.isRequired,
  errorMessage: PropTypes.string,
  showSpinner: PropTypes.bool,
  itemToDelete: PropTypes.string,
  cancelButtonText: PropTypes.string,
  confirmButtonText: PropTypes.string,
  size: PropTypes.string,
  childrenElement: PropTypes.func,
};

ConfirmationModal.defaultProps = {
  title: "WARNING",
  handleDelete: null,
  errorMessage: "",
  itemToDelete: "this item",
  showSpinner: false,
  cancelButtonText: "Cancel",
  confirmButtonText: "Confirm",
  size: "sm",
  childrenElement: null,
};
export default ConfirmationModal;

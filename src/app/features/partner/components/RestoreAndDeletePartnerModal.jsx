import { forwardRef, useState } from "react";
import { Col, OverlayTrigger, Row, Tooltip } from "react-bootstrap";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Slide,
} from "@mui/material";
import organisationsApi from "../../../services/organisationsApi.slice";
import Loader from "../../../utils/Loader";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const RestoreAndDeletePartnerModal = ({
  selectedPartner,
  setSelectedPartner,
  icon,
  callBack,
  mode,
}) => {
  const [showModal, setShowModal] = useState(false);
  const [deletePartner, deletePartnerStatus] =
    organisationsApi.useDeletePartnerMutation();
  const [restorePartner, restorePartnerStatus] =
    organisationsApi.useRestorePartnerMutation();

  const getPayload = (value) => {
    return selectedPartner.reduce((acc, item) => {
      if (item[value]) {
        acc.push(item[value]);
      }

      return acc;
    }, []);
  };

  const handleDeleteRestore = () => {
    const payload = {
      ids: getPayload("_id"),
    };
    if (mode === "delete") {
      deletePartner({
        payload,
        successHandler: (success, data) => {},
      })
        .then((data) => {
          if (data?.data?.data) {
            setShowModal(false);
            callBack();
            setSelectedPartner([]);
          }
        })
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        .catch((e) => {
          console.error(e.data);
        });
    } else {
      restorePartner({
        payload,
        successHandler: (success, data) => {},
      })
        .then((data) => {
          if (data?.data?.data) {
            setShowModal(false);
            setSelectedPartner([]);
          }
        })
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        .catch((e) => {
          console.error(e.data);
        });
    }
  };

  const getTitle = () => {
    if (selectedPartner[0]?.companyName) return selectedPartner[0].companyName;

    return `${selectedPartner[0]?.firstName} ${selectedPartner[0]?.lastName}`;
  };

  return (
    <Row>
      <Col>
        {selectedPartner.length > 0 && (
          <>
            {icon ? (
              <DeleteIcon
                onClick={
                  selectedPartner?.length > 0 ? () => setShowModal(true) : null
                }
              />
            ) : (
              <Chip
                color="error"
                className="btn"
                onClick={
                  selectedPartner?.length > 0 ? () => setShowModal(true) : null
                }
                label={mode === "delete" ? "Delete" : "Restore"}
                size="small"
                style={{ width: "6rem" }}
              />
            )}
          </>
        )}
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
                {mode === "delete" ? "Delete Partner" : "Restore Partner"}
              </DialogTitle>
              <DialogContent>
                <DialogContentText>
                  {selectedPartner.length === 1 && (
                    <span>
                      You want to {mode === "delete" ? "delete " : "restore "}
                      <strong>{getTitle()}</strong>
                    </span>
                  )}
                  {selectedPartner.length > 1 && (
                    <span>
                      You have seleceted following
                      <strong>
                        {" "}
                        {`${selectedPartner?.length}  partners 
            
             `}{" "}
                      </strong>{" "}
                      for {mode === "delete" ? "deletion " : "restoration "}
                      <ul>
                        {selectedPartner.map((item) => (
                          <li key={item._id}>{getTitle()}</li>
                        ))}
                      </ul>
                    </span>
                  )}
                </DialogContentText>

                <Loader
                  showLoading={
                    deletePartnerStatus?.isLoading ||
                    restorePartnerStatus?.isLoading
                  }
                />
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
                    deletePartnerStatus.isLoading || restorePartnerStatus.isLoading
                  }
                  onClick={() => handleDeleteRestore()}
                  type="submit"
                  color="error"
                >
                  {mode === "delete" ? "Delete" : "Restore"}
                </Button>
              </DialogActions>
            </Dialog>
          </div>
        )}
      </Col>
    </Row>
  );
};

export default RestoreAndDeletePartnerModal;

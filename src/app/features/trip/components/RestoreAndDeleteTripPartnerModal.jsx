import { forwardRef, useState } from "react";
import { Col,  Row,  } from "react-bootstrap";
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
import { useSelector } from "react-redux";
import { globalSelectors } from "../../../global/global.slice";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const RestoreAndDeleteTripModal = ({
  selectedTrip,
  setSelectedTrip,
  icon,
  callBack,
  mode,
}) => {
  const currentUser = useSelector(globalSelectors.selectCurrentUser);
  const [showModal, setShowModal] = useState(false);
  const [deleteTrip, deleteTripStatus] =
    organisationsApi.useDeleteTripMutation();
  const [restoreTrip, restoreTripStatus] =
    organisationsApi.useRestoreTripMutation();

  const getPayload = (value) => {
    return selectedTrip.reduce((acc, item) => {
      if (item[value]) {
        acc.push(item[value]);
      }

      return acc;
    }, []);
  };

  const handleDeleteRestore = () => {
    const payload = {
      ids: getPayload("_id"),
      userId: currentUser?._id,
    };
    if (mode === "delete") {
      deleteTrip({
        payload,
        successHandler: (success, data) => {},
      })
        .then((data) => {
          if (data?.data?.data) {
            setShowModal(false);
            callBack();
            setSelectedTrip([]);
          }
        })
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        .catch((e) => {
          console.error(e.data);
        });
    } else {
      restoreTrip({
        payload,
        successHandler: (success, data) => {},
      })
        .then((data) => {
          if (data?.data?.data) {
            setShowModal(false);
            setSelectedTrip([]);
          }
        })
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        .catch((e) => {
          console.error(e.data);
        });
    }
  };

  const getTitle = () => {
    if (selectedTrip[0]?.companyName) return selectedTrip[0].companyName;

    return `${selectedTrip[0]?.firstName} ${selectedTrip[0]?.lastName}`;
  };

  return (
    <Row>
      <Col>
        {selectedTrip.length > 0 && (
          <>
            {icon ? (
              <DeleteIcon
                onClick={
                  selectedTrip?.length > 0 ? () => setShowModal(true) : null
                }
              />
            ) : (
              <Chip
                color="error"
                className="btn"
                onClick={
                  selectedTrip?.length > 0 ? () => setShowModal(true) : null
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
                {mode === "delete" ? "Delete Trip" : "Restore Trip"}
              </DialogTitle>
              <DialogContent>
                <DialogContentText>
                  {selectedTrip.length === 1 && (
                    <span>
                      You want to {mode === "delete" ? "delete " : "restore "}
                      <strong>{getTitle()}</strong>
                    </span>
                  )}
                  {selectedTrip.length > 1 && (
                    <span>
                      You have seleceted following
                      <strong>
                        {" "}
                        {`${selectedTrip?.length}  Trips 
            
             `}{" "}
                      </strong>{" "}
                      for {mode === "delete" ? "deletion " : "restoration "}
                      <ul>
                        {selectedTrip.map((item) => (
                          <li key={item._id}>{getTitle()}</li>
                        ))}
                      </ul>
                    </span>
                  )}
                </DialogContentText>

                <Loader
                  showLoading={
                    deleteTripStatus?.isLoading ||
                    restoreTripStatus?.isLoading
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
                    deleteTripStatus.isLoading || restoreTripStatus.isLoading
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

export default RestoreAndDeleteTripModal;

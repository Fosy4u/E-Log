import { forwardRef, useState } from "react";
import { Col, Row } from "react-bootstrap";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Slide,
  Tooltip,
} from "@mui/material";
import organisationsApi from "../../../services/organisationsApi.slice";
import Loader from "../../../utils/Loader";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { globalSelectors } from "../../../global/global.slice";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const RestoreAndDeleteTripModal = ({
  selectedTrip,
  icon,
  callBack,
  mode,
  tableDelete,
}) => {
  const { organisationId } = useParams();
  const currentUser = useSelector(globalSelectors.selectCurrentUser);
  const [showModal, setShowModal] = useState(false);
  const [deleteTrip, deleteTripStatus] =
    organisationsApi.useDeleteTripMutation();
  const [restoreTrip, restoreTripStatus] =
    organisationsApi.useRestoreTripMutation();

  const getPayload = (value) => {
    return selectedTrip.reduce((acc, item) => {
      const keyVal = item[value]?.value || item[value];
      if (keyVal) {
        acc.push(keyVal);
      }

      return acc;
    }, []);
  };

  const handleDeleteRestore = () => {
    const payload = {
      ids: getPayload(tableDelete ? "key" : "_id"),
      organisationId,
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
            callBack();
          }
        })
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        .catch((e) => {
          console.error(e.data);
        });
    }
  };

  const getTitle = (item) => {
    if (mode === "delete") {
      return item?.contactName?.value || item?.contactName;
    }

    if (item?.companyName) return item.companyName;
    if (item?.firstName && item?.lastName)
      return `${item?.firstName} ${item?.lastName}`;
    return "trip";
  };

  return (
    <Row>
      <Col>
        {selectedTrip.length > 0 && (
          <>
            {icon ? (
              mode === "delete" && (
                <Tooltip title="Delete">
                  <IconButton
                    onClick={
                      selectedTrip?.length > 0 ? () => setShowModal(true) : null
                    }
                  >
                    <DeleteIcon color="error" />
                  </IconButton>
                </Tooltip>
              )
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
                {selectedTrip.length === 1 && (
                  <span>
                    You want to {mode === "delete" ? "delete " : "restore "}
                    <strong>{getTitle(selectedTrip[0])}</strong>
                  </span>
                )}
                {selectedTrip.length > 1 && (
                  <span>
                    You have seleceted following
                    <strong>
                      {" "}
                      {`${selectedTrip?.length}  trips 
            
             `}{" "}
                    </strong>{" "}
                    for {mode === "delete" ? "deletion " : "restoration "}
                    <ul>
                      {selectedTrip.map((item, index) => (
                        <li key={index}>{getTitle(item)}</li>
                      ))}
                    </ul>
                  </span>
                )}

                <Loader
                  showLoading={
                    deleteTripStatus?.isLoading || restoreTripStatus?.isLoading
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

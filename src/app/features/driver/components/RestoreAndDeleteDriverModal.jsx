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
import { useSelector } from "react-redux";
import { globalSelectors } from "../../../global/global.slice";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const RestoreAndDeleteDriverModal = ({
  selectedDrivers,
  setSelectedDrivers,
  icon,
  callBack,
  mode,
}) => {
  const [showModal, setShowModal] = useState(false);
  const currentUser = useSelector(globalSelectors.selectCurrentUser);
  const [deleteDriver, deleteDriverStatus] =
    organisationsApi.useDeleteDriverMutation();
  const [restoreDriver, restoreDriverStatus] =
    organisationsApi.useRestoreDriverMutation();

  const getPayload = (value) => {
    return selectedDrivers.reduce((acc, item) => {
      if (item[value]) {
        acc.push(item[value]);
      }

      return acc;
    }, []);
  };

  const handleDeleteRestore = () => {
    const payload = {
      ids: getPayload("_id"),
      userId : currentUser._id
    };
    if (mode === "delete") {
      deleteDriver({
        payload,
        successHandler: (success, data) => {},
      })
        .then(() => {
          setShowModal(false);
          callBack();
          setSelectedDrivers([]);
        })
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        .catch((e) => {
          console.error(e.data);
        });
    } else {
      restoreDriver({
        payload,
        successHandler: (success, data) => {},
      })
        .then(() => {
          setShowModal(false);
          setSelectedDrivers([]);
        })
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        .catch((e) => {
          console.error(e.data);
        });
    }
  };

  return (
    <Row>
      <Col>
        {selectedDrivers?.length > 0 && (
          <OverlayTrigger
            placement="bottom"
            overlay={
              selectedDrivers?.length === 1 ? (
                <Tooltip>{`  ${mode === "delete" ? "Delete" : "Restore"} ${
                  selectedDrivers[0]?.firstName +
                  " " +
                  selectedDrivers[0]?.lastName
                }
                `}</Tooltip>
              ) : (
                <Tooltip>{` ${mode === "delete" ? "Delete" : "Restore"} ${
                  selectedDrivers?.length
                } ${
                  selectedDrivers?.length > 1 ? "drivers" : "driver"
                }`}</Tooltip>
              )
            }
          >
            {icon ? (
              <DeleteIcon
                onClick={
                  selectedDrivers?.length > 0 ? () => setShowModal(true) : null
                }
              />
            ) : (
              <Chip
                color="error"
                className="btn"
                onClick={
                  selectedDrivers?.length > 0 ? () => setShowModal(true) : null
                }
                label={mode === "delete" ? "Delete" : "Restore"}
                size="small"
                style={{ width: "6rem" }}
              />
            )}
          </OverlayTrigger>
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
                {mode === "delete" ? "Delete Truck" : "Restore Truck"}
              </DialogTitle>
              <DialogContent>
                <DialogContentText>
                  {selectedDrivers.length === 1 && (
                    <span>
                      You want to {mode === "delete" ? "delete " : "restore "}
                      <strong>
                        {selectedDrivers[0]?.firstName +
                          " " +
                          selectedDrivers[0]?.lastName}
                      </strong>
                    </span>
                  )}
                  {selectedDrivers?.length > 1 && (
                    <span>
                      You have seleceted following
                      <strong>
                        {" "}
                        {`${selectedDrivers?.length}  products 
            
             `}{" "}
                      </strong>{" "}
                      for deletion.{" "}
                      <ul>
                        {selectedDrivers.map((item) => (
                          <li key={item?._id}>
                            {selectedDrivers[0]?.firstName +
                              " " +
                              selectedDrivers[0]?.lastName}
                          </li>
                        ))}
                      </ul>
                    </span>
                  )}
                </DialogContentText>

                <Loader
                  showLoading={
                    deleteDriverStatus?.isLoading ||
                    restoreDriverStatus?.isLoading
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
                    deleteDriverStatus.isLoading || restoreDriverStatus.isLoading
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

export default RestoreAndDeleteDriverModal;

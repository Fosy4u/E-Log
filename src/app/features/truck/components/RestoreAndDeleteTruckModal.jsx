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

const RestoreAndDeleteTruckModal = ({
  selectedTrucks,
  setSelectedTrucks,
  icon,
  callBack,
  mode,
}) => {
  const [showModal, setShowModal] = useState(false);
  const [deleteTruck, deleteTruckStatus] =
    organisationsApi.useDeleteTruckMutation();
  const [restoreTruck, restoreTruckStatus] =
    organisationsApi.useRestoreTruckMutation();

  const getPayload = (value) => {
    return selectedTrucks.reduce((acc, item) => {
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
      deleteTruck({
        payload,
        successHandler: (success, data) => {},
      })
        .then((data) => {
          if (data?.data?.data) {
            setShowModal(false);
            callBack();
            setSelectedTrucks([]);
          }
        })
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        .catch((e) => {
          console.error(e.data);
        });
    } else {
      restoreTruck({
        payload,
        successHandler: (success, data) => {},
      })
        .then((data) => {
          if (data?.data?.data) {
            setShowModal(false);
            setSelectedTrucks([]);
          }
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
        {selectedTrucks.length > 0 && (
          <OverlayTrigger
            placement="bottom"
            overlay={
              selectedTrucks?.length === 1 ? (
                <Tooltip>{`  ${mode === "delete" ? "Delete" : "Restore"} ${
                  selectedTrucks[0].manufacturer
                }-${selectedTrucks[0].model} (${
                  selectedTrucks[0].regNo
                })`}</Tooltip>
              ) : (
                <Tooltip>{` ${mode === "delete" ? "Delete" : "Restore"} ${
                  selectedTrucks.length
                } ${selectedTrucks.length > 1 ? "trucks" : "truck"}`}</Tooltip>
              )
            }
          >
            {icon ? (
              <DeleteIcon
                onClick={
                  selectedTrucks?.length > 0 ? () => setShowModal(true) : null
                }
              />
            ) : (
              <Chip
                color="error"
                className="btn"
                onClick={
                  selectedTrucks?.length > 0 ? () => setShowModal(true) : null
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
                  {selectedTrucks.length === 1 && (
                    <span>
                      You want to {mode === "delete" ? "delete " : "restore "}
                      <strong>
                        {selectedTrucks[0].manufacturer}-
                        {selectedTrucks[0].model}
                      </strong>
                      : <strong> {selectedTrucks[0].regNo}</strong>
                    </span>
                  )}
                  {selectedTrucks.length > 1 && (
                    <span>
                      You have seleceted following
                      <strong>
                        {" "}
                        {`${selectedTrucks?.length}  products 
            
             `}{" "}
                      </strong>{" "}
                      for deletion.{" "}
                      <ul>
                        {selectedTrucks.map((item) => (
                          <li key={item._id}>
                            {item.manufacturer}-{item.model} ({item.regNo})
                          </li>
                        ))}
                      </ul>
                    </span>
                  )}
                </DialogContentText>

                <Loader
                  showLoading={
                    deleteTruckStatus?.isLoading ||
                    restoreTruckStatus?.isLoading
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
                    deleteTruckStatus.isLoading || restoreTruckStatus.isLoading
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

export default RestoreAndDeleteTruckModal;

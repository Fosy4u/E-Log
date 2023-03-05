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
  Slide,
} from "@mui/material";
import organisationsApi from "../../../services/organisationsApi.slice";
import Loader from "../../../utils/Loader";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const RestoreAndDeleteCustomerModal = ({
  selectedCustomers,
  setSelectedCustomers,
  icon,
  callBack,
  mode,
}) => {
  const [showModal, setShowModal] = useState(false);
  const [deleteCustomer, deleteCustomerStatus] =
    organisationsApi.useDeleteCustomerMutation();
  const [restoreCustomer, restoreCustomerStatus] =
    organisationsApi.useRestoreCustomerMutation();

  const getPayload = (value) => {
    return selectedCustomers.reduce((acc, item) => {
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
      deleteCustomer({
        payload,
        successHandler: (success, data) => {},
      })
        .then((data) => {
          if (data?.data?.data) {
            setShowModal(false);
            callBack();
            setSelectedCustomers([]);
          }
        })
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        .catch((e) => {
          console.error(e.data);
        });
    } else {
      restoreCustomer({
        payload,
        successHandler: (success, data) => {},
      })
        .then((data) => {
          if (data?.data?.data) {
            setShowModal(false);
            setSelectedCustomers([]);
          }
        })
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        .catch((e) => {
          console.error(e.data);
        });
    }
  };

  const getTitle = (item) => {
    if (item?.companyName) return item.companyName;

    return `${item?.firstName} ${item?.lastName}`;
  };

  return (
    <Row>
      <Col>
        {selectedCustomers?.length > 0 && (
          <>
            {icon ? (
              <DeleteIcon
                onClick={
                  selectedCustomers?.length > 0
                    ? () => setShowModal(true)
                    : null
                }
              />
            ) : (
              <Chip
                color="error"
                className="btn"
                onClick={
                  selectedCustomers?.length > 0
                    ? () => setShowModal(true)
                    : null
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
                {mode === "delete" ? "Delete Customer" : "Restore Customer"}
              </DialogTitle>
              <DialogContent>
                {selectedCustomers?.length === 1 && (
                  <span>
                    You want to {mode === "delete" ? "delete " : "restore "}
                    <strong>{getTitle(selectedCustomers[0])}</strong>
                  </span>
                )}
                {selectedCustomers?.length > 1 && (
                  <span>
                    You have seleceted following
                    <strong>
                      {" "}
                      {`${selectedCustomers?.length}  customers 
            
             `}{" "}
                    </strong>{" "}
                    for {mode === "delete" ? "deletion " : "restoration "}
                    <ul>
                      {selectedCustomers?.map((item) => (
                        <li key={item._id}>{getTitle(item)}</li>
                      ))}
                    </ul>
                  </span>
                )}

                <Loader
                  showLoading={
                    deleteCustomerStatus?.isLoading ||
                    restoreCustomerStatus?.isLoading
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
                    deleteCustomerStatus.isLoading ||
                    restoreCustomerStatus.isLoading
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

export default RestoreAndDeleteCustomerModal;

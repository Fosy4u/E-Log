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

const RestoreAndDeleteVendorModal = ({
  selectedVendor,
  icon,
  callBack,
  mode,
}) => {
  console.log(
    "🚀 ~ file: RestoreAndDeleteVendorModal.jsx:32 ~ selectedVendor:",
    selectedVendor
  );
  const { organisationId } = useParams();
  const currentUser = useSelector(globalSelectors.selectCurrentUser);
  const [showModal, setShowModal] = useState(false);
  const [deleteVendor, deleteVendorStatus] =
    organisationsApi.useDeleteVendorMutation();
  const [restoreVendor, restoreVendorStatus] =
    organisationsApi.useRestoreVendorMutation();

  const getPayload = (value) => {
    return selectedVendor.reduce((acc, item) => {
      if (item[value]) {
        acc.push(item[value]);
      }

      return acc;
    }, []);
  };

  const handleDeleteRestore = () => {
    const payload = {
      ids: getPayload(mode === "delete" ? "key" : "_id"),
      organisationId,
      userId: currentUser?._id,
    };
    if (mode === "delete") {
      deleteVendor({
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
      restoreVendor({
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
      return item?.contactName;
    }

    if (item?.companyName) return item.companyName;
    if (item?.firstName && item?.lastName)
      return `${item?.firstName} ${item?.lastName}`;
    return "vendor";
  };

  return (
    <Row>
      <Col>
        {selectedVendor.length > 0 && (
          <>
            {icon ? (
              <Tooltip title="Delete">
                <IconButton
                  onClick={
                    selectedVendor?.length > 0 ? () => setShowModal(true) : null
                  }
                >
                  <DeleteIcon color="error" />
                </IconButton>
              </Tooltip>
            ) : (
              <Chip
                color="error"
                className="btn"
                onClick={
                  selectedVendor?.length > 0 ? () => setShowModal(true) : null
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
                {mode === "delete" ? "Delete Vendor" : "Restore Vendor"}
              </DialogTitle>
              <DialogContent>
                {selectedVendor.length === 1 && (
                  <span>
                    You want to {mode === "delete" ? "delete " : "restore "}
                    <strong>{getTitle(selectedVendor[0])}</strong>
                  </span>
                )}
                {selectedVendor.length > 1 && (
                  <span>
                    You have seleceted following
                    <strong>
                      {" "}
                      {`${selectedVendor?.length}  vendors 
            
             `}{" "}
                    </strong>{" "}
                    for {mode === "delete" ? "deletion " : "restoration "}
                    <ul>
                      {selectedVendor.map((item) => (
                        <li key={item.key}>{getTitle(item)}</li>
                      ))}
                    </ul>
                  </span>
                )}

                <Loader
                  showLoading={
                    deleteVendorStatus?.isLoading ||
                    restoreVendorStatus?.isLoading
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
                    deleteVendorStatus.isLoading ||
                    restoreVendorStatus.isLoading
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

export default RestoreAndDeleteVendorModal;

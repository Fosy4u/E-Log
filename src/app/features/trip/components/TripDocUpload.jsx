import Button from "@mui/material/Button";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useState } from "react";
import organisationsApi from "../../../services/organisationsApi.slice";
import { useParams } from "react-router-dom";
import Loader from "../../../utils/Loader";
import { Small } from "../../../components/Typography";
import { useSelector } from "react-redux";
import { globalSelectors } from "../../../global/global.slice";

export default function TripDocUpload({
  open,
  setOpen,
  title,
  image,
  setImage,
  field,
  tripId,
}) {
  const { organisationId } = useParams();
  const currentUser = useSelector(globalSelectors.selectCurrentUser);
  const [errorMsg, setErrorMsg] = useState();
  const [uploadWaybill, uploadWaybillStatus] =
    organisationsApi.useUploadTripWaybillMutation();

  const validate = () => {
    if (!image) {
      setErrorMsg("Error! Please select a file");
      return false;
    }

    return true;
  };

  const handleUpload = (event) => {
    if (validate()) {
      submit();
    }
    return false;
  };

  const submit = () => {
    const form = new FormData();
    form.append("file", image);
    form.append("field", field);
    form.append("userId", currentUser._id);

    organisationId && form.append("organisationId", organisationId);
    tripId && form.append("_id", tripId);

    const payload = form;

    uploadWaybill({
      payload,
    })
      .then(() => {
        setImage();
        handleClose();
      })

      .catch((e) => {
        console.error(e.data);
      });
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{title} </DialogTitle>
        <DialogContent className="d-flex flex-column">
          {field === "requestedWaybilImageUrl" && (
            <DialogContentText>
              Please confirm this is the right request waybill for this trip
            </DialogContentText>
          )}
          {field === "deliveredWaybilImageUrl" && (
            <DialogContentText>
              Please confirm this is the right signed delivered waybill for this
              trip
            </DialogContentText>
          )}
          <Loader showLoading={uploadWaybillStatus?.isLoading} />
          {errorMsg && <Small className="text-danger">{errorMsg}</Small>}
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={handleClose}>
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={handleUpload}
            disabled={uploadWaybillStatus?.isLoading}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

import Button from "@mui/material/Button";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { useState } from "react";
import { TextField, useMediaQuery, FormControl } from "@mui/material";
import organisationsApi from "../../../services/organisationsApi.slice";
import { useParams } from "react-router-dom";
import Loader from "../../../utils/Loader";
import { Small } from "../../../components/Typography";

export default function DocUpload({
  open,
  setOpen,
  title,
  image,
  setImage,
  value,
}) {

  const matches = useMediaQuery("(min-width:600px)");

  const { truckId } = useParams();
  const [expiryDate, setExpiryDate] = useState(null);
  const [insuranceNo, setInsuranceNo] = useState("");
  const [errorMsg, setErrorMsg] = useState();
  const [addTruckDoc, addTruckDocStatus] =
    organisationsApi.useUploadTruckDocMutation();

  const validate = () => {
    if (!image) {
      setErrorMsg("Error! Please select a file");
      return false;
    }
    if (!expiryDate) {
      setErrorMsg("Error! Please select expiry date");
      return false;
    }

    if (!insuranceNo && value === "proofOfInsurance") {
      setErrorMsg("Error! Please enter insurance number");
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
    form.append("_id", truckId);
    form.append("value", value);
    form.append("expiryDate", expiryDate);
    form.append("insuranceNo", insuranceNo);

    const payload = form;

    addTruckDoc({
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
        <DialogTitle>
          {title} Expiry Date{" "}
          {value === "proofOfInsurance" && <span>And Insurance No</span>}
        </DialogTitle>
        <DialogContent className="d-flex flex-column">
          <DialogContentText>
            To save this file, please enter the expiry date{" "}
            {value === "proofOfInsurance" && <span>and insurance number</span>}.
          </DialogContentText>
          <Loader showLoading={addTruckDocStatus?.isLoading} />
          {errorMsg && <Small className="text-danger">{errorMsg}</Small>}
          {value === "proofOfInsurance" && (
            <TextField
              className="mb-3"
              autoFocus
              margin="dense"
              id="name"
              label="Insurance No"
              type="text"
              fullWidth
              variant="standard"
              value={insuranceNo}
              onChange={(e) => {
                setInsuranceNo(e.target.value);
                setErrorMsg("");
              }}
            />
          )}

          <FormControl className="me-1 " margin="normal" size="small">
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              {matches ? (
                <DesktopDatePicker
                  label="Choose Expiry Date"
                  inputFormat="dd/MM/yyyy"
                  value={expiryDate}
                  onChange={(e) => {
                    setExpiryDate(e);
                    setErrorMsg("");
                  }}
                  renderInput={(params) => (
                    <TextField size="small" {...params} />
                  )}
                  size="small"
                />
              ) : (
                <MobileDatePicker
                  label="Choose Expiry Date"
                  inputFormat="dd/MM/yyyy"
                  size="small"
                  value={expiryDate}
                  onChange={(e) => setExpiryDate(e)}
                  renderInput={(params) => (
                    <TextField size="small" {...params} />
                  )}
                />
              )}
            </LocalizationProvider>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={handleClose}>
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={handleUpload}
            disabled={addTruckDocStatus?.isLoading}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

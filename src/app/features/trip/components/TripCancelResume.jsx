import { TextField } from "@mui/material";
import Button from "@mui/material/Button";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useState } from "react";

export default function TripCancelResume({
  open,
  setOpen,
  action,
  tripId,
  userId,
  renderAction,
  status,
}) {
  const [reason, setReason] = useState();

  const payload = {
    action,
    tripId,
    userId,
    ...(status?.toLowerCase() === "cancelled" && { resumeReason: reason }),
    ...(status?.toLowerCase() !== "cancelled" && { cancelReason: reason }),
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
          {action === "cancel" ? "Cancel" : "Resume"} Trip
        </DialogTitle>
        <DialogContent className="d-flex flex-column">
          <DialogContentText>
            Are you sure you want to {action} this trip? Please provide a reason
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="reason"
            label="Reason"
            type="text"
            onChange={(e) => setReason(e.target.value)}
            value={reason || ""}
            fullWidth
            variant="standard"
            inputProps={{ maxLength: 50 }}
          />
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={handleClose}>
            No
          </Button>
          <Button
            disabled={!reason}
            variant="contained"
            onClick={() => {
              renderAction(payload);
              setReason();
              handleClose();
            }}
          >
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

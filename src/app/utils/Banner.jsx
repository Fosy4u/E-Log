import Alert from "@mui/material/Alert";
import { AlertTitle, Button } from "@mui/material";

const Banner = ({
  show,
  handleClose,
  severity,
  children,
  title,
  actionYes,
  actionNo,
  action,
  actionYesText,
  actionNoText,
  ...props
}) => {
  const getAction = () => {
    if (action && actionYes && actionNo && actionYesText && actionNoText) {
      return (
        <span className="d-flex flex-column">
          <Button
            color="success"
            size="small"
            onClick={actionYes}
            variant="contained"
            className="m-1"
          >
            {actionYesText}
          </Button>
          <Button
            className="m-1"
            color="primary"
            size="small"
            onClick={actionNo}
            variant="outlined"
          >
            {actionNoText}
          </Button>
        </span>
      );
    }
    if (action && actionYes) {
      return (
        <Button
          color="success"
          size="small"
          onClick={actionYes}
          variant="contained"
        >
          {actionYesText}
        </Button>
      );
    }
    if (action && actionNo) {
      return (
        <Button
          color="primary"
          size="small"
          onClick={actionNo}
          variant="outlined"
        >
          {actionNoText}
        </Button>
      );
    }

    return action;
  };

  return show ? (
    <Alert
      // show={show}
      onClose={handleClose}
      // {...props}
      // dismissible

      severity={severity || "info"}
      action={action ? getAction() : null}
    >
      <AlertTitle>{title}</AlertTitle>
      {children}
    </Alert>
  ) : null;
};

export default Banner;

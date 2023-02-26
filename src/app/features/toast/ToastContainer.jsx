
import { useSelector, useDispatch } from "react-redux";
import Toast from "./Toast";

import { Stack } from "@mui/material";
import { globalActions, globalSelectors } from "../../global/global.slice";

const ToastContainer = () => {
  const toasts = useSelector(globalSelectors.selectToasts);


  const dispatch = useDispatch();
  return (
    <Stack spacing={2} sx={{ width: "100%" }}>
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          title={toast.title}
          message={toast.message}
          variant={toast.variant}
          show={true}
          onClose={() => dispatch(globalActions.removeToast(toast.id))}
        />
      ))}
    </Stack>
  );
};

export default ToastContainer;

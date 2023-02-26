import { Backdrop } from "@mui/material";
import React from "react";
import Image from "../images/Logo2.png";

const Loader = ({ className, showLoading }) => {
  return showLoading ? (
    <Backdrop
      sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={showLoading}
    >
      <div className={`spinner-container ${className}`}>
        {/* <div className="spinner">
        {" "} */}
        <img
          width="5px"
          height="5px"
          className="spinner p-1"
          src={Image}
          alt="e-log logo"
        />
        {/* </div> */}
      </div>
    </Backdrop>
  ) : null;
};

export default Loader;

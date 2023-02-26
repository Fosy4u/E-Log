// import { getAuth, signOut } from 'firebase/auth';
// import { useState } from 'react';
// import { Spinner } from 'react-bootstrap';
// import { useDispatch, useSelector } from 'react-redux';
import { Button } from "@mui/material";
import { useRef } from "react";
import { useLocation } from "react-router-dom";
import useFullscreenStatus from "../../hooks/useFullscreenStatus";
// import { globalActions, globalSelectors } from '../../global/global.slice';
import MatxLayout from "../MatxLayout";
// import firebase from './firebase';

const noNavLinks = ["/e-log/session/signin"];
const DisplayTopSideBar = ({ children }) => {
  const location = useLocation().pathname;
  const maximizableElement = useRef(null);
  let isFullscreen, setIsFullscreen;
  let errorMessage;

  try {
    [isFullscreen, setIsFullscreen] = useFullscreenStatus(maximizableElement);
  } catch (e) {
    errorMessage = "Fullscreen not supported";
    isFullscreen = false;
    setIsFullscreen = undefined;
  }

  const handleExitFullscreen = () => document.exitFullscreen();

  return noNavLinks.includes(location) ? (
    <div> {children}</div>
  ) : (
    <div
      ref={maximizableElement}
      className={`maximizable-container ${
        isFullscreen ? "fullscreen" : "default"
      }`}
    >
      {/* <div >
     
        {errorMessage ? (
          <button
            onClick={() =>
              alert(
                "Fullscreen is unsupported by this browser, please try another browser."
              )
            }
          >
            {errorMessage}
          </button>
        ) : isFullscreen ? (
          <button color="error" onClick={handleExitFullscreen}>
            Exit Fullscreen
          </button>
        ) : (
          <Button onClick={setIsFullscreen}>Fullscreen</Button>
        )}
      </div> */}
      <MatxLayout
        handleExitFullscreen={handleExitFullscreen}
        setIsFullscreen={setIsFullscreen}
        isFullscreen={isFullscreen}
        errorMessage={errorMessage}
      >
        {children}
      </MatxLayout>
    </div>
  );
};

export default DisplayTopSideBar;

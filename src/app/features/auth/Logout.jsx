import React, { useState } from "react";
import { getAuth, signOut } from "firebase/auth";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { globalActions } from "../../global/global.slice";
import firebase from "../../utils/firebase";
import Loader from "../../utils/Loader";
import { Span } from "../../components/Typography";

const Logout = () => {
  const location = useLocation().pathname;
  console.log("🚀 ~ file: Logout.jsx:11 ~ Logout ~ location", location);
  const dispatch = useDispatch();
  const auth = getAuth(firebase);
  const [showSpinner, setShowSpinner] = useState(false);
  const logout = () => {
    try {
      setShowSpinner(true);
      localStorage.setItem("currentUrl", location);
      signOut(auth).then(() => {
        dispatch(globalActions.setCurrentUser({}));
        setShowSpinner(false);
      });
    } catch (error) {
      console.log("error", error);
    }
  };
  return (
    <div>
      <Loader showLoading={showSpinner} />
      <Span onClick={logout}>Logout</Span>
    </div>
  );
};

export default Logout;

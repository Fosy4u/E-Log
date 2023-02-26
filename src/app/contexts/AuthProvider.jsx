import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { globalActions } from "../global/global.slice";
import organisationsApi from "../services/organisationsApi.slice";
import firebase from "../utils/firebase";

const nav = [
  '/e-log/undefined'


];

const AuthProvider = ({ children }) => {
  const auth = getAuth(firebase);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation().pathname;
  const [orgUser, setOrgUser] = useState();
  const [getUser, setGetUser] = useState(false);
  const [refreshToken, setRefreshToken] = useState(true);
  const [user, setUser] = useState({});

  const { organisationId } = user;
  const getUserQuery = organisationsApi.useGetUserQuery(
    {
      userId: orgUser,
    },
    { skip: !orgUser }
  );
  const userData = getUserQuery?.data?.data;

  const currentUser = auth?.currentUser;
  const [signedOut, setsignedOut] = useState(false);

  const getOrganisationQuery = organisationsApi.useGetOrganisationQuery(
    {
      _id: organisationId,
    },
    { skip: !organisationId || !user }
  );
  const organisation = getOrganisationQuery?.data?.data;

  useEffect(() => {
    if (!refreshToken) {
      const refresh = setInterval(() => {
        setRefreshToken(!refreshToken);
      }, 3000000);
      return () => {
        clearInterval(refresh);
      };
    }
    const refresh = setInterval(() => {
      setRefreshToken(!refreshToken);
    }, 3000);
    return () => {
      clearInterval(refresh);
    };
  }, [refreshToken]);

  useEffect(() => {
    if (userData) {
      setUser(userData);
    }
  }, [userData]);

  useEffect(() => {
    if (signedOut) {
      console.log("signing out");
      return navigate("/e-log/session/signin");
    }
    // if (!signedOut && !getUserQuery.isLoading && user?.length > 0) {
    //   navigate(`/`);
    // }
  }, [navigate, signedOut, user?.length]);
  useEffect(() => {
    try {
      const condition = navigator.onLine ? "online" : "offline";
      if (condition === "online") {
        onAuthStateChanged(auth, (user) => {
          if (user) {
            setGetUser(true);
            setOrgUser(user.uid);
            setsignedOut(false);
            getToken(refreshToken);
            // user
            //   .getIdToken(true)
            //   .then((token) =>
            //     dispatch(globalActions.setAuthToken(token.access_token))
            //   );
          } else {
            setGetUser(false);
            setsignedOut(true);
            navigate("/e-log/session/signin");
          }
        });
      }
    } catch (error) {
      console.log("error", error);
    }
  }, []);

  const checkUser = () => {
    try {
      const condition = navigator.onLine ? "online" : "offline";
      if (condition === "online") {
        onAuthStateChanged(auth, (user) => {
          if (user) {
            setGetUser(true);
            setOrgUser(user.uid);
            setsignedOut(false);
            getToken(refreshToken);
            // user
            //   .getIdToken(true)
            //   .then((token) =>
            //     dispatch(globalActions.setAuthToken(token.access_token))
            //   );
          } else {
            setGetUser(false);
            setsignedOut(true);
            localStorage.setItem("currentUrl", location);
            navigate("/e-log/session/signin");
          }
        });
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    // if (currentUser) {
    //   console.log("getting token");
    //   currentUser
    //     .getIdToken(true)
    //     .then((token) => dispatch(globalActions.setAuthToken(token)));
    // }
    // getToken();
  }, [auth.currentUser, currentUser, dispatch]);

  const getToken = async () => {
    const token = await auth?.currentUser?.getIdToken(true);
    //4 - check if have token in the current user
    if (token) {
      dispatch(globalActions.setAuthToken(token));
    }
  };

  // useEffect(() => {
  //   if (orgUser) {
  //     const { accessToken, emailVerified, isAnonymous, uid, displayName } =
  //       orgUser;
  //     const authUser = {
  //       email: orgUser.email,
  //       accessToken,
  //       emailVerified,
  //       isAnonymous,
  //       displayName,
  //       userId: uid,
  //     };
  //     return dispatch(globalActions.setCurrentUser(authUser));
  //   }
  // }, [dispatch, orgUser]);

  useEffect(() => {
    if (user?._id) {
      dispatch(globalActions.setCurrentUser(user));
    }
  }, [dispatch, user]);

  useEffect(() => {
    if (organisation) {
      dispatch(globalActions.setOrganisation(organisation));
    }
  }, [dispatch, organisation]);

  useEffect(() => {
    if (nav.includes(location)) {
      navigate("/e-log/session/signin")
    }
      
    
  }, [location, navigate]);


  return <>{children}</>;
};

export default AuthProvider;

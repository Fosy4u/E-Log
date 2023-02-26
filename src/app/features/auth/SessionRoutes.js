
import { lazy } from "react";
import Loadable from "../../utils/Loadable";

// const NotFound = Loadable(lazy(() => import('./NotFound')));
// const ForgotPassword = Loadable(lazy(() => import('./ForgotPassword')));
export const FirebaseLogin = Loadable(lazy(() => import("./Login")));
//const JwtRegister = Loadable(lazy(() => import('./JwtRegister')));

import { useState } from "react";
import { useSelector } from "react-redux";
import { Route, Navigate, Routes } from "react-router-dom";
import { globalSelectors } from "../global/global.slice";

/**
 * Renders provided routes using React Router's Switch & Route components.
 * @param {Routes} routes A list of routes to be used within an app. See
 * the README for this module for more guidance on what to provide.
 * https://v5.reactrouter.com/web/guides/quick-start
 */
const AllRoutes = ({ routes }) => {
  //   const defaultRoute = routes.find((element) => {
  //     return element.isDefault;
  //   });
  const currentUser = useSelector(globalSelectors.selectCurrentUser);
  const organisationId = currentUser?.organisationId;
  return (
    <Routes>
      {routes.map((route) => {
        return (
          <Route
            key={route.path}
            path={route.path}
            element={<route.component />}
            exact
          />
        );
      })}

      {/* catch-all to redirect any unknown paths to default page for the app */}
      <Route
        path="*"
        element={<Navigate to={`/e-log/${organisationId}`} replace />}
      />
    
      {/* {!children && <Route component={() => <p>404</p>} />}
				{children} */}
    </Routes>
  );
};

export default AllRoutes;

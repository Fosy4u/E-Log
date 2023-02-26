import React, { StrictMode } from "react";
import { BrowserRouter } from "react-router-dom";
import "./app/style/global.css";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import 'bootstrap/dist/css/bootstrap.min.css';
import { CssBaseline } from "@mui/material";
import { SettingsProvider } from "./app/contexts/SettingsContext";
import AuthProvider from "./app/contexts/AuthProvider";

import ToastContainer from "./app/features/toast/ToastContainer";
import DisplayTopSideBar from "./app/layout/displayControl/DisplayTopSideBar";

import AllRoutes from "./app/routing/AllRoutes";
import routes from "./app/routing/routes";

const theme = createTheme({
  palette: {
    primary: {
      main: "#F15A29",
    },
    secondary: {
      main: "#4D148c",
    },
  },
  
});

function App() {
  return (
    
    <StrictMode>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <AuthProvider>
            <SettingsProvider>
              <DisplayTopSideBar>
                <AllRoutes routes={routes} />
              </DisplayTopSideBar>
              <ToastContainer />
            </SettingsProvider>
          </AuthProvider>
        </ThemeProvider>
      </BrowserRouter>
    </StrictMode>
  );
}

export default App;

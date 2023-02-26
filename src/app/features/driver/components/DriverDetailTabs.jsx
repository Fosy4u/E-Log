import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import { useState } from "react";
import { Box } from "@mui/system";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import Drawer from "@mui/material/Drawer";
import {
  Avatar,
  Chip,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Stack,
  Tab,
  Tabs,
  useMediaQuery,
} from "@mui/material";
import { blue, green, red } from "@mui/material/colors";
import { isDesktop } from "react-device-detect";
import { Link, useParams } from "react-router-dom";
import RestoreAndDeleteDriverModal from "./RestoreAndDeleteDriverModal";
import DriverSummary from "./DriverSummary";
import Banner from "../../../utils/Banner";
import { Small } from "../../../components/Typography";
import organisationsApi from "../../../services/organisationsApi.slice";
import AccessibleIcon from "@mui/icons-material/Accessible";
import Loader from "../../../utils/Loader";
import { useSelector } from "react-redux";
import { globalSelectors } from "../../../global/global.slice";

const drawerWidth = 240;

export default function DriverDetailTabs({ driver }) {
  const matches = useMediaQuery("(min-width:600px)");
  const currentUser = useSelector(globalSelectors.selectCurrentUser);
  const { organisationId } = useParams();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [value, setValue] = useState("Summary");
  const [showBanner, setShowBanner] = useState(false);
  const [error, setError] = useState();

  const [activateDriver, activateDriverStatus] =
    organisationsApi.useActivateDriverMutation();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const validate = () => {
    if (!driver?.driversLicense?.link) {
      setShowBanner(true);
      setError("Error! Please upload drivers license before activating driver");
      return false;
    }
    if (new Date() > new Date(driver?.licenseExpiryDate)) {
      setShowBanner(true);
      setError(
        "Error! Please ensure all driver's license is not expired before activating driver"
      );
      return false;
    }
    return true;
  };

  const handleActivateTruck = async () => {
    if (!validate()) {
      return;
    }

    const payload = {
      activate: driver?.active ? false : true,
      _id: driver._id,
      userId: currentUser._id,
    };
    activateDriver({
      payload,
    })
      .then(() => {
        setShowBanner(false);
      })

      .catch((e) => {
        console.error(e.data);
      });
  };
  const getAvatar = () => {
    if (driver.active) {
      return (
        <Avatar sx={{ bgcolor: green[500] }} aria-label="recipe">
          <AccessibleIcon />
        </Avatar>
      );
    }

    return (
      <Avatar sx={{ bgcolor: red[900] }} aria-label="recipe">
        <AccessibleIcon />
      </Avatar>
    );
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        <span>
          {driver?.firstName} {driver?.LastName}
        </span>
      </Typography>
      <Divider />
      <List>
        <ListItem disablePadding>
          <Link
            to={`/e-log/${organisationId}/driver/edit/${driver._id}`}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <ListItemButton sx={{ textAlign: "center" }}>
              <ListItemText primary="edit" />
            </ListItemButton>
          </Link>
          <ListItemButton sx={{ textAlign: "center" }}>
            <ListItemText primary="activate" />
          </ListItemButton>
          <RestoreAndDeleteDriverModal
            selectedDrivers={[driver]}
            setSelectedDrivers={(e) => console.log(e)}
            mode="delete"
          />
        </ListItem>

        <ListItem disablePadding>
          <ListItemButton sx={{ textAlign: "center" }}>
            <ListItemText>
              {driver.active ? "Deactivate" : "Activate"}
            </ListItemText>
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );
  return (
    <div
      className="d-flex flex-column m-2"
      style={{ backgroundColor: "#f2f2f2" }}
    >
      <CssBaseline />
      <div
        style={{
          // height: "13vh",
          backgroundColor: "#E0E0E0",
          width: "100%",
          color: "black",
        }}
      >
        <Toolbar className="d-flex flex-column">
          <div className="d-flex justify-content-between w-100">
            <span className="d-flex justify-content-between w-100">
              <Typography
                variant="h6"
                component="div"
                sx={{ flexGrow: 1 }}
                className="mt-2"
              >
                {driver && (
                  <span className="d-flex">
                    {getAvatar()}
                    <span className="ms-1">
                      {driver?.firstName + " " + driver?.lastName}
                    </span>
                  </span>
                )}
              </Typography>
              {error && showBanner && (
                <div className="w-75 d-flex text-center justify-content-center ">
                  <Banner
                    show={showBanner}
                    severity={"error"}
                    handleClose={() => setShowBanner(false)}
                  >
                    <Small>{error}</Small>
                  </Banner>
                </div>
              )}
              <IconButton
                color="primary"
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
                sx={{ display: { sm: "none" } }}
              >
                <Avatar sx={{ bgcolor: blue[500] }}>
                  <MoreHorizIcon />
                </Avatar>
              </IconButton>
            </span>
            <Box sx={{ display: { xs: "none", sm: "flex" } }}>
              <Stack direction="row" spacing={1} className="mt-2">
                <RestoreAndDeleteDriverModal
                  selectedDrivers={[driver]}
                  setSelectedDrivers={(e) => console.log(e)}
                  mode="delete"
                />
                <Link
                  to={`/e-log/${organisationId}/driver/edit/${driver._id}`}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <Chip
                    color="primary"
                    className="btn"
                    variant="outlined"
                    label="Edit"
                    size="small"
                    onClick={() => console.log("edit")}
                    style={{ width: "6rem" }}
                  />
                </Link>
                <Chip
                  color="primary"
                  className="btn"
                  onClick={() => handleActivateTruck()}
                  label={driver.active ? "Deactivate" : "Activate"}
                  size="small"
                  variant="outlined"
                  style={{ width: "6rem" }}
                />
              </Stack>
            </Box>
          </div>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs
              scrollButtons
              allowScrollButtonsMobile
              variant="scrollable"
              value={value}
              onChange={handleChange}
            >
              <Tab label="Summary" value="Summary" />
              <Tab label="Analytics" value={"Analytics"} />
            </Tabs>
          </Box>
        </Toolbar>
      </div>
      <Loader showLoading={activateDriverStatus?.isLoading} />
      <Box component="nav">
        <Drawer
          //  container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </Box>

      <Container>
        <Box
          sx={{
            my: 2,
            width: "100%",
            bgcolor: "background.paper",
            // height: isDesktop ? "58vh" : "72vh",
            overflow: "scroll",
          }}
          className="d-flex "
        >
          {value === "Summary" && driver?._id && (
            <DriverSummary driver={driver} />
          )}

          {value === "Analytics" && driver?._id && <p>Documents</p>}
        </Box>
      </Container>
    </div>
  );
}

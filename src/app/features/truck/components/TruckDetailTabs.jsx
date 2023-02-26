import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import { useState } from "react";
import { Box } from "@mui/system";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import Drawer from "@mui/material/Drawer";
import Banner from "../../../utils/Banner";
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
import TruckSummary from "./TruckSummary";
import RestoreAndDeleteTruckModal from "./RestoreAndDeleteTruckModal";
import { Link, useParams } from "react-router-dom";
import organisationsApi from "../../../services/organisationsApi.slice";
import Loader from "../../../utils/Loader";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import { Small } from "../../../components/Typography";

const drawerWidth = 240;

export default function TruckDetailTabs({ truck }) {
  const matches = useMediaQuery("(min-width:600px)");
  const { organisationId } = useParams();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [value, setValue] = useState("Summary");
  const [showBanner, setShowBanner] = useState(false);
  const [error, setError] = useState();

  const [activateTruck, activateTruckStatus] =
    organisationsApi.useActivateTruckMutation();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const validate = () => {
    if (
      !truck?.carDocs?.proofOfOwnership?.imageUrl?.link ||
      !truck?.carDocs?.proofOfInsurance?.imageUrl?.link ||
      !truck?.carDocs?.roadWorthyNess?.imageUrl?.link ||
      !truck?.carDocs?.vehicleLicense?.imageUrl?.link
    ) {
      setShowBanner(true);
      setError("Error! Please upload all documents before activating truck");
      return false;
    }

    if (
      new Date() >
        new Date(truck?.carDocs?.proofOfInsurance?.imageUrl?.expiryDate) ||
      new Date() >
        new Date(truck?.carDocs?.roadWorthyNess?.imageUrl?.expiryDate) ||
      new Date() >
        new Date(truck?.carDocs?.vehicleLicense?.imageUrl?.expiryDate) ||
      new Date() >
        new Date(truck?.carDocs?.proofOfOwnership?.imageUrl?.expiryDate)
    ) {
      setShowBanner(true);
      setError(
        "Error! Please ensure all documents are not expired before activating truck"
      );
      return false;
    }
    return true;
  };

  const handleActivateTruck = async () => {
    if (!validate()) {
      setTimeout(() => {
        setShowBanner(false);
        setError("");
      }, 5000);
      return;
    }

    const payload = {
      activate: truck?.active ? false : true,
      truckId: truck._id,
    };
    activateTruck({
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
    if (truck.active) {
      return (
        <Avatar sx={{ bgcolor: green[500] }} aria-label="recipe">
          <LocalShippingIcon />{" "}
        </Avatar>
      );
    }

    return (
      <Avatar sx={{ bgcolor: red[900] }} aria-label="recipe">
        <LocalShippingIcon />
      </Avatar>
    );
  };
  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        <span>
          {truck?.manufacturer} {truck?.model}-{truck?.regNo}
        </span>
      </Typography>
      <Divider />
      <List>
        <ListItem disablePadding>
          <Link
            to={`/e-log/${organisationId}/truck/edit/${truck._id}`}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <ListItemButton sx={{ textAlign: "center" }}>
              <ListItemText primary="edit" />
            </ListItemButton>
          </Link>
          <ListItemButton sx={{ textAlign: "center" }}>
            <ListItemText primary="activate" />
          </ListItemButton>
          <RestoreAndDeleteTruckModal
            selectedTrucks={[truck]}
            setSelectedTrucks={(e) => console.log(e)}
            mode="delete"
          />
        </ListItem>

        <ListItem disablePadding>
          <ListItemButton sx={{ textAlign: "center" }}>
            <ListItemText>
              {truck.active ? "Deactivate" : "Activate"}
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
                {truck && (
                  <span className="d-flex">
                    {" "}
                    {getAvatar()}
                    <span className="ms-1">
                      {truck?.manufacturer + "-" + truck?.model}-{truck?.regNo}{" "}
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
                <RestoreAndDeleteTruckModal
                  selectedTrucks={[truck]}
                  setSelectedTrucks={(e) => console.log(e)}
                  mode="delete"
                />
                <Link
                  to={`/e-log/${organisationId}/truck/edit/${truck._id}`}
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
                  label={truck.active ? "Deactivate" : "Activate"}
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
              <Tab label="Transactions" value={"Transactions"} />
              {matches && <Tab label="Comments" value="Comments" />}
            </Tabs>
          </Box>
        </Toolbar>
      </div>
      <Loader showLoading={activateTruckStatus?.isLoading} />
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
          {value === "Summary" && truck?._id && <TruckSummary truck={truck} />}
          {value === "Transactions" && truck?._id && <p>Transactions</p>}
          {value === "Analytics" && truck?._id && <p>Documents</p>}

          {value === "Comments" && truck?._id && <p>Comments</p>}
        </Box>
      </Container>
    </div>
  );
}

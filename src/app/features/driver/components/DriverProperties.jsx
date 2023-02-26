import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useState } from "react";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import HomeIcon from "@mui/icons-material/Home";
import DialpadIcon from "@mui/icons-material/Dialpad";
import PermContactCalendarIcon from "@mui/icons-material/PermContactCalendar";
import CallIcon from "@mui/icons-material/Call";
import SignalWifiStatusbar4BarIcon from "@mui/icons-material/SignalWifiStatusbar4Bar";

import {
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Paper,
} from "@mui/material";
import displayDay from "../../../utils/displayDay";
import { Small } from "../../../components/Typography";
import DriverDocsImage from "./DriverDocsImage";
import AssignTruckDrivers from "../../truck/components/AssignTruckDrivers";

export default function DriverProperties({ driver }) {
  const [expanded, setExpanded] = useState("false");

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <div>
      <Paper>
        <Accordion
          expanded={expanded === "features"}
          onChange={handleChange("features")}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1bh-content"
            id="panel1bh-header"
          >
            <Typography
              sx={{ width: "33%", flexShrink: 0 }}
              className="primaryBrandColor"
            >
              Bio-Data
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <List
              dense={true}
              style={{ backgroundColor: "rgba(0, 5, 145, 0.09)" }}
            >
              <ListItem
                secondaryAction={
                  <ListItemText
                    primary={
                      driver?.firstName + " " + driver?.lastName ||
                      "not provided"
                    }
                  />
                }
              >
                <ListItemAvatar>
                  <Avatar>
                    <PermContactCalendarIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary="Name" />
              </ListItem>

              <ListItem
                secondaryAction={
                  <ListItemText primary={driver?.address || "not provided"} />
                }
              >
                <ListItemAvatar>
                  <Avatar>
                    <HomeIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary="Address" />
              </ListItem>
              <ListItem
                secondaryAction={
                  <ListItemText primary={driver?.phoneNo || "not provided"} />
                }
              >
                <ListItemAvatar>
                  <Avatar>
                    <CallIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary="Phone" />
              </ListItem>
              <ListItem
                secondaryAction={
                  <ListItemText primary={driver?.licenseNo || "not provided"} />
                }
              >
                <ListItemAvatar>
                  <Avatar>
                    <DialpadIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary="License No" />
              </ListItem>
              <ListItem
                secondaryAction={
                  <ListItemText
                    primary={
                      displayDay(driver?.licenseExpiryDate) || "not provided"
                    }
                  />
                }
              >
                <ListItemAvatar>
                  <Avatar>
                    <CalendarMonthIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary="License Expiry Date" />
              </ListItem>
              <ListItem
                secondaryAction={
                  <ListItemText primary={driver?.status || "not provided"} />
                }
              >
                <ListItemAvatar>
                  <Avatar>
                    <SignalWifiStatusbar4BarIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary="Status" />
              </ListItem>
            </List>
          </AccordionDetails>
        </Accordion>
      </Paper>
      <Paper className="mt-2">
        <Accordion
          expanded={expanded === "licenseDocument"}
          onChange={handleChange("licenseDocument")}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1bh-content"
            id="panel1bh-header"
          >
            <Typography
              sx={{ width: "33%", flexShrink: 0 }}
              className="primaryBrandColor"
            >
              Document
            </Typography>
            <Typography
              sx={{ color: "text.secondary" }}
              className="d-flex flex-column"
            >
              <span>Driving License </span>
              <Small
                className={
                  new Date() > new Date(driver?.licenseExpiryDate)
                    ? "text-danger"
                    : "text-success"
                }
              >
                {driver?.licenseExpiryDate &&
                  `(${
                    new Date() > new Date(driver?.licenseExpiryDate)
                      ? "expired"
                      : "expires"
                  } on ${displayDay(driver?.licenseExpiryDate)})`}
              </Small>
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <div
              className="d-flex justify-content-center align-items-center w-100"
              style={{ backgroundColor: "rgba(0, 5, 145, 0.09)" }}
            >
              <DriverDocsImage
                image={driver?.driversLicense?.link}
                title="Driving License"
              />
            </div>
          </AccordionDetails>
        </Accordion>
      </Paper>
      <Paper className="mt-2">
        <Accordion
          expanded={expanded === "assignedTruck"}
          onChange={handleChange("assignedTruck")}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1bh-content"
            id="panel1bh-header"
          >
            <Typography
              sx={{ width: "33%", flexShrink: 0 }}
              className="primaryBrandColor"
            >
              Truck
            </Typography>
            <Typography
              sx={{ color: "text.secondary" }}
              className="d-flex flex-column"
            >
              <span>Assigned Truck </span>
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <div
              className="d-flex justify-content-center align-items-center w-100"
              style={{ backgroundColor: "rgba(0, 5, 145, 0.09)" }}
            >
              <AssignTruckDrivers driver={driver} />
            </div>
          </AccordionDetails>
        </Accordion>
      </Paper>
    </div>
  );
}

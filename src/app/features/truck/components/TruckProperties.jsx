import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useState } from "react";
import FactoryIcon from "@mui/icons-material/Factory";
import ModelTrainingIcon from "@mui/icons-material/ModelTraining";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import MergeTypeIcon from "@mui/icons-material/MergeType";
import LuggageIcon from "@mui/icons-material/Luggage";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import DialpadIcon from "@mui/icons-material/Dialpad";
import AttractionsIcon from "@mui/icons-material/Attractions";

import {
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Paper,
} from "@mui/material";
import TruckDocsImage from "./TruckDocsImage";
import displayDay from "../../../utils/displayDay";
import { Small } from "../../../components/Typography";
import AssignTruckDrivers from "./AssignTruckDrivers";
import { useSelector } from "react-redux";
import { globalSelectors } from "../../../global/global.slice";
import AssignTruckPartner from "./AssignTruckPartner";
import Banner from "../../../utils/Banner";

export default function TruckProperties({ truck }) {
  const organisation = useSelector(globalSelectors.selectOrganisation);
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
              Features
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
                    primary={truck?.manufacturer || "not provided"}
                  />
                }
              >
                <ListItemAvatar>
                  <Avatar>
                    <FactoryIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary="Manufacturer" />
              </ListItem>
              <ListItem
                secondaryAction={
                  <ListItemText primary={truck?.model || "not provided"} />
                }
              >
                <ListItemAvatar>
                  <Avatar>
                    <ModelTrainingIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary="Model" />
              </ListItem>
              <ListItem
                secondaryAction={
                  <ListItemText
                    primary={truck?.manufactureYear || "not provided"}
                  />
                }
              >
                <ListItemAvatar>
                  <Avatar>
                    <CalendarMonthIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary="Year" />
              </ListItem>
              <ListItem
                secondaryAction={
                  <ListItemText primary={truck?.truckType || "not provided"} />
                }
              >
                <ListItemAvatar>
                  <Avatar>
                    <MergeTypeIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary="Type" />
              </ListItem>
              <ListItem
                secondaryAction={
                  <ListItemText
                    primary={
                      truck?.maxLoad
                        ? truck.maxLoad + " tonnes"
                        : "not provided"
                    }
                  />
                }
              >
                <ListItemAvatar>
                  <Avatar>
                    <LuggageIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary="Max Load" />
              </ListItem>
              <ListItem
                secondaryAction={
                  <ListItemText primary={truck?.regNo || "not provided"} />
                }
              >
                <ListItemAvatar>
                  <Avatar>
                    <AppRegistrationIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary="Reg No" />
              </ListItem>
              <ListItem
                secondaryAction={
                  <ListItemText primary={truck?.chasisNo || "not provided"} />
                }
              >
                <ListItemAvatar>
                  <Avatar>
                    <DialpadIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary="Chasis No" />
              </ListItem>

              <ListItem
                secondaryAction={
                  <ListItemText
                    primary={truck?.active ? "activated" : "de-activated"}
                  />
                }
              >
                <ListItemAvatar>
                  <Avatar>
                    <AttractionsIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary="Mode" />
              </ListItem>
            </List>
          </AccordionDetails>
        </Accordion>
      </Paper>
      <Paper className="mt-2">
        <Accordion
          expanded={expanded === "proofOfOwnership"}
          onChange={handleChange("proofOfOwnership")}
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
              <span>Proof of ownership </span>
              <Small
                className={
                  new Date() >
                  new Date(
                    truck?.carDocs?.proofOfOwnership?.imageUrl?.expiryDate
                  )
                    ? "text-danger"
                    : "text-success"
                }
              >
                {truck?.carDocs?.proofOfOwnership?.imageUrl?.expiryDate &&
                  `(${
                    new Date() >
                    new Date(
                      truck?.carDocs?.proofOfOwnership?.imageUrl?.expiryDate
                    )
                      ? "expired"
                      : "expires"
                  } on ${displayDay(
                    truck?.carDocs?.proofOfOwnership?.imageUrl?.expiryDate
                  )})`}
              </Small>
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <div
              className="d-flex justify-content-center align-items-center w-100"
              style={{ backgroundColor: "rgba(0, 5, 145, 0.09)" }}
            >
              <TruckDocsImage
                image={truck?.carDocs?.proofOfOwnership?.imageUrl?.link}
                title="Proof of ownership"
                value="proofOfOwnership"
              />
            </div>
          </AccordionDetails>
        </Accordion>
      </Paper>
      <Paper className="mt-2">
        <Accordion
          expanded={expanded === "proofOfInsurance"}
          onChange={handleChange("proofOfInsurance")}
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
              <span>Proof of insurance </span>

              <Small
                className={
                  new Date() >
                  new Date(
                    truck?.carDocs?.proofOfInsurance?.imageUrl?.expiryDate
                  )
                    ? "text-danger"
                    : "text-success"
                }
              >
                {truck?.carDocs?.proofOfInsurance?.imageUrl?.expiryDate &&
                  `(${
                    new Date() >
                    new Date(
                      truck?.carDocs?.proofOfInsurance?.imageUrl?.expiryDate
                    )
                      ? "expired"
                      : "expires"
                  } on ${displayDay(
                    truck?.carDocs?.proofOfInsurance?.imageUrl?.expiryDate
                  )})`}
              </Small>
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <div
              className="d-flex justify-content-center align-items-center w-100"
              style={{ backgroundColor: "rgba(0, 5, 145, 0.09)" }}
            >
              <TruckDocsImage
                image={truck?.carDocs?.proofOfInsurance?.imageUrl?.link}
                title="Proof of insurance"
                value="proofOfInsurance"
              />
            </div>
          </AccordionDetails>
        </Accordion>
      </Paper>
      <Paper className="mt-2">
        <Accordion
          expanded={expanded === "vehicleLicense"}
          onChange={handleChange("vehicleLicense")}
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
              <span>Proof of Vehicle license </span>

              <Small
                className={
                  new Date() >
                  new Date(truck?.carDocs?.vehicleLicense?.imageUrl?.expiryDate)
                    ? "text-danger"
                    : "text-success"
                }
              >
                {truck?.carDocs?.vehicleLicense?.imageUrl?.expiryDate &&
                  `(${
                    new Date() >
                    new Date(
                      truck?.carDocs?.vehicleLicense?.imageUrl?.expiryDate
                    )
                      ? "expired"
                      : "expires"
                  } on ${displayDay(
                    truck?.carDocs?.vehicleLicense?.imageUrl?.expiryDate
                  )})`}
              </Small>
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <div
              className="d-flex justify-content-center align-items-center w-100"
              style={{ backgroundColor: "rgba(0, 5, 145, 0.09)" }}
            >
              <TruckDocsImage
                image={truck?.carDocs?.vehicleLicense?.imageUrl?.link}
                title="Proof of vehicle license"
                value="vehicleLicense"
              />
            </div>
          </AccordionDetails>
        </Accordion>
      </Paper>
      <Paper className="mt-2">
        <Accordion
          expanded={expanded === "roadWorthyNess"}
          onChange={handleChange("roadWorthyNess")}
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
              <span>Road worthiness certificate </span>

              <Small
                className={
                  new Date() >
                  new Date(truck?.carDocs?.roadWorthyNess?.imageUrl?.expiryDate)
                    ? "text-danger"
                    : "text-success"
                }
              >
                {truck?.carDocs?.roadWorthyNess?.imageUrl?.expiryDate &&
                  `(${
                    new Date() >
                    new Date(
                      truck?.carDocs?.roadWorthyNess?.imageUrl?.expiryDate
                    )
                      ? "expired"
                      : "expires"
                  } on ${displayDay(
                    truck?.carDocs?.roadWorthyNess?.imageUrl?.expiryDate
                  )})`}
              </Small>
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <div
              className="d-flex justify-content-center align-items-center w-100"
              style={{ backgroundColor: "rgba(0, 5, 145, 0.09)" }}
            >
              <TruckDocsImage
                image={truck?.carDocs?.roadWorthyNess?.imageUrl?.link}
                title="Proof of road worthiness"
                value="roadWorthyNess"
              />
            </div>
          </AccordionDetails>
        </Accordion>
      </Paper>
      <Paper className="mt-2">
        <Accordion
          expanded={expanded === "driver"}
          onChange={handleChange("driver")}
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
              Assigned Driver
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <AssignTruckDrivers truck={truck} />
          </AccordionDetails>
        </Accordion>
      </Paper>

      <Paper className="mt-2">
        <Accordion
          expanded={expanded === "partner"}
          onChange={handleChange("partner")}
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
              Truck Ownership
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            {truck?.ownership === "Partner" && (
              <AssignTruckPartner truck={truck} />
            )}
            {truck?.ownership !== "Partner" && (
              <div className="w-100 d-flex text-center justify-content-center">
                <Banner show={truck?.ownership !== "Partner"}>
                  <p>
                    <Small>Owned by {organisation?.name || "company"}</Small>
                  </p>
                </Banner>
              </div>
            )}
          </AccordionDetails>
        </Accordion>
      </Paper>
    </div>
  );
}

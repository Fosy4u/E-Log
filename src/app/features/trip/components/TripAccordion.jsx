import { styled } from "@mui/material/styles";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import TripCustomerInfo from "./TripCustomerInfo";
import PartnerTruckList from "./PartnerTruckList";
import PartnerRemarks from "./PartnerRemarks";
import PartnerTimelineList from "./PartnerTimelineList";
import { useParams } from "react-router-dom";
import { Avatar, ListItemAvatar, useMediaQuery } from "@mui/material";
import FitScreenIcon from "@mui/icons-material/FitScreen";
import UnfoldLessDoubleIcon from "@mui/icons-material/UnfoldLessDouble";
import TripInfo from "./TripInfo";
import VendorContactInfor from "../../vendorAgent/components/VendorContactInfo";

const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  "&:not(:last-child)": {
    borderBottom: 0,
  },
  "&:before": {
    display: "none",
  },
}));

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: "0.9rem" }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === "dark"
      ? "rgba(255, 255, 255, .05)"
      : "rgba(0, 0, 0, .03)",
  flexDirection: "row-reverse",
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(90deg)",
  },
  "& .MuiAccordionSummary-content": {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: "1px solid rgba(0, 0, 0, .125)",
}));

export default function TripAccordion({ trip, customer, vendor }) {
  const { tripId } = useParams();
  const matches = useMediaQuery("(min-width:600px)");
  const [expandChild, setExpandChild] = useState();
  const [expanded, setExpanded] = useState(tripId ? "analytics" : false);

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  return (
    <div>
      <Accordion
        expanded={expanded === "tripInfo"}
        onChange={handleChange("tripInfo")}
      >
        <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
          <Typography>Trip Info</Typography>
        </AccordionSummary>
        <AccordionDetails className="partnerAccordionDetails">
          <span className="d-flex justify-content-center">
            <TripInfo
              trip={trip}
              expandChild={expandChild === "tripInfo" ? true : false}
            />
            {matches && (
              <ListItemAvatar className="ms-2">
                <Avatar>
                  {expandChild === "tripInfo" ? (
                    <UnfoldLessDoubleIcon
                      color="primary"
                      onClick={() => setExpandChild("")}
                      fontSize="small"
                      style={{ cursor: "pointer" }}
                    />
                  ) : (
                    <FitScreenIcon
                      color="primary"
                      onClick={() => setExpandChild("tripInfo")}
                      fontSize="small"
                      style={{ cursor: "pointer" }}
                    />
                  )}
                </Avatar>
              </ListItemAvatar>
            )}
          </span>
        </AccordionDetails>
      </Accordion>
      {vendor && (
        <Accordion
          expanded={expanded === "vendorInfo"}
          onChange={handleChange("vendorInfo")}
        >
          <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
            <Typography>Trip Vendor Info</Typography>
          </AccordionSummary>
          <AccordionDetails className="partnerAccordionDetails">
            <span className="d-flex justify-content-center">
              <VendorContactInfor
                vendor={vendor}
                expandChild={expandChild === "vendorInfo" ? true : false}
              />
              {matches && (
                <ListItemAvatar className="ms-2">
                  <Avatar>
                    {expandChild === "vendorInfo" ? (
                      <UnfoldLessDoubleIcon
                        color="primary"
                        onClick={() => setExpandChild("")}
                        fontSize="small"
                        style={{ cursor: "pointer" }}
                      />
                    ) : (
                      <FitScreenIcon
                        color="primary"
                        onClick={() => setExpandChild("vendorInfo")}
                        fontSize="small"
                        style={{ cursor: "pointer" }}
                      />
                    )}
                  </Avatar>
                </ListItemAvatar>
              )}
            </span>
          </AccordionDetails>
        </Accordion>
      )}

      <Accordion
        expanded={expanded === "customerInfo"}
        onChange={handleChange("customerInfo")}
      >
        <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
          <Typography>Trip Customer Info</Typography>
        </AccordionSummary>
        <AccordionDetails className="partnerAccordionDetails">
          <span className="d-flex justify-content-center">
            <TripCustomerInfo
              customer={customer}
              expandChild={expandChild === "customerInfo" ? true : false}
            />
            {matches && (
              <ListItemAvatar className="ms-2">
                <Avatar>
                  {expandChild === "customerInfo" ? (
                    <UnfoldLessDoubleIcon
                      color="primary"
                      onClick={() => setExpandChild("")}
                      fontSize="small"
                      style={{ cursor: "pointer" }}
                    />
                  ) : (
                    <FitScreenIcon
                      color="primary"
                      onClick={() => setExpandChild("customerInfo")}
                      fontSize="small"
                      style={{ cursor: "pointer" }}
                    />
                  )}
                </Avatar>
              </ListItemAvatar>
            )}
          </span>
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded === "analytics"}
        onChange={handleChange("analytics")}
      >
        <AccordionSummary aria-controls="panel2d-content" id="panel2d-header">
          <Typography>Analytics</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget. Lorem ipsum
            dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada
            lacus ex, sit amet blandit leo lobortis eget.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded === "trucks"}
        onChange={handleChange("trucks")}
      >
        <AccordionSummary aria-controls="panel3d-content" id="panel3d-header">
          <Typography>Trucks</Typography>
        </AccordionSummary>
        <AccordionDetails className="partnerAccordionDetails">
          <span className="d-flex justify-content-center">
            <PartnerTruckList
              tripId={trip?._id}
              expandChild={expandChild === "truck" ? true : false}
            />
            {matches && (
              <ListItemAvatar className="ms-2">
                <Avatar>
                  {expandChild === "truck" ? (
                    <UnfoldLessDoubleIcon
                      color="primary"
                      onClick={() => setExpandChild("")}
                      fontSize="small"
                      style={{ cursor: "pointer" }}
                    />
                  ) : (
                    <FitScreenIcon
                      color="primary"
                      onClick={() => setExpandChild("truck")}
                      fontSize="small"
                      style={{ cursor: "pointer" }}
                    />
                  )}
                </Avatar>
              </ListItemAvatar>
            )}
          </span>
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded === "remarks"}
        onChange={handleChange("remarks")}
      >
        <AccordionSummary aria-controls="panel4d-content" id="panel4d-header">
          <Typography>Remarks</Typography>
        </AccordionSummary>
        <AccordionDetails className="partnerAccordionDetails ">
          <span className="d-flex justify-content-center">
            <PartnerRemarks trip={trip} />
          </span>
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded === "timeline"}
        onChange={handleChange("timeline")}
      >
        <AccordionSummary aria-controls="panel5d-content" id="panel5d-header">
          <Typography>Timeline</Typography>
        </AccordionSummary>
        <AccordionDetails
          className=" d-flex justify-content-center"
          style={{ backgroundColor: "#222A45" }}
        >
          <PartnerTimelineList trip={trip} />
        </AccordionDetails>
      </Accordion>
    </div>
  );
}

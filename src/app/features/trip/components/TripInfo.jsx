import {
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  useMediaQuery,
} from "@mui/material";
import React from "react";
import HomeIcon from "@mui/icons-material/Home";
import SignpostIcon from "@mui/icons-material/Signpost";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import displayDay from "../../../utils/displayDay";
import ScaleIcon from "@mui/icons-material/Scale";
import PaymentsIcon from "@mui/icons-material/Payments";
import LocalGasStationIcon from "@mui/icons-material/LocalGasStation";
import { numberWithCommas } from "../../../utils/utils";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";
import SignalWifiStatusbar4BarIcon from "@mui/icons-material/SignalWifiStatusbar4Bar";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import SyncAltIcon from "@mui/icons-material/SyncAlt";
import displayDate from "../../../utils/displayDate";
import AddCircleIcon from "@mui/icons-material/AddCircle";

const TripInfo = ({ trip, expandChild }) => {
  const matches = useMediaQuery("(min-width:600px)");

  const getSecondaryActionText = (text) => {
    if (!matches) {
      if (text) {
        return text;
      }
      return "not provided";
    }
    return null;
  };

  const getHeight = () => {
    if (expandChild) {
      return "100%";
    }

    if (matches) {
      return "25rem";
    }
    return "90%";
  };
  return (
    <List
      dense={true}
      className={
        matches ? "bg-white text-dark  w-75 p-2 " : "bg-white text-dark  w-100 "
      }
      style={{
        borderRadius: "10px",
        boxShadow: "0 0 10px #000000",
        height: getHeight(),
        overflowY: "scroll",
      }}
    >
      <ListItem
        secondaryAction={
          matches && (
            <ListItemText
              primary={
                (trip?.createdAt && displayDate(trip?.createdAt)) ||
                "not provided"
              }
            />
          )
        }
      >
        <ListItemAvatar>
          <Avatar>
            <AddCircleIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText
          primary="Created At"
          secondary={
            trip?.createdAt &&
            getSecondaryActionText(displayDate(trip?.createdAt))
          }
        />
      </ListItem>
      <ListItem
        secondaryAction={
          matches && (
            <ListItemText
              primary={trip?.isVendorRequested ? "Vendor" : "Customer"}
            />
          )
        }
      >
        <ListItemAvatar>
          <Avatar>
            <LocalOfferIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText
          primary="Requester"
          secondary={getSecondaryActionText(
            trip?.isVendorRequested ? "Vendor" : "Customer"
          )}
        />
      </ListItem>
      <ListItem
        secondaryAction={
          matches && <ListItemText primary={trip?.status || "not provided"} />
        }
      >
        <ListItemAvatar>
          <Avatar>
            <SignalWifiStatusbar4BarIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText
          primary="Status"
          secondary={getSecondaryActionText(trip?.status)}
        />
      </ListItem>
      <ListItem
        secondaryAction={
          matches && (
            <ListItemText primary={trip?.productName || "not provided"} />
          )
        }
      >
        <ListItemAvatar>
          <Avatar>
            <ShoppingCartCheckoutIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText
          primary="Product"
          secondary={getSecondaryActionText(trip?.productName)}
        />
      </ListItem>
      <ListItem
        secondaryAction={
          matches && (
            <ListItemText primary={trip?.truckType || "not provided"} />
          )
        }
      >
        <ListItemAvatar>
          <Avatar>
            <LocalShippingIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText
          primary="Truck Type"
          secondary={getSecondaryActionText(trip?.truckType)}
        />
      </ListItem>
      <ListItem
        secondaryAction={
          matches && <ListItemText primary={trip?.maxLoad || "not provided"} />
        }
      >
        <ListItemAvatar>
          <Avatar>
            <ScaleIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText
          primary="Max Load (tons)"
          secondary={getSecondaryActionText(trip?.maxLoad)}
        />
      </ListItem>

      <ListItem
        secondaryAction={
          matches && (
            <ListItemText primary={trip?.dropOffAddress || "not provided"} />
          )
        }
      >
        <ListItemAvatar>
          <Avatar>
            <SignpostIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText
          primary="Delivery Address"
          secondary={getSecondaryActionText(trip?.dropOffAddress)}
        />
      </ListItem>
      <ListItem
        secondaryAction={
          matches && (
            <ListItemText primary={trip?.pickupAddress || "not provided"} />
          )
        }
      >
        <ListItemAvatar>
          <Avatar>
            <HomeIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText
          primary="Pick-up Address"
          secondary={getSecondaryActionText(trip?.pickupAddress)}
        />
      </ListItem>
      <ListItem
        secondaryAction={
          matches && (
            <ListItemText
              primary={
                (trip?.pickupDate && displayDay(trip?.pickupDate)) ||
                "not provided"
              }
            />
          )
        }
      >
        <ListItemAvatar>
          <Avatar>
            <CalendarMonthIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText
          primary="Pick-Up Date"
          secondary={
            trip?.pickupDate &&
            getSecondaryActionText(displayDay(trip?.pickupDate))
          }
        />
      </ListItem>
      <ListItem
        secondaryAction={
          matches && (
            <ListItemText
              primary={
                (trip?.estimatedDropOffDate &&
                  displayDay(trip?.estimatedDropOffDate)) ||
                "not provided"
              }
            />
          )
        }
      >
        <ListItemAvatar>
          <Avatar>
            <CalendarMonthIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText
          primary="Estimated Delivery Date"
          secondary={trip?.estimatedDropOffDate && getSecondaryActionText(
            displayDay(trip?.estimatedDropOffDate)
          )}
        />
      </ListItem>
      <ListItem
        secondaryAction={
          matches && (
            <ListItemText
              primary={numberWithCommas(trip?.price) || "not provided"}
            />
          )
        }
      >
        <ListItemAvatar>
          <Avatar>
            <PaymentsIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText
          primary="Price"
          secondary={getSecondaryActionText(numberWithCommas(trip?.price))}
        />
      </ListItem>
      <ListItem
        secondaryAction={
          matches && (
            <ListItemText
              primary={
                numberWithCommas(trip?.estimatedFuelCost) || "not provided"
              }
            />
          )
        }
      >
        <ListItemAvatar>
          <Avatar>
            <PaymentsIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText
          primary="Estimated Fuel Cost"
          secondary={getSecondaryActionText(
            numberWithCommas(trip?.estimatedFuelCost)
          )}
        />
      </ListItem>

      <ListItem
        secondaryAction={
          matches && (
            <ListItemText
              primary={trip?.estimatedFuelLitters || "not provided"}
            />
          )
        }
      >
        <ListItemAvatar>
          <Avatar>
            <LocalGasStationIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText
          primary="Estimated Fuel Litters"
          secondary={getSecondaryActionText(trip?.estimatedFuelLitters)}
        />
      </ListItem>

      <ListItem
        secondaryAction={
          matches && (
            <ListItemText
              primary={
                (trip?.updatedAt && displayDate(trip?.updatedAt)) ||
                "not provided"
              }
            />
          )
        }
      >
        <ListItemAvatar>
          <Avatar>
            <SyncAltIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText
          primary="Last Updated"
          secondary={
            trip?.updatedAt &&
            getSecondaryActionText(displayDate(trip?.updatedAt))
          }
        />
      </ListItem>
    </List>
  );
};

export default TripInfo;

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
import PermContactCalendarIcon from "@mui/icons-material/PermContactCalendar";
import CallIcon from "@mui/icons-material/Call";
import BusinessIcon from "@mui/icons-material/Business";
import EmailIcon from "@mui/icons-material/Email";
import SignpostIcon from "@mui/icons-material/Signpost";
import MarkunreadMailboxIcon from "@mui/icons-material/MarkunreadMailbox";
import TwitterIcon from "@mui/icons-material/Twitter";
import FacebookIcon from "@mui/icons-material/Facebook";
import LanguageIcon from "@mui/icons-material/Language";
import InstagramIcon from "@mui/icons-material/Instagram";
import PublicIcon from "@mui/icons-material/Public";

const TripCustomerInfo = ({ customer, expandChild }) => {
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
            <ListItemText primary={customer?.companyName || "not provided"} />
          )
        }
      >
        <ListItemAvatar>
          <Avatar>
            <BusinessIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText
          primary="Company Name"
          secondary={getSecondaryActionText(customer?.companyName)}
        />
      </ListItem>
      <ListItem
        secondaryAction={
          matches && (
            <ListItemText
              primary={
                customer?.salutation +
                  " " +
                  customer?.firstName +
                  " " +
                  customer?.lastName || "not provided"
              }
            />
          )
        }
      >
        <ListItemAvatar>
          <Avatar>
            <PermContactCalendarIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText
          primary="Contact Name"
          secondary={getSecondaryActionText(
            customer?.salutation +
              " " +
              customer?.firstName +
              " " +
              customer?.lastName
          )}
        />{" "}
      </ListItem>
      <ListItem
        secondaryAction={
          matches && (
            <ListItemText primary={customer?.email || "not provided"} />
          )
        }
      >
        <ListItemAvatar>
          <Avatar>
            <EmailIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText
          primary="Email"
          secondary={getSecondaryActionText(customer?.email)}
        />
      </ListItem>
      <ListItem
        secondaryAction={
          matches && (
            <ListItemText primary={customer?.phoneNo || "not provided"} />
          )
        }
      >
        <ListItemAvatar>
          <Avatar>
            <CallIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText
          primary="Phone"
          secondary={getSecondaryActionText(customer?.phoneNo)}
        />
      </ListItem>

      <ListItem
        secondaryAction={
          matches && (
            <ListItemText primary={customer?.address || "not provided"} />
          )
        }
      >
        <ListItemAvatar>
          <Avatar>
            <HomeIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText
          primary="Address"
          secondary={getSecondaryActionText(customer?.address)}
        />
      </ListItem>
      <ListItem
        secondaryAction={
          matches && (
            <ListItemText
              primary={customer?.localGovernmentArea || "not provided"}
            />
          )
        }
      >
        <ListItemAvatar>
          <Avatar>
            <SignpostIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText
          primary="LGA"
          secondary={getSecondaryActionText(customer?.localGovernmentArea)}
        />
      </ListItem>

      <ListItem
        secondaryAction={
          matches && (
            <ListItemText primary={customer?.postCode || "not provided"} />
          )
        }
      >
        <ListItemAvatar>
          <Avatar>
            <MarkunreadMailboxIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText
          primary="PostCode / P.O.Box"
          secondary={getSecondaryActionText(customer?.postCode)}
        />
      </ListItem>

      <ListItem
        secondaryAction={
          matches && (
            <ListItemText primary={customer?.region || "not provided"} />
          )
        }
      >
        <ListItemAvatar>
          <Avatar>
            <PublicIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText
          primary="Region"
          secondary={getSecondaryActionText(customer?.region)}
        />
      </ListItem>

      <ListItem
        secondaryAction={
          matches && (
            <ListItemText primary={customer?.country || "not provided"} />
          )
        }
      >
        <ListItemAvatar>
          <Avatar>
            <HomeIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText
          primary="Country"
          secondary={getSecondaryActionText(customer?.country)}
        />
      </ListItem>
      <ListItem
        secondaryAction={
          matches && (
            <ListItemText
              primary={customer?.social?.twitter || "not provided"}
            />
          )
        }
      >
        <ListItemAvatar>
          <Avatar>
            <TwitterIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText
          primary="Twitter"
          secondary={getSecondaryActionText(customer?.social?.twitter)}
        />
      </ListItem>
      <ListItem
        secondaryAction={
          matches && (
            <ListItemText
              primary={customer?.social?.website || "not provided"}
            />
          )
        }
      >
        <ListItemAvatar>
          <Avatar>
            <LanguageIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText
          primary="Website"
          secondary={getSecondaryActionText(customer?.social?.website)}
        />
      </ListItem>
      <ListItem
        secondaryAction={
          matches && (
            <ListItemText
              primary={customer?.social?.instagram || "not provided"}
            />
          )
        }
      >
        <ListItemAvatar>
          <Avatar>
            <InstagramIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText
          primary="Instagram"
          secondary={getSecondaryActionText(customer?.social?.instagram)}
        />
      </ListItem>
      <ListItem
        secondaryAction={
          matches && (
            <ListItemText
              primary={customer?.social?.facebook || "not provided"}
            />
          )
        }
      >
        <ListItemAvatar>
          <Avatar>
            <FacebookIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText
          primary="Facebook"
          secondary={getSecondaryActionText(customer?.social?.facebook)}
        />
      </ListItem>
    </List>
  );
};

export default TripCustomerInfo;

import {
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  useMediaQuery,
} from "@mui/material";
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


const VendorContactInfor = ({ vendor, expandChild }) => {

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
    <>
      
      {vendor && (
        <List
          dense={true}
          className={
            matches
              ? "bg-white text-dark  w-75 p-2 "
              : "bg-white text-dark  w-100 "
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
                <ListItemText primary={vendor?.companyName || "not provided"} />
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
              secondary={getSecondaryActionText(vendor?.companyName)}
            />
          </ListItem>
          <ListItem
            secondaryAction={
              matches && (
                <ListItemText
                  primary={
                    vendor?.salutation +
                      " " +
                      vendor?.firstName +
                      " " +
                      vendor?.lastName || "not provided"
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
                vendor?.salutation +
                  " " +
                  vendor?.firstName +
                  " " +
                  vendor?.lastName
              )}
            />{" "}
          </ListItem>
          <ListItem
            secondaryAction={
              matches && (
                <ListItemText primary={vendor?.email || "not provided"} />
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
              secondary={getSecondaryActionText(vendor?.email)}
            />
          </ListItem>
          <ListItem
            secondaryAction={
              matches && (
                <ListItemText primary={vendor?.phoneNo || "not provided"} />
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
              secondary={getSecondaryActionText(vendor?.phoneNo)}
            />
          </ListItem>

          <ListItem
            secondaryAction={
              matches && (
                <ListItemText primary={vendor?.address || "not provided"} />
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
              secondary={getSecondaryActionText(vendor?.address)}
            />
          </ListItem>
          <ListItem
            secondaryAction={
              matches && (
                <ListItemText
                  primary={vendor?.localGovernmentArea || "not provided"}
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
              secondary={getSecondaryActionText(vendor?.localGovernmentArea)}
            />
          </ListItem>

          <ListItem
            secondaryAction={
              matches && (
                <ListItemText primary={vendor?.postCode || "not provided"} />
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
              secondary={getSecondaryActionText(vendor?.postCode)}
            />
          </ListItem>

          <ListItem
            secondaryAction={
              matches && (
                <ListItemText primary={vendor?.region || "not provided"} />
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
              secondary={getSecondaryActionText(vendor?.region)}
            />
          </ListItem>

          <ListItem
            secondaryAction={
              matches && (
                <ListItemText primary={vendor?.country || "not provided"} />
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
              secondary={getSecondaryActionText(vendor?.country)}
            />
          </ListItem>
          <ListItem
            secondaryAction={
              matches && (
                <ListItemText
                  primary={vendor?.social?.twitter || "not provided"}
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
              secondary={getSecondaryActionText(vendor?.social?.twitter)}
            />
          </ListItem>
          <ListItem
            secondaryAction={
              matches && (
                <ListItemText
                  primary={vendor?.social?.website || "not provided"}
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
              secondary={getSecondaryActionText(vendor?.social?.website)}
            />
          </ListItem>
          <ListItem
            secondaryAction={
              matches && (
                <ListItemText
                  primary={vendor?.social?.instagram || "not provided"}
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
              secondary={getSecondaryActionText(vendor?.social?.instagram)}
            />
          </ListItem>
          <ListItem
            secondaryAction={
              matches && (
                <ListItemText
                  primary={vendor?.social?.facebook || "not provided"}
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
              secondary={getSecondaryActionText(vendor?.social?.facebook)}
            />
          </ListItem>
        </List>
      )}
    </>
  );
};

export default VendorContactInfor;

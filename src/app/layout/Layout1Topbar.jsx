import {
  Alert,
  Avatar,
  Badge,
  Hidden,
  Icon,
  IconButton,
  MenuItem,
  useMediaQuery,
} from "@mui/material";
import { Box, styled, useTheme } from "@mui/system";
import { HamburgerSpin } from "react-animated-burgers";
import Logo from "../../app/images/brand1.JPG";
import useSettings from "../hooks/useSettings";
import { topBarHeight } from "../utils/constant";
import React from "react";
import { Link } from "react-router-dom";
import { Span } from "../components/Typography";
import MatxMenu from "../utils/MatxMenu";
import { themeShadows } from "../utils/themeColors";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { useSelector } from "react-redux";
import { globalSelectors } from "../global/global.slice";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import PhotoSizeSelectSmallIcon from "@mui/icons-material/PhotoSizeSelectSmall";
import Logout from "../features/auth/Logout";

const StyledIconButton = styled(IconButton)(({ theme }) => ({
  color: theme.palette.text.primary,
}));

const TopbarRoot = styled("div")(({ theme }) => ({
  top: 0,
  zIndex: 96,
  transition: "all 0.3s ease",
  boxShadow: themeShadows[8],
  height: topBarHeight,
}));

const TopbarContainer = styled(Box)(({ theme }) => ({
  padding: "8px",
  paddingLeft: 18,
  paddingRight: 20,
  height: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  background: theme.palette.primary.main,
  [theme.breakpoints.down("sm")]: {
    paddingLeft: 16,
    paddingRight: 16,
  },
  [theme.breakpoints.down("xs")]: {
    paddingLeft: 14,
    paddingRight: 16,
  },
}));

const UserMenu = styled(Box)(() => ({
  display: "flex",
  alignItems: "center",
  cursor: "pointer",
  borderRadius: 24,
  padding: 4,
  "& span": { margin: "0 8px" },
}));

const StyledItem = styled(MenuItem)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  minWidth: 185,
  "& a": {
    width: "100%",
    display: "flex",
    alignItems: "center",
    textDecoration: "none",
  },
  "& span": { marginRight: "10px", color: theme.palette.text.primary },
}));

const IconBox = styled("div")(({ theme }) => ({
  display: "inherit",
  [theme.breakpoints.down("md")]: { display: "none !important" },
}));

const Layout1Topbar = ({
  handleExitFullscreen,
  setIsFullscreen,
  isFullscreen,
  errorMessage,
}) => {
  const theme = useTheme();
  const { settings, updateSettings } = useSettings();

  const isMdScreen = useMediaQuery(theme.breakpoints.down("md"));
  const currentUser = useSelector(globalSelectors.selectCurrentUser);

  const updateSidebarMode = (sidebarSettings) => {
    updateSettings({
      layout1Settings: { leftSidebar: { ...sidebarSettings } },
    });
  };

  const handleSidebarToggle = () => {
    let { layout1Settings } = settings;
    let mode;
    if (isMdScreen) {
      mode = layout1Settings.leftSidebar.mode === "close" ? "mobile" : "close";
    } else {
      mode = layout1Settings.leftSidebar.mode === "full" ? "close" : "full";
    }
    updateSidebarMode({ mode });
  };

  return (
    <TopbarRoot>
      <TopbarContainer>
        <Box display="flex">
          <HamburgerSpin
            isActive={
              settings.layout1Settings.leftSidebar.mode === "mobile" ||
              settings.layout1Settings.leftSidebar.mode === "full"
            }
            toggleButton={handleSidebarToggle}
            buttonColor={"#F15A29"}
            barColor="white"
            buttonWidth={20}
          />

          <IconBox>
            <StyledIconButton>
              <Icon>mail_outline</Icon>
            </StyledIconButton>
            {!isFullscreen && (
              <OverlayTrigger
                placement="bottom"
                overlay={<Tooltip>{"Switch to full-screen mode"}</Tooltip>}
              >
                <StyledIconButton onClick={setIsFullscreen}>
                  <Icon>web_asset</Icon>
                </StyledIconButton>
              </OverlayTrigger>
            )}
            {isFullscreen && (
              <OverlayTrigger
                placement="bottom"
                overlay={<Tooltip>{"Exit full-screen mode"}</Tooltip>}
              >
                <StyledIconButton onClick={handleExitFullscreen}>
                  <PhotoSizeSelectSmallIcon />
                </StyledIconButton>
              </OverlayTrigger>
            )}
          </IconBox>
        </Box>
        {errorMessage &&
          alert(
            "Fullscreen is unsupported by this browser, please try another browser."
          )}
        <Box display="flex" alignItems="center">
          <IconBox>
            <StyledIconButton>
              <img width="50px" height="50px" src={Logo} alt="e-log logo" />
            </StyledIconButton>
          </IconBox>
         
          {/* <NotificationProvider>
            <NotificationBar />
            
          </NotificationProvider> */}
          <IconButton
            size="large"
            aria-label="show 17 new notifications"
            color="inherit"
          >
            <Badge badgeContent={17} color="error">
              <NotificationsIcon />
            </Badge>
          </IconButton>
          <MatxMenu
            menuButton={
              <UserMenu>
                <Hidden xsDown>
                  <Span>
                    <strong>{currentUser?.firstName}</strong>
                  </Span>
                </Hidden>
                <Avatar
                  src={
                    currentUser?.imageUrl?.link || "/assets/images/face-6.jpg"
                  }
                  sx={{ cursor: "pointer" }}
                />
              </UserMenu>
            }
          >
            <StyledItem>
              <Link to="/">
                <Icon> home </Icon>
                <Span> Home </Span>
              </Link>
            </StyledItem>

            <StyledItem>
              <Link to="/page-layouts/user-profile">
                <Icon> person </Icon>
                <Span> Profile </Span>
              </Link>
            </StyledItem>

            <StyledItem>
              <Icon> settings </Icon>
              <Span> Settings </Span>
            </StyledItem>

            <StyledItem onClick={() => console.log("logout")}>
              <Icon> power_settings_new </Icon>
              <Logout />
            </StyledItem>
          </MatxMenu>
        </Box>
      </TopbarContainer>
    </TopbarRoot>
  );
};

export default React.memo(Layout1Topbar);

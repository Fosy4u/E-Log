import Box from "@mui/material/Box";

import IconButton from "@mui/material/IconButton";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import { Link, useParams } from "react-router-dom";
import MoreIcon from "@mui/icons-material/MoreVert";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { Paper } from "@mui/material";
import { useState } from "react";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import Diversity1Icon from "@mui/icons-material/Diversity1";
import GroupRemoveIcon from "@mui/icons-material/GroupRemove";
import AddCircleIcon from "@mui/icons-material/AddCircle";

export default function CustomButtons({ view, setView }) {
  const { organisationId } = useParams();
  const customerListView = "CustomerListView";
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
  const [hover, setHover] = useState();
  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      sx={{
        display: { xs: "flex", md: "none" },
      }}
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <Link
          style={{ textDecoration: "none", color: "inherit" }}
          to={`/e-log/${organisationId}/driver/add`}
          className="d-flex"
        >
          <IconButton
             size="small"
            onMouseEnter={() => setHover("add")}
            onMouseLeave={() => setHover()}
            color={hover === "add" ? "error" : "primary"}
          >
            <PersonAddIcon />
          </IconButton>
          <p className="mt-3">Add Truck</p>
        </Link>
      </MenuItem>

      <MenuItem>
        <Link
          style={{ textDecoration: "none", color: "inherit" }}
          to={`/e-log/${organisationId}/driver/deleted`}
          className="d-flex"
        >
          <IconButton
             size="small"
            aria-label="show 17 new notifications"
            onMouseEnter={() => setHover("preferences")}
            onMouseLeave={() => setHover()}
            color={hover === "preferences" ? "error" : "primary"}
          >
            <GroupRemoveIcon />
          </IconButton>
          <p className="mt-3">Deleted Drivers</p>
        </Link>
      </MenuItem>

      <MenuItem>
        <Link
          style={{ textDecoration: "none", color: "inherit" }}
          to={`/e-log/${organisationId}/drivers`}
          className="d-flex"
        >
          <IconButton
            //  onClick={handleProfileMenuOpen}
            size="small"
            aria-label="account of current user"
            aria-controls="primary-search-account-menu"
            aria-haspopup="true"
            onMouseEnter={() => setHover("group")}
            onMouseLeave={() => setHover()}
            color={hover === "group" ? "error" : "primary"}
          >
            <Diversity1Icon />
          </IconButton>
          <p className="mt-3">Drivers</p>
        </Link>
      </MenuItem>
    </Menu>
  );

  return (
    <div>
      <Paper
        elevation={0}
        sx={{
          display: { xs: "none", md: "flex" },
          border: (theme) => `1px solid ${theme.palette.divider}`,
          flexWrap: "wrap",
          height: "2.2rem",
          marginTop: "0.1rem",
        }}
      >
        <Box>
          <OverlayTrigger
            placement="bottom"
            overlay={<Tooltip>{"Add new Driver"}</Tooltip>}
          >
            <Link to={`/e-log/${organisationId}/driver/add`}>
              <IconButton
                size="small"
                aria-label="Create Invoice"
                onMouseEnter={() => setHover("add")}
                onMouseLeave={() => setHover()}
                color={hover === "add" ? "error" : "primary"}
              >
                <AddCircleIcon />
              </IconButton>
            </Link>
          </OverlayTrigger>

          <OverlayTrigger
            placement="bottom"
            overlay={<Tooltip>{"Drivers"}</Tooltip>}
          >
            <Link to={`/e-log/${organisationId}/drivers`}>
              <IconButton
                size="small"
                onMouseEnter={() => setHover("group")}
                onMouseLeave={() => setHover()}
                color={hover === "group" ? "error" : "primary"}
              >
                <Diversity1Icon />
              </IconButton>
            </Link>
          </OverlayTrigger>
          <OverlayTrigger
            placement="bottom"
            overlay={<Tooltip>{"deleted drivers"}</Tooltip>}
          >
            <Link to={`/e-log/${organisationId}/driver/deleted`}>
              <IconButton
                size="small"
                aria-label="deleted drivers"
                onMouseEnter={() => setHover("preferences")}
                onMouseLeave={() => setHover()}
                color={hover === "preferences" ? "error" : "primary"}
              >
                <GroupRemoveIcon />
              </IconButton>
            </Link>
          </OverlayTrigger>
          <Link
            to={`/E-Stocker/${organisationId}/Customers/${customerListView}`}
            className="text-primary"
            style={{ textDecoration: "none" }}
          ></Link>
        </Box>
      </Paper>
      <Paper
        elevation={0}
        sx={{
          display: { xs: "flex", md: "none" },
          border: (theme) => `1px solid ${theme.palette.divider}`,
          height: "2.5rem",
          width: "2rem",
        }}
        style={{ justifyContent: "center" }}
      >
        <Box>
          <IconButton
            size="large"
            aria-label="show more"
            aria-controls={mobileMenuId}
            aria-haspopup="true"
            onClick={handleMobileMenuOpen}
            onMouseEnter={() => setHover("more")}
            onMouseLeave={() => setHover()}
            color={hover === "more" ? "error" : "primary"}
          >
            <MoreIcon />
          </IconButton>
        </Box>
      </Paper>

      {renderMobileMenu}
      {renderMenu}
    </div>
  );
}

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
import GroupWorkIcon from "@mui/icons-material/GroupWork";
import DeleteSweepIcon from "@mui/icons-material/DeleteSweep";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import AddEditVendorAgent from "./AddEditVendorAgent";

export default function CustomButtons({ view, setView }) {
  const { organisationId } = useParams();
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [hover, setHover] = useState();
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

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
        <span className="d-flex">
          <IconButton
            size="small"
            onMouseEnter={() => setHover("add")}
            onMouseLeave={() => setHover()}
            color={hover === "add" ? "error" : "primary"}
            onClick={() => setShowModal(true)}
          >
            <PersonAddIcon />
          </IconButton>

          <p className="mt-3">Add Vendor</p>
        </span>
      </MenuItem>

      <MenuItem>
        <Link
          style={{ textDecoration: "none", color: "inherit" }}
          to={`/e-log/${organisationId}/vendor/deleted`}
          className="d-flex"
        >
          <IconButton
            size="small"
            aria-label="show 17 new notifications"
            onMouseEnter={() => setHover("preferences")}
            onMouseLeave={() => setHover()}
            color={hover === "preferences" ? "error" : "primary"}
          >
            <DeleteSweepIcon />
          </IconButton>
          <p className="mt-3">Deleted Vendors</p>
        </Link>
      </MenuItem>

      <MenuItem>
        <Link
          style={{ textDecoration: "none", color: "inherit" }}
          to={`/e-log/${organisationId}/trucks`}
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
            <GroupWorkIcon />
          </IconButton>
          <p className="mt-3">Vendor</p>
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
            overlay={<Tooltip>{"Add vendor"}</Tooltip>}
          >
            <IconButton
              onClick={() => setShowModal(true)}
              size="small"
              onMouseEnter={() => setHover("add")}
              onMouseLeave={() => setHover()}
              color={hover === "add" ? "error" : "primary"}
            >
              <AddCircleIcon />
            </IconButton>
          </OverlayTrigger>

          <OverlayTrigger
            placement="bottom"
            overlay={<Tooltip>{"Vendors"}</Tooltip>}
          >
            <Link to={`/e-log/${organisationId}/vendors`}>
              <IconButton
                size="small"
                onMouseEnter={() => setHover("group")}
                onMouseLeave={() => setHover()}
                color={hover === "group" ? "error" : "primary"}
              >
                <GroupWorkIcon />
              </IconButton>
            </Link>
          </OverlayTrigger>
          <OverlayTrigger
            placement="bottom"
            overlay={<Tooltip>{"deleted vendoragents"}</Tooltip>}
          >
            <Link to={`/e-log/${organisationId}/vendors/deleted`}>
              <IconButton
                size="small"
                onMouseEnter={() => setHover("preferences")}
                onMouseLeave={() => setHover()}
                color={hover === "preferences" ? "error" : "primary"}
              >
                <DeleteSweepIcon />
              </IconButton>
            </Link>
          </OverlayTrigger>
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
      <AddEditVendorAgent
        showModal={showModal}
        setShowModal={setShowModal}
        mode="create"
      />
    </div>
  );
}

import { Box, Chip, IconButton, Menu, MenuItem, Stack } from "@mui/material";
import React, { useState } from "react";

import ReadMoreIcon from "@mui/icons-material/ReadMore";
import { useNavigate, useParams } from "react-router-dom";
import RestoreAndDeleteTripModal from "./RestoreAndDeleteTripModal";

const TripActionButtons = ({ trip }) => {
  const { organisationId } = useParams();
  const navigate = useNavigate();
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
  const [hover, setHover] = useState();
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const mobileMenuId = "primary-search-account-menu-mobile";

  const navigateToTrip = () => {
    navigate(`/e-log/${organisationId}/trips/${trip._id}/edit`);
  };

  const actions = (
    <Stack direction={{ xs: "column", md: "row" }} spacing={1}>
      <RestoreAndDeleteTripModal
        selectedTrip={[trip] || []}
        mode="delete"
        callBack={() => {
          navigate(`/e-log/${organisationId}/trips`);
        }}
      />

      <Chip
        color="primary"
        className="btn "
        variant="outlined"
        label="Edit"
        onClick={() => navigateToTrip()}
        size="small"
        style={{ width: "6rem" }}
      />

      <Chip
        color="primary"
        className="btn"
        // onClick={() => deselectAll()}
        label="PayOut"
        size="small"
        variant="outlined"
        style={{ width: "6rem" }}
      />
    </Stack>
  );

  const renderMobileMenu = (
    <Menu
      sx={{ display: { xs: "flex", md: "none" } }}
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
      <MenuItem>{actions}</MenuItem>
    </Menu>
  );

  return (
    <div style={{ display: "flex" }}>
      <Box
        sx={{
          display: { xs: "none", md: "flex" },
        }}
      >
        {actions}
      </Box>

      <Box
        sx={{
          display: { xs: "flex", md: "none" },
        }}
      >
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
          <ReadMoreIcon />
        </IconButton>
      </Box>

      {renderMobileMenu}
    </div>
  );
};

export default TripActionButtons;

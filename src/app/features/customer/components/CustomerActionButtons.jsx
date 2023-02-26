import {
  Box,
  Chip,
  IconButton,
  Menu,
  MenuItem,
  
  Stack,
} from "@mui/material";
import React, { useState } from "react";
import RestoreAndDeleteCustomerModal from "./RestoreAndDeleteCustomerModal";
import ReadMoreIcon from "@mui/icons-material/ReadMore";

import AddEditCustomer from "./AddEditCustomer";

const CustomerActionButtons = ({ customer }) => {
 
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
  const [hover, setHover] = useState();
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const [showModal, setShowModal] = useState(false);

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const mobileMenuId = "primary-search-account-menu-mobile";


  
  const actions = (
    <Stack direction={{ xs: "column", md: "row" }} spacing={1}>
      <RestoreAndDeleteCustomerModal
        selectedCustomers={[customer] || []}
        mode="delete"
      />

      <Chip
        color="primary"
        className="btn "
        variant="outlined"
        label="Edit"
        onClick={() => setShowModal(true)}
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
      {!customer?.portalStatus && (
        <Chip
          color="primary"
          className="btn"
          // onClick={() => deselectAll()}
          label={"Invite to Portal"}
          size="small"
          variant="outlined"
          style={{ width: "7rem" }}
        />
      )}
      {customer?.portalStatus && (
        <Chip
          color="primary"
          className="btn"
          // onClick={() => deselectAll()}
          label={
            customer?.enablePartnerPortal ? "Disable Portal" : "Enable Portal"
          }
          size="small"
          variant="outlined"
          style={{ width: "7rem" }}
        />
      )}
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
      <AddEditCustomer
        showModal={showModal}
        setShowModal={setShowModal}
        mode="edit"
        customer={customer}
      />
    </div>
  );
};

export default CustomerActionButtons;

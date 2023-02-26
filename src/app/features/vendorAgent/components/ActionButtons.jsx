import { ButtonGroup, IconButton, Tooltip } from "@mui/material";
import React from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import FeedIcon from "@mui/icons-material/Feed";

const ActionButtons = ({ numSelected }) => {
  return (
    <ButtonGroup>
      {numSelected === 1 && (
        <Tooltip title="Details">
          <IconButton>
            <FeedIcon />
          </IconButton>
        </Tooltip>
      )}
      {numSelected === 1 && (
        <Tooltip title="Edit">
          <IconButton>
            <EditIcon />
          </IconButton>
        </Tooltip>
      )}
      <Tooltip title="Delete">
        <IconButton>
          <DeleteIcon color="error" />
        </IconButton>
      </Tooltip>
    </ButtonGroup>
  );
};

export default ActionButtons;

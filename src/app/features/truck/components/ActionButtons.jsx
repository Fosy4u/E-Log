import { Chip, Stack } from "@mui/material";
import React from "react";
import RestoreAndDeleteTruckModal from "./RestoreAndDeleteTruckModal";

const ActionButtons = ({
  selectAll,
  deselectAll,
  selectedTrucks,
  setSelectedTrucks,
}) => {
  return (
    <div style={{ display: "flex" }}>
      <Stack direction="row" spacing={1}>
        <RestoreAndDeleteTruckModal
          selectedTrucks={selectedTrucks || []}
          setSelectedTrucks={setSelectedTrucks}
          mode="delete"
        />

        <Chip
          color="primary"
          className="btn "
          onClick={() => selectAll()}
          variant="outlined"
          label=" SelectAll"
          size="small"
          style={{ width: "6rem" }}
        />

        <Chip
          color="primary"
          className="btn"
          onClick={() => deselectAll()}
          label="DeselectAll"
          size="small"
          variant="outlined"
          style={{ width: "6rem" }}
        />
      </Stack>
    </div>
  );
};

export default ActionButtons;

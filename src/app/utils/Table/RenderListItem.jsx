import { IconButton, ListItem } from "@mui/material";
import React from "react";
import FilterItem from "./FilterItem";
import DeleteIcon from "@mui/icons-material/Delete";

const RenderListItem = ({
  index,
  handleRemoveFruit,
  item,
  fields,
  handleChange,
  selectedFields,
}) => {
  return (
    <ListItem
      key={index}
      secondaryAction={
        <IconButton
          edge="end"
          aria-label="delete"
          title="Delete"
          onClick={() => handleRemoveFruit(index)}
        >
          <DeleteIcon />
        </IconButton>
      }
    >
      <FilterItem
        item={item}
        fields={fields}
        handleChange={handleChange}
        index={index}
        selectedFields={selectedFields}
      />
    </ListItem>
  );
};

export default RenderListItem;

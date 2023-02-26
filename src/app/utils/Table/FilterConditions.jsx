import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import DeleteIcon from "@mui/icons-material/Delete";
import { TransitionGroup } from "react-transition-group";
import { useEffect, useState } from "react";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import FilterItem from "./FilterItem";
import RenderListItem from "./RenderListItem";

const FRUITS = [
  "🍏 Apple",
  "🍌 Banana",
  "🍍 Pineapple",
  "🥥 Coconut",
  "🍉 Watermelon",
];

function renderItem({
  item,
  index,
  handleRemoveFruit,
  fields,
  handleChange,
  selectedFields,
}) {
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
}

export default function FilterConditions({ filters, setFilters, rows }) {
  const [fruitsInBasket, setFruitsInBasket] = useState(FRUITS.slice(0, 3));
  const [fields, setFields] = useState([]);
  const [selectedFields, setSelectedFields] = useState([]);

  useEffect(() => {
    if (rows.length === 0) return;
    const arr = rows.reduce((acc, row) => {
      const keys = Object.keys(row);
      keys.forEach((key) => {
        if (!acc.includes(key)) {
          acc.push(key);
        }
      });
      return acc;
    }, []);
    setFields(arr);
    // setSelectedFields(
    //   arr.map((field) => ({ field, condition: "", value: "" }))
    // );
  }, [rows]);

  useEffect(() => {
    if (filters.length > 0) return;
    setSelectedFields(filters);
  }, [filters]);

  const handleAddFilter = () => {
    const newItem = {
      field: "",
      condition: "",
      value: "",
    };

    setSelectedFields((prev) => [...prev, newItem]);
  };

  const handleRemoveFruit = (index) => {
    setSelectedFields((prev) => {
      const next = [...prev];
      next.splice(index, 1);
      return next;
    });
  };

  const handleChange = (item, index) => {
    const next = [...selectedFields];
    next[index] = item;
    setSelectedFields(next);
  };



  const addFruitButton = (
    <span className="d-flex justify-content-between m-1 ms-4 me-4">
      <Button
        size="small"
        variant="outlined"
        disabled={selectedFields.length >= fields.length}
        onClick={handleAddFilter}
      >
        Add
      </Button>
      <Button
        size="small"
        variant="contained"
        disabled={fruitsInBasket.length >= FRUITS.length}
        onClick={handleAddFilter}
      >
        Apply
      </Button>
    </span>
  );

  return (
    <div>
      {addFruitButton}
      <Box sx={{ mt: 1 }}>
        <List>
          <TransitionGroup>
            {selectedFields.map((item, index) => (
              <Collapse key={index}>
                <RenderListItem
                  item={item}
                  index={index}
                  handleRemoveFruit={handleRemoveFruit}
                  fields={fields}
                  handleChange={handleChange}
                  selectedFields={selectedFields}
                />
              </Collapse>
            ))}
          </TransitionGroup>
        </List>
      </Box>
    </div>
  );
}

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Collapse from "@mui/material/Collapse";
import List from "@mui/material/List";
import { TransitionGroup } from "react-transition-group";
import { useEffect, useState } from "react";
import RenderListItem from "./RenderListItem";
import { Tiny } from "../../components/Typography";

export default function FilterConditions({
  filters,
  setFilters,
  rows,
  setOpenFilter,
}) {
  const [fields, setFields] = useState([]);
  const [selectedFields, setSelectedFields] = useState([]);
  const [errorText, setErrorText] = useState("");

  useEffect(() => {
    if (rows.length === 0) return;
    const arr = rows.reduce((acc, row) => {
      const keys = Object.keys(row);
      keys.forEach((key) => {
        if (!acc.includes(key) && key !== "key" && !row?.noFilter) {
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
    if (filters.length === 0) return;
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
  const validateFilter = () => {
    const valid = selectedFields.every(
      (item) => item.field && item.condition && item.value
    );
    if (!valid) {
      setErrorText(
        "Please fill in empty boxes or delete them before applying filters."
      );
      return false;
    }
    setErrorText("");
    return true;
  };

  const filterButtons = (
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
        disabled={selectedFields.length === 0 && filters.length === 0}
        onClick={() => {
          if (validateFilter()) {
            setFilters(selectedFields);
            setOpenFilter(false);
          }
        }}
      >
        Apply
      </Button>
    </span>
  );

  return (
    <div>
      {filterButtons}
      <Box sx={{ mt: 1 }}>
        {errorText && <Tiny className="text-danger">{errorText}</Tiny>}
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

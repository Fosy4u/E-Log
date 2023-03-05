import React, { useEffect, useState } from "react";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";

const FilterItem = ({ fields, handleChange, item, index, selectedFields }) => {
console.log("🚀 ~ file: FilterItem.jsx:11 ~ FilterItem ~ item:", item)

  const [fieldValue, setFieldValue] = useState();
  const [conditionValue, setConditionValue] = useState("");
  const [value, setValue] = useState("");

  useEffect(() => {
    if (item) {
      setFieldValue(fields.find((field) => field === item.field));
      setConditionValue(item.condition);
      setValue(item.value);
    }
  }, [fields, item]);


  const validateFieldItem = (menuItem) => {
    let valid = true;
    const find = selectedFields.find((f) => f.field === menuItem);
    if (find && menuItem !== fieldValue) {
      valid = false;
    }
    return valid;
  };

  const handleFieldChange = (event) => {

    setFieldValue(event.target.value);
    const newItem = {
      field: event.target.value,
      condition: conditionValue,
      value: value,
    };
    handleChange(newItem, index);
  };
  const handleConditionChange = (event) => {
    setConditionValue(event.target.value);
    const newItem = {
      field: fieldValue,
      condition: event.target.value,
      value: value,
    };
    handleChange(newItem, index);
  };

  const handleValueChange = (event) => {
    setValue(event.target.value);
    const newItem = {
      field: fieldValue,
      condition: conditionValue,
      value: event.target.value,
    };
    handleChange(newItem, index);
  };

  return (
    <span className="d-flex w-100">
      <FormControl sx={{ m: 1, width: "30%" }} size="small">
        <InputLabel>Field</InputLabel>
        <Select
          value={item.fieldValue || fieldValue || ""}
          label="Field"
          onChange={handleFieldChange}
          defaultValue=""
        >
          {fields?.map((field, index) => (
            <MenuItem
              name={field}
              value={field}
              key={index}
              disabled={!validateFieldItem(field)}
            >
              {field}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {fieldValue && (
        <FormControl sx={{ m: 1, width: "30%" }} size="small">
          <InputLabel>Condition</InputLabel>
          <Select
            label="Condition"
            value={conditionValue || ""}
            onChange={handleConditionChange}
          >
            {typeof fieldValue === "number" && (
              <MenuItem name={fieldValue} value="equals">
                Equals (=)
              </MenuItem>
            )}
             {typeof fieldValue !== "number" && (
            <MenuItem name={fieldValue} value="contains">
              Contains (text)
            </MenuItem>
            )}
          
            {typeof fieldValue === "number" && ( <MenuItem name={fieldValue} value="greaterThan">
              Greater (&gt;)
            </MenuItem>
            )}
             {typeof fieldValue === "number" && (
            <MenuItem name={fieldValue} value="lessThan">
              Less (&lt;)
            </MenuItem>
              )}
          </Select>
        </FormControl>
      )}
      {fieldValue && conditionValue && (
        <FormControl sx={{ m: 1, width: "40%" }} size="small">
          <TextField
            type={
              conditionValue === "greaterThan" ||
              conditionValue === "lessThan" ||
              conditionValue === "equals"
                ? "number"
                : "text"
            }
            size="small"
            id="outlined-basic"
            label="Value"
            variant="outlined"
            onChange={(e) => handleValueChange(e)}
            value={value}
          />
        </FormControl>
      )}
    </span>
  );
};

export default FilterItem;

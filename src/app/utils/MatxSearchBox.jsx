import { Icon, IconButton } from "@mui/material";
import { styled, useTheme } from "@mui/system";
import { topMenuBarHeight } from "./constant";
import React, { useState } from "react";

const SearchContainer = styled("div")(({ theme }) => ({
  position: "absolute",
  top: 0,
  left: 0,
  zIndex: 9,
  width: "100%",
  display: "flex",
  alignItems: "center",
  height: topMenuBarHeight,
  background: theme.palette.primary.main,
  color: theme.palette.text.primary,
  "&::placeholder": {
    color: theme.palette.text.primary,
  },
}));

const SearchInput = styled("input")(({ theme }) => ({
  width: "100%",
  border: "none",
  outline: "none",
  fontSize: "1rem",
  paddingLeft: "20px",
  height: "calc(100% - 5px)",
  background: theme.palette.primary.main,
  color: theme.palette.text.primary,
  "&::placeholder": { color: theme.palette.text.primary },
}));
const SearchHolder = styled("input")(({ theme }) => ({
  width: "100%",
  border: "none",
  outline: "none",
  fontSize: "1rem",
  paddingLeft: "5px",
  height: "calc(100% - 5px)",
  background: theme.palette.primary.main,
  color: theme.palette.text.primary,
  "&::placeholder": { color: theme.palette.text.primary },
}));

const MatxSearchBox = ({ placeholder, setInput }) => {
  const [open, setOpen] = useState(false);
  const toggle = () => {
    setOpen(!open);
  };

  const { palette } = useTheme();
  const textColor = palette.text.primary;

  return (
    <React.Fragment>
      {!open && (
        <div
          onClick={toggle}
          className="d-flex bg-primaryBrandColor mb-2 mt-1"
          style={{ height: "2.0rem" }}
        >
          <Icon className="mt-1" sx={{ color: textColor }}>
            search
          </Icon>
          <SearchHolder
            type="text"
            placeholder={placeholder || "Search here..."}
          />
        </div>
      )}

      {open && (
        <SearchContainer>
          <SearchInput
            type="text"
            placeholder={placeholder || "Search here..."}
            autoFocus
            onChange={(e) => setInput(e.target.value)}
          />
          <IconButton
            onClick={() => {
              setInput("");
              toggle();
            }}
            sx={{ mx: 2, verticalAlign: "middle" }}
          >
            <Icon sx={{ color: textColor }}>close</Icon>
          </IconButton>
        </SearchContainer>
      )}
    </React.Fragment>
  );
};

export default MatxSearchBox;

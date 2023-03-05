import { Box, Button, Paper, Slide, useMediaQuery } from "@mui/material";
import { styled } from "@mui/system";
import { useState } from "react";

import { Paragraph, Span, Tiny } from "../../components/Typography";
import FilterConditions from "./FilterConditions";

const SidebarRoot = styled("div")(({ theme, width }) => ({
  position: "fixed",
  // height: height,
  width: width,
  right: 0,
  // bottom: 50,
  top: "30%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  boxShadow: theme.shadows[8],
  // backgroundColor: theme.palette.primary.main,
  zIndex: 98,
  transition: "all 0.15s ease",
  color: theme.palette.text.primary,
  "@global": {
    "@media screen and (min-width: 767px)": {
      ".content-wrap, .layout2.layout-contained, .layout2.layout-full": {
        marginRight: (props) => props.width,
      },
      ".matx-customizer": {
        right: (props) => props.width,
      },
    },
    "@media screen and (max-width: 959px)": {
      ".toolbar-menu-wrap .menu-area": {
        width: (props) => `calc(100% - ${props.width})`,
      },
    },
  },
}));

const Filter = ({ openFilter, rows, filters, setFilters, setOpenFilter }) => {
  const matches = useMediaQuery("(min-width:600px)");
  return (
    <Slide
      direction="left"
      mountOnEnter
      unmountOnExit
      in={openFilter}
      easing={{
        enter: "cubic-bezier(0, 1.5, .8, 1)",
        exit: "linear",
      }}
    >
      <SidebarRoot
        // width={"200px"}
        className="secondary-sidebar"
      >
        <Paper
          elevation={4}
          sx={{
            height: "50vh",
            overflow: "scroll",
            width: matches ? "45vw" : "100vw",
          }}
        >
          <Box>
            {filters?.length > 0 ? (
              <span>
                <Button
                  // variant="contained"
                  sx={{ m: 1 }}
                  onClick={() => setFilters([])}
                  color="primary"
                >
                  Clear All Filters
                </Button>
              </span>
            ) : (
              <span className="mt-1 text-danger">
                <Tiny>No filters applied. </Tiny>
              </span>
            )}
            <FilterConditions
              filters={filters}
              setFilters={setFilters}
              rows={rows}
              setOpenFilter={setOpenFilter}
              
            />
          </Box>
        </Paper>
      </SidebarRoot>
    </Slide>
  );
};

export default Filter;

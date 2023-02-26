import { Box, Button, Paper, Slide } from "@mui/material";
import { styled } from "@mui/system";
import { useState } from "react";

import { Paragraph, Span } from "../../components/Typography";
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

const Filter = ({ openFilter, rows }) => {
  const [filters, setFilters] = useState([]);
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
          sx={{ height: "50vh", overflow: "scroll", width: "45vw" }}
        >
          <Box>
            {filters?.length > 0 ? (
              <span>
                <Button variant="outline" sx={{ m: 1 }}>
                  Clear All
                </Button>
              </span>
            ) : (
              <span>
                <Paragraph sx={{ m: 0 }}>No filters applied. </Paragraph>
              </span>
            )}
            <FilterConditions
              filters={filters}
              setFilters={setFilters}
              rows={rows}
            />
          </Box>
        </Paper>
      </SidebarRoot>
    </Slide>
  );
};

export default Filter;

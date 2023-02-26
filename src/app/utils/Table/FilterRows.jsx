import Box from "@mui/material/Box";
import FilterListIcon from "@mui/icons-material/FilterList";
import { IconButton, Tooltip } from "@mui/material";
import Filter from "./Filter";

export default function FilterRows({ openFilter, setOpenFilter, rows }) {
  return (
    <span>
      <Tooltip title="Filter list">
        <IconButton onClick={() => setOpenFilter(!openFilter)}>
          <FilterListIcon color="primary" />
        </IconButton>
      </Tooltip>

      <Box>
        <Filter openFilter={openFilter} rows={rows} />
      </Box>
    </span>
  );
}

import Box from "@mui/material/Box";
import FilterListIcon from "@mui/icons-material/FilterList";
import { IconButton, Tooltip } from "@mui/material";
import Filter from "./Filter";

export default function FilterRows({ openFilter, setOpenFilter, rows,  filters,
  setFilters,  }) {
  return (
    <span>
      <Tooltip title="Filter list">
        <IconButton onClick={() => setOpenFilter(!openFilter)}>
          <FilterListIcon color={filters?.length > 0 ? "success" : "primary"} />
        </IconButton>
      </Tooltip>

      <Box>
        <Filter openFilter={openFilter} rows={rows} 
        filters={filters}
        setFilters={setFilters}
        setOpenFilter = {setOpenFilter}
        
        />
      </Box>
    </span>
  );
}

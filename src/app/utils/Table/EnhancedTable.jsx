import { alpha } from "@mui/material/styles";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import { visuallyHidden } from "@mui/utils";
import { useEffect, useState } from "react";
import FilterRows from "./FilterRows";

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: "#e6e6e6",
  },
  "&:nth-of-type(even)": {
    backgroundColor: "##808080",
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
  "&:hover": {
    backgroundColor: "#b3b3b3",
  },
}));

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

// Since 2020 all major browsers ensure sort stability with Array.prototype.sort().
// stableSort() brings sort stability to non-modern browsers (notably IE11). If you
// only support modern browsers you can replace stableSort(exampleArray, exampleComparator)
// with exampleArray.slice().sort(exampleComparator)
function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

function EnhancedTableHead(props) {
  const {
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
    headCells,
  } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              "aria-label": "select all desserts",
            }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
              sx={{
                ".MuiTableSortLabel-icon": {
                  color: "red",
                },
              }}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

function EnhancedTableToolbar(props) {
  const {
    numSelected,
    title,
    rowsLength,
    ActionButtons,
    filter,
    setOpenFilter,
    openFilter,
    rows,
    filters,
    setFilters,
    selectedRows,
  } = props;

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(
              theme.palette.primary.main,
              theme.palette.action.activatedOpacity
            ),
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: "1 1 100%" }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          sx={{ flex: "1 1 100%" }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          {rowsLength} {title || "Items"}
        </Typography>
      )}
      {numSelected > 0 ? (
        <ActionButtons selectedRows={selectedRows} />
      ) : (
        filter && (
          <FilterRows
            openFilter={openFilter}
            setOpenFilter={setOpenFilter}
            rows={rows}
            filters={filters}
            setFilters={setFilters}
          />
        )
      )}
    </Toolbar>
  );
}

export default function EnhancedTable({
  title,
  ActionButtons,
  headCells,
  rows,
  stickyHeader = true,
  filter = true,
  styleRow = false,
}) {
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("calories");
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [dense, setDense] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [openFilter, setOpenFilter] = useState(false);
  const [filteredRows, setFilteredRows] = useState([]);
  const [filters, setFilters] = useState([]);

  const escapeRegExp = (value) => {
    return value.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
  };
  // const searchRegex = new RegExp(escapeRegExp(input), "i");

  useEffect(() => {
    if (rows.length > 0) {
      if (!filter) {
        return setFilteredRows(rows);
      }
      if (filters.length > 0) {
        const filtered = filters.reduce((acc, cum) => {
          const { field, condition, value } = cum;
          const searchRegex = new RegExp(escapeRegExp(value), "i");
          const filtered = rows.filter((row) => {
            if (condition === "contains") {
              return searchRegex.test(row[field]);
            }
            if (condition === "equals") {
              return row[field] === value;
            }
            if (condition === "greater") {
              return row[field] > value;
            }
            if (condition === "less") {
              return row[field] < value;
            }
          });
          return [...acc, ...filtered];
        }, []);
        return setFilteredRows(filtered);
      }
      return setFilteredRows(rows);
    }
  }, [filter, filters, rows]);

  useEffect(() => {
    if (rows.length > 0) {
      setSelected([]);
    }
  }, [rows]);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = filteredRows.map((n, index) => index);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - filteredRows.length) : 0;

  const getSelectedRows = () => {
    const selectedRows = [];
    selected.forEach((index) => {
      selectedRows.push(filteredRows[index]);
    });
    return selectedRows;
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Paper sx={{ width: "100%", mb: 2, overflow: "hidden" }}>
        <EnhancedTableToolbar
          numSelected={selected.length}
          title={title}
          ActionButtons={ActionButtons}
          filter={filter}
          rowsLength={filteredRows.length}
          setOpenFilter={setOpenFilter}
          openFilter={openFilter}
          rows={rows}
          filters={filters}
          setFilters={setFilters}
          selectedRows={getSelectedRows()}
        />
        <TableContainer sx={{ maxHeight: stickyHeader ? "60vh" : "100%" }}>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size={dense ? "small" : "medium"}
            stickyHeader={stickyHeader}
            aria-label="sticky table"
          >
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={filteredRows.length}
              headCells={headCells}
            />
            <TableBody>
              {stableSort(filteredRows, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(index);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return styleRow ? (
                    <StyledTableRow
                      hover
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={index}
                      selected={isItemSelected}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          onClick={(event) => handleClick(event, index)}
                          color="primary"
                          checked={isItemSelected}
                          inputProps={{
                            "aria-labelledby": labelId,
                          }}
                        />
                      </TableCell>
                      {headCells.map((headCell) => {
                        return (
                          <TableCell key={headCell.id}>
                            {row[headCell.id]}
                          </TableCell>
                        );
                      })}
                    </StyledTableRow>
                  ) : (
                    <TableRow
                      hover
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={index}
                      selected={isItemSelected}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          onClick={(event) => handleClick(event, index)}
                          color="primary"
                          checked={isItemSelected}
                          inputProps={{
                            "aria-labelledby": labelId,
                          }}
                        />
                      </TableCell>
                      {headCells.map((headCell) => {
                        return (
                          <TableCell key={headCell.id}>
                            {row[headCell.id]}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: (dense ? 33 : 53) * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={filteredRows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      <FormControlLabel
        control={<Switch checked={dense} onChange={handleChangeDense} />}
        label="Dense padding"
      />
      {/* {filter && openFilter && <Filter openFilter={openFilter} />} */}
    </Box>
  );
}

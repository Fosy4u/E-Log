import {
  Avatar,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Slide,
  IconButton,
  useMediaQuery,
  Button,
  TextField,
  Chip,
  Checkbox,
} from "@mui/material";
import { Box } from "@mui/system";
import Stack from "@mui/material/Stack";
import { Container, Popover, OverlayTrigger, Tooltip } from "react-bootstrap";
import { forwardRef, useEffect, useState } from "react";
import displayDate from "../../../utils/displayDate";
import Image from "../../../images/noImage.jpeg";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";
import RestoreAndDeleteTruckModal from "./RestoreAndDeleteTruckModal";
import Banner from "../../../utils/Banner";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const DeletedTruck = ({ trucks, isLoading }) => {
  const matches = useMediaQuery("(min-width:600px)");
  const [showModal, setShowModal] = useState(false);
  const [detail, setDetail] = useState({});
  const [input, setInput] = useState("");
  const [filteredData, setFilteredData] = useState(trucks || []);
  const [chosenTruck, setChosenTruck] = useState();
  const [selectedTrucks, setSelectedTrucks] = useState([]);
  const mode = "restore";

  useEffect(() => {
    if (trucks?.length > 0) {
      const searchRegex = new RegExp(escapeRegExp(input), "i");
      const result = trucks?.filter((row) => {
        return Object.keys(row).some((field) => {
          return searchRegex.test(row[field].toString());
        });
      });
      setFilteredData(result);
    } else {
      setFilteredData([]);
    }
  }, [input, trucks]);

  function escapeRegExp(value) {
    return value.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
  }

  const onChange = (value) => {
    setInput(value);
  };

  const handleSelectedTruck = (item) => {
    const sel = [...selectedTrucks];
    const found = sel.find((truck) => truck._id === item._id);
    const index = sel.indexOf(found);
    if (found) {
      sel.splice(index, 1);
    } else {
      sel.push(item);
    }

    setSelectedTrucks(sel);
  };

  // control if item should be checked on not
  const checked = (item) => {
    const found = selectedTrucks.find((truck) => truck._id === item._id);
    if (found) {
      return true;
    }
    return false;
  };

  const setSelectAll = () => {
    const newArr = [];
    // eslint-disable-next-line array-callback-return
    filteredData.map((truck) => {
      newArr.push(truck);
    });
    setSelectedTrucks(newArr);
  };

  const popover = (
    <Popover>
      <Popover.Body>
        <Stack
          direction="column"
          spacing={1}
          className="d-flex flex-column"
          onMouseLeave={() => setChosenTruck()}
        >
          <RestoreAndDeleteTruckModal
            selectedTrucks={[chosenTruck] || []}
            setSelectedTrucks={setChosenTruck}
            mode={mode}
          />
        </Stack>
      </Popover.Body>
    </Popover>
  );

  return (
    <div>
      {trucks?.length > 0 && (
        <Box
          sx={{
            p: 0.5,
            pb: 0,
          }}
          className="d-flex justify-content-between"
        >
          <TextField
            variant="standard"
            value={input}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Search Deleted Trucks"
            InputProps={{
              startAdornment: <SearchIcon fontSize="small" />,
              endAdornment: (
                <IconButton
                  title="Clear"
                  aria-label="Clear"
                  size="small"
                  onClick={() => setInput()}
                >
                  <ClearIcon fontSize="small" />
                </IconButton>
              ),
            }}
            sx={{
              width: {
                sm: "auto",
              },
              m: (theme) => theme.spacing(1, 0.5, 1.5),
              "& .MuiSvgIcon-root": {
                mr: 0.5,
              },
              "& .MuiInput-underline:before": {
                borderBottom: 1,
                borderColor: "divider",
              },
            }}
          />

          {selectedTrucks.length > 0 && (
            <div className="d-flex">
              <span className="m-2">
                <RestoreAndDeleteTruckModal
                  selectedTrucks={selectedTrucks || []}
                  setSelectedTrucks={setSelectedTrucks}
                  mode={mode}
                />
              </span>

              <Chip
                variant="outlined"
                color="error"
                className="m-2"
                size="small"
                label="  Select All"
                onClick={() => setSelectAll()}
              />
              <Chip
                variant="outlined"
                color="error"
                className="m-2"
                size="small"
                label="  DeSelect All"
                onClick={() => setSelectedTrucks([])}
              />
            </div>
          )}
        </Box>
      )}
      {trucks?.length > 0 && (
        <div className="w-100 d-flex text-center justify-content-center ">
          <Banner
            show={true}
            variant="warning"
            severity={"warning"}
            className="mb-4"
          >
            <p>
              Deleted trucks are only retained for 30 days after which will
              automatically delete permanently and can only be restored by contacting support.
            </p>
          </Banner>
        </div>
      )}
      <div style={{ height: "75vh", overflow: "scroll" }}>
        {filteredData.length > 0 && (
          <Container>
            <ListItem>
              <ListItem sx={{ width: matches ? "300px" : "75%" }}>
                <strong>Truck</strong>
              </ListItem>

              {matches && (
                <ListItem sx={{ width: "200px" }}>
                  <strong>Max Load</strong>
                </ListItem>
              )}
              {matches && (
                <ListItem sx={{ width: "200px" }}>
                  <strong>Model</strong>
                </ListItem>
              )}
              {matches && (
                <ListItem sx={{ width: "200px" }}>
                  <strong>Year</strong>
                </ListItem>
              )}
              <ListItem sx={{ width: matches ? "200px" : "25%" }}>
                <strong>Details</strong>
              </ListItem>
            </ListItem>
          </Container>
        )}
        <List
          sx={{
            width: "100%",
            bgcolor: "background.paper",
            height: "33rem",
            overflow: "scroll",
          }}
        >
          {filteredData &&
            filteredData.map((truck) => {
              return (
                <Container>
                  <ListItem>
                    <ListItem sx={{ width: matches ? "300px" : "80%" }}>
                      {matches && (
                        <ListItemAvatar>
                          <Checkbox
                            size={"small"}
                            sx={{
                              "&.Mui-checked": {
                                color: "error",
                              },
                            }}
                            checked={checked(truck)}
                            onChange={() => handleSelectedTruck(truck)}
                            inputProps={{ "aria-label": "controlled" }}
                          />
                          <Avatar
                            alt="avatar"
                            src={truck?.imageUrl?.link || Image}
                          />
                        </ListItemAvatar>
                      )}
                      {truck.manufacturer} - {truck.regNo}
                    </ListItem>
                    {matches && (
                      <ListItem sx={{ width: "200px" }}>
                        {truck?.maxLoad}
                      </ListItem>
                    )}
                    {matches && (
                      <ListItem sx={{ width: "200px" }}>
                        {truck?.model}
                      </ListItem>
                    )}
                    {matches && (
                      <ListItem sx={{ width: "200px" }}>
                        {truck.manufactureYear}
                      </ListItem>
                    )}
                    <span
                      className="text-primary btn"
                      sx={{ width: matches ? "200px" : "20%" }}
                      onClick={() => {
                        setDetail({ ...truck });
                        setShowModal(true);
                      }}
                    >
                      details
                    </span>
                    <OverlayTrigger
                      show={chosenTruck?._id === truck._id}
                      placement="bottom"
                      overlay={popover}
                    >
                      <Avatar variant="rounded" className="btn">
                        {chosenTruck?._id === truck._id ? (
                          <ExpandLessIcon
                            onClick={() => setChosenTruck()}
                            color="error"
                          />
                        ) : (
                          <ExpandMoreIcon
                            onClick={() => setChosenTruck(truck)}
                            color="error"
                          />
                        )}
                      </Avatar>
                    </OverlayTrigger>
                  </ListItem>
                  <Divider component="li" />{" "}
                </Container>
              );
            })}
        </List>
      </div>
      <div>
        <Dialog
          fullWidth={"lg"}
          open={showModal}
          onClose={() => {
            setShowModal(false);
          }}
          TransitionComponent={Transition}
          keepMounted
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle className="text-primary d-flex">
            {" "}
            <Avatar
              alt="avatar"
              src={detail?.imageUrl?.link || Image}
              className="me-3"
            />{" "}
            {detail?.manufacturer}: {detail?.regNo}
          </DialogTitle>
          <DialogContent>
            <ListItemText>
              <strong>Type</strong> : {detail?.truckType}
            </ListItemText>
            <ListItemText>
              <strong>Manufacturer </strong> : {detail?.manufacturer}
            </ListItemText>
            <ListItemText>
              <strong>Model </strong> : {detail?.model}
            </ListItemText>
            <ListItemText>
              <strong>Year</strong> : {detail?.manufactureYear}
            </ListItemText>
            <ListItemText>
              <strong>Chasis No</strong> : {detail?.chasisNo}
            </ListItemText>
            <ListItemText>
              <strong>Max Load</strong> : {detail?.maxLoad}
            </ListItemText>
            {detail?.createdAt && (
              <ListItemText>
                <strong>Date</strong> : {displayDate(detail?.createdAt)}
              </ListItemText>
            )}
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => {
                setShowModal(false);
              }}
            >
              Close{" "}
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
};

export default DeletedTruck;

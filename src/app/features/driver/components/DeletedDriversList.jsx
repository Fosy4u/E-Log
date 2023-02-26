import {
    Avatar,
    List,
    ListItem,
    IconButton,
    useMediaQuery,
    TextField,
    ListItemAvatar,
  } from "@mui/material";
  import Chip from "@mui/material/Chip";
  import { Box } from "@mui/system";
  import { useEffect, useState } from "react";
  import { Container } from "react-bootstrap";
  import SearchIcon from "@mui/icons-material/Search";
  import ClearIcon from "@mui/icons-material/Clear";
  import Checkbox from "@mui/material/Checkbox";

  import { useNavigate, useParams } from "react-router-dom";
  import RestoreAndDeleteDriverModal from "./RestoreAndDeleteDriverModal";
  
  const DeletedDriversList = ({ drivers, isLoading }) => {
    const matches = useMediaQuery("(min-width:600px)");
    const { customerId } = useParams();

    const [hover, setHover] = useState();
    const [input, setInput] = useState("");
    const [driver, setDriver] = useState();
    const [showEditModal, setShowEditModal] = useState(false);
    const [filteredData, setFilteredData] = useState(drivers || []);
    const [selectedDrivers, setSelectedDrivers] = useState([]);
  
    useEffect(() => {
      if (drivers?.length > 0) {
        const searchRegex = new RegExp(escapeRegExp(input), "i");
        const result = drivers?.filter((row) => {
          return Object.keys(row).some((field) => {
            return searchRegex.test(row[field].toString());
          });
        });
        setFilteredData(result);
      }
    }, [input, drivers]);
  
    function escapeRegExp(value) {
      return value.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
    }
  
    const handleSelectedCustomer = (contact) => {
      const sel = [...selectedDrivers];
      const found = sel.find((driver) => driver._id === contact._id);
      const index = sel.indexOf(found);
      if (found) {
        sel.splice(index, 1);
      } else {
        sel.push(contact);
      }
  
      setSelectedDrivers(sel);
    };
  
    // control if item should be checked on not
    const checked = (contact) => {
      const found = selectedDrivers.find((driver) => driver._id === contact._id);
      if (found) {
        return true;
      }
      return false;
    };
  
    const onChange = (value) => {
      setInput(value);
    };
    const setSelectAll = () => {
      const newArr = [];
      // eslint-disable-next-line array-callback-return
      filteredData.map((driver) => {
        newArr.push(driver);
      });
      setSelectedDrivers(newArr);
    };
  
    // const popover = (
    //   <Popover>
    //     <Popover.Body>
    //       <Stack
    //         direction="column"
    //         spacing={1}
    //         className="d-flex flex-column"
    //         onMouseLeave={() => setDriver()}
    //       >
    //         <Chip
    //           label="detail"
    //           // onClick={() =>
    //           //   navigate(
    //           //     `/E-Stocker/${organisationId}/Customers/CustomerListView/${driver?._id}`
    //           //   )
    //           // }
    //           onDelete={() => console.log()}
    //           deleteIcon={<ReadMoreIcon fontSize="small" />}
    //           color="primary"
    //           size="small"
    //         />
  
    //         <Chip
    //           label="edit"
    //           variant="outlined"
    //           onClick={() => setShowEditModal(true)}
    //           onDelete={() => console.log()}
    //           deleteIcon={<EditIcon fontSize="small" />}
    //           color="primary"
    //           size="small"
    //         />
    //       </Stack>
    //     </Popover.Body>
    //   </Popover>
    // );
  
    return (
      <div>
        <Box
          sx={{
            p: 0.5,
            pb: 0,
          }}
          className="d-flex flex-wrap justify-content-between"
        >
          <TextField
            variant="standard"
            value={input}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Search Customers"
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
          {selectedDrivers.length > 0 && (
            <div className="d-flex">
              <span className="m-2">
                <RestoreAndDeleteDriverModal
                  selectedDrivers={selectedDrivers || []}
                  setSelectedDrivers={setSelectedDrivers}
                  mode="restore"
                />
              </span>
  
              <Chip
                variant="outlined"
                color="error"
                className="m-2"
                style={{ width: "6rem" }}
                size="small"
                label="  Select All"
                onClick={() => setSelectAll()}
              />
              <Chip
                variant="outlined"
                style={{ width: "6rem" }}
                color="error"
                className="m-2"
                size="small"
                label="  DeSelect All"
                onClick={() => setSelectedDrivers([])}
              />
            </div>
          )}
        </Box>
  
        <div
          style={{
            height: "75vh",
            overflow: "scroll",
            width: matches ? "100%" : "100%",
          }}
        >
          {drivers.length > 0 && (
            <Container>
              <ListItem className="d-flex w-100 justify-content-between">
                <ListItem>
                  <ListItem sx={{ width: matches ? "30%" : "75%" }}>
                    <strong>Name</strong>
                  </ListItem>
  
                  {matches && (
                    <ListItem sx={{ width: "20%" }}>
                      <strong>Phone</strong>
                    </ListItem>
                  )}
                
                  <ListItem sx={{ width: "20%" }}>
                    <strong>Status</strong>
                  </ListItem>
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
            {drivers.length > 0 &&
              filteredData.map((contact) => {
                return (
                  <Container
                    onMouseEnter={() => setHover(contact._id)}
                    onMouseLeave={() => setHover()}
                    key={contact._id}
                  >
                    <ListItem className="d-flex w-100 justify-content-between">
                      <ListItem
                        selected={contact?._id === customerId}
                      
                      >
                        <ListItem sx={{ width: matches ? "30%" : "80%" }} >
                          {matches && (
                            <ListItemAvatar className="d-flex me-1">
                              <Checkbox
                                size={"small"}
                                sx={{
                                  "&.Mui-checked": {
                                    color: "error",
                                  },
                                }}
                                checked={checked(contact)}
                                onChange={() => handleSelectedCustomer(contact)}
                                inputProps={{ "aria-label": "controlled" }}
                              />
                              <Avatar
                                alt="avatar"
                                src={contact?.imageUrl?.link || Image}
                              />
                            </ListItemAvatar>
                          )}
                          {contact?.firstName + " " + contact?.lastName}
                        </ListItem>
                        {matches && (
                          <ListItem sx={{ width: "20%" }}>
                            {contact?.phoneNo || "Not Recorded"}
                          </ListItem>
                        )}
                      
  
                        <ListItem sx={{ width: "20%" }}>
                          {contact.status}
                        </ListItem>
                      </ListItem>
  
                      
                    </ListItem>
                  </Container>
                );
              })}
          </List>
        </div>
      </div>
    );
  };
  
  export default DeletedDriversList;
  
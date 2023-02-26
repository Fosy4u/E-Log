import {
  Avatar,
  Divider,
  List,
  ListItem,
  useMediaQuery,
  ListItemButton,
  ListItemAvatar,
} from "@mui/material";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import { Box } from "@mui/system";
import {  useState } from "react";
import { Container, Popover } from "react-bootstrap";
import EditIcon from "@mui/icons-material/Edit";
import Checkbox from "@mui/material/Checkbox";
import { useNavigate, useParams } from "react-router-dom";
import RestoreAndDeleteDriverModal from "./RestoreAndDeleteDriverModal";
import ContactPageIcon from "@mui/icons-material/ContactPage";

const DriversList = ({ filteredData }) => {
  const matches = useMediaQuery("(min-width:600px)");
  const { customerId } = useParams();
  const navigate = useNavigate();
  const { organisationId } = useParams();
  const [hover, setHover] = useState();

  // const [driver, setDriver] = useState();

  const [selectedDrivers, setSelectedDrivers] = useState([]);

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
  //           //     `/e-log/${organisationId}/driver/edit/${driver._id}`
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
  //           onClick={() =>
  //             navigate(`/e-log/${organisationId}/driver/edit/${driver._id}`)
  //           }
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
        className="d-flex flex-wrap justify-content-end align-items-end"
      >
        {selectedDrivers.length > 0 && (
          <div className="d-flex">
            <span className="m-2">
              <RestoreAndDeleteDriverModal
                selectedDrivers={selectedDrivers || []}
                setSelectedDrivers={setSelectedDrivers}
                mode="delete"
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
          // height: "75vh",
          overflow: "scroll",
          width: matches ? "100%" : "100%",
        }}
      >
        {filteredData.length > 0 && (
          <Container>
            <ListItem className="d-flex w-100 justify-content-between">
              <span style={{ width: "1%" }}></span>
              <ListItem>
                <ListItem sx={{ width: matches ? "30%" : "75%" }}>
                  <strong>Name</strong>
                </ListItem>

                {matches && (
                  <ListItem sx={{ width: "20%" }}>
                    <strong>Phone</strong>
                  </ListItem>
                )}
                {matches && (
                  <ListItem sx={{ width: "20%" }}>
                    <strong>License</strong>
                  </ListItem>
                )}
                <ListItem sx={{ width: "20%" }}>
                  <strong>Status</strong>
                </ListItem>
              </ListItem>
              <span style={{ width: "6%" }}></span>
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
          {filteredData.length > 0 &&
            filteredData.map((contact) => {
              return (
                <Container
                  onMouseEnter={() => setHover(contact._id)}
                  onMouseLeave={() => setHover()}
                  key={contact._id}
                >
                  <ListItem className="d-flex w-100 justify-content-between">
                    <span style={{ width: "1%" }}>
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
                    </span>
                    <ListItemButton
                      selected={contact?._id === customerId}
                      onClick={() =>
                        navigate(
                          `/e-log/${organisationId}/driver/${contact._id}`
                        )
                      }
                    >
                      <ListItem sx={{ width: matches ? "30%" : "80%" }}>
                        {matches && (
                          <ListItemAvatar>
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
                      {matches && (
                        <ListItem sx={{ width: "20%" }}>
                          {contact.licenseNo}
                        </ListItem>
                      )}

                      <ListItem sx={{ width: "20%" }}>
                        {contact.status}
                      </ListItem>
                    </ListItemButton>
                    <span
                      style={{ width: "6%" }}
                      className="d-flex flex-column"
                    >
                      <Chip
                        className="mb-1"
                        label="detail"
                        variant="outlined"
                        onClick={() =>
                          navigate(
                            `/e-log/${organisationId}/driver/${contact._id}`
                          )
                        }
                        onDelete={() => console.log()}
                        deleteIcon={<ContactPageIcon fontSize="small" />}
                        color="primary"
                        size="small"
                      />
                      <Chip
                        label="edit"
                        variant="outlined"
                        onClick={() =>
                          navigate(
                            `/e-log/${organisationId}/driver/edit/${contact._id}`
                          )
                        }
                        onDelete={() => console.log()}
                        deleteIcon={<EditIcon fontSize="small" />}
                        color="primary"
                        size="small"
                      />
                    </span>
                  </ListItem>
                  <Divider component="li" />{" "}
                </Container>
              );
            })}
        </List>
      </div>
    </div>
  );
};

export default DriversList;

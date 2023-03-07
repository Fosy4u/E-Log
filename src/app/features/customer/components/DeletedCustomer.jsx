import {
  Avatar,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  List,
  ListItem,
  ListItemAvatar,
  Slide,
  useMediaQuery,
  Button,
  Chip,
  Checkbox,
  ListItemText,
} from "@mui/material";
import { Box } from "@mui/system";
import Stack from "@mui/material/Stack";
import { Container, Popover, OverlayTrigger } from "react-bootstrap";
import { forwardRef, useState } from "react";
import Image from "../../../images/noImage.jpeg";
import Banner from "../../../utils/Banner";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import RestoreAndDeleteCustomerModal from "./RestoreAndDeleteCustomerModal";
import CustomerContactInfo from "./CustomerContactInfo";
import FitScreenIcon from "@mui/icons-material/FitScreen";
import UnfoldLessDoubleIcon from "@mui/icons-material/UnfoldLessDouble";
import { Span } from "../../../components/Typography";
import { getTitle } from "../../../utils/getTitle";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const DeletedCustomer = ({ filteredData, isLoading }) => {
  const matches = useMediaQuery("(min-width:600px)");
  const [showModal, setShowModal] = useState(false);
  const [detail, setDetail] = useState({});
  const [input, setInput] = useState("");
  const [expandChild, setExpandChild] = useState();
  const [chosenCustomer, setChosenCustomer] = useState();
  const [selectedCustomers, setSelectedCustomers] = useState([]);
  const mode = "restore";

  const onChange = (value) => {
    setInput(value);
  };

  const handleSelectedTruck = (item) => {
    const sel = [...selectedCustomers];
    const found = sel.find((customer) => customer._id === item._id);
    const index = sel.indexOf(found);
    if (found) {
      sel.splice(index, 1);
    } else {
      sel.push(item);
    }

    setSelectedCustomers(sel);
  };

  // control if item should be checked on not
  const checked = (item) => {
    const found = selectedCustomers.find(
      (customer) => customer._id === item._id
    );
    if (found) {
      return true;
    }
    return false;
  };

  const setSelectAll = () => {
    const newArr = [];
    // eslint-disable-next-line array-callback-return
    filteredData.map((customer) => {
      newArr.push(customer);
    });
    setSelectedCustomers(newArr);
  };

  

  const popover = (
    <Popover>
      <Popover.Body>
        <Stack
          direction="column"
          spacing={1}
          className="d-flex flex-column"
          onMouseLeave={() => setChosenCustomer()}
        >
          <RestoreAndDeleteCustomerModal
            selectedCustomers={[chosenCustomer] || []}
            setSelectedCustomers={setSelectedCustomers}
            mode={mode}
          />
          <span
            className="text-primary btn"
            sx={{ width: matches ? "200px" : "20%" }}
            onClick={() => {
              setDetail({ ...chosenCustomer });
              setShowModal(true);
            }}
          >
            details
          </span>
        </Stack>
      </Popover.Body>
    </Popover>
  );

  return (
    <div>
      {filteredData?.length > 0 && (
        <Box
          sx={{
            p: 0.5,
            pb: 0,
          }}
          className="d-flex justify-content-between"
        >
          {selectedCustomers.length > 0 && (
            <div className="d-flex">
              <span className="m-2">
                <RestoreAndDeleteCustomerModal
                  selectedCustomers={selectedCustomers || []}
                  setSelectedCustomers={setSelectedCustomers}
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
                onClick={() => setSelectedCustomers([])}
              />
            </div>
          )}
        </Box>
      )}
      {filteredData?.length > 0 && (
        <div className="w-100 d-flex text-center justify-content-center ">
          <Banner
            show={true}
            variant="warning"
            severity={"warning"}
            className="mb-4"
          >
            <p>
              Deleted customers are only retained for 30 days after which will
              automatically delete permanently and can only be restored by
              contacting support.
            </p>
          </Banner>
        </div>
      )}

      <div
        style={{ height: "75vh", overflow: "scroll" }}
        className="w-100 d-flex text-center justify-content-center flex-column "
      >
        {filteredData.length > 0 && (
          <Container>
            <ListItem>
              <ListItemText sx={{ width: matches ? "300px" : "80%" }}>
                Customer
              </ListItemText>

              {matches && (
                <ListItemText sx={{ width: "200px" }}>Email</ListItemText>
              )}
              {matches && (
                <ListItemText sx={{ width: "200px" }}>Phone No</ListItemText>
              )}
              <span sx={{ width: matches ? "200px" : "20%" }}>Action</span>
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
            filteredData.map((customer) => {
              return (
                <Container key={customer?._id}>
                  <ListItem>
                    <ListItemText sx={{ width: matches ? "300px" : "80%" }}>
                      {matches && (
                        <ListItemAvatar>
                          <Checkbox
                            size={"small"}
                            sx={{
                              "&.Mui-checked": {
                                color: "error",
                              },
                            }}
                            checked={checked(customer)}
                            onChange={() => handleSelectedTruck(customer)}
                            inputProps={{ "aria-label": "controlled" }}
                          />
                        </ListItemAvatar>
                      )}
                      {getTitle(customer)}
                    </ListItemText>

                    {matches && (
                      <ListItemText sx={{ width: "200px" }}>
                        {customer?.email}
                      </ListItemText>
                    )}
                    {matches && (
                      <ListItemText sx={{ width: "200px" }}>
                        {customer.phoneNo}
                      </ListItemText>
                    )}

                    <OverlayTrigger
                      show={chosenCustomer?._id === customer._id}
                      placement="bottom"
                      overlay={popover}
                    >
                      <Avatar variant="rounded" className="btn">
                        {chosenCustomer?._id === customer._id ? (
                          <ExpandLessIcon
                            onClick={() => setChosenCustomer()}
                            color="error"
                          />
                        ) : (
                          <ExpandMoreIcon
                            onClick={() => setChosenCustomer(customer)}
                            color="error"
                          />
                        )}
                      </Avatar>
                    </OverlayTrigger>
                  </ListItem>
                </Container>
              );
            })}
        </List>
      </div>
      <div>
        <Dialog
          fullWidth={true}
          maxWidth={matches ? "md" : "lg"}
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
            {getTitle(detail)}
          </DialogTitle>
          <DialogContent className="d-flex justify-content-center partnerAccordionDetails p-2">
            <Span className="d-flex justify-content-center w-100 mt-3">
              {detail && (
                <CustomerContactInfo
                  customer={detail}
                  expandChild={expandChild}
                />
              )}
              {matches && (
                <ListItemAvatar className="ms-2">
                  <Avatar>
                    {expandChild === "contactInfo" ? (
                      <UnfoldLessDoubleIcon
                        color="primary"
                        onClick={() => setExpandChild("")}
                        fontSize="small"
                        style={{ cursor: "pointer" }}
                      />
                    ) : (
                      <FitScreenIcon
                        color="primary"
                        onClick={() => setExpandChild("contactInfo")}
                        fontSize="small"
                        style={{ cursor: "pointer" }}
                      />
                    )}
                  </Avatar>
                </ListItemAvatar>
              )}
            </Span>
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

export default DeletedCustomer;

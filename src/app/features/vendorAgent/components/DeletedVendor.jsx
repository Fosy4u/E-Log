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
import RestoreAndDeleteVendorModal from "./RestoreAndDeleteVendorModal";
import VednorContactInfo from "./VendorContactInfo";
import { Span } from "../../../components/Typography";
import FitScreenIcon from "@mui/icons-material/FitScreen";
import UnfoldLessDoubleIcon from "@mui/icons-material/UnfoldLessDouble";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const DeletedVendor = ({ filteredData, isLoading }) => {
  const matches = useMediaQuery("(min-width:600px)");
  const [showModal, setShowModal] = useState(false);
  const [detail, setDetail] = useState({});
  const [input, setInput] = useState("");
  const [expandChild, setExpandChild] = useState();
  const [chosenVendor, setChosenVendor] = useState();
  const [selectedVendors, setSelectedVendors] = useState([]);
  const mode = "restore";

  const onChange = (value) => {
    setInput(value);
  };

  const handleSelectedTruck = (item) => {
    const sel = [...selectedVendors];
    const found = sel.find((vendor) => vendor._id === item._id);
    const index = sel.indexOf(found);
    if (found) {
      sel.splice(index, 1);
    } else {
      sel.push(item);
    }

    setSelectedVendors(sel);
  };

  // control if item should be checked on not
  const checked = (item) => {
    const found = selectedVendors.find((vendor) => vendor._id === item._id);
    if (found) {
      return true;
    }
    return false;
  };

  const setSelectAll = () => {
    const newArr = [];
    // eslint-disable-next-line array-callback-return
    filteredData.map((vendor) => {
      newArr.push(vendor);
    });
    setSelectedVendors(newArr);
  };

  const getTitle = (contact) => {
    if (contact?.companyName) return contact?.companyName;

    return `${contact?.firstName} ${contact?.lastName}`;
  };

  const popover = (
    <Popover>
      <Popover.Body>
        <Stack
          direction="column"
          spacing={1}
          className="d-flex flex-column"
          onMouseLeave={() => setChosenVendor()}
        >
          <RestoreAndDeleteVendorModal
            selectedVendor={[chosenVendor] || []}
            callBack={() => {
              setSelectedVendors([]);
            }}
            mode={mode}
          />
          <span
            className="text-primary btn"
            sx={{ width: matches ? "200px" : "20%" }}
            onClick={() => {
              setDetail({ ...chosenVendor });
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
          {selectedVendors?.length > 0 && (
            <div className="d-flex">
              <span className="m-2">
                <RestoreAndDeleteVendorModal
                  selectedVendor={selectedVendors || []}
                  callBack={() => {
                    setSelectedVendors([]);
                  }}
                  mode={mode}
                  expandChild={expandChild}
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
                onClick={() => setSelectedVendors([])}
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
              Deleted vendors are only retained for 30 days after which will
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
        {filteredData?.length > 0 && (
          <Container>
            <ListItem>
              <ListItemText sx={{ width: matches ? "300px" : "80%" }}>
                <strong>Vendor</strong>
              </ListItemText>

              {matches && (
                <ListItemText sx={{ width: "200px" }}>
                  {" "}
                  <strong>Email </strong>
                </ListItemText>
              )}
              {matches && (
                <ListItemText sx={{ width: "200px" }}>
                  {" "}
                  <strong>Phone No </strong>
                </ListItemText>
              )}
              <span sx={{ width: matches ? "200px" : "20%" }}>
                {" "}
                <strong> Action </strong>
              </span>
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
            filteredData.map((vendor) => (
              <Container key={vendor?._id}>
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
                          checked={checked(vendor)}
                          onChange={() => handleSelectedTruck(vendor)}
                          inputProps={{ "aria-label": "controlled" }}
                        />
                      </ListItemAvatar>
                    )}
                    {getTitle(vendor)}
                  </ListItemText>

                  {matches && (
                    <ListItemText sx={{ width: "200px" }}>
                      {vendor?.email || "N/A"}
                    </ListItemText>
                  )}
                  {matches && (
                    <ListItemText sx={{ width: "200px" }}>
                      {vendor.phoneNo || "N/A"}
                    </ListItemText>
                  )}

                  <OverlayTrigger
                    show={chosenVendor?._id === vendor._id}
                    placement="bottom"
                    overlay={popover}
                  >
                    <Avatar variant="rounded" className="btn">
                      {chosenVendor?._id === vendor._id ? (
                        <ExpandLessIcon
                          onClick={() => setChosenVendor()}
                          color="error"
                        />
                      ) : (
                        <ExpandMoreIcon
                          onClick={() => setChosenVendor(vendor)}
                          color="error"
                        />
                      )}
                    </Avatar>
                  </OverlayTrigger>
                </ListItem>
              </Container>
            ))}
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
                <VednorContactInfo vendor={detail} expandChild={expandChild} />
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

export default DeletedVendor;

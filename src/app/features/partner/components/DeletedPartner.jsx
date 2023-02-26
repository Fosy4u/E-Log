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
  IconButton,
  useMediaQuery,
  Button,
  TextField,
  Chip,
  Checkbox,
} from "@mui/material";
import { Box } from "@mui/system";
import Stack from "@mui/material/Stack";
import { Container, Popover, OverlayTrigger } from "react-bootstrap";
import { forwardRef, useEffect, useState } from "react";
import Image from "../../../images/noImage.jpeg";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";
import Banner from "../../../utils/Banner";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import PartnerContactInfo from "./PartnerContactInfo";
import RestoreAndDeletePartnerModal from "./RestoreAndDeletePartnerModal";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const DeletedPartner = ({ partners, isLoading }) => {
  const matches = useMediaQuery("(min-width:600px)");
  const [showModal, setShowModal] = useState(false);
  const [detail, setDetail] = useState({});
  const [input, setInput] = useState("");
  const [filteredData, setFilteredData] = useState(partners || []);
  const [chosenPartner, setChosenPartner] = useState();
  const [selectedPartners, setSelectedPartners] = useState([]);
  const mode = "restore";

  useEffect(() => {
    if (partners?.length > 0) {
      const searchRegex = new RegExp(escapeRegExp(input), "i");
      const result = partners?.filter(
        (partner) =>
          searchRegex.test(partner?.firstName) ||
          searchRegex.test(partner?.lastName) ||
          searchRegex.test(partner?.companyName) ||
          searchRegex.test(partner?.email) ||
          searchRegex.test(partner?.phone) ||
          searchRegex.test(partner?.address) ||
          searchRegex.test(partner?.city) ||
          searchRegex.test(partner?.region)
      );

      setFilteredData(result);
    } else {
      setFilteredData([]);
    }
  }, [input, partners]);

  function escapeRegExp(value) {
    return value.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
  }

  const onChange = (value) => {
    setInput(value);
  };

  const handleSelectedTruck = (item) => {
    const sel = [...selectedPartners];
    const found = sel.find((partner) => partner._id === item._id);
    const index = sel.indexOf(found);
    if (found) {
      sel.splice(index, 1);
    } else {
      sel.push(item);
    }

    setSelectedPartners(sel);
  };

  // control if item should be checked on not
  const checked = (item) => {
    const found = selectedPartners.find((partner) => partner._id === item._id);
    if (found) {
      return true;
    }
    return false;
  };

  const setSelectAll = () => {
    const newArr = [];
    // eslint-disable-next-line array-callback-return
    filteredData.map((partner) => {
      newArr.push(partner);
    });
    setSelectedPartners(newArr);
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
          onMouseLeave={() => setChosenPartner()}
        >
          <RestoreAndDeletePartnerModal
            selectedPartner={[chosenPartner] || []}
            setSelectedPartners={setSelectedPartners}
            mode={mode}
          />
        </Stack>
      </Popover.Body>
    </Popover>
  );

  return (
    <div>
      {partners?.length > 0 && (
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
            placeholder="Search Deleted Partners"
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

          {selectedPartners.length > 0 && (
            <div className="d-flex">
              <span className="m-2">
                <RestoreAndDeletePartnerModal
                  selectedPartner={selectedPartners || []}
                  setSelectedPartners={setSelectedPartners}
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
                onClick={() => setSelectedPartners([])}
              />
            </div>
          )}
        </Box>
      )}
      {partners?.length > 0 && (
        <div className="w-100 d-flex text-center justify-content-center ">
          <Banner
            show={true}
            variant="warning"
            severity={"warning"}
            className="mb-4"
          >
            <p>
              Deleted partners are only retained for 30 days after which will
              automatically delete permanently and can only be restored by contacting support.
            </p>
          </Banner>
        </div>
      )}
      <div style={{ height: "75vh", overflow: "scroll" }}>
        {filteredData.length > 0 && (
          <ListItem>
            <ListItem sx={{ width: matches ? "300px" : "75%" }}>
              <strong>Partner</strong>
            </ListItem>

            {matches && (
              <ListItem sx={{ width: "200px" }}>
                <strong>Email</strong>
              </ListItem>
            )}
            {matches && (
              <ListItem sx={{ width: "200px" }}>
                <strong>Phone</strong>
              </ListItem>
            )}
            <ListItem sx={{ width: matches ? "200px" : "25%" }}>
              <strong>Details</strong>
            </ListItem>
          </ListItem>
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
            filteredData.map((partner) => {
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
                            checked={checked(partner)}
                            onChange={() => handleSelectedTruck(partner)}
                            inputProps={{ "aria-label": "controlled" }}
                          />
                          <Avatar
                            alt="avatar"
                            src={partner?.imageUrl?.link || Image}
                          />
                        </ListItemAvatar>
                      )}
                      {getTitle(partner)}
                    </ListItem>

                    {matches && (
                      <ListItem sx={{ width: "200px" }}>
                        {partner?.email}
                      </ListItem>
                    )}
                    {matches && (
                      <ListItem sx={{ width: "200px" }}>
                        {partner.phoneNo}
                      </ListItem>
                    )}
                    <span
                      className="text-primary btn"
                      sx={{ width: matches ? "200px" : "20%" }}
                      onClick={() => {
                        setDetail({ ...partner });
                        setShowModal(true);
                      }}
                    >
                      details
                    </span>
                    <OverlayTrigger
                      show={chosenPartner?._id === partner._id}
                      placement="bottom"
                      overlay={popover}
                    >
                      <Avatar variant="rounded" className="btn">
                        {chosenPartner?._id === partner._id ? (
                          <ExpandLessIcon
                            onClick={() => setChosenPartner()}
                            color="error"
                          />
                        ) : (
                          <ExpandMoreIcon
                            onClick={() => setChosenPartner(partner)}
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
            {getTitle(detail)}
          </DialogTitle>
          <DialogContent>
            <PartnerContactInfo partner={detail} />
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

export default DeletedPartner;

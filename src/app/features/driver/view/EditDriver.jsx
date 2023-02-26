import {
  Button,
  FormControl,
  Grid,
  Icon,
  MenuItem,
  styled,
  useMediaQuery,
} from "@mui/material";

import { useEffect, useState } from "react";
import {
  SelectValidator,
  TextValidator,
  ValidatorForm,
} from "react-material-ui-form-validator";
import { Span } from "../../../components/Typography";
import SimpleCard from "../../../utils/SimpleCard";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import Loader from "../../../utils/Loader";
import { useNavigate, useParams } from "react-router-dom";
import organisationsApi from "../../../services/organisationsApi.slice";
import CustomButtons from "../components/CustomButtons";
import Main from "../../../components/Main";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import { async } from "@firebase/util";
import Banner from "../../../utils/Banner";
import { useSelector } from "react-redux";
import { globalSelectors } from "../../../global/global.slice";
import UploadContactImage from "../../../utils/UploadContactImage";

const Container = styled("div")(({ theme }) => ({
  margin: "30px",
  [theme.breakpoints.down("sm")]: { margin: "16px" },
  //   "& .breadcrumb": {
  //     marginBottom: "30px",
  //     [theme.breakpoints.down("sm")]: { marginBottom: "16px" },
  //   },
}));

const TextField = styled(TextValidator)(() => ({
  width: "100%",
  marginBottom: "16px",
}));
const Select = styled(SelectValidator)(() => ({
  width: "100%",
  marginBottom: "16px",
}));

const EditDriver = () => {
  const matches = useMediaQuery("(min-width:600px)");
  const token = useSelector(globalSelectors.selectAuthToken);
  const currentUser = useSelector(globalSelectors.selectCurrentUser);
  const { organisationId, driverId } = useParams();
  const [state, setState] = useState({ licenseExpiryDate: null });
  const navigate = useNavigate();

  const [getDriver] = organisationsApi.useLazyGetDriverByParamQuery();
  const [driverImage, setDriverImage] = useState("");
  const [resetImage, setResetImage] = useState(false);
  const [existingDriver, setExistingDriver] = useState(false);
  const [showBanner, setShowBanner] = useState(true);
  const [showLoading, setShowLoading] = useState(false);
  const [show, setShow] = useState(false);
  const [editDriver, editDriverStatus] =
    organisationsApi.useEditDriverMutation();
  const getDriverQuery = organisationsApi.useGetDriverQuery(
    {
      driverId,
    },
    { skip: !driverId || !token }
  );
  const currentDriver = getDriverQuery?.data?.data;

  useEffect(() => {
    if (currentDriver) {
      setState(currentDriver);
      return setShow(true);
    }
  }, [currentDriver]);

  const handleSubmit = async (event) => {
    setShowLoading(true);
    setExistingDriver(false);
    const phoneNo = state.phoneNo;
    await getDriver({
      phoneNo,
      organisationId,
    }).then((driver) => {
      if (driver.data.data._id && driver.data.data._id !== currentDriver?._id) {
        setShowBanner(true);
        return setExistingDriver(true);
      }
      setShowBanner(false);
      setShowLoading(false);
      submit();
    });
  };

  const submit = () => {
    const form = new FormData();
    form.append("file", driverImage);
    state.firstName && form.append("firstName", state.firstName);
    state.lastName && form.append("lastName", state.lastName);
    state.licenseExpiryDate &&
      form.append("licenseExpiryDate", state.licenseExpiryDate);
    state.phoneNo && form.append("phoneNo", state.phoneNo);
    state.licenseNo && form.append("licenseNo", state.licenseNo);
    state.address && form.append("address", state.address);
    organisationId && form.append("organisationId", organisationId);
    driverId && form.append("driverId", driverId);
    form.append("userId", currentUser?._id);

    const payload = form;

    editDriver({
      payload,
    })
      .then((data) => {
        if (data?.data?.data?._id) {
          navigate(`/e-log/${organisationId}/driver/${data?.data?.data?._id}`);
        }
      })

      .catch((e) => {
        console.error(e.data);
      });
  };

  const handleChange = (event) => {
    event.persist();
    setState({ ...state, [event.target.name]: event.target.value });
  };

  const {
    firstName,
    lastName,
    address,
    licenseNo,
    phoneNo,
    licenseExpiryDate,
  } = state;

  return (
    <div>
      <Main CustomButtons={CustomButtons} title="Edit Driver" className="mb-2">
        <Container>
          <SimpleCard bgcolor="rgba(0, 5, 145, 0.09)">
            {existingDriver && (
              <div className="w-100 d-flex text-center justify-content-center ">
                <Banner
                  show={showBanner}
                  variant="warning"
                  handleClose={() => setShowBanner(false)}
                  className="mb-4"
                >
                  <p>
                    <b>
                      Error! It appears another driver in the system has similar
                      entered phone number
                    </b>
                    ,
                  </p>
                </Banner>
              </div>
            )}
            {!getDriverQuery.isLoading &&
              !currentDriver &&
              driverId &&
              token && (
                <div className="w-100 d-flex text-center justify-content-center ">
                  <Banner
                    show={showBanner}
                    variant="warning"
                    severity={"info"}
                    handleClose={() => setShowBanner(false)}
                    className="mb-4"
                  >
                    <p>
                      <b>
                        Driver not found. Please ensure the selected driver is
                        on the system and not deleted.
                      </b>
                    </p>
                  </Banner>
                </div>
              )}
            <div>
              <ValidatorForm onSubmit={handleSubmit} onError={() => null}>
                <Loader
                  showLoading={editDriverStatus?.isLoading || showLoading}
                />
                <Grid container spacing={6} className="mb-4">
                  <Grid item lg={6} md={6} sm={12} xs={12}>
                    <UploadContactImage
                      setImage={setDriverImage}
                      resetImage={resetImage}
                      setResetImage={setResetImage}
                      defaultImage={currentDriver?.imageUrl?.link}
                    />
                  </Grid>
                  <Grid item lg={6} md={6} sm={12} xs={12}>
                    <TextField
                      size="small"
                      type="text"
                      name="firstName"
                      id="standard-basic"
                      value={firstName || ""}
                      onChange={handleChange}
                      errorMessages={["First name is required"]}
                      label="First Name"
                      validators={["required"]}
                    />

                    <TextField
                      size="small"
                      type="text"
                      name="lastName"
                      label="Last Name"
                      onChange={handleChange}
                      value={lastName || ""}
                      validators={["required"]}
                      errorMessages={["Last name is required"]}
                    />
                    <TextField
                      size="small"
                      type="text"
                      name="address"
                      label="Address"
                      onChange={handleChange}
                      value={address || ""}
                      validators={["required"]}
                      errorMessages={["address is required"]}
                    />

                    <TextField
                      size="small"
                      name="phoneNo"
                      type="text"
                      label="Phone Number"
                      value={phoneNo || ""}
                      onChange={handleChange}
                      validators={["required"]}
                      errorMessages={["Phone number is required"]}
                    />

                    <TextField
                      size="small"
                      type="text"
                      name="licenseNo"
                      value={licenseNo || ""}
                      label="License Number"
                      onChange={handleChange}
                      validators={["required"]}
                      errorMessages={["License number is required"]}
                    />

                    <FormControl className="me-1 " size="small" fullWidth>
                      <LocalizationProvider dateAdapter={AdapterDateFns}>
                        {matches ? (
                          <DesktopDatePicker
                            label="License Expiry Date"
                            inputFormat="dd/MM/yyyy"
                            name="licenseExpiryDate"
                            value={licenseExpiryDate}
                            onChange={(e) =>
                              setState({
                                ...state,
                                licenseExpiryDate: e,
                              })
                            }
                            renderInput={(params) => (
                              <TextField
                                size="small"
                                {...params}
                                validators={["required"]}
                                name="licenseExpiryDate"
                                value={licenseExpiryDate}
                                errorMessages={[
                                  "License expiry date is required",
                                ]}
                              />
                            )}
                            size="small"
                          />
                        ) : (
                          <MobileDatePicker
                            label="License Expiry Date"
                            inputFormat="dd/MM/yyyy"
                            size="small"
                            name="licenseExpiryDate"
                            value={licenseExpiryDate}
                            onChange={(e) =>
                              setState({
                                ...state,
                                licenseExpiryDate: e,
                              })
                            }
                            renderInput={(params) => (
                              <TextField
                                size="small"
                                {...params}
                                validators={["required"]}
                                name="licenseExpiryDate"
                                value={licenseExpiryDate}
                                errorMessages={[
                                  "License expiry date is required",
                                ]}
                              />
                            )}
                          />
                        )}
                      </LocalizationProvider>
                    </FormControl>
                  </Grid>
                </Grid>

                <div className="w-100 d-flex justify-content-center">
                  <Button
                    color="primary"
                    variant="contained"
                    type="submit"
                    className="w-25 m-1"
                    disabled={editDriverStatus?.isLoading}
                  >
                    <Icon>send</Icon>
                    <Span sx={{ pl: 1, textTransform: "capitalize" }}>
                      Submit
                    </Span>
                  </Button>
                  <Button
                    color="primary"
                    variant="outlined"
                    className="w-25 m-1"
                    onClick={() => {
                      setState(currentDriver);
                      setResetImage(true);
                      setDriverImage();
                      setTimeout(() => {
                        setResetImage(false);
                      }, 1000);
                    }}
                    disabled={editDriverStatus?.isLoading}
                  >
                    <RestartAltIcon />
                    <Span sx={{ pl: 1, textTransform: "capitalize" }}>
                      Reset
                    </Span>
                  </Button>
                </div>
              </ValidatorForm>
            </div>
          </SimpleCard>
        </Container>
      </Main>
    </div>
  );
};

export default EditDriver;

import {
  FormControl,
  FormHelperText,
  InputLabel,
  Select,
  TextareaAutosize,
  TextField,
  useMediaQuery,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import organisationsApi from "../../../services/organisationsApi.slice";
import { useNavigate, useParams } from "react-router-dom";
import CountrySelector from "../../../utils/CountrySelector";
import { globalSelectors } from "../../../global/global.slice";
import Banner from "../../../utils/Banner";
import Loader from "../../../utils/Loader";
import { forwardRef } from "react";
import { useImperativeHandle } from "react";
import _ from "lodash";

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const CustomerForm = forwardRef(
  ({ customer, mode, callback, value, setValue }, ref) => {
    const matches = useMediaQuery("(min-width:600px)");
    const { organisationId } = useParams();
    const currentUser = useSelector(globalSelectors.selectCurrentUser);
    const [bannerError, setBannerError] = useState();
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNo, setPhoneNo] = useState("");
    const [type, setType] = useState("individual");
    const [address, setAddress] = useState("");

    const [region, setRegion] = useState("Lagos~LA");
    const [postCode, setPostCode] = useState("");
    const [country, setCountry] = useState("Nigeria");
    const [errormessages, setErrormessages] = useState("");
    const [salutation, setSalutation] = useState("");
    const [companyName, setCompanyName] = useState("");
    const [localGovernmentArea, setLocalGovernmentArea] = useState("");
    const [website, setWebsite] = useState("");
    const [twitter, setTwitter] = useState("");
    const [facebook, setFacebook] = useState("");
    const [instagram, setInstagram] = useState("");
    const [remark, setRemark] = useState();
    const [createCustomer, createCustomerStatus] =
      organisationsApi.useCreateCustomerMutation();
    const createError = createCustomerStatus?.error;
    const [editCustomer, editCustomerStatus] =
      organisationsApi.useEditCustomerMutation();
    const editError = editCustomerStatus?.error;

    const social = {
      ...(twitter && { twitter }),
      ...(facebook && { facebook }),
      ...(instagram && { instagram }),
      ...(website && { website }),
    };

    useEffect(() => {
      if (customer) {
        setFirstName(customer.firstName);
        setLastName(customer.lastName);
        setEmail(customer.email);
        setPhoneNo(customer.phoneNo);
        setType(customer.type);
        setAddress(customer.address);

        setRegion(customer.region);
        setPostCode(customer.postCode);
        setCountry(customer.country);
        setSalutation(customer.salutation);
        setCompanyName(customer.companyName);
        setLocalGovernmentArea(customer.localGovernmentArea);
        setWebsite(customer.social?.website);
        setTwitter(customer.social?.twitter);
        setFacebook(customer.social?.facebook);
        setInstagram(customer.social?.instagram);

        setRemark(customer.remark);
      } else {
        setFirstName("");
        setLastName("");
        setEmail("");
        setPhoneNo("");
        setType("individual");
        setAddress("");
        setRegion("");
        setPostCode("");
        setCountry("");
        setSalutation("");
        setCompanyName("");
        setLocalGovernmentArea("");
        setWebsite("");
        setTwitter("");
        setFacebook("");
        setInstagram("");

        setRemark("");
      }
    }, [customer]);

    useEffect(() => {
      if (editError?.originalStatus === 400) {
        return setBannerError(editError?.data);
      }
      if (createError?.originalStatus === 400) {
        return setBannerError(createError?.data);
      }
    }, [editError, createError]);

    const validateForm = () => {
      let errors = {};
      let formIsValid = true;

      if (!firstName) {
        formIsValid = false;
        errors["firstName"] = "*Please enter first name.";
      }
      if (!lastName) {
        formIsValid = false;
        errors["lastName"] = "*Please enter first name.";
      }

      if (!phoneNo) {
        formIsValid = false;
        errors["phoneNo"] = "*Please enter phone number.";
      }

      if (!type) {
        formIsValid = false;
        errors["type"] = "*Please choose type.";
      }

      console.log(errors);
      setErrormessages(errors);

      return formIsValid;
    };

    const handleSaveCick = () => {
      setBannerError();

      const payload = {
        ...(organisationId !== customer?.organisationId && { organisationId }),
        ...(currentUser?._id &&
          currentUser?._id !== customer?.userId && {
            userId: currentUser?._id,
          }),
        ...(customer?._id && { _id: customer?._id }),
        ...(email && email !== customer?.email && { email }),
        ...(firstName && firstName !== customer?.firstName && { firstName }),
        ...(lastName && lastName !== customer?.lastName && { lastName }),
        ...(phoneNo && phoneNo !== customer?.phoneNo && { phoneNo }),
        ...(type && type !== customer?.type && { type }),
        ...(address && address !== customer?.address && { address }),

        ...(region && region !== customer?.region && { region }),
        ...(postCode && postCode !== customer?.postCode && { postCode }),
        ...(country && country !== customer?.country && { country }),
        ...(salutation &&
          salutation !== customer?.salutation && { salutation }),
        ...(companyName &&
          companyName !== customer?.companyName && {
            companyName,
          }),
        ...(localGovernmentArea &&
          localGovernmentArea !== customer?.localGovernmentArea && {
            localGovernmentArea,
          }),
        ...(social && !_.isEqual(social, customer?.social) && { social }),
        ...(remark && { remark }),
      };
      if (mode === "edit") {
        return editCustomer({
          payload,
        })
          .unwrap()
          .then((data) => {
            if (data?.data) {
              callback();
            }
          })
          .catch((e) => {
            console.error(e.response);
          });
      }
      createCustomer({
        payload,
      })
        .unwrap()
        .then(() => {
          resetStates();
          callback();
        })
        .catch((e) => {
          console.error(e.response);
        });
    };

    const handleChange = (event, newValue) => {
      setValue(newValue);
    };

    const resetStates = () => {
      setValue(0);
      setFirstName(customer?.firstName || "");
      setLastName(customer?.lastName || "");
      setEmail(customer?.email || "");
      setPhoneNo(customer?.phoneNo || "");
      setType(customer?.type || "individual");
      setAddress(customer?.address || "");
      setRegion(customer?.region || "");
      setPostCode(customer?.postCode || "");
      setCountry(customer?.country || "");
      setErrormessages("");
      setSalutation(customer?.salutation || "");
      setCompanyName(customer?.companyName || "");
      setLocalGovernmentArea(customer?.localGovernmentArea || "");
      setWebsite(customer?.social?.website || "");
      setTwitter(customer?.social?.twitter || "");
      setFacebook(customer?.social?.facebook || "");
      setInstagram(customer?.social?.instagram || "");

      setRemark("");
    };

    const handleNextClick = () => {
      if (value === 0) {
        return validateForm() && setValue(value + 1);
      }
      return setValue(value + 1);
    };

    useImperativeHandle(ref, () => ({
      handleSaveCick,
      handleNextClick,
      validateForm,
      resetStates,
    }));
    return (
      <div style={{ height: matches ? "90%" : "100%" }}>
        <div style={{ flexGrow: 1, textAlign: "center" }}>
          <Banner
            show={bannerError ? true : false}
            variant="warning"
            handleClose={() => setBannerError()}
            className="mb-4"
          >
            <p>{bannerError}</p>
          </Banner>
        </div>
        <Loader
          showLoading={
            createCustomerStatus?.isLoading || editCustomerStatus?.isLoading
          }
        />
        <Box sx={{ width: "100%" }}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs
              scrollButtons
              allowScrollButtonsMobile
              variant={!matches ? "scrollable" : "fullWidth"}
              value={value}
              onChange={handleChange}
              aria-label="basic tabs example"
            >
              <Tab label="Basic" {...a11yProps(0)} />
              <Tab label="Additional" {...a11yProps(1)} />
            </Tabs>
          </Box>
          {value === 0 && (
            <div style={{ height: "45vh" }}>
              <span className="d-flex">
                <FormControl sx={{ width: "50%" }} className="me-1  mt-3">
                  <InputLabel>Type</InputLabel>
                  <Select
                    size="small"
                    native
                    required
                    fullWidth
                    value={type || ""}
                    onChange={(e) => setType(e.target.value)}
                  >
                    <option value={"individual"}>Individual</option>
                    <option value={"company"}>Company</option>
                  </Select>

                  <FormHelperText className="text-danger fs-7">
                    {!type && errormessages?.type}
                  </FormHelperText>
                </FormControl>
                <FormControl sx={{ width: "50%" }} className="ms-1 mt-3">
                  <InputLabel>Salutation</InputLabel>
                  <Select
                    size="small"
                    native
                    fullWidth
                    value={salutation || ""}
                    onChange={(e) => setSalutation(e.target.value)}
                  >
                    <option></option>
                    <option value={"Mr."}>Mr.</option>
                    <option value={"Mrs."}>Mrs.</option>
                    <option value={"Ms."}>Ms.</option>
                    <option value={"Miss."}>Miss.</option>
                    <option value={"Dr"}>Dr</option>
                    <option value={"Chief"}>Chief</option>
                    <option value={"Hon"}>Hon</option>
                    <option value={"Lawyer"}>Lawyer</option>
                  </Select>
                </FormControl>

                {/* <FormControl sx={{ width: "50%" }} className="ms-1">
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={enablePartnerPortal}
                        onClick={() =>
                          setEnablePartnerPortal(!enablePartnerPortal)
                        }
                      />
                    }
                    label="Partner Portal (enable customer to have access to our customer app)"
                  />
                </FormControl> */}
              </span>

              <span className="d-flex">
                <FormControl sx={{ width: "50%" }} className="me-1">
                  <TextField
                    margin="normal"
                    size="small"
                    required
                    fullWidth
                    id="FirstName"
                    label="First Name"
                    name="FirstName"
                    autoFocus
                    value={firstName || ""}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                  <FormHelperText className="text-danger fs-7">
                    {!lastName && errormessages?.lastName}
                  </FormHelperText>
                </FormControl>
                <FormControl sx={{ width: "50%" }} className="ms-1">
                  <TextField
                    margin="normal"
                    size="small"
                    required
                    fullWidth
                    id="LastName"
                    label="Last Name"
                    name="LastName"
                    autoFocus
                    value={lastName || ""}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                  <FormHelperText className="text-danger fs-7">
                    {!firstName && errormessages?.firstName}
                  </FormHelperText>
                </FormControl>
              </span>

              <span className="d-flex">
                <FormControl sx={{ width: "50%" }} className="me-1">
                  <TextField
                    margin="normal"
                    size="small"
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    value={email || ""}
                    onChange={(e) => setEmail(e.target.value)}
                    autoFocus
                  />
                </FormControl>
                <FormControl sx={{ width: "50%" }} className="ms-1">
                  <TextField
                    margin="normal"
                    size="small"
                    fullWidth
                    required
                    name="phoneNo"
                    label="Phone No"
                    type="number"
                    id="phoneNo"
                    value={phoneNo || ""}
                    onChange={(e) => setPhoneNo(e.target.value)}
                  />
                  <FormHelperText className="text-danger fs-7">
                    {!phoneNo && errormessages?.phoneNo}
                  </FormHelperText>
                </FormControl>
              </span>
              <span className="d-flex">
                <FormControl sx={{ width: "50%" }} className="me-1">
                  <TextField
                    margin="normal"
                    size="small"
                    fullWidth
                    label="Company name"
                    name="LastName"
                    autoFocus
                    value={companyName || ""}
                    onChange={(e) => setCompanyName(e.target.value)}
                  />
                </FormControl>
                <FormControl sx={{ width: "50%" }} className="ms-1">
                  <TextField
                    margin="normal"
                    size="small"
                    fullWidth
                    label="Address"
                    autoFocus
                    value={address || ""}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </FormControl>
              </span>
              <span className="mt-3">
                <CountrySelector
                  country={country || "Nigeria"}
                  setCountry={setCountry}
                  region={region}
                  setRegion={setRegion}
                />
              </span>
            </div>
          )}

          {value === 1 && (
            <div style={{ height: "45vh" }}>
              <span className="d-flex">
                <FormControl sx={{ width: "50%" }} className="me-1">
                  <TextField
                    size="small"
                    fullWidth
                    label="PostCode / P.O.Box"
                    value={postCode || ""}
                    onChange={(e) => setPostCode(e.target.value)}
                  />
                </FormControl>
                <FormControl sx={{ width: "50%" }} className="ms-1">
                  <TextField
                    size="small"
                    fullWidth
                    label="LGA / Borough"
                    value={localGovernmentArea || ""}
                    onChange={(e) => setLocalGovernmentArea(e.target.value)}
                  />
                </FormControl>
              </span>
              <span className="d-flex">
                <FormControl
                  sx={{ width: "100%", flexDirection: "row" }}
                  className="me-1"
                >
                  <TextField
                    className="me-1"
                    size="small"
                    fullWidth
                    id="website"
                    label="website url"
                    name="website"
                    value={website || ""}
                    onChange={(e) => setWebsite(e.target.value)}
                  />
                  <TextField
                    className="ms-1"
                    size="small"
                    fullWidth
                    name="twitter"
                    label="Twitter"
                    type="text"
                    value={twitter || ""}
                    onChange={(e) => setTwitter(e.target.value)}
                  />
                </FormControl>
              </span>
              <span className="d-flex">
                <FormControl
                  sx={{ width: "100%", flexDirection: "row" }}
                  className="me-1"
                >
                  <TextField
                    className="me-1"
                    size="small"
                    fullWidth
                    name="instagram"
                    label="Instagram url"
                    type="text"
                    value={instagram || ""}
                    onChange={(e) => setInstagram(e.target.value)}
                  />
                  <TextField
                    className="ms-1"
                    size="small"
                    fullWidth
                    name="facebook"
                    label="Facebook url"
                    type="text"
                    value={facebook || ""}
                    onChange={(e) => setFacebook(e.target.value)}
                  />
                </FormControl>
              </span>
              {mode !== "edit" && (
                <div className="d-flex flex-column justify-content-center align-items-center ">
                  <InputLabel>Remark (only for internal use)</InputLabel>
                  <FormControl sx={{ m: 1, width: "90%" }}>
                    <TextareaAutosize
                      size="small"
                      value={remark || ""}
                      onChange={(e) => setRemark(e.target.value)}
                      minRows={6}
                    />
                  </FormControl>
                </div>
              )}
            </div>
          )}
        </Box>
      </div>
    );
  }
);

export default CustomerForm;

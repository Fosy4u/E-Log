import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormHelperText,
  FormLabel,
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
import { useParams } from "react-router-dom";
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

const VendorAgentForm = forwardRef(
  (
    {
      vendorAgent,
      mode,
      callback,
      value,
      setValue,
      setDisableSave,
      classificationValue,
    },
    ref
  ) => {
    const matches = useMediaQuery("(min-width:600px)");
    const { organisationId } = useParams();
    const currentUser = useSelector(globalSelectors.selectCurrentUser);
    const vendorAgentClassification = useSelector(
      globalSelectors.selectOrganisation
    )?.vendorAgentClassification;

    const [bannerError, setBannerError] = useState();
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNo, setPhoneNo] = useState("");
    const [type, setType] = useState("individual");
    const [address, setAddress] = useState("");
    const [classification, setClassification] = useState("");
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
    const [createCustomer, createVendorAgentStatus] =
      organisationsApi.useCreateVendorMutation();
    const createError = createVendorAgentStatus?.error;
    const [editVendor, editVendorStatus] =
      organisationsApi.useEditVendorMutation();
    const editError = editVendorStatus?.error;

    const social = {
      ...(twitter && { twitter }),
      ...(facebook && { facebook }),
      ...(instagram && { instagram }),
      ...(website && { website }),
    };

    useEffect(() => {
      if (vendorAgent) {
        setFirstName(vendorAgent.firstName);
        setLastName(vendorAgent.lastName);
        setEmail(vendorAgent.email);
        setPhoneNo(vendorAgent.phoneNo);
        setType(vendorAgent.type || "individual");
        setAddress(vendorAgent.address);

        setRegion(vendorAgent.region);
        setPostCode(vendorAgent.postCode);
        setCountry(vendorAgent.country);
        setSalutation(vendorAgent.salutation);
        setCompanyName(vendorAgent.companyName);
        setLocalGovernmentArea(vendorAgent.localGovernmentArea);
        setWebsite(vendorAgent.social?.website);
        setTwitter(vendorAgent.social?.twitter);
        setFacebook(vendorAgent.social?.facebook);
        setInstagram(vendorAgent.social?.instagram);
        setClassification(vendorAgent?.classification);
        setRemark(vendorAgent.remark);
        if (
          !vendorAgent.classification ||
          !vendorAgent.firstName ||
          !vendorAgent.lastName ||
          !vendorAgent.phoneNo
        ) {
          return setDisableSave(true);
        }
        return setDisableSave(false);
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
        setClassification("");
        setRemark("");
      }
      if (classificationValue && !vendorAgent) {
        setClassification(classificationValue);
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [vendorAgent, classificationValue]);

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

      if (!classification) {
        formIsValid = false;
        errors["classification"] = "*Please choose classification.";
      }
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

      setErrormessages(errors);

      return formIsValid;
    };
    const checkDisableSave = () => {
      let formIsValid = false;

      if (!classification || !firstName || !lastName || !phoneNo || !type) {
        formIsValid = true;
      }

      return formIsValid;
    };

    const handleSaveCick = () => {
      setBannerError();

      const payload = {
        ...(organisationId && {
          organisationId,
        }),
        ...(currentUser?._id &&
          currentUser?._id !== vendorAgent?.userId && {
            userId: currentUser?._id,
          }),
        ...(vendorAgent?._id && { _id: vendorAgent?._id }),
        ...(vendorAgent?._id && { vendorAgentId: vendorAgent?._id }),
        ...(email && email !== vendorAgent?.email && { email }),
        ...(firstName && firstName !== vendorAgent?.firstName && { firstName }),
        ...(lastName && lastName !== vendorAgent?.lastName && { lastName }),
        ...(phoneNo && phoneNo !== vendorAgent?.phoneNo && { phoneNo }),
        ...(type && type !== vendorAgent?.type && { type }),
        ...(address && address !== vendorAgent?.address && { address }),

        ...(region && region !== vendorAgent?.region && { region }),
        ...(postCode && postCode !== vendorAgent?.postCode && { postCode }),
        ...(country && country !== vendorAgent?.country && { country }),
        ...(salutation &&
          salutation !== vendorAgent?.salutation && { salutation }),
        ...(companyName &&
          companyName !== vendorAgent?.companyName && {
            companyName,
          }),
        ...(classification &&
          classification !== vendorAgent?.classification && {
            classification,
          }),
        ...(localGovernmentArea &&
          localGovernmentArea !== vendorAgent?.localGovernmentArea && {
            localGovernmentArea,
          }),
        ...(social && !_.isEqual(social, vendorAgent?.social) && { social }),
        ...(remark && { remark }),
      };
      if (mode === "edit") {
        return editVendor({
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
      setFirstName(vendorAgent?.firstName || "");
      setLastName(vendorAgent?.lastName || "");
      setEmail(vendorAgent?.email || "");
      setPhoneNo(vendorAgent?.phoneNo || "");
      setType(vendorAgent?.type || "individual");
      setAddress(vendorAgent?.address || "");
      setRegion(vendorAgent?.region || "");
      setPostCode(vendorAgent?.postCode || "");
      setCountry(vendorAgent?.country || "");
      setErrormessages("");
      setSalutation(vendorAgent?.salutation || "");
      setCompanyName(vendorAgent?.companyName || "");
      setLocalGovernmentArea(vendorAgent?.localGovernmentArea || "");
      setWebsite(vendorAgent?.social?.website || "");
      setTwitter(vendorAgent?.social?.twitter || "");
      setFacebook(vendorAgent?.social?.facebook || "");
      setInstagram(vendorAgent?.social?.instagram || "");
      setClassification(vendorAgent?.classification || "");

      setRemark("");
    };

    const handleNextClick = () => {
      if (value === 0) {
        if (!classification) {
          let errors = {};
          errors["classification"] = "*Please choose classification.";
          setErrormessages(errors);
        }
        return classification && setValue(value + 1);
      }
      if (value === 1) {
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
            createVendorAgentStatus?.isLoading || editVendorStatus?.isLoading
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
              <Tab label="Classification" {...a11yProps(0)} />
              <Tab label="Basic" {...a11yProps(1)} disabled={!classification} />
              <Tab
                label="Additional"
                {...a11yProps(2)}
                disabled={!classification}
              />
            </Tabs>
          </Box>
          {value === 0 && (
            <FormControl
              style={{ height: "45vh" }}
              component="fieldset"
              variant="standard"
            >
              <FormLabel component="legend">
                Assign Classification{" "}
                <FormHelperText className="text-danger fs-7">
                  {!classification && errormessages?.classification}
                </FormHelperText>
              </FormLabel>

              <FormGroup required>
                {vendorAgentClassification?.map((item) => (
                  <span key={item?.value}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          onChange={(e) => {
                            setClassification(item?.value);
                            setDisableSave(checkDisableSave());
                          }}
                          checked={item?.value === classification}
                        />
                      }
                      label={item?.name}
                    />
                    <FormHelperText>{item?.description}</FormHelperText>
                  </span>
                ))}
              </FormGroup>
            </FormControl>
          )}
          {value === 1 && (
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
                    onChange={(e) => {
                      setType(e.target.value);
                      setDisableSave(checkDisableSave());
                    }}
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
                    onChange={(e) => {
                      setFirstName(e.target.value);
                      setDisableSave(checkDisableSave());
                    }}
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
                    onChange={(e) => {
                      setLastName(e.target.value);
                      setDisableSave(checkDisableSave());
                    }}
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
                    onChange={(e) => {
                      setPhoneNo(e.target.value);
                      setDisableSave(checkDisableSave());
                    }}
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

          {value === 2 && (
            <div style={{ height: "45vh" }}>
              <span className="d-flex">
                <FormControl sx={{ width: "50%" }} className="me-1">
                  <TextField
                    margin="normal"
                    size="small"
                    fullWidth
                    label="PostCode / P.O.Box"
                    value={postCode || ""}
                    onChange={(e) => setPostCode(e.target.value)}
                  />
                </FormControl>
                <FormControl sx={{ width: "50%" }} className="ms-1">
                  <TextField
                    margin="normal"
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
                    margin="normal"
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
                    margin="normal"
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
                    margin="normal"
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
                    margin="normal"
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

export default VendorAgentForm;

import {
  FormControl,
  Grid,
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
import UploadContactImage from "../../../utils/UploadContactImage";
import _ from "lodash";

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const CreadeAndEditPartnerForm = forwardRef(
  ({ partner, mode, callback, value, setValue }, ref) => {

    const navigate = useNavigate();
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
 
    const [region, setRegion] = useState("Lagos");
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
    const [image, setImage] = useState("");
    const [resetImage, setResetImage] = useState(false);
    const [gender, setGender] = useState();
    const [remark, setRemark] = useState();
    const [createPartner, createPartnerStatus] =
      organisationsApi.useCreatePartnerMutation();
    const createError = createPartnerStatus?.error;
    const [editPartner, editPartnerStatus] =
      organisationsApi.useEditPartnerMutation();
    const editError = editPartnerStatus?.error;

    const social = {
      ...(twitter && { twitter }),
      ...(facebook && { facebook }),
      ...(instagram && { instagram }),
      ...(website && { website }),
    };

    useEffect(() => {
      if (partner) {
        setFirstName(partner.firstName);
        setLastName(partner.lastName);
        setEmail(partner.email);
        setPhoneNo(partner.phoneNo);
        setType(partner.type);
        setAddress(partner.address);

        setRegion(partner.region);
        setPostCode(partner.postCode);
        setCountry(partner.country);
        setSalutation(partner.salutation);
        setCompanyName(partner.companyName);
        setLocalGovernmentArea(partner.localGovernmentArea);
        setWebsite(partner.social?.website);
        setTwitter(partner.social?.twitter);
        setFacebook(partner.social?.facebook);
        setInstagram(partner.social?.instagram);
        setGender(partner.gender);
        setRemark(partner.remark);
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
        setGender("");
        setRemark("");
        setImage();
        setResetImage(false);
        
      }
    }, [partner]);

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
      if (!email) {
        formIsValid = false;
        errors["email"] = "*Please enter email.";
      }
      if (!phoneNo) {
        formIsValid = false;
        errors["phoneNo"] = "*Please enter phone number.";
      }
      if (!address) {
        formIsValid = false;
        errors["address"] = "*Please enter address.";
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
      console.log("ob", Object.keys(social).length);
      const form = new FormData();
      form.append("file", image);
      form.append("userId", currentUser?._id);
      partner?._id && form.append("_id", partner?._id);
      !partner?.organisationId && form.append("organisationId", organisationId);
      email && email !== partner?.email && form.append("email", email);
      firstName &&
        firstName !== partner?.firstName &&
        form.append("firstName", firstName);
      lastName &&
        lastName !== partner?.lastName &&
        form.append("lastName", lastName);
      phoneNo &&
        phoneNo !== partner?.phoneNo &&
        form.append("phoneNo", phoneNo);
      type && type !== partner?.type && form.append("type", type);
      address &&
        address !== partner?.address &&
        form.append("address", address);
     
      region && region !== partner?.region && form.append("region", region);
      postCode &&
        postCode !== partner?.postCode &&
        form.append("postCode", postCode);
      country &&
        country !== partner?.country &&
        form.append("country", country);
      salutation &&
        salutation !== partner?.salutation &&
        form.append("salutation", salutation);
      companyName &&
        companyName !== partner?.companyName &&
        form.append("companyName", companyName);
      localGovernmentArea &&
        localGovernmentArea !== partner?.localGovernmentArea &&
        form.append("localGovernmentArea", localGovernmentArea);

      !_.isEqual(social, partner?.social) &&
        form.append("social", JSON.stringify(social));
      remark && form.append("remark", remark);

      const payload = form;
      if (mode === "edit") {
        return editPartner({
          payload,
        })
          .unwrap()
          .then((data) => {
            if (data?.data) {
              navigate(-1);
            }
          })
          .catch((e) => {
            console.error(e.response);
          });
      }
      createPartner({
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
      setFirstName(partner?.firstName || "");
      setLastName(partner?.lastName || "");
      setEmail(partner?.email || "");
      setPhoneNo(partner?.phoneNo || "");
      setType(partner?.type || "individual");
      setAddress(partner?.address || "");
   
      setRegion(partner?.region || "");
      setPostCode(partner?.postCode || "");
      setCountry(partner?.country || "");
      setErrormessages("");
      setSalutation(partner?.salutation || "");
      setCompanyName(partner?.companyName || "");
      setLocalGovernmentArea(partner?.localGovernmentArea || "");
      setWebsite(partner?.social?.website || "");
      setTwitter(partner?.social?.twitter || "");
      setFacebook(partner?.social?.facebook || "");
      setInstagram(partner?.social?.instagram || "");
      setGender(partner?.gender || "");
      setRemark("");
      setResetImage(true);
      setImage();
      setTimeout(() => {
        setResetImage(false);
      }, 1000);
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
            createPartnerStatus?.isLoading || editPartnerStatus?.isLoading
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
            <Grid container spacing={6} className="mb-4">
              <Grid item lg={6} md={6} sm={12} xs={12}>
                <span className="d-flex mt-2">
                  <UploadContactImage
                    setImage={setImage}
                    resetImage={resetImage}
                    setResetImage={setResetImage}
                    uploadText="Upload Partner Image / Logo"
                    imageHeight={300}
                    cardSize={matches ? "50vh" : "50vh"}
                    defaultImage={partner?.imageUrl?.link}
                  />
                </span>
              </Grid>
              <Grid item lg={6} md={6} sm={12} xs={12}>
                <span className="d-flex">
                  <FormControl sx={{ width: "50%" }} className="me-1  mt-3">
                    <InputLabel>Type</InputLabel>
                    
                    <Select
                      native
                      required
                      fullWidth
                      value={type || ""}
                      onChange={(e) => setType(e.target.value)}
                    >
                      <option value={"individual"}>Individual</option>
                      <option value={"company"}>Company</option>
                    </Select>

                    <p className="text-danger fs-7">
                      {!type && errormessages?.type}
                    </p>
                  </FormControl>
                  <FormControl sx={{ width: "50%" }} className="ms-1 mt-3">
                    <InputLabel>Salutation</InputLabel>
                    <Select
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
                    label="Partner Portal (enable partner to have access to our partner app)"
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
                    <p className="text-danger fs-7">
                      {!lastName && errormessages?.lastName}
                    </p>
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
                    <p className="text-danger fs-7">
                      {!firstName && errormessages?.firstName}
                    </p>
                  </FormControl>
                </span>

                <span className="d-flex">
                  <FormControl sx={{ width: "50%" }} className="me-1">
                    <TextField
                      margin="normal"
                      size="small"
                      required
                      fullWidth
                      id="email"
                      label="Email Address"
                      name="email"
                      autoComplete="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      autoFocus
                    />
                    <p className="text-danger fs-7">
                      {!email && errormessages?.email}
                    </p>
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
                      value={phoneNo}
                      onChange={(e) => setPhoneNo(e.target.value)}
                    />
                    <p className="text-danger fs-7">
                      {!phoneNo && errormessages?.phoneNo}
                    </p>
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
                      required
                      label="Address"
                      autoFocus
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                    />
                    <p className="text-danger fs-7">
                      {!address && errormessages?.address}
                    </p>
                  </FormControl>
                </span>
                <div className="mt-3">
                  <CountrySelector
                    country={country}
                    setCountry={setCountry}
                    region={region}
                    setRegion={setRegion}
                  />
                </div>
              </Grid>
            </Grid>
          )}

          {value === 1 && (
            <>
              <span className="d-flex">
                <FormControl sx={{ width: "50%" }} className="me-1">
                  <TextField
                    margin="normal"
                    size="small"
                    fullWidth
                    label="PostCode / P.O.Box"
                    value={postCode}
                    onChange={(e) => setPostCode(e.target.value)}
                  />
                </FormControl>
                <FormControl sx={{ width: "50%" }} className="ms-1">
                  <TextField
                    margin="normal"
                    size="small"
                    fullWidth
                    label="LGA / Borough"
                    value={localGovernmentArea}
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
                    margin="normal"
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
                    margin="normal"
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
                    margin="normal"
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
                    margin="normal"
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
                      minRows={7}
                    />
                  </FormControl>
                </div>
              )}
            </>
          )}
        </Box>
      </div>
    );
  }
);

export default CreadeAndEditPartnerForm;

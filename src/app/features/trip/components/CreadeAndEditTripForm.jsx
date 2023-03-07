import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  InputLabel,
  Radio,
  RadioGroup,
  TextareaAutosize,
  TextField,
  useMediaQuery,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Box from "@mui/material/Box";
import organisationsApi from "../../../services/organisationsApi.slice";
import { useNavigate, useParams } from "react-router-dom";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { globalSelectors } from "../../../global/global.slice";
import Banner from "../../../utils/Banner";
import Loader from "../../../utils/Loader";
import { forwardRef } from "react";
import { useImperativeHandle } from "react";
import { getTitle } from "../../../utils/getTitle";
import InventoryIcon from "@mui/icons-material/Inventory";
import ConnectWithoutContactIcon from "@mui/icons-material/ConnectWithoutContact";
import AddEditVendorAgent from "../../vendorAgent/components/AddEditVendorAgent";
import CustomMenuSelect from "../../../utils/customSelect/CustomMenuSelect";
import AddEditCustomer from "../../customer/components/AddEditCustomer";
import { Span } from "../../../components/Typography";

const CreadeAndEditTripForm = forwardRef(
  ({ trip, mode, callback, value, setValue }, ref) => {
    const navigate = useNavigate();
    const token = useSelector(globalSelectors.selectAuthToken);
    const matches = useMediaQuery("(min-width:600px)");
    const { organisationId } = useParams();
    const currentUser = useSelector(globalSelectors.selectCurrentUser);
    const [bannerError, setBannerError] = useState();
    const [showVendorModal, setShowVendorModal] = useState(false);
    const [showCustomerModal, setShowCustomerModal] = useState(false);
    const [openVendorSelect, setOpenVendorSelect] = useState(false);
    const [openCustomerSelect, setOpenCustomerSelect] = useState(false);
    const [openTruckTypeSelect, setOpenTruckTypeSelect] = useState(false);
    const [isVendorRequested, setIsVendorRequested] = useState(true);
    const [customerId, setCustomerId] = useState();
    console.log("🚀  customerId:", customerId)
    const [vendorId, setVendorId] = useState();
    const [truckType, setTruckType] = useState();
    const [productName, setProductName] = useState();
    const [pickupAddress, setPickupAddress] = useState();
    const [dropOffAddress, setDropOffAddress] = useState();
    const [maxLoad, setMaxLoad] = useState();
    const [estimatedFuelLitters, setEstimatedFuelLitters] = useState();
    const [estimatedFuelCost, setEstimatedFuelCost] = useState();
    const [pickupDate, setPickupDate] = useState();
    const [estimatedDropOffDate, setEstimatedDropOffDate] = useState();
    const [price, setPrice] = useState();

    const [remark, setRemark] = useState();

    const [errormessages, setErrormessages] = useState("");

    const allVendorAgentsQuery = organisationsApi.useGetAllVendorsQuery(
      {
        organisationId,
        disabled: false,
      },
      { skip: !token }
    );
    const allCustomersQuery = organisationsApi.useGetAllCustomersQuery(
      {
        organisationId,
        disabled: false,
      },
      { skip: !token }
    );
    const customers =
      Array.isArray(allCustomersQuery?.data?.data) &&
      allCustomersQuery?.data?.data;

    const vendors =
      Array.isArray(allVendorAgentsQuery?.data?.data) &&
      allVendorAgentsQuery?.data?.data;
    const truckTypes = [
      "Barge",
      "Covered",
      "Flatbed",
      "Open",
      "Tanker",
      "Tipper",
      "Box",
    ];

    const [createTrip, createTripStatus] =
      organisationsApi.useCreateTripMutation();
    const createError = createTripStatus?.error;
    const [editTrip, editTripStatus] = organisationsApi.useEditTripMutation();
    const editError = editTripStatus?.error;

    useEffect(() => {
      if (trip) {
        
        setCustomerId(trip?.customerId);
        setVendorId(trip?.vendorId);
        setTruckType(trip?.truckType);
        setProductName(trip?.productName);
        setPickupAddress(trip?.pickupAddress);
        setDropOffAddress(trip?.dropOffAddress);
        setMaxLoad(trip?.maxLoad);
        setEstimatedFuelLitters(trip?.estimatedFuelLitters);
        setEstimatedFuelCost(trip?.estimatedFuelCost);
        setPickupDate(trip?.pickupDate);
        setEstimatedDropOffDate(trip?.estimatedDropOffDate);
        setPrice(trip?.price);
        setRemark(trip?.remark);
      } else {
        setCustomerId("");
        setVendorId("");
        setTruckType("");
        setProductName("");
        setPickupAddress("");
        setDropOffAddress("");
        setMaxLoad("");
        setEstimatedFuelLitters("");
        setEstimatedFuelCost("");
        setPickupDate("");
        setEstimatedDropOffDate("");
        setPrice("");
        setRemark("");
      }
    }, [trip]);

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

      if (!customerId) {
        formIsValid = false;
        errors["customerId"] = "Please select customer.";
      }
      if (!vendorId && isVendorRequested) {
        formIsValid = false;
        errors["vendorId"] = "Please select vendor.";
      }
      if (!truckType) {
        formIsValid = false;
        errors["truckType"] = "Please select truck type.";
      }
      if (!productName) {
        formIsValid = false;
        errors["productName"] = "Please enter product name.";
      }
      if (!pickupAddress) {
        formIsValid = false;
        errors["pickupAddress"] = "Please enter pickup address.";
      }
      if (!dropOffAddress) {
        formIsValid = false;
        errors["dropOffAddress"] = "Please enter drop off address.";
      }
      if (!maxLoad) {
        formIsValid = false;
        errors["maxLoad"] = "Please enter max load.";
      }
      if (!pickupDate) {
        formIsValid = false;
        errors["pickupDate"] = "Please select pickup date.";
      }
      if (!price) {
        formIsValid = false;
        errors["price"] = "Please enter price.";
      }

      console.log(errors);
      setErrormessages(errors);

      return formIsValid;
    };

    const handleSaveCick = () => {
      setBannerError();

      const payload = {
        customerId,
        vendorId,
        truckType,
        productName,
        pickupAddress,
        dropOffAddress,
        maxLoad,
        estimatedFuelLitters,
        estimatedFuelCost,
        pickupDate,
        estimatedDropOffDate,
        price,
        isVendorRequested,
        remark,
        organisationId,
        userId: currentUser?._id,
      };
      if (mode === "edit") {
        payload._id = trip?._id;
        return editTrip({
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
      createTrip({
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

    const resetStates = () => {
      setCustomerId(trip?.customerId || "");
      setVendorId(trip?.vendorId || "");
      setTruckType(trip?.truckType || "");
      setProductName(trip?.productName || "");
      setPickupAddress(trip?.pickupAddress || "");
      setDropOffAddress(trip?.dropOffAddress || "");
      setMaxLoad(trip?.maxLoad || "");
      setEstimatedFuelLitters(trip?.estimatedFuelLitters || "");
      setEstimatedFuelCost(trip?.estimatedFuelCost || "");
      setPickupDate(trip?.pickupDate || "");
      setEstimatedDropOffDate(trip?.estimatedDropOffDate || "");
      setPrice(trip?.price || "");

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

    const getMenuTruckTypesItemLabel = (option) => {
      return option;
    };

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
          showLoading={createTripStatus?.isLoading || editTripStatus?.isLoading}
        />
        <Box sx={{ width: "100%" }}>
          <Grid container spacing={6} className="mb-4">
            <Grid item lg={6} md={6} sm={12} xs={12}>
              <span className="d-flex align-items-end">
                <FormControl sx={{ width: "50%" }} className="me-1  mt-3">
                  <FormLabel id="demo-radio-buttons-group-label">
                    Requester
                  </FormLabel>
                  <RadioGroup
                    row
                    aria-labelledby="demo-radio-buttons-group-label"
                  >
                    <FormControlLabel
                      value={isVendorRequested}
                      control={<Radio />}
                      label="Vendor Requested"
                      onClick={() => setIsVendorRequested(true)}
                      checked={isVendorRequested}
                    />
                    <FormControlLabel
                      value={!isVendorRequested}
                      control={<Radio />}
                      label="Direct Customer"
                      onClick={() => setIsVendorRequested(false)}
                      checked={!isVendorRequested}
                    />
                  </RadioGroup>
                </FormControl>
                <FormControl sx={{ width: "50%" }} className="ms-1 mt-3">
                  {isVendorRequested && (
                    <>
                      <InputLabel>Trip Provider</InputLabel>
                      {vendors?.length > 0 && (
                        <CustomMenuSelect
                          value={vendorId}
                          size="small"
                          setValue={setVendorId}
                          open={openVendorSelect}
                          setOpen={setOpenVendorSelect}
                          chipLabel={getTitle(
                            vendors.find((vendor) => vendor._id === vendorId)
                          )}
                          menuItems={vendors || []}
                          getMenuItemLabel={(item) => getTitle(item)}
                          showButton
                          buttonLabel="Add New Trip Provider"
                          buttonOnClick={() => {
                            setOpenVendorSelect(false);
                            setShowVendorModal(true);
                          }}
                          ButtonIcon={InventoryIcon}
                        />
                      )}

                      <p className="text-danger fs-7">
                        {!vendorId && errormessages?.vendorId}
                      </p>
                    </>
                  )}
                </FormControl>
              </span>
            </Grid>
          </Grid>
          <Grid container spacing={6} className="mb-4">
            <Grid item lg={6} md={6} sm={12} xs={12}>
              <span className="d-flex">
                <FormControl sx={{ width: "50%" }} className="me-1  mt-3">
                  <InputLabel>Customer</InputLabel>
                  {customers?.length > 0 && (
                    <CustomMenuSelect
                      value={customerId}
                      size="small"
                      setValue={setCustomerId}
                      open={openCustomerSelect}
                      setOpen={setOpenCustomerSelect}
                      chipLabel={getTitle(
                        customers.find(
                          (customer) => customer._id === customerId
                        )
                      )}
                      menuItems={customers || []}
                      getMenuItemLabel={(item) => getTitle(item)}
                      showButton
                      buttonLabel="Add New Customer"
                      buttonOnClick={() => {
                        setOpenCustomerSelect(false);
                        setShowCustomerModal(true);
                      }}
                      ButtonIcon={ConnectWithoutContactIcon}
                    />
                  )}

                  <p className="text-danger fs-7">
                    {!customerId && errormessages?.customerId}
                  </p>
                </FormControl>
                <FormControl sx={{ width: "50%" }} className="ms-1 mt-3">
                  <InputLabel>Truck Type</InputLabel>
                  <CustomMenuSelect
                    value={truckType}
                    size="small"
                    setValue={setTruckType}
                    open={openTruckTypeSelect}
                    setOpen={setOpenTruckTypeSelect}
                    chipLabel={truckTypes.find((truck) => truck === truckType)}
                    nonObject
                    menuItems={truckTypes || []}
                    getMenuItemLabel={(item) =>
                      getMenuTruckTypesItemLabel(item)
                    }
                  />
                  <p className="text-danger fs-7">
                    {!truckType && errormessages?.truckType}
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
                    label="Product Name"
                    autoFocus
                    value={productName || ""}
                    onChange={(e) => setProductName(e.target.value)}
                  />
                  <p className="text-danger fs-7">
                    {!productName && errormessages?.productName}
                  </p>
                </FormControl>
                <FormControl sx={{ width: "50%" }} className="ms-1">
                  <TextField
                    margin="normal"
                    size="small"
                    fullWidth
                    required
                    label="Max Load"
                    type="number"
                    value={maxLoad || ""}
                    onChange={(e) => setMaxLoad(e.target.value)}
                  />
                  <p className="text-danger fs-7">
                    {!maxLoad && errormessages?.maxLoad}
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
                    label="Pick-up Address"
                    autoFocus
                    value={pickupAddress || ""}
                    onChange={(e) => setPickupAddress(e.target.value)}
                  />
                  <p className="text-danger fs-7">
                    {!pickupAddress && errormessages?.pickupAddress}
                  </p>
                </FormControl>
                <FormControl sx={{ width: "50%" }} className="ms-1">
                  <TextField
                    margin="normal"
                    size="small"
                    required
                    fullWidth
                    label="Delivery Address"
                    autoFocus
                    value={dropOffAddress || ""}
                    onChange={(e) => setDropOffAddress(e.target.value)}
                  />
                  <p className="text-danger fs-7">
                    {!dropOffAddress && errormessages?.dropOffAddress}
                  </p>
                </FormControl>
              </span>
              {!matches && (
                <>
                  <span className="d-flex">
                    <FormControl sx={{ width: "50%" }} className="me-1">
                      <TextField
                        margin="normal"
                        size="small"
                        fullWidth
                        label="Trip Price"
                        type="number"
                        value={price || ""}
                        onChange={(e) => setPrice(e.target.value)}
                      />
                      {!price && errormessages?.price && (
                        <p className="text-danger fs-7">
                          {errormessages?.price}
                        </p>
                      )}
                    </FormControl>
                    <FormControl sx={{ width: "50%" }} className="ms-1">
                      <LocalizationProvider dateAdapter={AdapterDateFns}>
                        {matches ? (
                          <DesktopDatePicker
                            className="mt-3"
                            label="Pick-up Date"
                            inputFormat="dd/MM/yyyy"
                            value={pickupDate || null}
                            onChange={(e) => setPickupDate(e)}
                            renderInput={(params) => (
                              <TextField
                                size="small"
                                {...params}
                                validators={["required"]}
                                value={pickupDate}
                                errorMessages={["Pick-up date is required"]}
                              />
                            )}
                            size="small"
                          />
                        ) : (
                          <MobileDatePicker
                            className="mt-3"
                            label="Pick-up Date"
                            inputFormat="dd/MM/yyyy"
                            size="small"
                            value={pickupDate || null}
                            onChange={(e) => setPickupDate(e)}
                            renderInput={(params) => (
                              <TextField
                                size="small"
                                {...params}
                                validators={["required"]}
                                value={pickupDate}
                                errorMessages={["Pick-up date is required"]}
                              />
                            )}
                          />
                        )}
                        {!pickupDate && errormessages?.pickupDate && (
                          <p className="text-danger fs-7">
                            {errormessages?.pickupDate}
                          </p>
                        )}
                      </LocalizationProvider>
                    </FormControl>
                  </span>
                  <span className="d-flex">
                    <FormControl sx={{ width: "50%" }} className="me-1">
                      <TextField
                        margin="normal"
                        size="small"
                        fullWidth
                        label="Estimated Fuel Liters"
                        type="number"
                        value={estimatedFuelLitters || ""}
                        onChange={(e) =>
                          setEstimatedFuelLitters(e.target.value)
                        }
                      />
                    </FormControl>
                    <FormControl sx={{ width: "50%" }} className="ms-1">
                      <TextField
                        margin="normal"
                        size="small"
                        fullWidth
                        label="Estimated Fuel Cost"
                        type="number"
                        value={estimatedFuelCost || ""}
                        onChange={(e) => setEstimatedFuelCost(e.target.value)}
                      />
                    </FormControl>
                  </span>
                  <span className="d-flex mt-3">
                    <FormControl sx={{ width: "50%" }} className="me-1">
                      <LocalizationProvider dateAdapter={AdapterDateFns}>
                        {matches ? (
                          <DesktopDatePicker
                            className="mt-4"
                            label="Estimated Delivery Date"
                            inputFormat="dd/MM/yyyy"
                            value={estimatedDropOffDate || null}
                            onChange={(e) => setEstimatedDropOffDate(e)}
                            renderInput={(params) => (
                              <TextField
                                size="small"
                                {...params}
                                validators={["required"]}
                                value={estimatedDropOffDate}
                              />
                            )}
                            size="small"
                          />
                        ) : (
                          <MobileDatePicker
                            className="mt-4"
                            label="Estimated Delivery Date"
                            inputFormat="dd/MM/yyyy"
                            value={estimatedDropOffDate || null}
                            onChange={(e) => setEstimatedDropOffDate(e)}
                            size="small"
                            renderInput={(params) => (
                              <TextField
                                size="small"
                                {...params}
                                validators={["required"]}
                                value={pickupDate}
                              />
                            )}
                          />
                        )}
                      </LocalizationProvider>
                      {!pickupDate && errormessages?.pickupDate && (
                        <p className="text-danger fs-7">
                          {errormessages?.pickupDate}
                        </p>
                      )}
                    </FormControl>
                    {mode !== "edit" && (
                      <Span className="d-flex flex-column w-50">
                        <InputLabel>Remark (only for internal use)</InputLabel>
                        <FormControl sx={{ width: "100%" }} className="me-1">
                          <TextareaAutosize
                            size="small"
                            value={remark || ""}
                            onChange={(e) => setRemark(e.target.value)}
                            minRows={1.5}
                          />
                        </FormControl>
                      </Span>
                    )}
                  </span>
                </>
              )}
            </Grid>
            {matches && (
              <Grid item lg={6} md={6} sm={12} xs={12}>
                <span className="d-flex">
                  <FormControl sx={{ width: "50%" }} className="me-1">
                    <TextField
                      margin="normal"
                      size="small"
                      fullWidth
                      label="Trip Price"
                      type="number"
                      value={price || ""}
                      onChange={(e) => setPrice(e.target.value)}
                    />
                    {!price && errormessages?.price && (
                      <p className="text-danger fs-7">{errormessages?.price}</p>
                    )}
                  </FormControl>
                  <FormControl sx={{ width: "50%" }} className="ms-1">
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      {matches ? (
                        <DesktopDatePicker
                          className="mt-3"
                          label="Pick-up Date"
                          inputFormat="dd/MM/yyyy"
                          value={pickupDate || null}
                          onChange={(e) => setPickupDate(e)}
                          renderInput={(params) => (
                            <TextField
                              size="small"
                              {...params}
                              validators={["required"]}
                              value={pickupDate}
                              errorMessages={["Pick-up date is required"]}
                            />
                          )}
                          size="small"
                        />
                      ) : (
                        <MobileDatePicker
                          className="mt-3"
                          label="Pick-up Date"
                          inputFormat="dd/MM/yyyy"
                          size="small"
                          value={pickupDate || null}
                          onChange={(e) => setPickupDate(e)}
                          renderInput={(params) => (
                            <TextField
                              size="small"
                              {...params}
                              validators={["required"]}
                              value={pickupDate}
                              errorMessages={["Pick-up date is required"]}
                            />
                          )}
                        />
                      )}
                      {!pickupDate && errormessages?.pickupDate && (
                        <p className="text-danger fs-7">
                          {errormessages?.pickupDate}
                        </p>
                      )}
                    </LocalizationProvider>
                  </FormControl>
                </span>
                <span className="d-flex">
                  <FormControl sx={{ width: "50%" }} className="me-1">
                    <TextField
                      margin="normal"
                      size="small"
                      fullWidth
                      label="Estimated Fuel Liters"
                      type="number"
                      value={estimatedFuelLitters || ""}
                      onChange={(e) => setEstimatedFuelLitters(e.target.value)}
                    />
                  </FormControl>
                  <FormControl sx={{ width: "50%" }} className="ms-1">
                    <TextField
                      margin="normal"
                      size="small"
                      fullWidth
                      label="Estimated Fuel Cost"
                      type="number"
                      value={estimatedFuelCost || ""}
                      onChange={(e) => setEstimatedFuelCost(e.target.value)}
                    />
                  </FormControl>
                </span>
                <span className="d-flex mt-3">
                  <FormControl sx={{ width: "50%" }} className="me-1">
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      {matches ? (
                        <DesktopDatePicker
                          className="mt-4"
                          label="Estimated Delivery Date"
                          inputFormat="dd/MM/yyyy"
                          value={estimatedDropOffDate || null}
                          onChange={(e) => setEstimatedDropOffDate(e)}
                          renderInput={(params) => (
                            <TextField
                              size="small"
                              {...params}
                              validators={["required"]}
                              value={estimatedDropOffDate}
                            />
                          )}
                          size="small"
                        />
                      ) : (
                        <MobileDatePicker
                          className="mt-4"
                          label="Estimated Delivery Date"
                          inputFormat="dd/MM/yyyy"
                          value={estimatedDropOffDate || null}
                          onChange={(e) => setEstimatedDropOffDate(e)}
                          size="small"
                          renderInput={(params) => (
                            <TextField
                              size="small"
                              {...params}
                              validators={["required"]}
                              value={pickupDate}
                            />
                          )}
                        />
                      )}
                      {!pickupDate && errormessages?.pickupDate && (
                        <p className="text-danger fs-7">
                          {errormessages?.pickupDate}
                        </p>
                      )}
                    </LocalizationProvider>
                  </FormControl>
                  {mode !== "edit" && (
                    <Span className="d-flex flex-column w-50">
                      <InputLabel>Remark (only for internal use)</InputLabel>
                      <FormControl sx={{ width: "100%" }} className="me-1">
                        <TextareaAutosize
                          size="small"
                          value={remark || ""}
                          onChange={(e) => setRemark(e.target.value)}
                          minRows={1.5}
                        />
                      </FormControl>
                    </Span>
                  )}
                </span>
              </Grid>
            )}
          </Grid>

          <AddEditVendorAgent
            showModal={showVendorModal}
            setShowModal={setShowVendorModal}
            mode="create"
            classificationValue="Trips Provider"
          />
          <AddEditCustomer
            showModal={showCustomerModal}
            setShowModal={setShowCustomerModal}
            mode="create"
          />
        </Box>
      </div>
    );
  }
);

export default CreadeAndEditTripForm;

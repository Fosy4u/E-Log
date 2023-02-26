import {
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  Icon,
  MenuItem,
  Radio,
  RadioGroup,
  styled,
} from "@mui/material";

import { useEffect, useState } from "react";
import {
  SelectValidator,
  TextValidator,
  ValidatorForm,
} from "react-material-ui-form-validator";
import { Span } from "../../../components/Typography";
import SimpleCard from "../../../utils/SimpleCard";

import Loader from "../../../utils/Loader";
import { useNavigate, useParams } from "react-router-dom";
import organisationsApi from "../../../services/organisationsApi.slice";
import UploadTruckImage from "../components/UploadTruckImage";
import CustomButtons from "../components/CustomButtons";
import Main from "../../../components/Main";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import { useSelector } from "react-redux";
import { globalSelectors } from "../../../global/global.slice";

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

const AddTruck = () => {
  const { organisationId } = useParams();
  const organisation = useSelector(globalSelectors.selectOrganisation)
  const [state, setState] = useState({ ownership: organisation?.name || "Company" });
  const navigate = useNavigate();
  const [addTruck, addTruckStatus] = organisationsApi.useAddTruckMutation();
  const [truckImage, setTruckImage] = useState("");
  const [resetImage, setResetImage] = useState(false);

  const handleSubmit = (event) => {
    submit();
  };
  const submit = () => {
    const form = new FormData();
    form.append("file", truckImage);
    state.regNo && form.append("regNo", state.regNo);
    state.chasisNo && form.append("chasisNo", state.chasisNo);
    state.maxLoad && form.append("maxLoad", state.maxLoad);
    state.truckType && form.append("truckType", state.truckType);
    state.manufactureYear &&
      form.append("manufactureYear", state.manufactureYear);
    state.model && form.append("model", state.model);
    state.ownership && form.append("ownership", state.ownership);
    state.manufacturer && form.append("manufacturer", state.manufacturer);
    organisationId && form.append("organisationId", organisationId);

    const payload = form;

    addTruck({
      payload,
    })
      .then((data) => {
        console.log("data", data?.data?.data?._id);
        if (data?.data?.data?._id) {
          navigate(`/e-log/${organisationId}/truck/${data?.data?.data?._id}`);
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
    regNo,
    chasisNo,
    maxLoad,
    truckType,
    manufacturer,
    model,
    manufactureYear,
    ownership,
  } = state;

  return (
    <div>
      <Main CustomButtons={CustomButtons} title="Add Truck" className="mb-2">
        <Container>
          <SimpleCard bgcolor="rgba(0, 5, 145, 0.09)">
            <div>
              <ValidatorForm onSubmit={handleSubmit} onError={() => null}>
                <Loader showLoading={addTruckStatus?.isLoading} />
                <Grid container spacing={6} className="mb-4">
                  <Grid item lg={6} md={6} sm={12} xs={12}>
                    <UploadTruckImage
                      setImage={setTruckImage}
                      resetImage={resetImage}
                      setResetImage={setResetImage}
                    />
                  </Grid>
                  <Grid item lg={6} md={6} sm={12} xs={12}>
                    <FormControl>
                      <FormLabel id="demo-radio-buttons-group-label">
                        Ownership
                      </FormLabel>
                      <RadioGroup
                        row
                        aria-labelledby="demo-radio-buttons-group-label"
                        name="ownership"
                        value={ownership}
                      >
                        <FormControlLabel
                          value={organisation?.name || "Company"}
                          control={<Radio />}
                          label={organisation?.name || "Company"}
                          onClick={() =>
                            setState({
                              ...state,
                              ownership: organisation?.name || "Company",
                            })
                          }
                        />
                        <FormControlLabel
                          value="Partner"
                          control={<Radio />}
                          label="Partner"
                          onClick={() =>
                            setState({
                              ...state,
                              ownership: "Partner",
                            })
                          }
                        />
                      </RadioGroup>
                    </FormControl>
                    <TextField
                      size="small"
                      type="text"
                      name="regNo"
                      id="standard-basic"
                      value={regNo || ""}
                      onChange={handleChange}
                      errorMessages={["Reg no is required"]}
                      label="Reg No"
                      validators={["required"]}
                    />

                    <TextField
                      size="small"
                      type="text"
                      name="chasisNo"
                      label="Chasiss No"
                      onChange={handleChange}
                      value={chasisNo || ""}
                      validators={["required"]}
                      errorMessages={["Chasis no is required"]}
                    />

                    <TextField
                      size="small"
                      sx={{ mb: 4 }}
                      type="number"
                      name="maxLoad"
                      label="Max Load"
                      onChange={handleChange}
                      value={maxLoad || ""}
                      errorMessages={["Max Load is required"]}
                      validators={[
                        "required",
                        //   "minStringLength:1",
                        //   "maxStringLength: 16",
                      ]}
                    />

                    <TextField
                      size="small"
                      type="text"
                      name="manufacturer"
                      value={manufacturer || ""}
                      label="Manufacturer"
                      onChange={handleChange}
                      validators={["required"]}
                      errorMessages={["Manufacturer is required"]}
                    />
                    <TextField
                      size="small"
                      name="model"
                      type="text"
                      label="Model"
                      value={model || ""}
                      onChange={handleChange}
                      validators={["required"]}
                      errorMessages={["Model is required"]}
                    />

                    <TextField
                      size="small"
                      name="manufactureYear"
                      type="text"
                      label="Manufacture Year"
                      value={manufactureYear || ""}
                      onChange={handleChange}
                      validators={["required"]}
                      errorMessages={["Manufacturer year is required"]}
                    />

                    <FormControl fullWidth size="small">
                      <Select
                        size="small"
                        // onChange={handleChange}
                        label="Truck Type"
                        name="truckType"
                        id="truckType"
                        value={truckType || ""}
                        validators={["required"]}
                        errorMessages={["Truck type is required"]}
                      >
                        <MenuItem
                          onClick={() =>
                            setState({
                              ...state,
                              truckType: "Covered",
                            })
                          }
                          value={"Covered"}
                        >
                          Covered
                        </MenuItem>
                        <MenuItem
                          onClick={() =>
                            setState({
                              ...state,
                              truckType: "Barge",
                            })
                          }
                          value={"Barge"}
                        >
                          Barge
                        </MenuItem>
                        <MenuItem
                          value={"Open"}
                          onClick={() =>
                            setState({
                              ...state,
                              truckType: "Open",
                            })
                          }
                        >
                          Open
                        </MenuItem>
                        <MenuItem
                          value={"Flat Bed"}
                          onClick={() =>
                            setState({
                              ...state,
                              truckType: "Flat Bed",
                            })
                          }
                        >
                          Flat Bed
                        </MenuItem>
                        <MenuItem
                          value={"Tipper"}
                          onClick={() =>
                            setState({
                              ...state,
                              truckType: "Tipper",
                            })
                          }
                        >
                          Tipper
                        </MenuItem>
                        <MenuItem
                          value={"Box"}
                          onClick={() =>
                            setState({
                              ...state,
                              truckType: "Box",
                            })
                          }
                        >
                          Box
                        </MenuItem>
                        <MenuItem
                          value={"Tanker"}
                          onClick={() =>
                            setState({
                              ...state,
                              truckType: "Tanker",
                            })
                          }
                        >
                          Tanker
                        </MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                </Grid>

                <div className="w-100 d-flex justify-content-center">
                  <Button
                    color="primary"
                    variant="contained"
                    type="submit"
                    className="w-25 m-1"
                    disabled={addTruckStatus?.isLoading}
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
                      setState({});
                      setResetImage(true);
                      setTruckImage();
                      setTimeout(() => {
                        setResetImage(false);
                      }, 1000);
                    }}
                    disabled={addTruckStatus?.isLoading}
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

export default AddTruck;

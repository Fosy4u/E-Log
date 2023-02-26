import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useMemo, useEffect, useState } from "react";

import { CountryRegionData } from "react-country-region-selector";

const CountrySelector = ({
  country = "Nigeria",
  setCountry,
  region = "Lagos~LA",
  setRegion,
}) => {
  // const options = useMemo(() => countryList().getData(), []);
  const [countryValue, setCountryValue] = useState("Nigeria");
  const [regionFields, setRegionFields] = useState([]);

  const regionsData = useMemo(
    () => CountryRegionData.find((data) => data[0] === country),
    [country]
  );
  useEffect(() => {
    if (country) {
      setCountryValue(country);
      setRegionFields(regionsData);
    }
  }, [country, regionsData]);

  const selectCountry = (event) => {
    setRegion();
    setCountry(event.target.value);
  };

  const selectRegion = (event) => {
    setRegion(event.target.value);
  };

  return (
    <span className="d-flex mt-3">
      <FormControl sx={{ width: "50%" }} className="me-1">
        <InputLabel id="demo-simple-select-helper-label">Country</InputLabel>
        <Select
          size="small"
          required
          fullWidth
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={countryValue || "Nigeria"}
          label="Country"
          onChange={selectCountry}
          native
        >
          {CountryRegionData &&
            CountryRegionData?.map((country) => (
              <option key={country[0]} value={country[0]}>
                {" "}
                {country[0]}
              </option>
            ))}
        </Select>
      </FormControl>

      <FormControl sx={{ width: "50%" }} className="ms-1">
        <InputLabel id="demo-simple-select-helper-label">Region</InputLabel>
        <Select
          size="small"
          required
          fullWidth
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={region || "Lagos~LA"}
          label="Region"
          onChange={selectRegion}
          native
        >
          {regionFields &&
            regionFields[2]?.split("|")?.map((region, index) => (
              <option key={index} value={region}>
                {" "}
                {region.split("~")[0]}
              </option>
            ))}
        </Select>
      </FormControl>
    </span>
  );
  //   <Select options={options} value={value} onChange={changeHandler} />;
};

export default CountrySelector;

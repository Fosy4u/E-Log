import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Main from "../../../components/Main";
import { globalSelectors } from "../../../global/global.slice";
import organisationsApi from "../../../services/organisationsApi.slice";
import Banner from "../../../utils/Banner";
import Loader from "../../../utils/Loader";
import CustomButtons from "../components/CustomButtons";
import DriversList from "../components/DriversList";

const Drivers = () => {
  const { organisationId } = useParams();
  const disabled = false;
  const token = useSelector(globalSelectors.selectAuthToken);
  const [showBanner, setShowBanner] = useState(true);
  const [input, setInput] = useState("");
  const [filteredData, setFilteredData] = useState([]);
 
  const getDriversQuery = organisationsApi.useGetDriversQuery(
    {
      organisationId,
      disabled,
    },
    { skip: !organisationId || !token }
  );
  const drivers = getDriversQuery?.data?.data;

  useEffect(() => {
    if (drivers?.length > 0) {
      const searchRegex = new RegExp(escapeRegExp(input), "i");
      const result = drivers?.filter((row) => {
        return Object.keys(row).some((field) => {
          return searchRegex.test(row[field].toString());
        });
      });
      setFilteredData(result);
    }
  }, [input, drivers]);

  function escapeRegExp(value) {
    return value.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
  }
  return (
    <div>
      <Main CustomButtons={CustomButtons} title={"Drivers"} className="mb-2" showSearchBox
        placeholder="search driver"
        setInput={setInput}>
        <Loader showLoading={getDriversQuery?.isLoading} />
        {drivers?.length > 0 && (
          <div className="p-2">
            <DriversList filteredData={filteredData} />
          </div>
        )}
        {!getDriversQuery.isLoading && drivers?.length === 0 && (
          <div className="w-100 d-flex text-center justify-content-center ">
            <Banner
              show={showBanner}
              variant="warning"
              handleClose={() => setShowBanner(false)}
              className="mb-4"
            >
              <p>
                <b>No drivers to display</b>,
              </p>
            </Banner>
          </div>
        )}
      </Main>
    </div>
  );
};

export default Drivers;

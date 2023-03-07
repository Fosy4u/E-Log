import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Main from "../../../components/Main";
import { globalSelectors } from "../../../global/global.slice";
import organisationsApi from "../../../services/organisationsApi.slice";
import Banner from "../../../utils/Banner";
import Loader from "../../../utils/Loader";
import CustomButtons from "../components/CustomButtons";
import TripList from "../components/TripList";

const Trips = () => {
  const { organisationId } = useParams();
  const disabled = false;
  const token = useSelector(globalSelectors.selectAuthToken);
  const [showBanner, setShowBanner] = useState(true);
  const [filteredData, setFilteredData] = useState([]);
  const [input, setInput] = useState("");

  const allTripsQuery = organisationsApi.useGetAllTripsQuery(
    {
      organisationId,
      disabled,
    },
    { skip: !token }
  );
  const trips =
    Array.isArray(allTripsQuery?.data?.data) && allTripsQuery?.data?.data;

  useEffect(() => {
    if (trips?.length > 0) {
      const searchRegex = new RegExp(escapeRegExp(input), "i");

      const result = trips?.filter((row) => {
        return Object.keys(row).some((field) => {
          return searchRegex.test(row[field]?.toString());
        });
      });

      setFilteredData(result);
    }
  }, [input, trips]);

  const escapeRegExp = (value) => {
    return value.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
  };

  return (
    <div>
      <Main
        CustomButtons={CustomButtons}
        title={"Trips"}
        className="mb-2"
        showSearchBox
        placeholder="search trip"
        setInput={setInput}
      >
        <Loader showLoading={allTripsQuery?.isLoading} />
        {!allTripsQuery.isLoading && trips?.length === 0 && (
          <div className="w-100 d-flex text-center justify-content-center mt-3 ">
            <Banner
              show={showBanner}
              variant="warning"
              handleClose={() => setShowBanner(false)}
              className="mb-4"
            >
              <p>
                <b>No trips to display</b>,
              </p>
            </Banner>
          </div>
        )}
        {trips?.length > 0 && (
          <div className="p-2">
            <TripList filteredData={filteredData} trips={trips} />
          </div>
        )}
      </Main>
    </div>
  );
};

export default Trips;

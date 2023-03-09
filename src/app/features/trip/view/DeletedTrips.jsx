import React, { useEffect, useState } from "react";

import organisationsApi from "../../../services/organisationsApi.slice";
import Loader from "../../../utils/Loader";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { globalSelectors } from "../../../global/global.slice";
import Banner from "../../../utils/Banner";
import CustomButtons from "../components/CustomButtons";
import Main from "../../../components/Main";
import DeletedTrip from "../components/DeletedTrip";

const DeletedTrips = () => {
  const token = useSelector(globalSelectors.selectAuthToken);
  const { organisationId } = useParams();
  const [show, setShow] = useState(false);
  const [showBanner, setShowBanner] = useState(true);
  const [filteredData, setFilteredData] = useState([]);
  const [input, setInput] = useState("");
  const getTripsQuery = organisationsApi.useGetAllTripsQuery(
    {
      organisationId,
      disabled: true,
    },
    { skip: !organisationId || !token }
  );
  const trips = getTripsQuery?.data?.data;

  useEffect(() => {
    if (trips?.length > 0) {
      return setShow(true);
    }
  }, [trips]);

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

  function escapeRegExp(value) {
    return value.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
  }

  return (
    <div>
      <Main
        CustomButtons={CustomButtons}
        title={"Deleted Trips"}
        className="mb-2"
        showSearchBox
        placeholder="deleted trips"
        setInput={setInput}
      >
        {!getTripsQuery.isLoading && trips?.length === 0 && (
          <div className="w-100 d-flex text-center justify-content-center ">
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
        {show && (
          <DeletedTrip
            filteredData={filteredData}
            isLoading={getTripsQuery.isLoading}
          />
        )}
        <Loader showLoading={getTripsQuery?.isLoading} />
      </Main>
    </div>
  );
};
export default DeletedTrips;

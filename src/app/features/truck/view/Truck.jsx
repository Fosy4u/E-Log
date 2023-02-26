import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Main from "../../../components/Main";
import { globalSelectors } from "../../../global/global.slice";
import organisationsApi from "../../../services/organisationsApi.slice";
import Banner from "../../../utils/Banner";
import Loader from "../../../utils/Loader";
import CustomButtons from "../components/CustomButtons";
import TilesView from "../components/TilesView";

const Truck = () => {
  const { organisationId } = useParams();
  const disabled = false;
  const token = useSelector(globalSelectors.selectAuthToken);
  const [showBanner, setShowBanner] = useState(true);
  const [input, setInput] = useState("");

  const [filteredData, setFilteredData] = useState([]);

  const getTrucksQuery = organisationsApi.useGetTrucksQuery(
    {
      _id: organisationId,
      disabled,
    },
    { skip: !organisationId || !token }
  );
  const trucks = getTrucksQuery?.data?.data;

  useEffect(() => {
    if (trucks?.length > 0) {
      const searchRegex = new RegExp(escapeRegExp(input), "i");
      const result = trucks?.filter((row) => {
        return Object.keys(row).some((field) => {
          return searchRegex.test(row[field].toString());
        });
      });
      setFilteredData(result);
    }
  }, [input, trucks]);

  const escapeRegExp = (value) => {
    return value.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
  };

  return (
    <div>
      <Main
        CustomButtons={CustomButtons}
        title={"Trucks"}
        className="mb-2"
        showSearchBox
        placeholder="search truck"
        setInput={setInput}
      >
        <Loader showLoading={getTrucksQuery?.isLoading} />
        {trucks?.length > 0 && (
          <div className="p-2">
            <TilesView filteredData={filteredData} />{" "}
          </div>
        )}
        {!getTrucksQuery.isLoading && trucks?.length === 0 && (
          <div className="w-100 d-flex text-center justify-content-center ">
            <Banner
              show={showBanner}
              variant="warning"
              handleClose={() => setShowBanner(false)}
              className="mb-4"
            >
              <p>
                <b>No trucks to display</b>,
              </p>
            </Banner>
          </div>
        )}
      </Main>
    </div>
  );
};

export default Truck;

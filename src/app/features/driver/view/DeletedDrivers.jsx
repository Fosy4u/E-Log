import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Main from "../../../components/Main";
import { globalSelectors } from "../../../global/global.slice";
import organisationsApi from "../../../services/organisationsApi.slice";
import Banner from "../../../utils/Banner";
import Loader from "../../../utils/Loader";
import CustomButtons from "../components/CustomButtons";
import DeletedDriversList from "../components/DeletedDriversList";
import DriversList from "../components/DriversList";

const DeletedDrivers = () => {
  const { organisationId } = useParams();
  const disabled = true;
  const token = useSelector(globalSelectors.selectAuthToken);
  const [showBanner, setShowBanner] = useState(true);
  const getDriversQuery = organisationsApi.useGetDriversQuery(
    {
      organisationId,
      disabled,
    },
    { skip: !organisationId || !token }
  );
  const drivers = getDriversQuery?.data?.data;
  return (
    <div>
      <Main CustomButtons={CustomButtons} title={"Drivers"} className="mb-2">
        <Loader showLoading={getDriversQuery?.isLoading} />
        {drivers?.length > 0 && (
          <div className="p-2">
            <DeletedDriversList drivers={drivers} />
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
                <b>No deleted drivers to display</b>,
              </p>
            </Banner>
          </div>
        )}
      </Main>
    </div>
  );
};

export default DeletedDrivers;

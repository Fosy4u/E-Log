import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Main from "../../../components/Main";
import { globalSelectors } from "../../../global/global.slice";
import organisationsApi from "../../../services/organisationsApi.slice";
import Banner from "../../../utils/Banner";
import Loader from "../../../utils/Loader";
import CustomButtons from "../components/CustomButtons";
import TripCard from "../components/TripCard";


const Trip = () => {
  const { tripId, organisationId } = useParams();

  const token = useSelector(globalSelectors.selectAuthToken);
  const [showBanner, setShowBanner] = useState(true);
  const tripQuerry = organisationsApi.useGetTripQuery(
    {
      _id: tripId, organisationId
    },
    { skip: !token }
  );

  const trip = tripQuerry?.data?.data;

 

  return (
    <div>
      <Main
        CustomButtons={CustomButtons}
        title={trip?._id ? "Trip - " + trip?.requestId : "Trip"}
        className="mb-2"
      >
        <Loader showLoading={tripQuerry?.isLoading} />
        {!tripQuerry.isLoading &&
          !trip?._id &&
          tripQuerry?.isSuccess && (
            <div className="w-100 d-flex text-center justify-content-center ">
              <Banner
                show={showBanner}
                variant="warning"
                handleClose={() => setShowBanner(false)}
                className="mb-4"
              >
                <p>
                  <b>Trip not found</b>,
                </p>
              </Banner>
            </div>
          )}

        {trip?._id && (
          <div className="p-2 d-flex align-items-center justify-content-center">
            <TripCard trip={trip} />
          </div>
        )}
      </Main>
    </div>
  );
};

export default Trip;

import React, { useEffect, useState } from "react";

import organisationsApi from "../../../services/organisationsApi.slice";
import Loader from "../../../utils/Loader";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { globalSelectors } from "../../../global/global.slice";
import Banner from "../../../utils/Banner";
import CustomButtons from "../components/CustomButtons";
import TruckDetailTabs from "../components/TruckDetailTabs";
import Main from "../../../components/Main";

const TruckDetail = () => {
  const token = useSelector(globalSelectors.selectAuthToken);
  const { truckId } = useParams();
  const [show, setShow] = useState(false);
  const [showBanner, setShowBanner] = useState(true);
  const getTrucksQuery = organisationsApi.useGetTruckQuery(
    {
      truckId,
    },
    { skip: !truckId || !token }
  );
  const truck = getTrucksQuery?.data?.data;

  useEffect(() => {
    if (truck) {
      return setShow(true);
    }
  }, [truck]);

  return (
    <div>
      <Main
        CustomButtons={CustomButtons}
        title="Truck Overview"
        className="mb-2"
      >
        {show && <TruckDetailTabs truck={truck} />}
        <Loader showLoading={getTrucksQuery?.isLoading} />
        {!getTrucksQuery.isLoading && !truck && truckId && token  && (
          <div className="w-100 d-flex text-center justify-content-center ">
            <Banner
              show={showBanner}
              variant="warning"
              severity={"info"}
              handleClose={() => setShowBanner(false)}
              className="mb-4"
            >
              <p>
                <b>
                  Truck not found. Please ensure the selected truck is on the
                  system and not deleted.
                </b>
              </p>
            </Banner>
          </div>
        )}
      </Main>
    </div>
  );
};
export default TruckDetail;

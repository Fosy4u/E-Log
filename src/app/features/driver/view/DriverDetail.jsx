import React, { useEffect, useState } from "react";

import organisationsApi from "../../../services/organisationsApi.slice";
import Loader from "../../../utils/Loader";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { globalSelectors } from "../../../global/global.slice";
import Banner from "../../../utils/Banner";
import CustomButtons from "../components/CustomButtons";
import Main from "../../../components/Main";
import DriverDetailTabs from "../components/DriverDetailTabs";

const DriverDetail = () => {
  const token = useSelector(globalSelectors.selectAuthToken);
  const { driverId } = useParams();
  const [show, setShow] = useState(false);
  const [showBanner, setShowBanner] = useState(true);
  const getDriverQuery = organisationsApi.useGetDriverQuery(
    {
      driverId,
    },
    { skip: !driverId || !token }
  );
  const currentDriver = getDriverQuery?.data?.data;

  useEffect(() => {
    if (currentDriver) {
    
      return setShow(true);
    }
  }, [currentDriver]);

  return (
    <div>
      <Main
        CustomButtons={CustomButtons}
        title="Driver Overview"
        className="mb-2"
      >
        {show && <DriverDetailTabs driver={currentDriver} />}
        <Loader showLoading={getDriverQuery?.isLoading} />
        {!getDriverQuery.isLoading && !currentDriver && driverId && token  && (
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
                  Driver not found. Please ensure the selected driver is on the
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
export default DriverDetail;

import React, { useEffect, useState } from "react";

import organisationsApi from "../../../services/organisationsApi.slice";
import Loader from "../../../utils/Loader";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { globalSelectors } from "../../../global/global.slice";
import Banner from "../../../utils/Banner";
import DeletedTruck from "../components/DeletedTruck";
import CustomButtons from "../components/CustomButtons";
import Main from "../../../components/Main";

const DeletedTrucks = () => {
  const token = useSelector(globalSelectors.selectAuthToken);
  const { organisationId } = useParams();
  const [show, setShow] = useState(false);
  const [showBanner, setShowBanner] = useState(true);
  const getTrucksQuery = organisationsApi.useGetTrucksQuery(
    {
      _id: organisationId,
      disabled: true,
    },
    { skip: !organisationId || !token }
  );
  const trucks = getTrucksQuery?.data?.data;

  useEffect(() => {
    if (trucks?.length > 0) {
      return setShow(true);
    }
  }, [trucks]);

  return (
    <div>
       <Main CustomButtons={CustomButtons} className="mb-2" title =' Deleted Trucks'>
       
   
      {show && (
        <DeletedTruck trucks={trucks} isLoading={getTrucksQuery.isLoading} />
      )}
      <Loader showLoading={getTrucksQuery?.isLoading} />
      {!getTrucksQuery.isLoading && trucks?.length === 0 && (
        <div className="w-100 d-flex text-center justify-content-center ">
          <Banner
            show={showBanner}
            variant="warning"
            severity={"info"}
            handleClose={() => setShowBanner(false)}
            className="mb-4"
          >
            <p>
              <b>No deleted trucks to display</b>
            </p>
          </Banner>
        </div>
      )}
      </Main>
    </div>
  );
};
export default DeletedTrucks;

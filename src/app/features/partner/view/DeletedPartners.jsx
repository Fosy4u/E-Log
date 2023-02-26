import React, { useEffect, useState } from "react";

import organisationsApi from "../../../services/organisationsApi.slice";
import Loader from "../../../utils/Loader";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { globalSelectors } from "../../../global/global.slice";
import Banner from "../../../utils/Banner";
import DeletedPartner from "../components/DeletedPartner";
import CustomButtons from "../components/CustomButtons";
import Main from "../../../components/Main";

const DeletedPartners = () => {
  const token = useSelector(globalSelectors.selectAuthToken);
  const { organisationId } = useParams();
  const [show, setShow] = useState(false);
  const [showBanner, setShowBanner] = useState(true);
  const getPartnersQuery = organisationsApi.useGetAllPartnersQuery(
    {
      organisationId,
      disabled: true,
    },
    { skip: !organisationId || !token }
  );
  const partners = getPartnersQuery?.data?.data;

  useEffect(() => {
    if (partners?.length > 0) {
      return setShow(true);
    }
  }, [partners]);

  return (
    <div>
      <Main
        CustomButtons={CustomButtons}
        className="mb-2"
        title=" Deleted Partners"
      >
        {show && (
          <DeletedPartner
            partners={partners}
            isLoading={getPartnersQuery.isLoading}
          />
        )}
        <Loader showLoading={getPartnersQuery?.isLoading} />
        {!getPartnersQuery.isLoading && partners?.length === 0 && (
          <div className="w-100 d-flex text-center justify-content-center ">
            <Banner
              show={showBanner}
              variant="warning"
              handleClose={() => setShowBanner(false)}
              className="mb-4"
            >
              <p>
                <b>No partners to display</b>,
              </p>
            </Banner>
          </div>
        )}
      </Main>
    </div>
  );
};
export default DeletedPartners;

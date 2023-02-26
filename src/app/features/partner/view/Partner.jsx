import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Main from "../../../components/Main";
import { globalSelectors } from "../../../global/global.slice";
import organisationsApi from "../../../services/organisationsApi.slice";
import Banner from "../../../utils/Banner";
import Loader from "../../../utils/Loader";
import CustomButtons from "../components/CustomButtons";
import PartnerCard from "../components/PartnerCard";

const Partner = () => {
  const { partnerId } = useParams();

  const token = useSelector(globalSelectors.selectAuthToken);
  const [showBanner, setShowBanner] = useState(true);
  const partnerQuery = organisationsApi.useGetPartnerQuery(
    {
      _id: partnerId,
    },
    { skip: !token }
  );

  const partner = partnerQuery?.data?.data;

  const getTitle = () => {
    if (partner?.companyName) return partner?.companyName;

    return `${partner?.firstName} ${partner?.lastName}`;
  };

  return (
    <div>
      <Main
        CustomButtons={CustomButtons}
        title={partner?._id ?"Partner - " + getTitle() : "Partner"}
        className="mb-2"
      >
        <Loader showLoading={partnerQuery?.isLoading} />
        {!partnerQuery.isLoading &&
          !partner?._id &&
          partnerQuery?.isSuccess && (
            <div className="w-100 d-flex text-center justify-content-center ">
              <Banner
                show={showBanner}
                variant="warning"
                handleClose={() => setShowBanner(false)}
                className="mb-4"
              >
                <p>
                  <b>Partner not found</b>,
                </p>
              </Banner>
            </div>
          )}

        {partner?._id && (
          <div className="p-2 d-flex align-items-center justify-content-center">
            <PartnerCard partner={partner} />
          </div>
        )}
      </Main>
    </div>
  );
};

export default Partner;

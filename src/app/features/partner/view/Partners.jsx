import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Main from "../../../components/Main";
import { globalSelectors } from "../../../global/global.slice";
import organisationsApi from "../../../services/organisationsApi.slice";
import Banner from "../../../utils/Banner";
import Loader from "../../../utils/Loader";
import CustomButtons from "../components/CustomButtons";
import PartnerList from "../components/PartnerList";

const Partner = () => {
  const { organisationId } = useParams();

  const disabled = false;
  const token = useSelector(globalSelectors.selectAuthToken);
  const [showBanner, setShowBanner] = useState(true);
  const [filteredData, setFilteredData] = useState([]);
  const [input, setInput] = useState("");

  const allPartnersQuery = organisationsApi.useGetAllPartnersQuery(
    {
      organisationId,
      disabled,
    },
    { skip: !token }
  );
  const partners =
    Array.isArray(allPartnersQuery?.data?.data) && allPartnersQuery?.data?.data;

  useEffect(() => {
    if (partners?.length > 0) {
      const searchRegex = new RegExp(escapeRegExp(input), "i");
      const result = partners?.filter(
        (partner) =>
          searchRegex.test(partner?.firstName) ||
          searchRegex.test(partner?.lastName) ||
          searchRegex.test(partner?.companyName) ||
          searchRegex.test(partner?.email) ||
          searchRegex.test(partner?.phone) ||
          searchRegex.test(partner?.address) ||
          searchRegex.test(partner?.country) ||
          searchRegex.test(partner?.region)
      );

      setFilteredData(result);
    }
  }, [input, partners]);

  const escapeRegExp = (value) => {
    return value.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
  };

  return (
    <div>
      <Main
        CustomButtons={CustomButtons}
        title={"Partners"}
        className="mb-2"
        showSearchBox
        placeholder="search partner"
        setInput={setInput}
      >
        <Loader showLoading={allPartnersQuery?.isLoading} />
        {!allPartnersQuery.isLoading && partners?.length === 0 && (
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
        {partners?.length > 0 && (
          <div className="p-2">
            <PartnerList filteredData={filteredData} partners ={partners}/>
          </div>
        )}
      </Main>
    </div>
  );
};

export default Partner;

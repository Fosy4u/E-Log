import React, { useEffect, useState } from "react";

import organisationsApi from "../../../services/organisationsApi.slice";
import Loader from "../../../utils/Loader";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { globalSelectors } from "../../../global/global.slice";
import Banner from "../../../utils/Banner";
import CustomButtons from "../components/CustomButtons";
import Main from "../../../components/Main";
import DeletedVendor from "../components/DeletedVendor";

const DeletedVendors = () => {
  const token = useSelector(globalSelectors.selectAuthToken);
  const { organisationId } = useParams();
  const [show, setShow] = useState(false);
  const [showBanner, setShowBanner] = useState(true);
  const [filteredData, setFilteredData] = useState([]);
  const [input, setInput] = useState("");
  const getVendorsQuery = organisationsApi.useGetAllVendorsQuery(
    {
      organisationId,
      disabled: true,
    },
    { skip: !organisationId || !token }
  );
  const vendors = getVendorsQuery?.data?.data;

  useEffect(() => {
    if (vendors?.length > 0) {
      return setShow(true);
    }
  }, [vendors]);

  useEffect(() => {
    if (vendors?.length > 0) {
      const searchRegex = new RegExp(escapeRegExp(input), "i");
      const result = vendors?.filter(
        (vendor) =>
          searchRegex.test(vendor?.firstName) ||
          searchRegex.test(vendor?.lastName) ||
          searchRegex.test(vendor?.companyName) ||
          searchRegex.test(vendor?.email) ||
          searchRegex.test(vendor?.phone) ||
          searchRegex.test(vendor?.address) ||
          searchRegex.test(vendor?.city) ||
          searchRegex.test(vendor?.region)
      );

      setFilteredData(result);
    } else {
      setFilteredData([]);
    }
  }, [input, vendors]);

  function escapeRegExp(value) {
    return value.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
  }

  return (
    <div>
      <Main
        CustomButtons={CustomButtons}
        title={"vendors"}
        className="mb-2"
        showSearchBox
        placeholder="deleted vendors"
        setInput={setInput}
      >
        {!getVendorsQuery.isLoading && vendors?.length === 0 && (
          <div className="w-100 d-flex text-center justify-content-center ">
            <Banner
              show={showBanner}
              variant="warning"
              handleClose={() => setShowBanner(false)}
              className="mb-4"
            >
              <p>
                <b>No vendors to display</b>,
              </p>
            </Banner>
          </div>
        )}
        {show && (
          <DeletedVendor
            filteredData={filteredData}
            isLoading={getVendorsQuery.isLoading}
          />
        )}
        <Loader showLoading={getVendorsQuery?.isLoading} />
      </Main>
    </div>
  );
};
export default DeletedVendors;

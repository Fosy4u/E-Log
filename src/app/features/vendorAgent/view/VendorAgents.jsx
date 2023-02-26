import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Main from "../../../components/Main";
import { globalSelectors } from "../../../global/global.slice";
import organisationsApi from "../../../services/organisationsApi.slice";
import Banner from "../../../utils/Banner";
import Loader from "../../../utils/Loader";
import CustomButtons from "../components/CustomButtons";
import VendorTable from "../components/VendorTable";

const VendorAgents = () => {
  const { organisationId } = useParams();

  const disabled = false;
  const token = useSelector(globalSelectors.selectAuthToken);
  const [showBanner, setShowBanner] = useState(true);
  const [filteredData, setFilteredData] = useState([]);
  const [input, setInput] = useState("");

  const allVendorAgentsQuery = organisationsApi.useGetAllVendorAgentsQuery(
    {
      organisationId,
      disabled,
    },
    { skip: !token }
  );
  const vendoragents =
    Array.isArray(allVendorAgentsQuery?.data?.data) &&
    allVendorAgentsQuery?.data?.data;

  useEffect(() => {
    if (vendoragents?.length > 0) {
      const searchRegex = new RegExp(escapeRegExp(input), "i");
      const result = vendoragents?.filter(
        (vendor) =>
          searchRegex.test(vendor?.firstName) ||
          searchRegex.test(vendor?.lastName) ||
          searchRegex.test(vendor?.companyName) ||
          searchRegex.test(vendor?.email) ||
          searchRegex.test(vendor?.phoneNo) ||
          searchRegex.test(vendor?.address) ||
          searchRegex.test(vendor?.country) ||
          searchRegex.test(vendor?.classification) ||
          searchRegex.test(vendor?.region)
      );

      setFilteredData(result);
    }
  }, [input, vendoragents]);

  const escapeRegExp = (value) => {
    return value.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
  };

  return (
    <div>
      <Main
        CustomButtons={CustomButtons}
        title={"Vendor / Agents"}
        className="mb-2"
        showSearchBox
        placeholder="search vendors"
        setInput={setInput}
      >
        <Loader showLoading={allVendorAgentsQuery?.isLoading} />
        {!allVendorAgentsQuery.isLoading && vendoragents?.length === 0 && (
          <div className="w-100 d-flex text-center justify-content-center ">
            <Banner
              show={showBanner}
              variant="warning"
              handleClose={() => setShowBanner(false)}
              className="mb-4"
            >
              <p>
                <b>No vendoragents to display</b>,
              </p>
            </Banner>
          </div>
        )}
        {vendoragents?.length > 0 && (
          <div className="p-2">
            <VendorTable
              allVendors={filteredData
                .concat(filteredData)
                .concat(filteredData)
                .concat(filteredData)
                .concat(filteredData)
                .concat(filteredData)
                .concat(filteredData)
                .concat(filteredData)
                .concat(filteredData)
              }
              isLoading={allVendorAgentsQuery.isLoading}
            />
          </div>
        )}
      </Main>
    </div>
  );
};

export default VendorAgents;

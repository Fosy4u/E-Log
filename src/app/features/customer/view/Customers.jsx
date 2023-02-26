import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Main from "../../../components/Main";
import { globalSelectors } from "../../../global/global.slice";
import organisationsApi from "../../../services/organisationsApi.slice";
import Banner from "../../../utils/Banner";
import Loader from "../../../utils/Loader";
import CustomButtons from "../components/CustomButtons";
import CustomerList from "../components/CustomerList";


const Customers = () => {
  const { organisationId } = useParams();

  const disabled = false;
  const token = useSelector(globalSelectors.selectAuthToken);
  const [showBanner, setShowBanner] = useState(true);
  const [filteredData, setFilteredData] = useState([]);
  const [input, setInput] = useState("");

  const allCustomersQuery = organisationsApi.useGetAllCustomersQuery(
    {
      organisationId,
      disabled,
    },
    { skip: !token }
  );
  const customers =
    Array.isArray(allCustomersQuery?.data?.data) && allCustomersQuery?.data?.data;

  useEffect(() => {
    if (customers?.length > 0) {
      const searchRegex = new RegExp(escapeRegExp(input), "i");
      const result = customers?.filter(
        (customer) =>
          searchRegex.test(customer?.firstName) ||
          searchRegex.test(customer?.lastName) ||
          searchRegex.test(customer?.companyName) ||
          searchRegex.test(customer?.email) ||
          searchRegex.test(customer?.phone) ||
          searchRegex.test(customer?.address) ||
          searchRegex.test(customer?.country) ||
          searchRegex.test(customer?.region)
      );

      setFilteredData(result);
    }
  }, [input, customers]);

  const escapeRegExp = (value) => {
    return value.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
  };

  return (
    <div>
      <Main
        CustomButtons={CustomButtons}
        title={"Customers"}
        className="mb-2"
        showSearchBox
        placeholder="search customer"
        setInput={setInput}
      >
        <Loader showLoading={allCustomersQuery?.isLoading} />
        {!allCustomersQuery.isLoading && customers?.length === 0 && (
          <div className="w-100 d-flex text-center justify-content-center ">
            <Banner
              show={showBanner}
              variant="warning"
              handleClose={() => setShowBanner(false)}
              className="mb-4"
            >
              <p>
                <b>No customers to display</b>,
              </p>
            </Banner>
          </div>
        )}
        {customers?.length > 0 && (
          <div className="p-2">
            <CustomerList filteredData={filteredData} />
          </div>
        )}
      </Main>
    </div>
  );
};

export default Customers;

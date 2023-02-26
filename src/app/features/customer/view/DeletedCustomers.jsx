import React, { useEffect, useState } from "react";

import organisationsApi from "../../../services/organisationsApi.slice";
import Loader from "../../../utils/Loader";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { globalSelectors } from "../../../global/global.slice";
import Banner from "../../../utils/Banner";
import CustomButtons from "../components/CustomButtons";
import Main from "../../../components/Main";
import DeletedCustomer from "../components/DeletedCustomer";

const DeletedCustomers = () => {
  const token = useSelector(globalSelectors.selectAuthToken);
  const { organisationId } = useParams();
  const [show, setShow] = useState(false);
  const [showBanner, setShowBanner] = useState(true);
  const [filteredData, setFilteredData] = useState([]);
  const [input, setInput] = useState("");
  const getCustomersQuery = organisationsApi.useGetAllCustomersQuery(
    {
      organisationId,
      disabled: true,
    },
    { skip: !organisationId || !token }
  );
  const customers = getCustomersQuery?.data?.data;

  useEffect(() => {
    if (customers?.length > 0) {
      return setShow(true);
    }
  }, [customers]);

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
          searchRegex.test(customer?.city) ||
          searchRegex.test(customer?.region)
      );

      setFilteredData(result);
    } else {
      setFilteredData([]);
    }
  }, [input, customers]);

  function escapeRegExp(value) {
    return value.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
  }


  return (
    <div>
      <Main
         CustomButtons={CustomButtons}
         title={"Customers"}
         className="mb-2"
         showSearchBox
         placeholder="deleted customers"
         setInput={setInput}
      >
        {show && (
          <DeletedCustomer
          filteredData={filteredData}
            isLoading={getCustomersQuery.isLoading}
          />
        )}
        <Loader showLoading={getCustomersQuery?.isLoading} />
        {!getCustomersQuery.isLoading && customers?.length === 0 && (
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
      </Main>
    </div>
  );
};
export default DeletedCustomers;

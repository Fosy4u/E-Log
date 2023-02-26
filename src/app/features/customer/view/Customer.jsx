import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Main from "../../../components/Main";
import { globalSelectors } from "../../../global/global.slice";
import organisationsApi from "../../../services/organisationsApi.slice";
import Banner from "../../../utils/Banner";
import Loader from "../../../utils/Loader";
import CustomButtons from "../components/CustomButtons";
import CustomerCard from "../components/CustomerCard";

const Customer = () => {
  const { customerId, organisationId } = useParams();

  const token = useSelector(globalSelectors.selectAuthToken);
  const [showBanner, setShowBanner] = useState(true);
  const partnerQuery = organisationsApi.useGetCustomerQuery(
    {
      _id: customerId,
      organisationId,
    },
    { skip: !token || !organisationId || !customerId }
  );

  const customer = partnerQuery?.data?.data;

  const getTitle = () => {
    if (customer?.companyName) return customer?.companyName;

    return `${customer?.firstName} ${customer?.lastName}`;
  };

  return (
    <div>
      <Main
        CustomButtons={CustomButtons}
        title={customer?._id ? "Customer - " + getTitle() : "Customer"}
        className="mb-2"
      >
        <Loader showLoading={partnerQuery?.isLoading} />
        {!partnerQuery.isLoading &&
          !customer?._id &&
          partnerQuery?.isSuccess && (
            <div className="w-100 d-flex text-center justify-content-center ">
              <Banner
                show={showBanner}
                variant="warning"
                handleClose={() => setShowBanner(false)}
                className="mb-4"
              >
                <p>
                  <b>Customer not found</b>,
                </p>
              </Banner>
            </div>
          )}

        {customer?._id && (
          <div className="p-2 d-flex align-items-center justify-content-center">
            <CustomerCard customer={customer} />
          </div>
        )}
      </Main>
    </div>
  );
};

export default Customer;

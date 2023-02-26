import React from "react";
import { Avatar, Card } from "@mui/material";
import { styled } from "@mui/system";
import CustomerAccordion from "./CustomerAccordion";
import CustomerActionButtons from "./CustomerActionButtons";
import { Link, useParams } from "react-router-dom";

const CardRoot = styled(Card)(({ bgcolor }) => ({
  height: "100%",
  padding: "20px 24px",
  background: bgcolor || "rgba(0, 5, 145, 0.09)",
}));

const CardTitle = styled("div")(({ subtitle }) => ({
  fontSize: "1rem",
  fontWeight: "500",
  textTransform: "capitalize",
  marginBottom: !subtitle && "16px",
}));

const CustomerCard = ({ customer }) => {
  const { customerId } = useParams();

  const getTitle = () => {
    if (customer?.companyName) return customer?.companyName;

    return `${customer?.firstName} ${customer?.lastName}`;
  };
  return (
    <CardRoot elevation={3} className="mb-2">
      <span className="d-flex justify-content-between m-2">
        {!customerId && (
          <Link
            to={`/e-log/${customer?.organisationId}/customers/${customer?._id}`}
            className="d-flex justify-content-between"
          >
            {customer?.imageUrl?.link && (
              <Avatar
                src={customer?.imageUrl?.link || "/assets/images/face-6.jpg"}
              />
            )}
            {customer && (
              <CardTitle className="m-1">{getTitle()}</CardTitle>
            )}
          </Link>
        )}
        {customerId && (
          <span className="d-flex justify-content-between">
            {customer?.imageUrl?.link && (
              <Avatar
                src={customer?.imageUrl?.link || "/assets/images/face-6.jpg"}
              />
            )}
            {customer && (
              <CardTitle className="m-1">{getTitle()}</CardTitle>
            )}
          </span>
        )}
        <CustomerActionButtons customer={customer} />
      </span>

      <CustomerAccordion customer={customer} />
    </CardRoot>
  );
};

export default CustomerCard;

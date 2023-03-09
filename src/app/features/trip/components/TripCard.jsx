import React from "react";
import {  Button, Card } from "@mui/material";
import { styled } from "@mui/system";
import TripAccordion from "./TripAccordion";
import TripActionButtons from "./TripActionButtons";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { globalSelectors } from "../../../global/global.slice";
import organisationsApi from "../../../services/organisationsApi.slice";
import Loader from "../../../utils/Loader";
import TripStatusActions from "./TripStatusActions";
import { getTripStatusColor } from "../../../utils/utils";

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

const TripCard = ({ trip }) => {
  console.log("trip", trip);
  const {  organisationId } = useParams();

  const token = useSelector(globalSelectors.selectAuthToken);

  const customerQuery = organisationsApi.useGetCustomerQuery(
    {
      _id: trip?.customerId,

      organisationId,
    },
    { skip: !token || !organisationId || !trip?.customerId }
  );

  const customer = customerQuery?.data?.data;
  const vendorQuery = organisationsApi.useGetVendorQuery(
    {
      vendorAgentId: trip?.vendorId,

      organisationId,
    },
    { skip: !token || !organisationId || !trip?.vendorId }
  );

  const vendor = vendorQuery?.data?.data;

  return (
    <CardRoot elevation={3} className="mb-2">
      <Loader
        showLoading={customerQuery?.isLoading || vendorQuery?.isLoading}
      />
      <span className="d-flex justify-content-between m-2">
        <CardTitle className="m-1">
          {" "}
          <Button color={getTripStatusColor(trip?.status)} size="small">
            {trip?.status}
          </Button>
        </CardTitle>

        <TripActionButtons trip={trip} />
      </span>
      <TripStatusActions trip={trip} />
      <TripAccordion trip={trip} customer={customer} vendor={vendor} />
    </CardRoot>
  );
};

export default TripCard;

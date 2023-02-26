import { Grid, useMediaQuery } from "@mui/material";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { globalSelectors } from "../../../global/global.slice";
import organisationsApi from "../../../services/organisationsApi.slice";
import TruckCard from "../../truck/components/TruckCard";

const PartnerTruckList = ({ partnerId, expandChild }) => {
  const token = useSelector(globalSelectors.selectAuthToken);
  const matches = useMediaQuery("(min-width:600px)");
  const { organisationId } = useParams();

  const getTrucksQuery = organisationsApi.useGetTruckByParamQuery(
    {
      assignedPartnerId: partnerId,
      disabled: false,
      organisationId,
    },
    { skip: !partnerId || !token || !organisationId }
  );
  const trucks = getTrucksQuery?.data?.data;

  const getHeight = () => {
    if (expandChild) {
      return "100%";
    }

    if (matches) {
      return "25rem";
    }
    return "30rem";
  };

  return (
    <div>
      {trucks?.length === 0 && (
        <p className="d-flex justify-content-center">
          No trucks attached to partner
        </p>
      )}
      <span
        style={{
          maxHeight: getHeight(),
          overflow: "scroll",
          transition: "height 0.5s ease-in-out",
        }}
        className="d-flex flex-wrap justify-content-center"
      >
        {trucks?.length > 0 &&
          trucks.map((truck, index) => (
            <Grid
              key={truck._id}
              className="d-flex flex-wrap justify-content-center"
            >
              <TruckCard
                truck={truck}
                bgColor="white"
                organisationId={organisationId}
              />
            </Grid>
          ))}
      </span>
    </div>
  );
};

export default PartnerTruckList;

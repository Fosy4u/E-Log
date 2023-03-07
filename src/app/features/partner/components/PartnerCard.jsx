import React from "react";
import { Avatar, Card } from "@mui/material";
import { styled } from "@mui/system";
import PartnerAccordion from "./PartnerAccordion";
import PartnerActionButtons from "./PartnerActionButtons";
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

const PartnerCard = ({ partner }) => {
  const { partnerId } = useParams();

  const getTitle = () => {
    if (partner?.companyName) return partner?.companyName;

    return `${partner?.firstName} ${partner?.lastName}`;
  };
  return (
    <CardRoot elevation={3} className="mb-2">
      <span className="d-flex justify-content-between m-2">
        {!partnerId && (
          <Link
            to={`/e-log/${partner?.organisationId}/partners/${partner?._id}`}
            className="d-flex justify-content-between"
          >
            {partner?.imageUrl?.link && (
              <Avatar
                src={partner?.imageUrl?.link || "/assets/images/face-6.jpg"}
              />
            )}

            <CardTitle className="m-1">{getTitle()}</CardTitle>
          </Link>
        )}
        {partnerId && (
          <span className="d-flex justify-content-between">
            {partner?.imageUrl?.link && (
              <Avatar
                src={partner?.imageUrl?.link || "/assets/images/face-6.jpg"}
              />
            )}
           
              <CardTitle className="m-1">{getTitle()}</CardTitle>
          
          </span>
        )}
        <PartnerActionButtons partner={partner} />
      </span>

      <PartnerAccordion partner={partner} />
    </CardRoot>
  );
};

export default PartnerCard;

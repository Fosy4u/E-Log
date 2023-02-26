import { Paper, useMediaQuery } from "@mui/material";
import Image from "../../../images/noImage.jpeg";

import TruckProperties from "./TruckProperties";

const TruckSummary = ({ truck }) => {
  const matches = useMediaQuery("(min-width:600px)");
  const truckImage = truck?.imageUrl?.link || Image;

  return (
    <div
      className={
        matches
          ? "d-flex justify-content-between w-100 p-2"
          : "d-flex flex-column w-100"
      }
    >
      <div className="ms-2">
        <Paper className="d-flex justify-content-center">
          <img
            src={truckImage}
            srcSet={truckImage}
            alt={truck?.manufacturer}
            width={matches ? "400px" : "300px"}
            height={matches ? "100%" : "100%"}
            loading="lazy"
          />
        </Paper>
      </div>

      <div className="w-100 ms-2">
        <TruckProperties truck={truck} />
      </div>
    </div>
  );
};

export default TruckSummary;

import { Paper, useMediaQuery } from "@mui/material";
import Image from "../../../images/noImage.jpeg";
import DriverProperties from "./DriverProperties";

const DriverSummary = ({ driver }) => {
  const matches = useMediaQuery("(min-width:600px)");
  const truckImage = driver?.imageUrl?.link || Image;

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
            style={{
              borderRadius: "50%",
            }}
            src={truckImage}
            srcSet={truckImage}
            alt={driver?.manufacturer}
            width={matches ? "300px" : "200px"}
            height={matches ? "100%" : "100%"}
            loading="lazy"
          />
        </Paper>
      </div>

      <div className="w-100 ms-2">
        <DriverProperties driver={driver} />
      </div>
    </div>
  );
};

export default DriverSummary;

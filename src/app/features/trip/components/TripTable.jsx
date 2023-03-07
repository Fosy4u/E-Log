import { Button } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { Small } from "../../../components/Typography";
import EnhancedTable from "../../../utils/Table/EnhancedTable";
import { getTripStatusColor } from "../../../utils/utils";
// import ActionButtons from "./ActionButtons";

const headCells = [
  {
    id: "tripId",
    numeric: false,
    disablePadding: true,
    label: "Trip Id",
  },
  {
    id: "status",
    numeric: false,
    disablePadding: false,
    label: "Status",
  },
  {
    id: "product",
    numeric: false,
    disablePadding: false,
    label: "Product",
  },
  {
    id: "maxLoad",
    numeric: false,
    disablePadding: false,
    label: "Max Load",
  },
  {
    id: "details",
    numeric: false,
    disablePadding: false,
    label: "Details",
  },
];

const TripTable = ({ allTrips }) => {
  const navigate = useNavigate();
  const getDetails = (trip) => {
    return (
      <Link
        style={{ textDecoration: "none" }}
        to={`/e-log/${trip?.organisationId}/trips/${trip?._id}`}
      >
        details
      </Link>
    );
  };
  const getRequestId = (trip) => {
    return (
      <Link
        style={{ textDecoration: "none" }}
        to={`/e-log/${trip?.organisationId}/trips/${trip?._id}`}
      >
        {trip?.requestId}
      </Link>
    );
  };

  const getStatus = (trip) => {
    return (
      <Button
        onClick={() =>
          navigate(`/e-log/${trip?.organisationId}/trips/${trip?._id}`)
        }
        color={getTripStatusColor(trip?.status)}
        size="small"
      >
        {trip?.status}
      </Button>
    );
  };

  const getRowData = () => {
    const rows = [];
    allTrips.map((trip) => {
      const row = {
        key: trip._id,
        tripId: getRequestId(trip),
        status: getStatus(trip) || "N/P",
        product: trip.productName || "N/P",
        maxLoad: trip.maxLoad || "N/P",
        details: getDetails(trip) || "N/P",
      };

      rows.push(row);
    });
    return rows;
  };

  return (
    <div className="d-flex flex-column">
      <div style={{ flexGrow: 1, textAlign: "center" }}>
        <EnhancedTable
          title="Trips"
          // ActionButtons={ActionButtons}
          headCells={headCells}
          rows={getRowData()}
          stickyHeader
          filter
          styleRow
        />
      </div>
    </div>
  );
};

export default TripTable;

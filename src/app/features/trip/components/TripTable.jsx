import { Button } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import EnhancedTable from "../../../utils/Table/EnhancedTable";
import { getTripStatusColor } from "../../../utils/utils";
import TripTableActionButtons from "./TripTableActionButtons";

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
    id: "amount",
    numeric: true,
    numberWithCommas: true,
    disablePadding: false,
    label: "Amount",
  },
  {
    id: "transporter",
    numeric: false,
    disablePadding: false,
    label: "Transporter",
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
        key: { value: trip._id, noFilter: true },
        tripId: { value: getRequestId(trip) },
        status: { value: getStatus(trip) || "N/P" },
        product: { value: trip.productName || "N/P" },
        maxLoad: { value: trip.maxLoad || "N/P" },
        amount: { value: trip.price || "N/P" },
        transporter: { value: trip?.vehicle?.transporter || "N/P" },
        details: { value: getDetails(trip) || "N/P", noFilter: true },
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
          ActionButtons={TripTableActionButtons}
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

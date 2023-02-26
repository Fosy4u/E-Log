import * as React from "react";
import Timeline from "@mui/lab/Timeline";
import PartnerTimelineListItem from "./CustomerTimelineListItem";
import { useSelector } from "react-redux";
import { globalSelectors } from "../../../global/global.slice";
import organisationsApi from "../../../services/organisationsApi.slice";
import Loader from "../../../utils/Loader";
import { useMediaQuery } from "@mui/material";

export default function CustomerTimelineList({ customer }) {
  const token = useSelector(globalSelectors.selectAuthToken);
  const matches = useMediaQuery("(min-width:600px)");
  const getCustomerLogsQuery = organisationsApi.useGetCustomerLogsQuery(
    {
      _id: customer?._id,
    },
    { skip: !customer?._id || !token }
  );
  const logs = getCustomerLogsQuery?.data?.data;

  const loading = getCustomerLogsQuery?.isLoading;
  return (
    <div
      className="bg-white"
      style={{
        borderRadius: "10px",
        boxShadow: "0 0 10px #000000",
        width: matches ? "55vw" : "85vw",
        maxHeight: "70vh",
        overflow: "scroll",
      }}
    >
      <Loader loading={loading} />
      {logs?.length > 0 && (
        <Timeline position="alternate">
          {logs?.length > 0 &&
            [...logs].map((log) => (
              <span key={log?._id}>
                <PartnerTimelineListItem index={log?._id} log={log} />
              </span>
            ))}
        </Timeline>
      )}
    </div>
  );
}

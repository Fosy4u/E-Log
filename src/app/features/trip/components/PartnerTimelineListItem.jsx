import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineOppositeContent from "@mui/lab/TimelineOppositeContent";
import TimelineDot from "@mui/lab/TimelineDot";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import TrendingFlatIcon from "@mui/icons-material/TrendingFlat";
import RepeatIcon from "@mui/icons-material/Repeat";
import Typography from "@mui/material/Typography";
import ApprovalIcon from "@mui/icons-material/Approval";
import CommentIcon from "@mui/icons-material/Comment";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { Slide } from "@mui/material";
import { useRef } from "react";
import { pink } from "@mui/material/colors";
import CreditScoreIcon from "@mui/icons-material/CreditScore";
import displayDate from "../../../utils/displayDate";

export default function PartnerTimelineListItem({ log, index }) {
  const ref = useRef();
  const checked = ref?.current?.focus();
  return (
    <Slide
      key={index}
      direction="up"
      in={log ? true : false}
      mountOnEnter
      unmountOnExit
      style={{ transformOrigin: "0 0 0" }}
      {...(checked ? { timeout: 10000 } : {})}
    >
      <span ref={ref}>
        {log?.action.toLowerCase() === "create" && (
          <TimelineItem>
            <TimelineOppositeContent
              sx={{ m: "auto 0" }}
              align="right"
              variant="body2"
              color="text.secondary"
            >
              {displayDate(log?.date)}
            </TimelineOppositeContent>
            <TimelineSeparator>
              <TimelineConnector />
              <TimelineDot color="primary">
                <AddShoppingCartIcon fontSize="small" />
              </TimelineDot>
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent
              sx={{ py: "12px", px: 2 }}
              className="d-flex flex-column"
            >
              <Typography variant="h6" component="span">
                {log?.action || "create"}
              </Typography>
              <Typography variant="p" style={{ fontSize: "10px" }}>
                <strong className="text-primary">staff :</strong>{" "}
                {log?.user?.firstName
                  ? `${log?.user?.firstName} ${log?.user?.lastName}`
                  : log?.user}
              </Typography>
              {/* <Typography variant="p" style={{ fontSize: '10px' }}>
                    <strong className="text-primary">Reason :</strong>{' '}
                    {log?.reason}
                  </Typography> */}
              <Typography variant="p" style={{ fontSize: "10px" }}>
                <strong className="text-primary">Details :</strong>{" "}
                {log?.details}
              </Typography>
            </TimelineContent>
          </TimelineItem>
        )}

        {log?.action === "edit" && (
          <TimelineItem>
            <TimelineOppositeContent
              sx={{ m: "auto 0" }}
              variant="body2"
              color="text.secondary"
            >
              {displayDate(log?.date)}
            </TimelineOppositeContent>
            <TimelineSeparator>
              <TimelineConnector />
              <TimelineDot color="warning">
                <TrendingFlatIcon fontSize="small" />
              </TimelineDot>
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent
              sx={{ py: "12px", px: 2 }}
              className="d-flex flex-column"
            >
              <Typography variant="h6" component="span">
                {log?.action || "edit"}
              </Typography>
              <Typography variant="p" style={{ fontSize: "10px" }}>
                <strong className="text-primary">staff :</strong>{" "}
                {log?.user?.firstName
                  ? `${log?.user?.firstName} ${log?.user?.lastName}`
                  : log?.user}
              </Typography>
              <Typography variant="p" style={{ fontSize: "10px" }}>
                <strong className="text-primary">Reason :</strong> {log?.reason}
              </Typography>
              <Typography variant="p" style={{ fontSize: "10px" }}>
                <strong className="text-primary">Details :-</strong>{" "}
                {log?.difference?.length > 0 &&
                  log?.difference.map((diff, index) => (
                    <span key={index}>
                      <strong>
                        ({index + 1}) {diff.field} :
                      </strong>{" "}
                      {diff.old} <strong>to</strong> {diff.new} <br />
                    </span>
                  ))}
              </Typography>
            </TimelineContent>
          </TimelineItem>
        )}
        {log?.action === "delete" && (
          <TimelineItem>
            <TimelineOppositeContent
              sx={{ m: "auto 0" }}
              variant="body2"
              color="text.secondary"
            >
              {displayDate(log?.date)}
            </TimelineOppositeContent>
            <TimelineSeparator>
              <TimelineConnector />
              <TimelineDot color="error">
                <DeleteForeverIcon fontSize="small" />
              </TimelineDot>
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent
              sx={{ py: "12px", px: 2 }}
              className="d-flex flex-column"
            >
              <Typography variant="h6" component="span">
                {log?.action || "delete"}
              </Typography>
              <Typography variant="p" style={{ fontSize: "10px" }}>
                <strong className="text-primary">staff :</strong>{" "}
                {log?.user?.firstName
                  ? `${log?.user?.firstName} ${log?.user?.lastName}`
                  : log?.user}
              </Typography>
              <Typography variant="p" style={{ fontSize: "10px" }}>
                <strong className="text-primary">Reason :</strong> {log?.reason}
              </Typography>
              <Typography variant="p" style={{ fontSize: "10px" }}>
                <strong className="text-primary">Details :</strong>{" "}
                {log?.details}
              </Typography>
            </TimelineContent>
          </TimelineItem>
        )}
        {log?.action === "stamp" && (
          <TimelineItem>
            <TimelineOppositeContent
              sx={{ m: "auto 0" }}
              align="right"
              variant="body2"
              color="text.secondary"
            >
              {displayDate(log?.date)}
            </TimelineOppositeContent>
            <TimelineSeparator>
              <TimelineConnector />
              <TimelineDot color="secondary">
                <ApprovalIcon fontSize="small" />
              </TimelineDot>
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent
              sx={{ py: "12px", px: 2 }}
              className="d-flex flex-column"
            >
              <Typography variant="h6" component="span">
                {log?.action || "stamp"}
              </Typography>
              <Typography variant="p" style={{ fontSize: "10px" }}>
                <strong className="text-primary">staff :</strong>{" "}
                {log?.user?.firstName
                  ? `${log?.user?.firstName} ${log?.user?.lastName}`
                  : log?.user}
              </Typography>
              <Typography variant="p" style={{ fontSize: "10px" }}>
                <strong className="text-primary">Reason :</strong> {log?.reason}
              </Typography>
              <Typography variant="p" style={{ fontSize: "10px" }}>
                <strong className="text-primary">Details :</strong>{" "}
                {log?.details || `stamped as sent`}
              </Typography>
            </TimelineContent>
          </TimelineItem>
        )}
        {log?.action === "payment" && (
          <TimelineItem>
            <TimelineOppositeContent
              sx={{ m: "auto 0" }}
              align="right"
              variant="body2"
              color="text.secondary"
            >
              {displayDate(log?.date)}
            </TimelineOppositeContent>
            <TimelineSeparator>
              <TimelineConnector />
              <TimelineDot color="success">
                <CreditScoreIcon fontSize="small" />
              </TimelineDot>
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent
              sx={{ py: "12px", px: 2 }}
              className="d-flex flex-column"
            >
              <Typography variant="h6" component="span">
                {log?.action || "create"}
              </Typography>
              <Typography variant="p" style={{ fontSize: "10px" }}>
                <strong className="text-primary">staff :</strong>{" "}
                {log?.user?.firstName
                  ? `${log?.user?.firstName} ${log?.user?.lastName}`
                  : log?.user}
              </Typography>
              <Typography variant="p" style={{ fontSize: "10px" }}>
                <strong className="text-primary">Reason :</strong> {log?.reason}
              </Typography>
              <Typography variant="p" style={{ fontSize: "10px" }}>
                <strong className="text-primary">Details :</strong>{" "}
                {log?.details}
              </Typography>
            </TimelineContent>
          </TimelineItem>
        )}

        {log?.action === "restore" && (
          <TimelineItem>
            <TimelineOppositeContent
              sx={{ m: "auto 0" }}
              variant="body2"
              color="text.secondary"
            >
              {displayDate(log?.date)}
            </TimelineOppositeContent>
            <TimelineSeparator>
              <TimelineConnector />
              <TimelineDot sx={{ color: pink[500] }}>
                <RepeatIcon fontSize="small" />
              </TimelineDot>
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent
              sx={{ py: "12px", px: 2 }}
              className="d-flex flex-column"
            >
              <Typography variant="h6" component="span">
                {log?.action || "restore"}
              </Typography>
              <Typography variant="p" style={{ fontSize: "10px" }}>
                <strong className="text-primary">staff :</strong>{" "}
                {log?.user?.firstName
                  ? `${log?.user?.firstName} ${log?.user?.lastName}`
                  : log?.user}
              </Typography>
              <Typography variant="p" style={{ fontSize: "10px" }}>
                <strong className="text-primary">Reason :</strong> {log?.reason}
              </Typography>
              <Typography variant="p" style={{ fontSize: "10px" }}>
                <strong className="text-primary">Details :</strong>{" "}
                {log?.details}
              </Typography>
            </TimelineContent>
          </TimelineItem>
        )}
        {log?.action === "remark" && (
          <TimelineItem>
            <TimelineOppositeContent
              sx={{ m: "auto 0" }}
              align="right"
              variant="body2"
              color="text.secondary"
            >
              {displayDate(log?.date)}
            </TimelineOppositeContent>
            <TimelineSeparator>
              <TimelineConnector />
              <TimelineDot color="info">
                <span className="d-flex, flex-column">
                  <CommentIcon fontSize="small" />
                </span>
              </TimelineDot>
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent
              sx={{ py: "12px", px: 2 }}
              className="d-flex flex-column"
            >
              <Typography variant="h6" component="span">
                {log?.action || "remark"}{" "}
              </Typography>
              <Typography variant="p" style={{ fontSize: "10px" }}>
                <strong className="text-primary">staff :</strong>{" "}
                {log?.user?.firstName
                  ? `${log?.user?.firstName} ${log?.user?.lastName}`
                  : log?.user}
              </Typography>
              <Typography variant="p" style={{ fontSize: "10px" }}>
                <strong className="text-primary">Details :</strong>{" "}
                {log?.details}
              </Typography>
            </TimelineContent>
          </TimelineItem>
        )}
      </span>
    </Slide>
  );
}

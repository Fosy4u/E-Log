import {
  Avatar,
  ButtonGroup,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  ListItemAvatar,
  Tooltip,
  useMediaQuery,
} from "@mui/material";
import React, { useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import FeedIcon from "@mui/icons-material/Feed";
import { Span } from "../../../components/Typography";
import FitScreenIcon from "@mui/icons-material/FitScreen";
import UnfoldLessDoubleIcon from "@mui/icons-material/UnfoldLessDouble";

import { Transition } from "../../../utils/transition";
import CloseIcon from "@mui/icons-material/Close";

import { useSelector } from "react-redux";
import { globalSelectors } from "../../../global/global.slice";
import { useNavigate, useParams } from "react-router-dom";
import organisationsApi from "../../../services/organisationsApi.slice";
import Loader from "../../../utils/Loader";

import RestoreAndDeleteTripModal from "./RestoreAndDeleteTripModal";
import TripInfo from "./TripInfo";

const TripTableActionButtons = ({ selectedRows }) => {
  const matches = useMediaQuery("(min-width:600px)");
  const navigate = useNavigate();
  const [expandChild, setExpandChild] = useState();
  const [open, setOpen] = useState(false);
  const trip = selectedRows?.length === 1 ? selectedRows[0] : null;

  const { organisationId } = useParams();
  const token = useSelector(globalSelectors.selectAuthToken);
  const tripQuery = organisationsApi.useGetTripQuery(
    {
      _id: trip?.key?.value,
      organisationId,
    },
    { skip: !token || !organisationId || !trip?.key?.value }
  );
  const currentTrip = tripQuery?.data?.data;
  return (
    <>
      <Loader showLoading={tripQuery?.isLoading} />
      <ButtonGroup>
        {selectedRows?.length === 1 && (
          <Tooltip title="Trip Info">
            <IconButton onClick={() => setOpen(true)}>
              <FeedIcon />
            </IconButton>
          </Tooltip>
        )}
        {selectedRows?.length === 1 && (
          <Tooltip title="Edit">
            <IconButton
              onClick={() =>
                navigate(
                  `/e-log/${organisationId}/trips/${trip?.key?.value}/edit`
                )
              }
            >
              <EditIcon />
            </IconButton>
          </Tooltip>
        )}

        <RestoreAndDeleteTripModal
          selectedTrip={selectedRows || []}
          mode="delete"
          icon
          tableDelete
        />
      </ButtonGroup>

      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        TransitionComponent={Transition}
        fullWidth={true}
        maxWidth={matches ? "md" : "lg"}
      >
        <DialogTitle
          id="alert-dialog-title"
          className="d-flex justify-content-between"
        >
          <Span>{`Trip ID : ${currentTrip?.requestId}`}</Span>
          <IconButton onClick={() => setOpen(false)}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent className="d-flex justify-content-center partnerAccordionDetails">
          <Span className="d-flex justify-content-center w-100 mt-3">
            {currentTrip && (
              <TripInfo trip={currentTrip} expandChild={expandChild} />
            )}
            {matches && (
              <ListItemAvatar className="ms-2">
                <Avatar>
                  {expandChild === "contactInfo" ? (
                    <UnfoldLessDoubleIcon
                      color="primary"
                      onClick={() => setExpandChild("")}
                      fontSize="small"
                      style={{ cursor: "pointer" }}
                    />
                  ) : (
                    <FitScreenIcon
                      color="primary"
                      onClick={() => setExpandChild("contactInfo")}
                      fontSize="small"
                      style={{ cursor: "pointer" }}
                    />
                  )}
                </Avatar>
              </ListItemAvatar>
            )}
          </Span>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default TripTableActionButtons;

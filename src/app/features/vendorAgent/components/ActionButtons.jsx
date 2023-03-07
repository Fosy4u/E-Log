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
import VendorContactInfor from "./VendorContactInfo";
import { Transition } from "../../../utils/transition";
import CloseIcon from "@mui/icons-material/Close";
import AddEditVendorAgent from "./AddEditVendorAgent";
import { useSelector } from "react-redux";
import { globalSelectors } from "../../../global/global.slice";
import { useParams } from "react-router-dom";
import organisationsApi from "../../../services/organisationsApi.slice";
import Loader from "../../../utils/Loader";
import RestoreAndDeleteVendorModal from "./RestoreAndDeleteVendorModal";

const ActionButtons = ({ selectedRows }) => {
  const matches = useMediaQuery("(min-width:600px)");
  const [expandChild, setExpandChild] = useState();
  const [showEditModal, setShowEditModal] = useState(false);
  const [open, setOpen] = useState(false);
  const vendor = selectedRows?.length === 1 ? selectedRows[0] : null;
  const { organisationId } = useParams();
  const token = useSelector(globalSelectors.selectAuthToken);
  const vendorQuery = organisationsApi.useGetVendorQuery(
    {
      vendorAgentId: vendor?.key,
      organisationId,
    },
    { skip: !token || !organisationId || !vendor?.key }
  );
  const vendorAgent = vendorQuery?.data?.data;
  return (
    <>
      <Loader showLoading={vendorQuery?.isLoading} />
      <ButtonGroup>
        {selectedRows?.length === 1 && (
          <Tooltip title="Details">
            <IconButton onClick={() => setOpen(true)}>
              <FeedIcon />
            </IconButton>
          </Tooltip>
        )}
        {selectedRows?.length === 1 && (
          <Tooltip title="Edit">
            <IconButton onClick={() => setShowEditModal(true)}>
              <EditIcon />
            </IconButton>
          </Tooltip>
        )}

        <RestoreAndDeleteVendorModal
          selectedVendor={selectedRows || []}
          mode="delete"
          icon
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
          <Span>{`${vendor?.contactName}`}</Span>
          <IconButton onClick={() => setOpen(false)}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent className="d-flex justify-content-center partnerAccordionDetails">
          <Span className="d-flex justify-content-center w-100 mt-3">
            {vendorAgent && (
              <VendorContactInfor
                vendor={vendorAgent}
                expandChild={expandChild}
              />
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
      {vendorAgent && (
        <AddEditVendorAgent
          showModal={showEditModal}
          setShowModal={setShowEditModal}
          mode="edit"
          vendorAgent={vendorAgent}
        />
      )}
    </>
  );
};

export default ActionButtons;

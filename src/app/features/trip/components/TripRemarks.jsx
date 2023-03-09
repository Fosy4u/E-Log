import { Alert, Button, TextField, useMediaQuery } from "@mui/material";
import React, { useState } from "react";
// import { isDesktop } from "react-device-detect";
import { useSelector } from "react-redux";
import organisationsApi from "../../../services/organisationsApi.slice";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";
import DeleteTripRemarkModal from "./DeleteTripRemarkModal";
import { globalSelectors } from "../../../global/global.slice";
import displayDate from "../../../utils/displayDate";
import Loader from "../../../utils/Loader";

const TripRemarks = ({ trip, isLoading }) => {
  const user = useSelector(globalSelectors.selectCurrentUser);
  const token = useSelector(globalSelectors.selectAuthToken);
  const matches = useMediaQuery("(min-width:600px)");
  const [remark, setRemark] = useState();
  const [editedRemark, setEditedRemark] = useState();
  const [remarkId, setRemarkId] = useState();
  const [remarkUser, setRemarkUser] = useState();
  const [show, setShow] = useState(false);

  const [enableEdit, setEnableEdit] = useState();
  const getTripRemarksQuery = organisationsApi.useGetTripRemarkQuery(
    {
      _id: trip?._id,
    },
    { skip: !trip?._id || !token }
  );
  const remarks = getTripRemarksQuery?.data?.data;

  const [addRemark, addRemarkStatus] =
    organisationsApi.useAddTripRemarkMutation();

  const [editTripRemark, editTripRemarkStatus] =
    organisationsApi.useEditTripRemarkMutation();


  const handleAdd = () => {
    const payload = {
      remarkObj: {
        remark,
        userId: user?._id,
      },
      _id: trip._id,
    };
    addRemark({
      payload,
    })
      .unwrap()
      .then((data) => {
        setRemark("");
      })
      .catch((e) => {
        console.error(e);
      });
  };

  const handleEditCick = async () => {
    const payload = {
      userId: user?._id,
      tripId: trip._id,
      remarkId,
      remark: editedRemark,
    };

    try {
      await editTripRemark({
        payload,
      });
      setEnableEdit();
    } catch (e) {
      console.error(e);
    }
  };
  return (
    <div
      style={{
        borderRadius: "10px",
        boxShadow: "0 0 10px #000000",
        width: matches ? "55vw" : "85vw",
        maxHeight: "70vh",
        overflow: "scroll",
      }}
      className="p-2 bg-white"
    >
      <Loader
        showLoading={
          addRemarkStatus?.isLoading ||
          getTripRemarksQuery?.isLoading ||
          editTripRemarkStatus?.isLoading
        }
      />
      <TextField
        autoFocus
        margin="dense"
        value={remark || ""}
        onChange={(e) => setRemark(e.target.value)}
        label="Add Remark"
        fullWidth
        variant="standard"
      />{" "}
      <p className="small-font-size text-primary">(For internal use)</p>
      <span className="d-flex m-2">
        <Button
          variant="outlined"
          size="small"
          onClick={remark ? handleAdd : null}
          disabled={!remark || addRemarkStatus.isLoading || false}
        >
          Add
        </Button>
      </span>{" "}
      {remarks?.length === 0 && (
        <p className="text-center">No remarks added yet</p>
      )}
      {remarks?.length > 0 &&
        remarks?.map((comment) => (
          <div
            style={{ flexGrow: 1, width: "100%" }}
            className={matches ? " d-flex w-100  mb-2" : "d-flex mb-2"}
            key={comment?._id}
          >
            <Alert
              severity="info"
              style={{ flexGrow: 1, width: "100%" }}
              action={
                user?._id === comment?.user?._id &&
                enableEdit !== comment?._id &&
                matches && (
                  <>
                    <Button
                      color="error"
                      size="small"
                      onClick={() => {
                        setEditedRemark(comment?.remark);
                        setRemarkId(comment?._id);
                        setRemarkUser(comment?.user);
                        setEnableEdit(comment?._id);
                      }}
                    >
                      <EditIcon />
                    </Button>
                    <Button
                      color="error"
                      size="small"
                      onClick={() => {
                        setRemarkId(comment?._id);
                        setRemarkUser(comment?.user);

                        setShow(true);
                      }}
                    >
                      <DeleteForeverIcon />
                    </Button>
                  </>
                )
              }
            >
              <span className="d-flex flex-column w-100">
                <span>
                  <p>
                    <strong>
                      {comment?.user?.firstName} {comment?.user?.lastName}:
                    </strong>
                    {comment?.date && ` at ${displayDate(comment?.date)}`}{" "}
                  </p>
                </span>
                <span>
                  {" "}
                  {enableEdit !== comment?._id && <p>{comment?.remark}</p>}
                  {enableEdit === comment?._id && (
                    <>
                      <TextField
                        autoFocus
                        margin="dense"
                        value={editedRemark}
                        onChange={(e) => setEditedRemark(e.target.value)}
                        label="Add Remark"
                        fullWidth
                        variant="standard"
                      />

                      <span>
                        <Button
                          size="small"
                          variant="outlined"
                          onClick={() => setEnableEdit()}
                        >
                          Cancel
                        </Button>
                        <Button
                          disabled={
                            !editedRemark ||
                            editTripRemarkStatus.isLoading ||
                            editedRemark === comment?.remark
                          }
                          size="small"
                          onClick={() => {
                            handleEditCick();
                          }}
                        >
                          Save
                        </Button>
                      </span>
                    </>
                  )}
                </span>
                {!matches &&
                  user?._id === comment?.user?._id &&
                  enableEdit !== comment?._id && (
                    <span className="d-flex justify-content-end align-items-end">
                      <EditIcon
                        className="m-1"
                        color="primary"
                        onClick={() => {
                          setEditedRemark(comment?.remark);
                          setRemarkId(comment?._id);
                          setRemarkUser(comment?.user);
                          setEnableEdit(comment?._id);
                        }}
                      />
                      <DeleteForeverIcon
                        className="m-1"
                        color="error"
                        onClick={() => {
                          setRemarkId(comment?._id);
                          setRemarkUser(comment?.user);

                          setShow(true);
                        }}
                      />
                    </span>
                  )}
              </span>
            </Alert>
          </div>
        ))}
      <DeleteTripRemarkModal
        show={show}
        setShow={setShow}
        callback={() => setShow(false)}
        tripId={trip?._id}
        remarkId={remarkId}
        user={remarkUser}
        editedRemark={editedRemark}
      />
    </div>
  );
};

export default TripRemarks;

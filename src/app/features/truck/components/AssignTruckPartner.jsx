import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  InputLabel,
  NativeSelect,
  Slide,
} from "@mui/material";
import React, { forwardRef, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { Small } from "../../../components/Typography";
import { globalSelectors } from "../../../global/global.slice";
import organisationsApi from "../../../services/organisationsApi.slice";
import Banner from "../../../utils/Banner";
import Loader from "../../../utils/Loader";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const AssignTruckPartner = ({ truck }) => {
  const { organisationId } = useParams();
  const disabled = false;
  const token = useSelector(globalSelectors.selectAuthToken);
  const [showModal, setShowModal] = useState(false);
  const [partnerId, setPartnerId] = useState(truck?.assignedDriverId || "");
  const [showBanner, setShowBanner] = useState(false);
  const [error, setError] = useState();
  const getTrucksQuery = organisationsApi.useGetTrucksQuery(
    {
      _id: organisationId,
      disabled,
    },
    { skip: !organisationId || !token }
  );

  const getPartnersQuery = organisationsApi.useGetAllPartnersQuery(
    {
      organisationId,
      disabled,
    },
    { skip: !organisationId || !token }
  );
  const partners = getPartnersQuery?.data?.data;
  const [assignTruckPartner, assignTruckPartnerStatus] =
    organisationsApi.useAssignTruckPartnerMutation();

  const assignedPartner =
    partners?.find((item) => truck?.assignedPartnerId === item._id) || {};

  const getPartnerTitle = (partner) => {
    if (partner?.companyName) return partner?.companyName;

    return `${partner?.firstName} ${partner?.lastName}`;
  };

  const validate = () => {
    if (!partnerId && truck) {
      setError("Please select a partner");
      setShowBanner(true);
      return false;
    }
    if (truck && !truck?.active) {
      setError("Truck is not active. Please activate truck first");
      setShowBanner(true);
      return false;
    }

    return true;
  };

  const handleAssign = () => {
    if (!validate()) {
      return;
    }
    const payload = {
      truckId: truck._id,
      partnerId: partnerId,
    };

    assignTruckPartner({
      payload,
      successHandler: (success, data) => {},
    })
      .then((data) => {
        if (data?.data?.data) {
          setShowModal(false);
          setPartnerId();
        }
      })
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      .catch((e) => {
        console.error(e.data);
      });
  };

  return (
    <div
      className="w-100 d-flex flex-column text-center justify-content-center "
      style={{ backgroundColor: "rgba(0, 5, 145, 0.09)" }}
    >
      <Loader
        showLoading={getTrucksQuery?.isLoading || getPartnersQuery?.isLoading}
      />

      {truck && !truck.assignedPartnerId && (
        <div className="w-100 d-flex text-center justify-content-center">
          <Banner show={truck && !truck.assignedPartnerId}>
            <p>
              <Small>Owned by partner but yet to be assigned</Small>
            </p>
          </Banner>
        </div>
      )}

      {truck && truck.assignedPartnerId && (
        <div className="w-100 d-flex text-center justify-content-center m-3">
          <Banner show={truck && truck.assignedDriverId} severity="success">
            <Link to={`/e-log/${organisationId}/partners/${partnerId}`}>
              Owned by {getPartnerTitle(assignedPartner)}
            </Link>
          </Banner>
        </div>
      )}
      <div className=" d-flex text-center justify-content-center m-3 w-100">
        <Button
          size="small"
          variant="contained"
          onClick={() => setShowModal(true)}
        >
          {truck && !truck.assignedPartnerId && "Assign Partner"}
          {truck && truck.assignedPartnerId && "Reassign Partner"}
        </Button>
      </div>

      {showModal && (
        <div>
          <Dialog
            open={showModal}
            onClose={() => {
              setShowModal(false);
            }}
            TransitionComponent={Transition}
            keepMounted
            aria-describedby="alert-dialog-slide-description"
          >
            <DialogTitle className="secondaryBrandColor">
              Assign Truck to Partner
            </DialogTitle>
            <DialogContent>
              <Loader
                showLoading={
                  getTrucksQuery?.isLoading || getPartnersQuery?.isLoading
                }
              />
              {!truck?.active && (
                <DialogContentText>
                  Note that a truck must be activated before it can be assigned
                  to partner
                </DialogContentText>
              )}

              {truck && partners?.length === 0 && (
                <div className=" d-flex text-center justify-content-center m-3">
                  <Banner show={truck && partners?.length === 0}>
                    <p>
                      <Small>
                        No activated partners to assign. Please ensure you have
                        activated partners in the system
                      </Small>
                    </p>
                  </Banner>
                </div>
              )}
              {error && showBanner && (
                <div className="w-100 d-flex text-center justify-content-center ">
                  <Banner
                    show={showBanner}
                    severity={"error"}
                    handleClose={() => setShowBanner(false)}
                  >
                    <Small>{error}</Small>
                  </Banner>
                </div>
              )}

              {truck && partners?.length > 0 && (
                <div className=" d-flex text-center justify-content-center m-3">
                  <FormControl fullWidth>
                    <InputLabel
                      variant="standard"
                      htmlFor="uncontrolled-native"
                    >
                      Select Partner
                    </InputLabel>
                    <NativeSelect
                      value={partnerId}
                      inputProps={{
                        name: "age",
                        id: "uncontrolled-native",
                      }}
                      onChange={(e) => setPartnerId(e.target.value)}
                    >
                      <option></option>
                      {partners.map((partner) => (
                        <option value={partner._id}>
                          {getPartnerTitle(partner)}
                        </option>
                      ))}
                    </NativeSelect>
                  </FormControl>
                </div>
              )}
            </DialogContent>
            <DialogActions>
              <Link
                to={`/e-log/${organisationId}/partner/add`}
                style={{
                  textDecoration: "none",
                }}
              >
                <Button size="small" className="me-1">
                  Add New Partner
                </Button>
              </Link>
              <Button
                variant="outlined"
                onClick={() => {
                  setShowModal(false);
                }}
                type="submit"
                className="me-1"
              >
                Cancel
              </Button>
              <Button
                className="ms-1"
                variant="contained"
                disabled={
                  assignTruckPartnerStatus?.isLoading ||
                  getTrucksQuery?.isLoading ||
                  getPartnersQuery?.isLoading
                }
                onClick={() => handleAssign()}
                type="submit"
                color="error"
              >
                Save
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      )}
    </div>
  );
};

export default AssignTruckPartner;

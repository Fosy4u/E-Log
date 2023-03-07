import { Button, Container, useMediaQuery } from "@mui/material";

import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Main from "../../../components/Main";
import { globalSelectors } from "../../../global/global.slice";
import organisationsApi from "../../../services/organisationsApi.slice";
import Loader from "../../../utils/Loader";
import SimpleCard from "../../../utils/SimpleCard";
import CreadeAndEditTripForm from "../components/CreadeAndEditTripForm";
import CustomButtons from "../components/CustomButtons";

const AddEditTrips = () => {
  const childRef = useRef(null);
  const { organisationId, tripId } = useParams();
  const token = useSelector(globalSelectors.selectAuthToken);
  const matches = useMediaQuery("(min-width:900px)");
  const [value, setValue] = useState(0);
  const [fetched, setFetched] = useState(false);

  const getTripQuery = organisationsApi.useGetTripQuery(
    {
      _id: tripId,organisationId
    },
    { skip: !tripId || !token || !organisationId || fetched }
  );
  const trip = getTripQuery?.data?.data || null;

  useEffect(() => {
    if (tripId && trip?._id) {
      setFetched(true);
    }
  }, [tripId, trip]);

  
  const handleSaveCick = () => {
    childRef.current.handleSaveCick();
  };
  const validateForm = () => {
    return childRef.current.validateForm();
  };
  const resetStates = () => {
    childRef.current.resetStates(trip);
  };
  return (
    <div>
      <Main CustomButtons={CustomButtons} title="Add Trip" className="mb-2">
        <Container className="mt-3">
          <SimpleCard
            bgcolor="rgba(0, 5, 145, 0.09)"
            height={matches ? "36rem" : "100%"}
          >
            <div style={{ height: tripId && matches ? "31rem" : "100%" }}>
              <Loader showLoading={getTripQuery?.isLoading} />
              <CreadeAndEditTripForm
                ref={childRef}
                value={value}
                setValue={setValue}
                trip={tripId ? trip : null}
                mode={tripId ? "edit" : "create"}
              />

              <div className="d-flex  m-4">
                <Button
                  size="small"
                  variant="contained"
                  onClick={() => {
                    validateForm() && handleSaveCick();
                  }}
                  className="me-2"
                >
                  Save
                </Button>

                <Button
                  size="small"
                  className="ms-2"
                  variant="outlined"
                  onClick={() => {
                    resetStates();
                  }}
                >
                  Cancel{" "}
                </Button>
              </div>
            </div>
          </SimpleCard>
        </Container>
      </Main>
    </div>
  );
};

export default AddEditTrips;

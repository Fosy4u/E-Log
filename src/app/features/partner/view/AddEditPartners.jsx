
import { Button, Container, useMediaQuery } from "@mui/material";

import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Main from "../../../components/Main";
import { globalSelectors } from "../../../global/global.slice";
import organisationsApi from "../../../services/organisationsApi.slice";
import Loader from "../../../utils/Loader";
import SimpleCard from "../../../utils/SimpleCard";
import CreadeAndEditPartnerForm from "../components/CreadeAndEditPartnerForm";
import CustomButtons from "../components/CustomButtons";

const AddEditPartners = () => {
  const childRef = useRef(null);
  const { organisationId, partnerId } = useParams();
  const token = useSelector(globalSelectors.selectAuthToken);
  const matches = useMediaQuery("(min-width:900px)");
  const [value, setValue] = useState(0);
  const [fetched, setFetched] = useState(false);

  const getPartnerQuery = organisationsApi.useGetPartnerQuery(
    {
      _id: partnerId,
    },
    { skip: !partnerId || !token || !organisationId || fetched }
  );
  const partner = getPartnerQuery?.data?.data || null;

  useEffect(() => {
    if (partnerId && partner?._id) {
      setFetched(true);
    }
  }, [partnerId, partner]);

  const handleNextClick = () => {
    childRef.current.handleNextClick();
  };
  const handleSaveCick = () => {
    childRef.current.handleSaveCick();
  };
  const validateForm = () => {
    return childRef.current.validateForm();
  };
  const resetStates = () => {
    childRef.current.resetStates(partner);
  };
  return (
    <div>
      <Main CustomButtons={CustomButtons} title="Add Partner" className="mb-2">
        <Container className="mt-3">
          <SimpleCard
            bgcolor="rgba(0, 5, 145, 0.09)"
            height={matches ? "36rem" : "100%"}
          >
            <div style={{ height: partnerId && matches ? "31rem" : "100%" }}>
            <Loader showLoading={getPartnerQuery?.isLoading} />
              <CreadeAndEditPartnerForm
                ref={childRef}
                value={value}
                setValue={setValue}
                partner={partnerId ? partner : null}
                mode={partnerId ? "edit" : "create"}
              />

              <div className="d-flex justify-content-between m-4">
                <div className="d-flex justify-content-between">
                  <Button
                    size="small"
                    onClick={() => handleNextClick()}
                    disabled={value === 3}
                  >
                    Next{" "}
                  </Button>
                  <Button
                    size="small"
                    onClick={() => setValue(value - 1)}
                    disabled={value === 0}
                  >
                    Back{" "}
                  </Button>
                </div>
                <div className="d-flex">
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
                {/* <Button
            onClick={() => {
              resetStates();
              setShowModal(false);
            }}
          >
            Close{' '}
          </Button> */}
              </div>
            </div>
          </SimpleCard>
        </Container>
      </Main>
    </div>
  );
};

export default AddEditPartners;

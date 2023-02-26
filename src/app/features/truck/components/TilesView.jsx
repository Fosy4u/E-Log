import { Fab, Grid } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { Col, Row } from "react-bootstrap";
import TileViewBar from "./TileViewBar";
import ScrollTop from "../../../utils/ScrollTop";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { useParams } from "react-router-dom";

import TruckCard from "./TruckCard";

export default function TilesView({ filteredData}) {
  const scrollRef = useRef();
  const { organisationId } = useParams();
  const [selectedTrucks, setSelectedTrucks] = useState([]);
 

  

  const handleSelectedTruck = (item) => {
    const sel = [...selectedTrucks];
    const found = sel.find((product) => product._id === item._id);
    const index = sel.indexOf(found);
    if (found) {
      sel.splice(index, 1);
    } else {
      sel.push(item);
    }

    setSelectedTrucks(sel);
  };

  // control if item should be checked on not
  const checked = (item) => {
    const found = selectedTrucks?.find((product) => product._id === item._id);
    if (found) {
      return true;
    }
    return false;
  };

  
  const selectAll = () => {
    const newArr = [];
    // eslint-disable-next-line array-callback-return
    filteredData.map((product) => {
      newArr.push(product);
    });
    setSelectedTrucks(newArr);
  };
  const deselectAll = () => {
    setSelectedTrucks([]);
  };

  return (
    <Row
      width="100vw"
      // height="100vh"
      //style={{ display: 'flex', position: 'fixed' }}
    >
      <Row>
        <Col>
          <TileViewBar
           selectedTrucks={selectedTrucks || []}
            selectAll={selectAll}
            deselectAll={deselectAll}
            setSelectedTrucks={setSelectedTrucks}
          />
        </Col>
      </Row>
      <Row>
        <Col style={{  overflow: "scroll" }}>
          <Grid
            sx={{ flexGrow: 1 }}
            container
            spacing={2}
            className="mt-1"
            justifyContent="center"
          >
            <div ref={scrollRef}></div>
            {filteredData?.map((truck, index) => (
              <Grid key={truck._id}>
                <TruckCard
                  truck={truck}
                  checked={checked(truck)}
                  handleChange={() => handleSelectedTruck(truck)}
                  selectedTrucks={selectedTrucks || []}
                  organisationId={organisationId}
                  header
                />
              </Grid>
            ))}
            <ScrollTop scrollRef={scrollRef}>
              <Fab color="primary" size="small" aria-label="scroll back to top">
                <KeyboardArrowUpIcon />
              </Fab>
            </ScrollTop>
          </Grid>
        </Col>
      </Row>
    </Row>
  );
}

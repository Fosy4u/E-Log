import Box from "@mui/material/Box";

import { useMediaQuery } from "@mui/material";
import { Col, Row } from "react-bootstrap";
import ActionButtons from "./ActionButtons";

export default function TileViewBar({
  selectedTrucks,
  selectAll,
  deselectAll,
  setSelectedTrucks,
}) {
  const matches = useMediaQuery("(min-width:600px)");
  return (
    <div className="pb-2 d-flex justify-content-end align-items-end">
      {selectedTrucks?.length > 0 && (
        <Box
          sx={{
            p: 0.5,
            pb: 0,
          }}
          className={matches ? "mt-3" : "mt-1"}
        >
          <ActionButtons
            selectedTrucks={selectedTrucks || []}
            selectAll={selectAll}
            deselectAll={deselectAll}
            setSelectedTrucks={setSelectedTrucks}
          />
        </Box>
      )}
    </div>
  );
}

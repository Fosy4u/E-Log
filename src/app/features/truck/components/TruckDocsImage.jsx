import { Alert, Button, Card, Stack } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import Image from "../../../images/noImage.jpeg";
import { Small } from "../../../components/Typography";
import DocUpload from "./DocUpload";

const TruckDocsImage = ({ setImage, image, title, value }) => {
  const hiddenFileInput = useRef(null);
  const [selectedFile, setSelectedFile] = useState();
  const [preview, setPreview] = useState();
  const [errorMsg, setErrorMsg] = useState(false);
  const [open, setOpen] = useState(false);

  // create a preview as a side effect, whenever selected file is changed
  useEffect(() => {
    if (!selectedFile) {
      setPreview(undefined);
      return;
    }
    const objectUrl = URL.createObjectURL(selectedFile);
    setPreview(objectUrl);
    // free memory when ever this component is unmounted
    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedFile]);

  useEffect(() => {
    if (selectedFile) {
      const MAX_FILE_SIZE = 5120; // 5MB

      const fileSizeKiloBytes = selectedFile.size / 1024;

      if (fileSizeKiloBytes > MAX_FILE_SIZE) {
        setErrorMsg(
          "Selected file size is greater than 5MB. Please select a smaller file"
        );
        setTimeout(() => {
          setSelectedFile();
        }, 1000);
        return;
      }

      setErrorMsg("");
    }
  }, [selectedFile]);

  const onSelectFile = (e) => {
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedFile(undefined);
      return;
    }
    setSelectedFile(e.target.files[0]);
    setImage(e.target.files[0]);
    hiddenFileInput.current.value = null;
  };

  // Programatically click the hidden file input element
  // when the Button component is clicked
  const handleClick = (event) => {
    hiddenFileInput.current.click();
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  return (
    <Card
      // style={{ height: "35vh" }}
      className="d-flex  justify-content-center align-items-center m-2"
    >
      <div className="d-flex flex-column justify-content-between align-items-center p-3">
        {errorMsg && (
          <Alert severity="error" onClose={() => setErrorMsg("")}>
            {errorMsg}
          </Alert>
        )}
        <div>
          <img src={preview || image || Image} alt="product" width="300px" />
        </div>
        <Stack direction="row" spacing={1} className="mt-3">
          {!selectedFile && (
            <Button variant="contained" onClick={handleClick} size="small">
              <FileUploadIcon /> {image ? "Change Document" : "Select Document"}
            </Button>
          )}
          {selectedFile && (
            <span className="d-flex flex-column">
              <Button
                className="mb-1"
                variant="contained"
                onClick={handleClickOpen}
                size="small"
              >
                <FileUploadIcon />{" "}
                {image ? "Confirm Document Change" : "Confirm Upload Document"}
              </Button>
              <Button
                variant="outlined"
                onClick={() => {
                  setSelectedFile();
                  setImage();
                }}
                size="small"
              >
                Cancel
              </Button>
            </span>
          )}

          <input
            type="file"
            accept=".jpg, .jpeg, .png"
            ref={hiddenFileInput}
            onChange={onSelectFile}
            file={[selectedFile]}
            style={{ display: "none" }}
          />
        </Stack>
        <Small className="text-danger">Maximum Size : 5MB</Small>
      </div>
      <DocUpload
        open={open}
        setOpen={setOpen}
        title={title}
        image={selectedFile}
        setImage={setSelectedFile}
        value={value}
      />
    </Card>
  );
};

export default TruckDocsImage;

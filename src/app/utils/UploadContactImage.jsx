import { Alert, Button, Card, Stack, useMediaQuery } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import Image from "../images/noImage.jpeg";
import { Small } from "../components/Typography";

const UploadContactImage = ({
  setImage,
  defaultImage,
  resetImage,
  cardSize,
  imageHeight,
  uploadText = "Select Driver Picture",
  setResetImage,
}) => {
  // Create a reference to the hidden file input element
  const hiddenFileInput = useRef(null);
  const matches = useMediaQuery("(min-width:600px)");
  const [selectedFile, setSelectedFile] = useState();
  const [preview, setPreview] = useState();
  const [errorMsg, setErrorMsg] = useState(false);

  useEffect(() => {
    if (resetImage) {
      setSelectedFile();
      hiddenFileInput.current.value = null;
      return;
    }
  }, [resetImage]);

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
  };

  // Programatically click the hidden file input element
  // when the Button component is clicked
  const handleClick = (event) => {
    hiddenFileInput.current.click();
  };

  return (
    <Card
      style={{ height: cardSize || "55vh" }}
      className="d-flex  justify-content-center align-items-center"
    >
      <div className="d-flex flex-column justify-content-between align-items-center p-3">
        {errorMsg && (
          <Alert severity="error" onClose={() => setErrorMsg("")}>
            {errorMsg}
          </Alert>
        )}
        <div>
          <img
            src={preview || defaultImage || Image}
            alt="product"
            width="100%"
            height={matches ? imageHeight || 330 : "100%"}
          />
        </div>
        <Stack direction="row" spacing={1} className="mt-3">
          <Button variant="contained" onClick={handleClick} size="small">
            <FileUploadIcon /> {uploadText}
          </Button>

          <input
            type="file"
            accept=".jpg, .jpeg, .png"
            ref={hiddenFileInput}
            onChange={onSelectFile}
            style={{ display: "none" }}
          />
        </Stack>
        <Small className="text-danger">Maximum Size : 5MB</Small>
      </div>
    </Card>
  );
};

export default UploadContactImage;

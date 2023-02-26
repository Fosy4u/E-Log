import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { green, red } from "@mui/material/colors";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Image from "../../../images/noImage.jpeg";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import Checkbox from "@mui/material/Checkbox";
import EditIcon from "@mui/icons-material/Edit";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import { useState } from "react";
import { isDesktop } from "react-device-detect";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

const cardStyle = {
  card: {
    background: "rgba(0, 5, 145, 0.09)",
    width: "20rem",
    borderRadius: "0.6em",
    margin: "1em",

    boxShadow:
      "0 13px 20px -5px hsla(240, 30.1%, 28%, 0.25), 0 8px 16px -8px hsla(0, 0%, 0%, 0.3), 0 -6px 16px -6px hsla(0, 0%, 0%, 0.03)",
    transition: "all ease 200ms",
  },

  cardHover: {
    transform: "scale(1.03)",
    boxShadow:
      "0 13px 40px -5px hsla(240, 30.1%, 28%, 0.12), 0 8px 32px -8px hsla(0, 0%, 0%, 0.14), 0 -6px 32px -6px hsla(0, 0%, 0%, 0.02)",
  },
};
export default function TruckCard({
  truck,
  checked,
  handleChange,
  selectedTrucks,
  organisationId,
  bgColor,
  header,
}) {
  const [expanded, setExpanded] = useState(false);
  const [hover, setHover] = useState();
  const truckImage = truck?.imageUrl?.link || Image;
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const getAvatar = () => {
    if (truck.active) {
      return (
        <Avatar sx={{ bgcolor: green[500] }} aria-label="recipe">
          <LocalShippingIcon />{" "}
        </Avatar>
      );
    }

    return (
      <Avatar sx={{ bgcolor: red[900] }} aria-label="recipe">
        <LocalShippingIcon />
      </Avatar>
    );
  };
  const showCheckBox = () => {
    if (selectedTrucks.length > 0 || hover === "single" || !isDesktop) {
      return (
        <Checkbox
          size={"small"}
          sx={{
            "&.Mui-checked": {
              color: red[900],
            },
          }}
          checked={checked}
          onChange={() => handleChange()}
          inputProps={{ "aria-label": "controlled" }}
        />
      );
    }
  };
  return (
    <Card
      sx={{ width: 300, maxHeight: expanded ? "33rem" : "25rem" }}
      className="m-2 btn"
      onMouseEnter={() => {
        setHover("single");
      }}
      onMouseLeave={() => {
        setHover();
      }}
      style={{
        ...cardStyle.card,
        backgroundColor: bgColor,
        ...(hover === "single" ? cardStyle.cardHover : null),
      }}
    >
      {header && (
        <CardHeader
          action={showCheckBox()}
          avatar={getAvatar()}
          subheader={truck?.status}
        />
      )}
      <CardContent>
        <Link
          style={{ textDecoration: "none" }}
          to={`/e-log/${organisationId}/truck/${truck._id}`}
        >
          
          <img
            src={truckImage}
            srcSet={truckImage}
            alt={truck?.manufacturer}
            width="270"
            height="230"
            loading="lazy"
          />

          <Typography variant="body2" color="text.secondary">
            Registration No:
            <strong> {truck?.regNo || "No Registration Number"}</strong>
          </Typography>
        </Link>
        <CardActions disableSpacing>
          <Link
            to={`/e-log/${organisationId}/truck/edit/${truck._id}`}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <IconButton aria-label="add to favorites">
              <EditIcon color="primary" />
            </IconButton>
          </Link>
          <IconButton aria-label="share">
            <ShareIcon color="primary" />
          </IconButton>
          <ExpandMore
            expand={expanded}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon color="primary" />
          </ExpandMore>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <Typography variant="body2" color="text.secondary">
            Model:<strong> {truck.model}</strong>
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Chasis No: <strong>{truck?.chasisNo || "No Chasis Number"}</strong>
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {truck?.maxLoad} Tonnes
          </Typography>
          <Link
            style={{ textDecoration: "none" }}
            to={`/e-log/${organisationId}/truck/${truck._id}`}
          >
            <Button variant="contained" endIcon={<InfoIcon />} className="mt-1">
              Details
            </Button>
          </Link>
        </Collapse>
      </CardContent>
    </Card>
  );
}

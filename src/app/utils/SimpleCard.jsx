import { Card } from "@mui/material";
import { Box, styled } from "@mui/system";

const CardRoot = styled(Card)(({ bgcolor, height }) => ({
  height: height || "100%",
  padding: "20px 24px",
  background: bgcolor || "white",
}));

const CardTitle = styled("div")(({ subtitle }) => ({
  fontSize: "1rem",
  fontWeight: "500",
  textTransform: "capitalize",
  marginBottom: !subtitle && "16px",
}));

const SimpleCard = ({ children, title, subtitle, icon, bgcolor, height }) => {
  return (
    <CardRoot elevation={6} bgcolor={bgcolor} height={height}>
      <CardTitle subtitle={subtitle}>{title}</CardTitle>
      {subtitle && <Box sx={{ mb: 2 }}>{subtitle}</Box>}
      {children}
    </CardRoot>
  );
};

export default SimpleCard;

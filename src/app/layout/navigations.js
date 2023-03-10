import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import ContactEmergencyIcon from "@mui/icons-material/ContactEmergency";
import CalculateIcon from "@mui/icons-material/Calculate";
import HandshakeIcon from "@mui/icons-material/Handshake";
import AirlineSeatReclineNormalIcon from "@mui/icons-material/AirlineSeatReclineNormal";
import InventoryIcon from "@mui/icons-material/Inventory";
import ConnectWithoutContactIcon from "@mui/icons-material/ConnectWithoutContact";

export const navigations = [
  { name: "Dashboard", path: `/dashboard`, icon: "dashboard" },
  { label: "OPERATIONS", type: "label" },

  {
    name: "Trips",
    icon: "commute",
    children: [
      { name: "Trip List", iconText: "T", path: "/trips" },

      { name: "Deleted Trips", iconText: "DP", path: "/trips/Deleted" },
    ],
  },
  { label: "Logistics Components", type: "label" },
  {
    name: "Trucks",
    iconComponent: <LocalShippingIcon />,
    children: [
      { name: "All Trucks", iconText: "TL", path: "/trucks" },
      { name: "Deleted Trucks", iconText: "DT", path: "/truck/deleted" },
    ],
  },
  {
    name: "Drivers",
    iconComponent: <AirlineSeatReclineNormalIcon />,
    children: [
      { name: "All Drivers", iconText: "TL", path: "/drivers" },
      { name: "Deleted Drivers", iconText: "AT", path: "/driver/deleted" },
    ],
  },
  {
    name: "Customers",
    iconComponent: <ConnectWithoutContactIcon />,
    children: [
      { name: "All Customers", iconText: "TL", path: "/customers" },
      { name: "Deleted Customers", iconText: "AT", path: "/customers/deleted" },
    ],
  },
  {
    name: "Partners",
    iconComponent: <HandshakeIcon />,
    children: [
      { name: "All Partners", iconText: "APS ", path: "/partners" },

      { name: "Deleted Partners", iconText: "DP", path: "/partners/Deleted" },
    ],
  },
  {
    name: "Vendors/Agents",
    iconComponent: <InventoryIcon />,
    children: [
      { name: "All Vendors", iconText: "TL", path: "/vendors/" },
      { name: "Trip Providers", iconText: "TL", path: "/vendors/" },
      { name: "Deleted Vendors", iconText: "AT", path: "/vendors/deleted" },
    ],
  },
  {
    name: "Managers",
    iconComponent: <ContactEmergencyIcon />,
    children: [
      { name: "All Managers", iconText: "TL", path: "/manager/" },
      { name: "Deleted Managers", iconText: "AT", path: "/manager/deleted" },
    ],
  },
  {
    name: "Tools",
    icon: "construction",
    children: [
      { name: "All Tools", iconText: "ALT", path: "/tools" },
      { name: "Damaged Tools", iconText: "DT", path: "/tools/damaged" },
      { name: "Retired Tools", iconText: "RT", path: "/tools/retired" },
    ],
  },

  { label: "FINANCE", type: "label" },
  {
    name: "Accounts",
    iconComponent: <CalculateIcon />,
    children: [
      { name: "Income", iconText: "SI", path: "/income" },
      { name: "Expenses", iconText: "SU", path: "/expenses" },
    ],
  },

  {
    name: "Documentation",
    icon: "launch",
    type: "extLink",
    path: "https://www.nemfra.com/",
  },
];

import { FirebaseLogin } from "../features/auth/SessionRoutes";
import Customers from "../features/customer/view/Customers";
import Customer from "../features/customer/view/Customer";
import Dashboard from "../features/dashboard/Dashboard";
import AddDriver from "../features/driver/view/AddDriver";
import DeletedDrivers from "../features/driver/view/DeletedDrivers";
import DriverDetail from "../features/driver/view/DriverDetail";
import Drivers from "../features/driver/view/Drivers";
import EditDriver from "../features/driver/view/EditDriver";
import AddEditPartners from "../features/partner/view/AddEditPartners";
import DeletedPartners from "../features/partner/view/DeletedPartners";
import Partner from "../features/partner/view/Partner";
import Partners from "../features/partner/view/Partners";
import AddTruck from "../features/truck/view/AddTruck";
import DeletedTrucks from "../features/truck/view/DeletedTrucks";
import EditTruck from "../features/truck/view/EditTruck";
import Truck from "../features/truck/view/Truck";
import TruckDetail from "../features/truck/view/TruckDetail";
import DeletedCustomers from "../features/customer/view/DeletedCustomers";
import VendorAgents from "../features/vendorAgent/view/VendorAgents";
import DeletedVendors from "../features/vendorAgent/view/DeletedVendors";

const routes = [
  {
    path: "/e-log/:organisationId",
    component: Dashboard,
    isDefault: true,
  },
  {
    path: "/e-log/session/signin",
    component: FirebaseLogin,
    isDefault: true,
  },
  {
    path: "/e-log/:organisationId/dashboard",
    component: Dashboard,
  },
  {
    path: "/e-log/:organisationId/trucks",
    component: Truck,
  },
  {
    path: "/e-log/:organisationId/truck/add",
    component: AddTruck,
  },
  {
    path: "/e-log/:organisationId/truck/deleted",
    component: DeletedTrucks,
  },
  {
    path: "/e-log/:organisationId/truck/:truckId",
    component: TruckDetail,
  },
  {
    path: "/e-log/:organisationId/truck/edit/:truckId",
    component: EditTruck,
  },
  {
    path: "/e-log/:organisationId/driver/edit/:driverId",
    component: EditDriver,
  },
  {
    path: "/e-log/:organisationId/driver/add",
    component: AddDriver,
  },
  {
    path: "/e-log/:organisationId/drivers",
    component: Drivers,
  },
  {
    path: "/e-log/:organisationId/driver/deleted",
    component: DeletedDrivers,
  },
  {
    path: "/e-log/:organisationId/driver/:driverId",
    component: DriverDetail,
  },

  {
    path: "/e-log/:organisationId/partners/",
    component: Partners,
  },
  {
    path: "/e-log/:organisationId/partners/:partnerId",
    component: Partner,
  },
  {
    path: "/e-log/:organisationId/partner/add",
    component: AddEditPartners,
  },
  {
    path: "/e-log/:organisationId/partners/:partnerId/edit",
    component: AddEditPartners,
  },
  {
    path: "/e-log/:organisationId/partners/deleted",
    component: DeletedPartners,
  },

  {
    path: "/e-log/:organisationId/customers/",
    component: Customers,
  },
  {
    path: "/e-log/:organisationId/customers/:customerId",
    component: Customer,
  },
  {
    path: "/e-log/:organisationId/customers/deleted",
    component: DeletedCustomers,
  },

  {
    path: "/e-log/:organisationId/vendors/",
    component: VendorAgents,
  },
  {
    path: "/e-log/:organisationId/vendors/deleted",
    component: DeletedVendors,
  },
];

export default routes;

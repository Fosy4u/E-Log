import { createApi } from "@reduxjs/toolkit/query/react";
import responseHandler from "./responseHandler";
import fetchBaseQuery from "./baseQuery";

export default createApi({
  reducerPath: "organisationsApi",
  baseQuery: fetchBaseQuery,
  refetchOnMountOrArgChange: true,
  tagTypes: [
    "Organisations",
    "Users",
    "Contacts",
    "Trucks",
    "Drivers",
    "Partners",
    "Trips"
  ],
  endpoints: (builder) => ({
    getOrganisation: builder.query({
      query: (arg) => {
        const payload = arg;
        return {
          url: `organisationProfile/`,
          params: { ...payload },
        };
      },
      providesTags: [["Organisations", "Users", "Contacts", "Branches"]],
      onQueryStarted: async (_, queryArgs) => {
        responseHandler({}, queryArgs);
      },
    }),
    getUser: builder.query({
      query: (arg) => {
        const { userId } = arg;
        return {
          url: `user/`,
          params: { userId },
        };
      },
      providesTags: [["Organisations", "Users"]],
      onQueryStarted: async (_, queryArgs) => {
        responseHandler({}, queryArgs);
      },
    }),

    createOrganisation: builder.mutation({
      query: ({ payload }) => ({
        url: `/organisationProfile/create`,
        method: "POST",
        body: payload,
      }),
      invalidatesTags: (result, error) =>
        error ? [] : ["Organisations", "Users"],
      onQueryStarted: async ({ successHandler, errorHandler }, queryArgs) => {
        responseHandler(
          {
            success: "Organisation Successfully Created",
            successHandler,
            errorHandler,
          },
          queryArgs
        );
      },
    }),
    editOrganisation: builder.mutation({
      query: ({ payload }) => ({
        url: `organisation/editOrganisation`,
        method: "PUT",
        body: payload,
      }),
      invalidatesTags: (result, error) =>
        error ? [] : ["Organisations", "Users"],
      onQueryStarted: async ({ successHandler, errorHandler }, queryArgs) => {
        responseHandler(
          {
            success: "Organisation Successfully Updated",
            successHandler,
            errorHandler,
          },
          queryArgs
        );
      },
    }),
    deleteOrganisationDeletionReason: builder.mutation({
      query: ({ payload }) => ({
        url: `organisation/deletionReason`,
        method: "Delete",
        body: payload,
      }),
      invalidatesTags: (result, error) =>
        error ? [] : ["Organisations", "Users"],
      onQueryStarted: async ({ successHandler, errorHandler }, queryArgs) => {
        responseHandler(
          {
            success: "Organisation Deletion Reason Successfully Deleted",
            successHandler,
            errorHandler,
          },
          queryArgs
        );
      },
    }),

    addTruck: builder.mutation({
      query: ({ payload }) => ({
        url: `/truck/create`,
        method: "POST",
        body: payload,
      }),
      invalidatesTags: (result, error) =>
        error ? [] : ["Organisations", "Users", "Trucks", "Drivers"],
      onQueryStarted: async ({ successHandler, errorHandler }, queryArgs) => {
        responseHandler(
          {
            success: "Truck Successfully Added",
            successHandler,
            errorHandler,
          },
          queryArgs
        );
      },
    }),
    uploadTruckDoc: builder.mutation({
      query: ({ payload }) => ({
        url: `/truck/uploadTruckDoc`,
        method: "PUT",
        body: payload,
      }),
      invalidatesTags: (result, error) =>
        error ? [] : ["Organisations", "Users", "Trucks", "Drivers"],
      onQueryStarted: async ({ successHandler, errorHandler }, queryArgs) => {
        responseHandler(
          {
            success: "Truck Document Successfully Added",
            successHandler,
            errorHandler,
          },
          queryArgs
        );
      },
    }),
    getTrucks: builder.query({
      query: (arg) => {
        const { organisationId, disabled } = arg;
        return {
          url: `/trucks/`,
          params: { organisationId, disabled },
        };
      },
      providesTags: ["Organisations", "Users", "Trucks", "Drivers"],
      onQueryStarted: async (_, queryArgs) => {
        responseHandler({}, queryArgs);
      },
    }),
    getTruck: builder.query({
      query: (arg) => {
        const { truckId } = arg;
        return {
          url: `/truck/`,
          params: { truckId },
        };
      },
      providesTags: ["Organisations", "Users", "Trucks", "Drivers"],
      onQueryStarted: async (_, queryArgs) => {
        responseHandler({}, queryArgs);
      },
    }),
    getTruckByParam: builder.query({
      query: (arg) => {
        return {
          url: `truck/param`,
          params: { ...arg },
        };
      },
      providesTags: ["Organisations", "Trucks", "Drivers"],
      onQueryStarted: async (_, queryArgs) => {
        responseHandler({}, queryArgs);
      },
    }),
    getPartnerTrucks: builder.query({
      query: (arg) => {
        return {
          url: `trucks/partner`,
          params: { ...arg },
        };
      },
      providesTags: ["Organisations", "Trucks", "Drivers"],
      onQueryStarted: async (_, queryArgs) => {
        responseHandler({}, queryArgs);
      },
    }),

    deleteTruck: builder.mutation({
      query: ({ payload }) => ({
        url: `truck/delete`,
        method: "PUT",
        body: payload,
      }),
      invalidatesTags: (result, error) =>
        error ? [] : ["Organisations", "Users", "Trucks", "Drivers"],

      onQueryStarted: async ({ successHandler, errorHandler }, queryArgs) => {
        responseHandler(
          {
            success: "Delete Truck Success",
            successHandler,
            errorHandler,
          },
          queryArgs
        );
      },
    }),
    restoreTruck: builder.mutation({
      query: ({ payload }) => ({
        url: `truck/restore`,
        method: "PUT",
        body: payload,
      }),
      invalidatesTags: (result, error) =>
        error ? [] : ["Organisations", "Users", "Trucks", "Drivers"],

      onQueryStarted: async ({ successHandler, errorHandler }, queryArgs) => {
        responseHandler(
          {
            success: "Delete Truck Success",
            successHandler,
            errorHandler,
          },
          queryArgs
        );
      },
    }),
    editTruck: builder.mutation({
      query: ({ payload }) => ({
        url: `/truck/edit`,
        method: "PUT",
        body: payload,
      }),
      invalidatesTags: (result, error) =>
        error ? [] : ["Organisations", "Users", "Trucks", "Drivers"],
      onQueryStarted: async ({ successHandler, errorHandler }, queryArgs) => {
        responseHandler(
          {
            success: "Update Truck Success",
            successHandler,
            errorHandler,
          },
          queryArgs
        );
      },
    }),
    activateTruck: builder.mutation({
      query: ({ payload }) => ({
        url: `/truck/activate`,
        method: "PUT",
        body: payload,
      }),
      invalidatesTags: (result, error) =>
        error ? [] : ["Organisations", "Users", "Trucks", "Drivers"],
      onQueryStarted: async ({ successHandler, errorHandler }, queryArgs) => {
        responseHandler(
          {
            success: "Truck action completed successfully",
            successHandler,
            errorHandler,
          },
          queryArgs
        );
      },
    }),

    assignTruckDriver: builder.mutation({
      query: ({ payload }) => ({
        url: `truck/assignTruckDriver`,
        method: "PUT",
        body: payload,
      }),
      invalidatesTags: (result, error) =>
        error ? [] : ["Organisations", "Trucks", "Drivers"],

      onQueryStarted: async ({ successHandler, errorHandler }, queryArgs) => {
        responseHandler(
          {
            success: "Truck assigned to driver",
            successHandler,
            errorHandler,
          },
          queryArgs
        );
      },
    }),
    assignTruckPartner: builder.mutation({
      query: ({ payload }) => ({
        url: `truck/assignTruckPartner`,
        method: "PUT",
        body: payload,
      }),
      invalidatesTags: (result, error) =>
        error ? [] : ["Organisations", "Trucks", "Partners"],

      onQueryStarted: async ({ successHandler, errorHandler }, queryArgs) => {
        responseHandler(
          {
            success: "Truck assigned to driver",
            successHandler,
            errorHandler,
          },
          queryArgs
        );
      },
    }),
    removeTruckPartner: builder.mutation({
      query: ({ payload }) => ({
        url: `truck/removeTruckPartner`,
        method: "PUT",
        body: payload,
      }),
      invalidatesTags: (result, error) =>
        error ? [] : ["Organisations", "Trucks", "Partners"],

      onQueryStarted: async ({ successHandler, errorHandler }, queryArgs) => {
        responseHandler(
          {
            success: "Truck assigned to driver",
            successHandler,
            errorHandler,
          },
          queryArgs
        );
      },
    }),

    //Driver
    addDriver: builder.mutation({
      query: ({ payload }) => ({
        url: `/driver/create`,
        method: "POST",
        body: payload,
      }),
      invalidatesTags: (result, error) =>
        error ? [] : ["Organisations", "Users", "Trucks", "Drivers"],
      onQueryStarted: async ({ successHandler, errorHandler }, queryArgs) => {
        responseHandler(
          {
            success: "Driver Successfully Added",
            successHandler,
            errorHandler,
          },
          queryArgs
        );
      },
    }),
    uploadDriverDoc: builder.mutation({
      query: ({ payload }) => ({
        url: `/driver/uploadDriverDoc`,
        method: "PUT",
        body: payload,
      }),
      invalidatesTags: (result, error) =>
        error ? [] : ["Organisations", "Users", "Trucks", "Drivers"],
      onQueryStarted: async ({ successHandler, errorHandler }, queryArgs) => {
        responseHandler(
          {
            success: "Driver Document Successfully Added",
            successHandler,
            errorHandler,
          },
          queryArgs
        );
      },
    }),
    getDrivers: builder.query({
      query: (arg) => {
        const { organisationId, disabled } = arg;
        return {
          url: `/drivers/`,
          params: { organisationId, disabled },
        };
      },
      providesTags: ["Organisations", "Users", "Trucks", "Drivers"],
      onQueryStarted: async (_, queryArgs) => {
        responseHandler({}, queryArgs);
      },
    }),
    getDriver: builder.query({
      query: (arg) => {
        const { driverId } = arg;
        return {
          url: `/driver/`,
          params: { driverId },
        };
      },
      providesTags: ["Organisations", "Users", "Trucks", "Drivers"],
      onQueryStarted: async (_, queryArgs) => {
        responseHandler({}, queryArgs);
      },
    }),

    getDriverByParam: builder.query({
      query: (arg) => {
        return {
          url: `driver/param`,
          params: { ...arg },
        };
      },
      providesTags: ["Organisations", "Users", "Trucks", "Drivers"],
      onQueryStarted: async (_, queryArgs) => {
        responseHandler({}, queryArgs);
      },
    }),

    deleteDriver: builder.mutation({
      query: ({ payload }) => ({
        url: `driver/delete`,
        method: "PUT",
        body: payload,
      }),
      invalidatesTags: (result, error) =>
        error ? [] : ["Organisations", "Users", "Trucks", "Drivers"],

      onQueryStarted: async ({ successHandler, errorHandler }, queryArgs) => {
        responseHandler(
          {
            success: "Delete Driver Success",
            successHandler,
            errorHandler,
          },
          queryArgs
        );
      },
    }),
    restoreDriver: builder.mutation({
      query: ({ payload }) => ({
        url: `driver/restore`,
        method: "PUT",
        body: payload,
      }),
      invalidatesTags: (result, error) =>
        error ? [] : ["Organisations", "Users", "Trucks", "Drivers"],

      onQueryStarted: async ({ successHandler, errorHandler }, queryArgs) => {
        responseHandler(
          {
            success: "Delete Driver Success",
            successHandler,
            errorHandler,
          },
          queryArgs
        );
      },
    }),
    activateDriver: builder.mutation({
      query: ({ payload }) => ({
        url: `driver/activate`,
        method: "PUT",
        body: payload,
      }),
      invalidatesTags: (result, error) =>
        error ? [] : ["Organisations", "Users", "Trucks", "Drivers"],

      onQueryStarted: async ({ successHandler, errorHandler }, queryArgs) => {
        responseHandler(
          {
            success: "Driver action completed successfully",
            successHandler,
            errorHandler,
          },
          queryArgs
        );
      },
    }),
    editDriver: builder.mutation({
      query: ({ payload }) => ({
        url: `/driver/edit`,
        method: "PUT",
        body: payload,
      }),
      invalidatesTags: (result, error) =>
        error ? [] : ["Organisations", "Users", "Trucks", "Drivers"],
      onQueryStarted: async ({ successHandler, errorHandler }, queryArgs) => {
        responseHandler(
          {
            success: "Update Driver Success",
            successHandler,
            errorHandler,
          },
          queryArgs
        );
      },
    }),

    createPartner: builder.mutation({
      query: ({ payload }) => ({
        url: `/organisationPartner/create`,
        method: "POST",
        body: payload,
      }),
      invalidatesTags: (result, error) =>
        error ? [] : ["Organisations", "Contacts", "Partners"],
      onQueryStarted: async ({ successHandler, errorHandler }, queryArgs) => {
        responseHandler(
          {
            success: "Partner Successfully Created",
            successHandler,
            errorHandler,
          },
          queryArgs
        );
      },
    }),

    getAllPartners: builder.query({
      query: (arg) => {
        const { organisationId, disabled } = arg;
        return {
          url: `organisationPartners/`,
          params: { organisationId, disabled },
        };
      },
      providesTags: ["Organisations", "Contacts", "Partners"],
      onQueryStarted: async (_, queryArgs) => {
        responseHandler({}, queryArgs);
      },
    }),
    getPartner: builder.query({
      query: (arg) => {
        const { _id } = arg;
        return {
          url: `organisationPartner/`,
          params: { _id },
        };
      },
      providesTags: ["Organisations", "Contacts", "Partners"],
      onQueryStarted: async (_, queryArgs) => {
        responseHandler({}, queryArgs);
      },
    }),
    getContactRemark: builder.query({
      query: (arg) => {
        const { _id } = arg;
        return {
          url: `organisationPartner/remarks/`,
          params: { _id },
        };
      },
      providesTags: ["Organisations", "Contacts", "Partners"],
      onQueryStarted: async (_, queryArgs) => {
        responseHandler({}, queryArgs);
      },
    }),
    getPartnerLogs: builder.query({
      query: (arg) => {
        const { _id } = arg;
        return {
          url: `organisationPartner/logs/`,
          params: { _id },
        };
      },
      providesTags: ["Organisations", "Contacts", "Partners"],
      onQueryStarted: async (_, queryArgs) => {
        responseHandler({}, queryArgs);
      },
    }),
    editPartner: builder.mutation({
      query: ({ payload }) => ({
        url: `organisationPartner/edit`,
        method: "PUT",
        body: payload,
      }),
      invalidatesTags: (result, error) =>
        error ? [] : ["Organisations", "Contacts", "Partners"],
      onQueryStarted: async ({ successHandler, errorHandler }, queryArgs) => {
        responseHandler(
          {
            success: "Partner Successfully Updated",
            successHandler,
            errorHandler,
          },
          queryArgs
        );
      },
    }),
    addPartnerRemark: builder.mutation({
      query: ({ payload }) => ({
        url: `organisationPartner/addRemark`,
        method: "PUT",
        body: payload,
      }),
      invalidatesTags: (result, error) =>
        error ? [] : ["Organisations", "Contacts", "Partners"],
      onQueryStarted: async ({ successHandler, errorHandler }, queryArgs) => {
        responseHandler(
          {
            success: "Partner Successfully Updated",
            successHandler,
            errorHandler,
          },
          queryArgs
        );
      },
    }),
    deletePartnerRemark: builder.mutation({
      query: ({ payload }) => ({
        url: `organisationPartner/deleteRemark`,
        method: "PUT",
        body: payload,
      }),
      invalidatesTags: (result, error) =>
        error ? [] : ["Organisations", "Contacts", "Partners"],
      onQueryStarted: async ({ successHandler, errorHandler }, queryArgs) => {
        responseHandler(
          {
            success: "Partner Successfully Updated",
            successHandler,
            errorHandler,
          },
          queryArgs
        );
      },
    }),
    editPartnerRemark: builder.mutation({
      query: ({ payload }) => ({
        url: `organisationPartner/editRemark`,
        method: "PUT",
        body: payload,
      }),
      invalidatesTags: (result, error) =>
        error ? [] : ["Organisations", "Contacts", "Partners"],
      onQueryStarted: async ({ successHandler, errorHandler }, queryArgs) => {
        responseHandler(
          {
            success: "Partner Successfully Updated",
            successHandler,
            errorHandler,
          },
          queryArgs
        );
      },
    }),
    deletePartner: builder.mutation({
      query: ({ payload }) => ({
        url: `organisationPartner/delete`,
        method: "PUT",
        body: payload,
      }),
      invalidatesTags: (result, error) =>
        error ? [] : ["Organisations", "Contacts", "Partners"],
      onQueryStarted: async ({ successHandler, errorHandler }, queryArgs) => {
        responseHandler(
          {
            success: " Partner Successfully Deleted",
            successHandler,
            errorHandler,
          },
          queryArgs
        );
      },
    }),
    restorePartner: builder.mutation({
      query: ({ payload }) => ({
        url: `organisationPartner/restore`,
        method: "PUT",
        body: payload,
      }),
      invalidatesTags: (result, error) =>
        error ? [] : ["Organisations", "Contacts", "Partners"],
      onQueryStarted: async ({ successHandler, errorHandler }, queryArgs) => {
        responseHandler(
          {
            success: "Partner Successfully Restored",
            successHandler,
            errorHandler,
          },
          queryArgs
        );
      },
    }),
    getPartnerRemark: builder.query({
      query: (arg) => {
        const { _id } = arg;
        return {
          url: `organisationPartner/remarks/`,
          params: { _id },
        };
      },
      providesTags: ["Organisations", "Partners"],
      onQueryStarted: async (_, queryArgs) => {
        responseHandler({}, queryArgs);
      },
    }),

    createCustomer: builder.mutation({
      query: ({ payload }) => ({
        url: `/customer/create`,
        method: "POST",
        body: payload,
      }),
      invalidatesTags: (result, error) =>
        error ? [] : ["Organisations", "Customers"],
      onQueryStarted: async ({ successHandler, errorHandler }, queryArgs) => {
        responseHandler(
          {
            success: "Partner Successfully Created",
            successHandler,
            errorHandler,
          },
          queryArgs
        );
      },
    }),
    getAllCustomers: builder.query({
      query: (arg) => {
        const { organisationId, disabled } = arg;
        return {
          url: `customers/`,
          params: { organisationId, disabled },
        };
      },
      providesTags: ["Organisations", "Customers"],
      onQueryStarted: async (_, queryArgs) => {
        responseHandler({}, queryArgs);
      },
    }),
    getCustomer: builder.query({
      query: (arg) => {
        const { _id, organisationId } = arg;
        return {
          url: `customer/`,
          params: { _id, organisationId },
        };
      },
      providesTags: ["Organisations", "Customers"],
      onQueryStarted: async (_, queryArgs) => {
        responseHandler({}, queryArgs);
      },
    }),
    getCustomerRemark: builder.query({
      query: (arg) => {
        const { _id, organisationId } = arg;
        return {
          url: `customer/remarks/`,
          params: { _id, organisationId },
        };
      },
      providesTags: ["Organisations", "Customers"],
      onQueryStarted: async (_, queryArgs) => {
        responseHandler({}, queryArgs);
      },
    }),
    getCustomerLogs: builder.query({
      query: (arg) => {
        const { _id } = arg;
        return {
          url: `customer/logs/`,
          params: { _id },
        };
      },
      providesTags: ["Organisations", "Customers"],
      onQueryStarted: async (_, queryArgs) => {
        responseHandler({}, queryArgs);
      },
    }),
    editCustomer: builder.mutation({
      query: ({ payload }) => ({
        url: `customer/edit`,
        method: "PUT",
        body: payload,
      }),
      invalidatesTags: (result, error) =>
        error ? [] : ["Organisations", "Customers"],
      onQueryStarted: async ({ successHandler, errorHandler }, queryArgs) => {
        responseHandler(
          {
            success: "Partner Successfully Updated",
            successHandler,
            errorHandler,
          },
          queryArgs
        );
      },
    }),
    addCustomerRemark: builder.mutation({
      query: ({ payload }) => ({
        url: `customer/addRemark`,
        method: "PUT",
        body: payload,
      }),
      invalidatesTags: (result, error) =>
        error ? [] : ["Organisations", "Customers"],
      onQueryStarted: async ({ successHandler, errorHandler }, queryArgs) => {
        responseHandler(
          {
            success: "Partner Successfully Updated",
            successHandler,
            errorHandler,
          },
          queryArgs
        );
      },
    }),
    deleteCustomerRemark: builder.mutation({
      query: ({ payload }) => ({
        url: `customer/deleteRemark`,
        method: "PUT",
        body: payload,
      }),
      invalidatesTags: (result, error) =>
        error ? [] : ["Organisations", "Customers"],
      onQueryStarted: async ({ successHandler, errorHandler }, queryArgs) => {
        responseHandler(
          {
            success: "Partner Successfully Updated",
            successHandler,
            errorHandler,
          },
          queryArgs
        );
      },
    }),
    editCustomerRemark: builder.mutation({
      query: ({ payload }) => ({
        url: `customer/editRemark`,
        method: "PUT",
        body: payload,
      }),
      invalidatesTags: (result, error) =>
        error ? [] : ["Organisations", "Customers"],
      onQueryStarted: async ({ successHandler, errorHandler }, queryArgs) => {
        responseHandler(
          {
            success: "Partner Successfully Updated",
            successHandler,
            errorHandler,
          },
          queryArgs
        );
      },
    }),
    deleteCustomer: builder.mutation({
      query: ({ payload }) => ({
        url: `customer/delete`,
        method: "PUT",
        body: payload,
      }),
      invalidatesTags: (result, error) =>
        error ? [] : ["Organisations", "Customers"],
      onQueryStarted: async ({ successHandler, errorHandler }, queryArgs) => {
        responseHandler(
          {
            success: " Partner Successfully Deleted",
            successHandler,
            errorHandler,
          },
          queryArgs
        );
      },
    }),
    restoreCustomer: builder.mutation({
      query: ({ payload }) => ({
        url: `customer/restore`,
        method: "PUT",
        body: payload,
      }),
      invalidatesTags: (result, error) =>
        error ? [] : ["Organisations", "Customers"],
      onQueryStarted: async ({ successHandler, errorHandler }, queryArgs) => {
        responseHandler(
          {
            success: "Partner Successfully Restored",
            successHandler,
            errorHandler,
          },
          queryArgs
        );
      },
    }),
    createVendor: builder.mutation({
      query: ({ payload }) => ({
        url: `/vendorAgent/create`,
        method: "POST",
        body: payload,
      }),
      invalidatesTags: (result, error) => (error ? [] : ["VendorAgents"]),
      onQueryStarted: async ({ successHandler, errorHandler }, queryArgs) => {
        responseHandler(
          {
            success: "Agent Successfully Created",
            successHandler,
            errorHandler,
          },
          queryArgs
        );
      },
    }),
    getAllVendors: builder.query({
      query: (arg) => {
        const { organisationId, disabled } = arg;
        return {
          url: `vendorAgents/`,
          params: { organisationId, disabled },
        };
      },
      providesTags: ["VendorAgents"],
      onQueryStarted: async (_, queryArgs) => {
        responseHandler({}, queryArgs);
      },
    }),
    getVendor: builder.query({
      query: (arg) => {
        const {  organisationId, vendorAgentId } = arg;
        return {
          url: `vendorAgent/`,
          params: {  organisationId, vendorAgentId },
        };
      },
      providesTags: ["VendorAgents"],
      onQueryStarted: async (_, queryArgs) => {
        responseHandler({}, queryArgs);
      },
    }),
    getVendorRemark: builder.query({
      query: (arg) => {
        const { _id, organisationId } = arg;
        return {
          url: `vendorAgent/remarks/`,
          params: { _id, organisationId },
        };
      },
      providesTags: ["VendorAgents"],
      onQueryStarted: async (_, queryArgs) => {
        responseHandler({}, queryArgs);
      },
    }),

    editVendor: builder.mutation({
      query: ({ payload }) => ({
        url: `vendorAgent/edit`,
        method: "PUT",
        body: payload,
      }),
      invalidatesTags: (result, error) => (error ? [] : ["VendorAgents"]),
      onQueryStarted: async ({ successHandler, errorHandler }, queryArgs) => {
        responseHandler(
          {
            success: "Agent Successfully Updated",
            successHandler,
            errorHandler,
          },
          queryArgs
        );
      },
    }),
    addVendorRemark: builder.mutation({
      query: ({ payload }) => ({
        url: `vendorAgent/addRemark`,
        method: "PUT",
        body: payload,
      }),
      invalidatesTags: (result, error) => (error ? [] : ["VendorAgents"]),
      onQueryStarted: async ({ successHandler, errorHandler }, queryArgs) => {
        responseHandler(
          {
            success: "Remark added to agent Successfully",
            successHandler,
            errorHandler,
          },
          queryArgs
        );
      },
    }),
    deleteVendorRemark: builder.mutation({
      query: ({ payload }) => ({
        url: `vendorAgent/deleteRemark`,
        method: "PUT",
        body: payload,
      }),
      invalidatesTags: (result, error) => (error ? [] : ["VendorAgents"]),
      onQueryStarted: async ({ successHandler, errorHandler }, queryArgs) => {
        responseHandler(
          {
            success: "Remark on agent Successfully Updated",
            successHandler,
            errorHandler,
          },
          queryArgs
        );
      },
    }),
    editVendorRemark: builder.mutation({
      query: ({ payload }) => ({
        url: `vendorAgent/editRemark`,
        method: "PUT",
        body: payload,
      }),
      invalidatesTags: (result, error) => (error ? [] : ["VendorAgents"]),
      onQueryStarted: async ({ successHandler, errorHandler }, queryArgs) => {
        responseHandler(
          {
            success: "Agent Successfully Updated",
            successHandler,
            errorHandler,
          },
          queryArgs
        );
      },
    }),
    deleteVendor: builder.mutation({
      query: ({ payload }) => ({
        url: `vendorAgent/delete`,
        method: "PUT",
        body: payload,
      }),
      invalidatesTags: (result, error) => (error ? [] : ["VendorAgents"]),
      onQueryStarted: async ({ successHandler, errorHandler }, queryArgs) => {
        responseHandler(
          {
            success: " Agent Successfully Deleted",
            successHandler,
            errorHandler,
          },
          queryArgs
        );
      },
    }),
    restoreVendor: builder.mutation({
      query: ({ payload }) => ({
        url: `vendorAgent/restore`,
        method: "PUT",
        body: payload,
      }),
      invalidatesTags: (result, error) => (error ? [] : ["VendorAgents"]),
      onQueryStarted: async ({ successHandler, errorHandler }, queryArgs) => {
        responseHandler(
          {
            success: "Agent Successfully Restored",
            successHandler,
            errorHandler,
          },
          queryArgs
        );
      },
    }),

    createTrip: builder.mutation({
      query: ({ payload }) => ({
        url: `/trip/create`,
        method: "POST",
        body: payload,
      }),
      invalidatesTags: (result, error) => (error ? [] : ["Trips"]),
      onQueryStarted: async ({ successHandler, errorHandler }, queryArgs) => {
        responseHandler(
          {
            success: "Trip Successfully Created",
            successHandler,
            errorHandler,
          },
          queryArgs
        );
      },
    }),
    getAllTrips: builder.query({
      query: (arg) => {
        const { organisationId, disabled } = arg;
        return {
          url: `tripss/`,
          params: { organisationId, disabled },
        };
      },
      providesTags: ["Trips"],
      onQueryStarted: async (_, queryArgs) => {
        responseHandler({}, queryArgs);
      },
    }),
    getTrip: builder.query({
      query: (arg) => {
        const {  organisationId, vendorAgentId } = arg;
        return {
          url: `trip/`,
          params: {  organisationId, vendorAgentId },
        };
      },
      providesTags: ["Trips"],
      onQueryStarted: async (_, queryArgs) => {
        responseHandler({}, queryArgs);
      },
    }),
    getTripRemark: builder.query({
      query: (arg) => {
        const { _id, organisationId } = arg;
        return {
          url: `trip/remarks/`,
          params: { _id, organisationId },
        };
      },
      providesTags: ["Trips"],
      onQueryStarted: async (_, queryArgs) => {
        responseHandler({}, queryArgs);
      },
    }),

    editTrip: builder.mutation({
      query: ({ payload }) => ({
        url: `trip/edit`,
        method: "PUT",
        body: payload,
      }),
      invalidatesTags: (result, error) => (error ? [] : ["Trips"]),
      onQueryStarted: async ({ successHandler, errorHandler }, queryArgs) => {
        responseHandler(
          {
            success: "Trip Successfully Updated",
            successHandler,
            errorHandler,
          },
          queryArgs
        );
      },
    }),
    addTripRemark: builder.mutation({
      query: ({ payload }) => ({
        url: `trip/addRemark`,
        method: "PUT",
        body: payload,
      }),
      invalidatesTags: (result, error) => (error ? [] : ["Trips"]),
      onQueryStarted: async ({ successHandler, errorHandler }, queryArgs) => {
        responseHandler(
          {
            success: "Remark added to trip Successfully",
            successHandler,
            errorHandler,
          },
          queryArgs
        );
      },
    }),
    deleteTripRemark: builder.mutation({
      query: ({ payload }) => ({
        url: `trip/deleteRemark`,
        method: "PUT",
        body: payload,
      }),
      invalidatesTags: (result, error) => (error ? [] : ["Trips"]),
      onQueryStarted: async ({ successHandler, errorHandler }, queryArgs) => {
        responseHandler(
          {
            success: "Remark on trip Successfully Updated",
            successHandler,
            errorHandler,
          },
          queryArgs
        );
      },
    }),
    editTripRemark: builder.mutation({
      query: ({ payload }) => ({
        url: `trip/editRemark`,
        method: "PUT",
        body: payload,
      }),
      invalidatesTags: (result, error) => (error ? [] : ["Trips"]),
      onQueryStarted: async ({ successHandler, errorHandler }, queryArgs) => {
        responseHandler(
          {
            success: "Trip Successfully Updated",
            successHandler,
            errorHandler,
          },
          queryArgs
        );
      },
    }),
    deleteTrip: builder.mutation({
      query: ({ payload }) => ({
        url: `trip/delete`,
        method: "PUT",
        body: payload,
      }),
      invalidatesTags: (result, error) => (error ? [] : ["Trips"]),
      onQueryStarted: async ({ successHandler, errorHandler }, queryArgs) => {
        responseHandler(
          {
            success: " Trip Successfully Deleted",
            successHandler,
            errorHandler,
          },
          queryArgs
        );
      },
    }),
    restoreTrip: builder.mutation({
      query: ({ payload }) => ({
        url: `trip/restore`,
        method: "PUT",
        body: payload,
      }),
      invalidatesTags: (result, error) => (error ? [] : ["Trips"]),
      onQueryStarted: async ({ successHandler, errorHandler }, queryArgs) => {
        responseHandler(
          {
            success: "Trip Successfully Restored",
            successHandler,
            errorHandler,
          },
          queryArgs
        );
      },
    }),










    createContact: builder.mutation({
      query: ({ payload }) => ({
        url: `/organisationContact/create`,
        method: "POST",
        body: payload,
      }),
      invalidatesTags: (result, error) =>
        error ? [] : ["Organisations", "Contacts"],
      onQueryStarted: async ({ successHandler, errorHandler }, queryArgs) => {
        responseHandler(
          {
            success: "Contact Successfully Created",
            successHandler,
            errorHandler,
          },
          queryArgs
        );
      },
    }),

    getAllContacts: builder.query({
      query: (arg) => {
        const { organisationId, contactType, status } = arg;
        return {
          url: `organisationContacts/`,
          params: { organisationId, contactType, status },
        };
      },
      providesTags: ["Organisations", "Contacts"],
      onQueryStarted: async (_, queryArgs) => {
        responseHandler({}, queryArgs);
      },
    }),
    getContact: builder.query({
      query: (arg) => {
        const { _id } = arg;
        return {
          url: `organisationContact/Contact/`,
          params: { _id },
        };
      },
      providesTags: ["Organisations", "Contacts"],
      onQueryStarted: async (_, queryArgs) => {
        responseHandler({}, queryArgs);
      },
    }),

    getContactLogs: builder.query({
      query: (arg) => {
        const { _id } = arg;
        return {
          url: `organisationContact/ContactLogs/`,
          params: { _id },
        };
      },
      providesTags: ["Organisations", "Contacts"],
      onQueryStarted: async (_, queryArgs) => {
        responseHandler({}, queryArgs);
      },
    }),
    editContact: builder.mutation({
      query: ({ payload }) => ({
        url: `organisationContact/editContact`,
        method: "PUT",
        body: payload,
      }),
      invalidatesTags: (result, error) =>
        error ? [] : ["Organisations", "Contacts"],
      onQueryStarted: async ({ successHandler, errorHandler }, queryArgs) => {
        responseHandler(
          {
            success: "Contact Successfully Updated",
            successHandler,
            errorHandler,
          },
          queryArgs
        );
      },
    }),
    addContactRemark: builder.mutation({
      query: ({ payload }) => ({
        url: `organisationContact/addRemark`,
        method: "PUT",
        body: payload,
      }),
      invalidatesTags: (result, error) =>
        error ? [] : ["Organisations", "Contacts"],
      onQueryStarted: async ({ successHandler, errorHandler }, queryArgs) => {
        responseHandler(
          {
            success: "Contact Successfully Updated",
            successHandler,
            errorHandler,
          },
          queryArgs
        );
      },
    }),
    deleteContactRemark: builder.mutation({
      query: ({ payload }) => ({
        url: `organisationContact/deleteRemark`,
        method: "PUT",
        body: payload,
      }),
      invalidatesTags: (result, error) =>
        error ? [] : ["Organisations", "Contacts"],
      onQueryStarted: async ({ successHandler, errorHandler }, queryArgs) => {
        responseHandler(
          {
            success: "Contact Successfully Updated",
            successHandler,
            errorHandler,
          },
          queryArgs
        );
      },
    }),
    deleteContact: builder.mutation({
      query: ({ payload }) => ({
        url: `organisationContact/deleteContact`,
        method: "PUT",
        body: payload,
      }),
      invalidatesTags: (result, error) =>
        error ? [] : ["Organisations", "Contacts"],
      onQueryStarted: async ({ successHandler, errorHandler }, queryArgs) => {
        responseHandler(
          {
            success: " Contact Successfully Deleted",
            successHandler,
            errorHandler,
          },
          queryArgs
        );
      },
    }),
    restoreContact: builder.mutation({
      query: ({ payload }) => ({
        url: `organisationContact/restoreContact`,
        method: "PUT",
        body: payload,
      }),
      invalidatesTags: (result, error) =>
        error ? [] : ["Organisations", "Contacts"],
      onQueryStarted: async ({ successHandler, errorHandler }, queryArgs) => {
        responseHandler(
          {
            success: "Contact Successfully Restored",
            successHandler,
            errorHandler,
          },
          queryArgs
        );
      },
    }),
  }),
});

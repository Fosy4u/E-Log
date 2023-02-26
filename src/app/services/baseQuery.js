import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export default fetchBaseQuery({
  baseUrl: "http://localhost:8080", // api base url
  //  baseUrl: 'http://192.168.0.96:8080', // api base url
  prepareHeaders: (headers, { getState }) => {
    const token = getState().global.authToken;

    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }

    return headers;
  },
});

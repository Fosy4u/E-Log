import { createSelector, createSlice } from '@reduxjs/toolkit';

export const GLOBAL_FEATURE_KEY = 'global';

const initialState = {
  toasts: [],
  currentUser: {},
  organisation: {},
  authToken: '',
  hideSideBar: false,
};

export const globalSlice = createSlice({
  name: GLOBAL_FEATURE_KEY,
  initialState,
  reducers: {
    addToast: (state, action) => {
      state.toasts.push({
        ...action.payload,
        id: Math.floor(Math.random() * 10000),
      });
    },
    removeToast: (state, action) => {
      state.toasts = state.toasts.filter(
        (toast) => action.payload !== toast.id
      );
    },
    setCurrentUser: (state, action) => {
      state.currentUser = Object.assign(state.currentUser, action.payload);
    },
    setOrganisation: (state, action) => {
      state.organisation = Object.assign(state.organisation, action.payload);
    },
    setAuthToken: (state, action) => {
      state.authToken = action.payload;
    },
    setHideSideBar: (state, action) => {
      state.hideSideBar = action.payload;
    },
  },
});

export const globalReducer = globalSlice.reducer;

export const globalActions = globalSlice.actions;

const getGlobalState = (rootState) => rootState[GLOBAL_FEATURE_KEY];

export const selectCurrentUser = createSelector(
  getGlobalState,
  (state) => state.currentUser
);
const selectAuthToken = createSelector(
  getGlobalState,
  (state) => state.authToken
);
 const selectOrganisation = createSelector(
  getGlobalState,
  (state) => state.organisation
);

const selectToasts = createSelector(getGlobalState, (state) => state.toasts);
const selectHideSideBar = createSelector(
  getGlobalState,
  (state) => state.hideSideBar
);

export const globalSelectors = {
  getGlobalState,
  selectToasts,
  selectCurrentUser,
  selectAuthToken,
  selectOrganisation,
  selectHideSideBar,
};

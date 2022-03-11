import { createSlice } from "@reduxjs/toolkit";

const retrieveAddressListInitialState = {
  retrieveAddressListRespons: undefined,
  retrieveAddressListError: undefined,
  retrieveAddressListLoading: false,
};

const createAddressInitialState = {
  createAddressRespons: undefined,
  createAddressError: undefined,
  createAddressLoading: false,
};

const initialState = {
  ...retrieveAddressListInitialState,
  ...createAddressInitialState,
  action: "",
  retrieveAddressListData: [],
  retrieveAddressListPagination: undefined,
};

const addressSlice = createSlice({
  name: "address",
  initialState,
  reducers: {
    //#region retrieveAddressList
    retrieveAddressListDataUpdate: (state, action) => ({
      ...state,
      retrieveAddressListData: action.payload,
      action: action.type,
    }),
    retrieveAddressListPaginationUpdate: (state, action) => ({
      ...state,
      retrieveAddressListPagination: action.payload,
      action: action.type,
    }),

    retrieveAddressListExecute: (state, action) => ({
      ...state,
      retrieveAddressListLoading: true,
      action: action.type,
    }),
    retrieveAddressListSuccess: (state, action) => ({
      ...state,
      retrieveAddressListLoading: false,
      retrieveAddressListRespons: action.payload,
      action: action.type,
    }),
    retrieveAddressListFailed: (state, action) => ({
      ...state,
      retrieveAddressListLoading: true,
      retrieveAddressListError: action.payload,
      action: action.type,
    }),
    retrieveAddressListReset: (state, action) => ({
      ...state,
      ...retrieveAddressListInitialState,
      action: action.type,
    }),
    //#endregion

    //#region createAddress
    createAddressExecute: (state, action) => ({
      ...state,
      createAddressLoading: true,
      action: action.type,
    }),
    createAddressSuccess: (state, action) => ({
      ...state,
      createAddressLoading: false,
      createAddressError: action.payload,
      action: action.type,
    }),
    createAddressFailed: (state, action) => ({
      ...state,
      createAddressLoading: true,
      createAddressError: action.payload,
      action: action.type,
    }),
    createAddressReset: (state, action) => ({
      ...state,
      ...createAddressInitialState,
      action: action.type,
    }),
    //#endregion
  },
});

export const { actions: addressAction, reducer: addressReducer } = addressSlice;

import { createSlice } from "@reduxjs/toolkit";

const retrieveProductListInitialState = {
  retrieveProductListRespons: undefined,
  retrieveProductListError: undefined,
  retrieveProductListLoading: false,
};

const retrieveProductDetailInitialState = {
  retrieveProductDetailRespons: undefined,
  retrieveProductDetailError: undefined,
  retrieveProductDetailLoading: false,
};

const initialState = {
  ...retrieveProductListInitialState,
  ...retrieveProductDetailInitialState,
  action: "",
  retrieveProductListData: [],
  retrieveProductListPagination: undefined,
  retrieveProductDetailData: undefined,
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    //#region retrieveProductList
    retrieveProductListDataUpdate: (state, action) => ({
      ...state,
      retrieveProductListData: action.payload,
      action: action.type,
    }),
    retrieveProductListPaginationUpdate: (state, action) => ({
      ...state,
      retrieveProductListPagination: action.payload,
      action: action.type,
    }),

    retrieveProductListExecute: (state, action) => ({
      ...state,
      retrieveProductListLoading: true,
      action: action.type,
    }),
    retrieveProductListSuccess: (state, action) => ({
      ...state,
      retrieveProductListLoading: false,
      retrieveProductListRespons: action.payload,
      action: action.type,
    }),
    retrieveProductListFailed: (state, action) => ({
      ...state,
      retrieveProductListLoading: false,
      retrieveProductListError: action.payload,
      action: action.type,
    }),
    retrieveProductListReset: (state, action) => ({
      ...state,
      ...retrieveProductListInitialState,
      action: action.type,
    }),
    //#endregion

    //#region retrieveProductDetail
    retrieveProductDetailDataUpdate: (state, action) => ({
      ...state,
      retrieveProductDetailData: action.payload,
    }),

    retrieveProductDetailExecute: (state, action) => ({
      ...state,
      retrieveProductDetailLoading: true,
      action: action.type,
    }),
    retrieveProductDetailSuccess: (state, action) => ({
      ...state,
      retrieveProductDetailLoading: false,
      retrieveProductDetailRespons: action.payload,
      action: action.type,
    }),
    retrieveProductDetailFailed: (state, action) => ({
      ...state,
      retrieveProductDetailLoading: false,
      retrieveProductDetailError: action.payload,
      action: action.type,
    }),
    retrieveProductDetailReset: (state, action) => ({
      ...state,
      ...retrieveProductDetailInitialState,
      action: action.type,
    }),
    //#endregion
  },
});

export const { actions: productAction, reducer: productReducer } = productSlice;

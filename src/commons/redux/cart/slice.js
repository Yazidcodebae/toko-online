import { createSlice } from "@reduxjs/toolkit";

const addCartInitialState = {
  addCartRespons: undefined,
  addCartError: undefined,
  addCartLoading: false,
};

const updateCartInitialState = {
  updateCartRespons: undefined,
  updateCartError: undefined,
  updateCartLoading: false,
};

const retrieveCartListInitialState = {
  retrieveCartListRespons: undefined,
  retrieveCartListError: undefined,
  retrieveCartListLoading: false,
};

const retrieveCartDetailInitialState = {
  retrieveCartDetailRespons: undefined,
  retrieveCartDetailError: undefined,
  retrieveCartDetailLoading: false,
};

const initialState = {
  ...addCartInitialState,
  ...updateCartInitialState,
  ...retrieveCartListInitialState,
  ...retrieveCartDetailInitialState,
  action: "",
  retrieveCartListData: [],
  retrieveCartListPagination: undefined,
  retrieveCartDetailData: undefined,
  retrieveCartListSelectedData: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    //#region addCart
    addCartExecute: (state, action) => ({
      ...state,
      addCartLoading: true,
      action: action.type,
    }),
    addCartSuccess: (state, action) => ({
      ...state,
      addCartLoading: false,
      action: action.type,
    }),
    addCartFailed: (state, action) => ({
      ...state,
      addCartLoading: false,
      addCartError: action.payload,
      action: action.type,
    }),
    addCartReset: (state, action) => ({
      ...state,
      ...addCartInitialState,
      action: action.type,
    }),
    //#endregion

    //#region updateCart
    updateCartExecute: (state, action) => ({
      ...state,
      updateCartLoading: true,
      action: action.type,
    }),
    updateCartSuccess: (state, action) => ({
      ...state,
      updateCartLoading: false,
      action: action.type,
    }),
    updateCartFailed: (state, action) => ({
      ...state,
      updateCartLoading: false,
      action: action.type,
    }),
    updateCartReset: (state, action) => ({
      ...state,
      ...updateCartInitialState,
      action: action.type,
    }),
    //#endregion

    //#region retrieveCartList
    retrieveCartListDataUpdate: (state, action) => ({
      ...state,
      retrieveCartListData: action.payload,
      action: action.type,
    }),
    retrieveCartListPaginationUpdate: (state, action) => ({
      ...state,
      retrieveCartListPagination: action.payload,
      action: action.type,
    }),

    retrieveCartListExecute: (state, action) => ({
      ...state,
      retrieveCartListLoading: true,
      action: action.type,
    }),
    retrieveCartListSuccess: (state, action) => ({
      ...state,
      retrieveCartListLoading: false,
      retrieveCartListRespons: action.payload,
      action: action.type,
    }),
    retrieveCartListFailed: (state, action) => ({
      ...state,
      retrieveCartListLoading: true,
      retrieveCartListError: action.payload,
      action: action.type,
    }),
    retrieveCartListReset: (state, action) => ({
      ...state,
      ...retrieveCartListInitialState,
      action: action.type,
    }),
    //#endregion

    //#region retrieveCartDetail
    retrieveCartDetailDataUpdate: (state, action) => ({
      ...state,
      retrieveCartDetailData: action.payload,
    }),

    retrieveCartDetailExecute: (state, action) => ({
      ...state,
      retrieveCartDetailLoading: true,
      action: action.type,
    }),
    retrieveCartDetailSuccess: (state, action) => ({
      ...state,
      retrieveCartDetailLoading: false,
      retrieveCartDetailRespons: action.payload,
      action: action.type,
    }),
    retrieveCartDetailFailed: (state, action) => ({
      ...state,
      retrieveCartDetailLoading: true,
      retrieveCartDetailError: action.payload,
      action: action.type,
    }),
    retrieveCartDetailReset: (state, action) => ({
      ...state,
      ...retrieveCartDetailInitialState,
      action: action.type,
    }),
    //#endregion

    //#region retrieveCartListSelected
    retrieveCartListSelectedDataUpdate: (state, action) => ({
      ...state,
      retrieveCartListSelectedData: action.payload,
      action: action.type,
    }),
    //#endregion
  },
});

export const { actions: cartAction, reducer: cartReducer } = cartSlice;

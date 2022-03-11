import { createSlice } from "@reduxjs/toolkit";

const retrieveCouponListInitialState = {
  retrieveCouponListRespons: undefined,
  retrieveCouponListError: undefined,
  retrieveCouponListLoading: false,
};

const initialState = {
  ...retrieveCouponListInitialState,
  action: "",
  retrieveCouponListData: [],
  retrieveCouponListPagination: undefined,
};

const couponSlice = createSlice({
  name: "coupon",
  initialState,
  reducers: {
    //#region retrieveCouponList
    retrieveCouponListExecute: (state, action) => ({
      ...state,
      retrieveCouponListLoading: true,
      action: action.type,
    }),
    retrieveCouponListSuccess: (state, action) => ({
      ...state,
      retrieveCouponListLoading: false,
      retrieveCouponListData: action.payload.data,
      retrieveCouponListPagination: action.payload.pagination,
      retrieveCouponListRespons: action.payload,
      action: action.type,
    }),
    retrieveCouponListFailed: (state, action) => ({
      ...state,
      retrieveCouponListLoading: false,
      retrieveCouponListError: action.payload,
      action: action.type,
    }),
    retrieveCouponListReset: (state, action) => ({
      ...state,
      ...retrieveCouponListInitialState,
      action: action.type,
    }),
    //#endregion
  },
});

export const { actions: couponAction, reducer: couponReducer } = couponSlice;

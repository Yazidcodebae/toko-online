import { createSlice } from "@reduxjs/toolkit";

const retrieveCategoryListInitialState = {
  retrieveCategoryListRespons: undefined,
  retrieveCategoryListError: undefined,
  retrieveCategoryListLoading: false,
};

const initialState = {
  ...retrieveCategoryListInitialState,
  action: "",
  retrieveCategoryListData: [],
  retrieveCategoryListPagination: undefined,
};

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    //#region retrieveCategoryList
    retrieveCategoryListDataUpdate: (state, action) => ({
      ...state,
      retrieveCategoryListData: action.payload,
    }),
    retrieveCategoryListPaginationUpdate: (state, action) => ({
      ...state,
      retrieveCategoryListPagination: action.payload,
    }),

    retrieveCategoryListExecute: (state, action) => ({
      ...state,
      retrieveCategoryListLoading: true,
      action: action.type,
    }),
    retrieveCategoryListSuccess: (state, action) => ({
      ...state,
      retrieveCategoryListLoading: false,
      retrieveCategoryListRespons: action.payload,
      action: action.type,
    }),
    retrieveCategoryListFailed: (state, action) => ({
      ...state,
      retrieveCategoryListLoading: false,
      retrieveCategoryListError: action.payload,
      action: action.type,
    }),
    retrieveCategoryListReset: (state, action) => ({
      ...state,
      ...retrieveCategoryListInitialState,
      action: action.type,
    }),
    //#endregion
  },
});

export const { actions: categoryAction, reducer: categoryReducer } =
  categorySlice;

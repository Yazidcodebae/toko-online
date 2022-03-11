import { createSlice } from "@reduxjs/toolkit";

const loginInitialState = {
  loginRespons: undefined,
  loginError: undefined,
  loginLoading: false,
};

const registerInitialState = {
  registerRespons: undefined,
  registerError: undefined,
  registerLoading: false,
};

const initialState = {
  token: "",
  ...loginInitialState,
  ...registerInitialState,
  action: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    updateToken: (state, action) => ({
      ...state,
      token: action.payload,
      action: action.type,
    }),

    //#region LOGIN
    loginExecute: (state, action) => ({
      ...state,
      loginLoading: true,
      action: action.type,
    }),
    loginSuccess: (state, action) => ({
      ...state,
      loginLoading: false,
      action: action.type,
    }),
    loginFailed: (state, action) => ({
      ...state,
      loginLoading: true,
      action: action.type,
    }),
    loginReset: (state, action) => ({
      ...state,
      ...loginInitialState,
      action: action.type,
    }),
    //#endregion

    //#region REGISTER
    registerExecute: (state, action) => ({
      ...state,
      registerLoading: true,
      action: action.type,
    }),
    registerSuccess: (state, action) => ({
      ...state,
      registerLoading: false,
      action: action.type,
    }),
    registerFailed: (state, action) => ({
      ...state,
      registerLoading: true,
      action: action.type,
    }),
    registerReset: (state, action) => ({
      ...state,
      ...registerInitialState,
      action: action.type,
    }),
    //#endregion
  },
});

export const { actions: authAction, reducer: authReducer } = authSlice;

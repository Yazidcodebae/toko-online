import { createSlice } from "@reduxjs/toolkit";

const retrieveProfileInitialState = {
  retrieveProfileRespons: undefined,
  retrieveProfileError: undefined,
  retrieveProfileLoading: false,
};

const updateProfileInitialState = {
  updateProfileRespons: undefined,
  updateProfileError: undefined,
  updateProfileLoading: false,
};

const updateProfilePictureInitialState = {
  updateProfilePictureRespons: undefined,
  updateProfilePictureError: undefined,
  updateProfilePictureLoading: false,
};

const updatePasswordInitialState = {
  updatePasswordRespons: undefined,
  updatePasswordError: undefined,
  updatePasswordLoading: false,
};

const initialState = {
  ...retrieveProfileInitialState,
  ...updateProfileInitialState,
  ...updatePasswordInitialState,
  action: "",
  retrieveProfileData: undefined,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    //#region retrieveProfile
    retrieveProfileExecute: (state, action) => ({
      ...state,
      retrieveProfileLoading: true,
      action: action.type,
    }),
    retrieveProfileSuccess: (state, action) => ({
      ...state,
      retrieveProfileLoading: false,
      retrieveProfileData: action.payload,
      retrieveProfileRespons: action.payload,
      action: action.type,
    }),
    retrieveProfileFailed: (state, action) => ({
      ...state,
      retrieveProfileLoading: false,
      retrieveProfileError: action.payload,
      action: action.type,
    }),
    retrieveProfileReset: (state, action) => ({
      ...state,
      ...retrieveProfileInitialState,
      action: action.type,
    }),
    //#endregion

    //#region updateProfile
    updateProfileExecute: (state, action) => ({
      ...state,
      updateProfileLoading: true,
      action: action.type,
    }),
    updateProfileSuccess: (state, action) => ({
      ...state,
      updateProfileLoading: false,
      updateProfileRespons: action.payload,
      action: action.type,
    }),
    updateProfileFailed: (state, action) => ({
      ...state,
      updateProfileLoading: false,
      updateProfileError: action.payload,
      action: action.type,
    }),
    updateProfileReset: (state, action) => ({
      ...state,
      ...updateProfileInitialState,
      action: action.type,
    }),
    //#endregion

    //#region updateProfilePicture
    updateProfilePictureExecute: (state, action) => ({
      ...state,
      updateProfilePictureLoading: true,
      action: action.type,
    }),
    updateProfilePictureSuccess: (state, action) => ({
      ...state,
      updateProfilePictureLoading: false,
      updateProfilePictureRespons: action.payload,
      action: action.type,
    }),
    updateProfilePictureFailed: (state, action) => ({
      ...state,
      updateProfilePictureLoading: false,
      updateProfilePictureError: action.payload,
      action: action.type,
    }),
    updateProfilePictureReset: (state, action) => ({
      ...state,
      ...updateProfilePictureInitialState,
      action: action.type,
    }),
    //#endregion

    //#region updatePassword
    updatePasswordExecute: (state, action) => ({
      ...state,
      updatePasswordLoading: true,
      action: action.type,
    }),
    updatePasswordSuccess: (state, action) => ({
      ...state,
      updatePasswordLoading: false,
      updatePasswordRespons: action.payload,
      action: action.type,
    }),
    updatePasswordFailed: (state, action) => ({
      ...state,
      updatePasswordLoading: false,
      updatePasswordError: action.payload,
      action: action.type,
    }),
    updatePasswordReset: (state, action) => ({
      ...state,
      ...updatePasswordInitialState,
      action: action.type,
    }),
    //#endregion
  },
});

export const { actions: userAction, reducer: userReducer } = userSlice;

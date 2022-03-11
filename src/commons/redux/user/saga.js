import axios from "axios";
import { call, put, takeLatest } from "redux-saga/effects";
import { baseApi } from "../../config";
import { userAction } from "./slice";

// WORKER
function* retrieveProfileWorker() {
  try {
    const res = yield call(axios.get, `${baseApi}/me`);
    yield put(userAction.retrieveProfileSuccess(res.data));
  } catch (error) {
    yield put(userAction.retrieveProfileFailed(error.response.data));
  }
}

function* updateProfileWorker(action) {
  try {
    const res = yield call(axios.put, `${baseApi}/profile/customers`, {
      name: action.payload.name,
      phone: action.payload.phone,
    });
    yield put(userAction.updateProfileSuccess(res.data));
  } catch (error) {
    yield put(userAction.updateProfileFailed(error.response.data));
  }
}

function* updateProfilePictureWorker(action) {
  try {
    const data = new FormData();
    data.append(
      "foto",
      action.payload.profilePicture,
      action.payload.profilePicture.name
    );
    data.append(
      "profilePicture",
      action.payload.id + "." + action.payload.profilePicture.type.split("/")[1]
    );

    const res = yield call(
      axios.put,
      `${baseApi}/profile/customers-photo`,
      data
    );
    yield put(userAction.updateProfilePictureSuccess(res.data));
  } catch (error) {
    yield put(userAction.updateProfilePictureFailed(error.response.data));
  }
}

function* updatePasswordWorker(action) {
  try {
    const res = yield call(axios.put, `${baseApi}/update-password`, {
      oldPassword: action.payload.oldPassword,
      newPassword: action.payload.newPassword,
    });
    yield put(userAction.updatePasswordSuccess(res.data));
  } catch (error) {
    yield put(userAction.updatePasswordFailed(error.response.data));
  }
}

// WATCHER
export const userWatcher = [
  takeLatest(userAction.retrieveProfileExecute.type, retrieveProfileWorker),
  takeLatest(userAction.updateProfileExecute.type, updateProfileWorker),
  takeLatest(
    userAction.updateProfilePictureExecute.type,
    updateProfilePictureWorker
  ),
  takeLatest(userAction.updatePasswordExecute.type, updatePasswordWorker),
];

import axios from "axios";
import { call, put, takeLatest } from "redux-saga/effects";
import { baseApi } from "../../config";
import { authAction } from "./slice";

// WORKER
function* loginWorker(action) {
  try {
    const res = yield call(axios.post, `${baseApi}/login`, {
      email: action.payload.email,
      password: action.payload.password,
      type: "customers",
    });
    yield put(authAction.loginSuccess(res.data));
    yield put(authAction.updateToken(res.data.accessToken));
  } catch (error) {
    yield put(authAction.loginFailed(error));
  }
}

function* registerWorker(action) {
  try {
    const res = yield call(axios.post, baseApi + "/register", {
      email: action.payload.email,
      password: action.payload.password,
      type: "customers",
    });
    yield put(authAction.registerSuccess(res.data));
  } catch (error) {
    yield put(authAction.registerFailed(error));
  }
}

// WATCHER
export const authWatcher = [
  takeLatest(authAction.loginExecute.type, loginWorker),
  takeLatest(authAction.registerExecute.type, registerWorker),
];

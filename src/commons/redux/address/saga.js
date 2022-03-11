import axios from "axios";
import qs from "qs";
import { call, put, takeLatest } from "redux-saga/effects";
import { baseApi } from "../../config";
import { addressAction } from "./slice";

// WORKER
function* retrieveAddressListWorker(action) {
  try {
    const query = qs.stringify(action.payload);
    const res = yield call(axios.get, `${baseApi}/address?${query}`);

    yield put(addressAction.retrieveAddressListDataUpdate(res.data.data));
    if (res.data?.pagination?.total) {
      yield put(
        addressAction.retrieveAddressListPaginationUpdate(res.data.pagination)
      );
    }
    yield put(addressAction.retrieveAddressListSuccess(res.data));
  } catch (error) {
    yield put(addressAction.retrieveAddressFailed(error.response.data));
  }
}

function* createAddressWorker(action) {
  try {
    const res = yield call(axios.post, `${baseApi}/address`, {
      address: action.payload.address,
      description: action.payload.description,
      name: action.payload.name,
      phone: action.payload.phone,
    });
    yield put(addressAction.createAddressSuccess(res.data));
  } catch (error) {
    yield put(addressAction.createAddressFailed(error.response.data));
  }
}

// WATCHER
export const addressWatcher = [
  takeLatest(
    addressAction.retrieveAddressListExecute.type,
    retrieveAddressListWorker
  ),
  takeLatest(addressAction.createAddressExecute.type, createAddressWorker),
];

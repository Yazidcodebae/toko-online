import axios from "axios";
import { call, put, takeLatest } from "redux-saga/effects";
import { baseApi } from "../../config";
import { couponAction } from "./slice";

// WORKER
function* retrieveCouponListWorker() {
  try {
    const res = yield call(axios.get, `${baseApi}/coupons`);
    yield put(couponAction.retrieveCouponListSuccess(res.data));
  } catch (error) {
    yield put(couponAction.retrieveCouponListFailed(error.response.data));
  }
}

// WATCHER
export const couponWatcher = [
  takeLatest(
    couponAction.retrieveCouponListExecute.type,
    retrieveCouponListWorker
  ),
];

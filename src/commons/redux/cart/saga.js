import { baseApi } from "@commons/config/index";
import axios from "axios";
import qs from "qs";
import { call, put, takeLatest } from "redux-saga/effects";
import { cartAction } from "./slice";
// WORKER
function* addCartWorker(action) {
  try {
    const res = yield call(axios.post, `${baseApi}/carts`, {
      product_id: action.payload.product_id,
      quantity: action.payload.quantity,
    });
    yield put(cartAction.addCartSuccess(res.data));
  } catch (error) {
    yield put(cartAction.addCartFailed(error.response.data));
  }
}

function* updateCartWorker(action) {
  try {
    const res = yield call(axios.put, `${baseApi}/carts/${action.payload.id}`, {
      product_id: action.payload.product_id,
      quantity: action.payload.quantity,
    });
    yield put(cartAction.updateCartSuccess(res.data));
  } catch (error) {
    yield put(cartAction.updateCartFailed(error));
  }
}

function* retrieveCartListWorker(action) {
  try {
    const query = qs.stringify(action.payload);
    const res = yield call(axios.get, `${baseApi}/carts?${query}`);

    yield put(cartAction.retrieveCartListDataUpdate(res.data.data));
    if (res.data?.pagination?.total) {
      yield put(
        cartAction.retrieveCartListPaginationUpdate(res.data.pagination)
      );
    }
    yield put(cartAction.retrieveCartListSuccess(res.data));
  } catch (error) {
    yield put(cartAction.retrieveCartListFailed(error.response.data));
  }
}

function* retrieveCartDetailWorker(action) {
  try {
    const res = yield call(
      axios.get,
      `${baseApi}/products/${action.payload.id}`
    );
    yield put(cartAction.retrieveProductDetailDataUpdate(res.data));
    yield put(cartAction.retrieveProductDetailSuccess(res.data));
  } catch (error) {
    yield put(cartAction.retrieveProductDetailFailed(error.response.data));
  }
}

// WATCHER
export const cartWatcher = [
  takeLatest(cartAction.addCartExecute.type, addCartWorker),
  takeLatest(cartAction.updateCartExecute.type, updateCartWorker),
  takeLatest(cartAction.retrieveCartListExecute.type, retrieveCartListWorker),
  takeLatest(
    cartAction.retrieveCartDetailExecute.type,
    retrieveCartDetailWorker
  ),
];

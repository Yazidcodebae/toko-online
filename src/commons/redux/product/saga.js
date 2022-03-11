import axios from "axios";
import qs from "qs";
import { call, put, takeLatest } from "redux-saga/effects";
import { baseApi } from "../../config";
import { productAction } from "./slice";

// WORKER
function* productsListWorker(action) {
  try {
    const query = qs.stringify(action.payload);
    const res = yield call(axios.get, `${baseApi}/products?${query}`);

    yield put(productAction.retrieveProductListDataUpdate(res.data.data));
    if (res.data?.pagination?.total) {
      yield put(
        productAction.retrieveProductListPaginationUpdate(res.data.pagination)
      );
    }
    yield put(productAction.retrieveProductListSuccess(res.data));
  } catch (error) {
    yield put(productAction.retrieveProductListFailed(error.response.data));
  }
}

function* productDetailWorker(action) {
  try {
    const res = yield call(
      axios.get,
      `${baseApi}/products/${action.payload.id}`
    );
    yield put(productAction.retrieveProductDetailDataUpdate(res.data));
    yield put(productAction.retrieveProductDetailSuccess(res.data));
  } catch (error) {
    yield put(productAction.retrieveProductDetailFailed(error.response.data));
  }
}

// WATCHER
export const productsWatcher = [
  takeLatest(productAction.retrieveProductListExecute.type, productsListWorker),
  takeLatest(
    productAction.retrieveProductDetailExecute.type,
    productDetailWorker
  ),
];

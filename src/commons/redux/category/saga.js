import axios from "axios";
import qs from "qs";
import { call, put, takeLatest } from "redux-saga/effects";
import { baseApi } from "../../config";
import { categoryAction } from "./slice";

// WORKER
function* categoryListWorker(action) {
  try {
    const query = qs.stringify(action.payload);
    const res = yield call(axios.get, `${baseApi}/categories?${query}`);
    yield put(categoryAction.retrieveCategoryListDataUpdate(res.data.data));
    if (res.data?.pagination?.total) {
      yield put(
        categoryAction.retrieveCategoryListPaginationUpdate(res.data.pagination)
      );
    }
    yield put(categoryAction.retrieveCategoryListSuccess(res.data));
  } catch (error) {
    yield put(categoryAction.retrieveCategoryListFailed(error.response.data));
  }
}

// WATCHER
export const categoryWatcher = [
  takeLatest(
    categoryAction.retrieveCategoryListExecute.type,
    categoryListWorker
  ),
];

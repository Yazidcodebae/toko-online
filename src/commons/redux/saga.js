import { all } from "@redux-saga/core/effects";
import { addressWatcher } from "./address/saga";
import { authWatcher } from "./auth/saga";
import { cartWatcher } from "./cart/saga";
import { categoryWatcher } from "./category/saga";
import { couponWatcher } from "./coupon/saga";
import { orderWatcher } from "./order/saga";
import { productsWatcher } from "./product/saga";
import { userWatcher } from "./user/saga";

const rootWathcer = [
  ...authWatcher,
  ...categoryWatcher,
  ...productsWatcher,
  ...cartWatcher,
  ...addressWatcher,
  ...userWatcher,
  ...couponWatcher,
  ...orderWatcher,
];

// WATCHER
function* rootSaga() {
  yield all(rootWathcer);
}

export { rootSaga };

import { combineReducers } from "redux";
import { addressReducer } from "./address/slice";
import { authReducer } from "./auth/slice";
import { cartReducer } from "./cart/slice";
import { categoryReducer } from "./category/slice";
import { couponReducer } from "./coupon/slice";
import { orderReducer } from "./order/slice";
import { productReducer } from "./product/slice";
import { userReducer } from "./user/slice";

const rootReducer = combineReducers({
  auth: authReducer,
  product: productReducer,
  category: categoryReducer,
  cart: cartReducer,
  address: addressReducer,
  user: userReducer,
  coupon: couponReducer,
  order: orderReducer,
});

export { rootReducer };

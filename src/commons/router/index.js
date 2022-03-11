import AuthRouter from "./auth";
import CartRouter from "./carts";
import CouponRouter from "./coupons";
import OrderRouter from "./orders";
import ProductRouter from "./products";
import UserRouter from "./users";

const authenticatedRoutes = [
  ...UserRouter,
  ...CouponRouter,
  ...OrderRouter,
  ...CartRouter,
  ...ProductRouter,
];
const unAuthenticatedRoutes = [...AuthRouter];

export { authenticatedRoutes, unAuthenticatedRoutes };

import OrderList from "modules/order/pages/OrderList/index";
import Checkout from "../../modules/order/pages/Checkout";

const OrderRouter = [
  {
    path: "/checkout",
    label: "Checkout",
    component: Checkout,
  },
  {
    path: "/order",
    label: "Order",
    component: OrderList,
  },
];

export default OrderRouter;

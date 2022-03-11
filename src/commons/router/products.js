import ProductDetail from "../../modules/product/pages/ProductDetail";
import ProductList from "../../modules/product/pages/ProductList";

const CartRouter = [
  {
    path: "/product",
    label: "Product",
    component: ProductList,
  },
  {
    path: "/product/:id",
    label: "Product Detail",
    component: ProductDetail,
  },
];

export default CartRouter;

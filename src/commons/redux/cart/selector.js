import { useSelector } from "react-redux";

export const useCartAction = () => useSelector((state) => state.cart.action);

//#region retrieveCartList
export const useRetrieveCartListLoading = () => {
  return useSelector((state) => state.cart.retrieveCartListLoading);
};
export const useRetrieveCartListData = () => {
  return useSelector((state) => state.cart.retrieveCartListData);
};
export const useRetrieveCartListPagination = () => {
  return useSelector((state) => state.cart.retrieveCartListPagination);
};
//#endregion

//#region retrieveCartDetail
export const useRetrieveCartDetailLoading = () => {
  return useSelector((state) => state.cart.retrieveCartDetailLoading);
};
export const useRetrieveCartDetailData = () => {
  return useSelector((state) => state.cart.retrieveCartDetailData);
};
//#endregion

//#region addCart
export const useAddCartLoading = () => {
  return useSelector((state) => state.cart.addCartLoading);
};
//#endregion

//#region updateCart
export const useUpdateCartLoading = () => {
  return useSelector((state) => state.cart.updateCartLoading);
};
//#endregion

//#region retrieveCartListSelected
export const useRetrieveCartListSelectedData = () => {
  return useSelector((state) => state.cart.retrieveCartListSelectedData);
};
//#endregion

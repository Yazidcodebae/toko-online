import { useSelector } from "react-redux";

export const useOrderAction = () => useSelector((state) => state.order.action);

//#region retrieveOrderList
export const useRetrieveOrderListLoading = () => {
  return useSelector((state) => state.order.retrieveOrderListLoading);
};
export const useRetrieveOrderListData = () => {
  return useSelector((state) => state.order.retrieveOrderListData);
};
export const useRetrieveOrderListPagination = () => {
  return useSelector((state) => state.order.retrieveOrderListPagination);
};
//#endregion

//#region checkout
export const useCheckoutLoading = () => {
  return useSelector((state) => state.order.checkoutLoading);
};
//#endregion

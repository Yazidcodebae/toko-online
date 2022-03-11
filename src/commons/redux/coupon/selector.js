import { useSelector } from "react-redux";

export const useCouponAction = () =>
  useSelector((state) => state.coupon.action);

//#region retrieveCouponList
export const useRetrieveCouponListLoading = () => {
  return useSelector((state) => state.coupon.retrieveCouponListLoading);
};
export const useRetrieveCouponListData = () => {
  return useSelector((state) => state.coupon.retrieveCouponListData);
};
export const useRetrieveCouponListPagination = () => {
  return useSelector((state) => state.coupon.retrieveCouponListPagination);
};
//#endregion

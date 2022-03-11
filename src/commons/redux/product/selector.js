import { useSelector } from "react-redux";

export const useProductAction = () =>
  useSelector((state) => state.product.action);

//#region retrieveProductList
export const useRetrieveProductListLoading = () => {
  return useSelector((state) => state.product.retrieveProductListLoading);
};
export const useRetrieveProductListData = () => {
  return useSelector((state) => state.product.retrieveProductListData);
};
export const useRetrieveProductListPagination = () => {
  return useSelector((state) => state.product.retrieveProductListPagination);
};
//#endregion

//#region retrieveProductDetail
export const useRetrieveProductDetailLoading = () => {
  return useSelector((state) => state.product.retrieveProductDetailLoading);
};
export const useRetrieveProductDetailData = () => {
  return useSelector((state) => state.product.retrieveProductDetailData);
};
//#endregion

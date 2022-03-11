import { useSelector } from "react-redux";

export const useCategoryAction = () =>
  useSelector((state) => state.category.action);

//#region retrieveCategoryList
export const useRetrieveCategoryListLoading = () => {
  return useSelector((state) => state.category.retrieveCategoryListLoading);
};
export const useRetrieveCategoryListData = () => {
  return useSelector((state) => state.category.retrieveCategoryListData);
};
export const useRetrieveCategoryListPagination = () => {
  return useSelector((state) => state.category.retrieveCategoryListPagination);
};
//#endregion

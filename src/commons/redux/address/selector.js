import { useSelector } from "react-redux";

export const useAddressAction = () =>
  useSelector((state) => state.address.action);

//#region retrieveAddressList
export const useRetrieveAddressListLoading = () => {
  return useSelector((state) => state.address.retrieveAddressListLoading);
};
export const useRetrieveAddressListData = () => {
  return useSelector((state) => state.address.retrieveAddressListData);
};
export const useRetrieveAddressListPagination = () => {
  return useSelector((state) => state.address.retrieveAddressListPagination);
};
//#endregion

//#region retrieveAddressDetail
export const useRetrieveAddressDetailLoading = () => {
  return useSelector((state) => state.address.retrieveAddressDetailLoading);
};
export const useRetrieveAddressDetailData = () => {
  return useSelector((state) => state.address.retrieveAddressDetailData);
};
//#endregion

//#region createAddress
export const useCreateAddressLoading = () => {
  return useSelector((state) => state.address.createAddressLoading);
};
//#endregion

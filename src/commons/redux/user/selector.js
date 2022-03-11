import { useSelector } from "react-redux";

export const useUserAction = () => useSelector((state) => state.user.action);

//#region retrieveProfile
export const useRetrieveProfileLoading = () => {
  return useSelector((state) => state.user.retrieveProfileLoading);
};
export const useRetrieveProfileData = () => {
  return useSelector((state) => state.user.retrieveProfileData);
};
//#endregion

export const useUpdateProfileLoading = () => {
  return useSelector((state) => state.user.updateProfileLoading);
};
export const useUpdatePasswordLoading = () => {
  return useSelector((state) => state.user.updatePasswordLoading);
};
export const useUpdateProfilePictureLoading = () => {
  return useSelector((state) => state.user.updateProfilePictureLoading);
};

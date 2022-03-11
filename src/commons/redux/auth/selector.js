import { useSelector } from "react-redux";

export const useAuthAction = () => useSelector((state) => state.auth.action);

export const useLoginLoading = () => {
  return useSelector((state) => state.auth.loginLoading);
};
export const useRegisterLoading = () => {
  return useSelector((state) => state.auth.registerLoading);
};

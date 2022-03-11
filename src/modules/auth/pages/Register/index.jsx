import { yupResolver } from "@hookform/resolvers/yup";
import React, { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import * as yup from "yup";
import {
  useAuthAction,
  useRegisterLoading,
} from "../../../../commons/redux/auth/selector";
import { authAction } from "../../../../commons/redux/auth/slice";
import { Spinner } from "../../../../components/atoms";

const schema = yup.object().shape({
  email: yup.string().required("Email Required"),
  password: yup.string().required("Password Required"),
  passwordConfirm: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match"),
});
const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const dispatch = useDispatch();
  const history = useHistory();

  //#region STATE
  const authActionState = useAuthAction();
  const loading = useRegisterLoading();
  //#endregion

  //#region HANDLER
  const handleRegister = useCallback(
    (payload) => dispatch(authAction.registerExecute(payload)),
    [dispatch]
  );

  const handleRegisterReset = useCallback(
    () => dispatch(authAction.registerReset()),
    [dispatch]
  );
  //#endregion

  //#region WATCHER
  useEffect(() => {
    if (authActionState === authAction.registerSuccess.type) {
      history.replace("/login");
    }
    if (authActionState === authAction.registerFailed.type) {
      handleRegisterReset();
    }
  }, [authActionState, history, handleRegisterReset]);
  //#endregion

  //#region RESET
  useEffect(() => {
    return () => handleRegisterReset();
  }, [handleRegisterReset]);
  //#endregion

  return (
    <div className="flex flex-row h-screen items-center justify-center bg-gray-1">
      <div>
        <div className="font-bold text-6xl">
          <div>Register to</div>
          <div>Start Shopping</div>
        </div>
        <div className="mt-20">
          <div>If you have an account</div>
          <div className="mt-3">
            you can{" "}
            <Link to="/login" className="text-blue-700 font-medium">
              Signin Here
            </Link>
          </div>
        </div>
      </div>

      <form
        className="flex flex-col w-80 ml-40"
        onSubmit={handleSubmit(handleRegister)}
      >
        <input
          name="email"
          type="text"
          placeholder="Input Email"
          className="p-5 rounded-md bg-gray-2 border-none mt-8"
          {...register("email")}
        />
        {errors?.email && (
          <div className="text-red-500">{errors?.email?.message}</div>
        )}
        <input
          name="password"
          type="password"
          placeholder="Input Password"
          className="p-5 rounded-md bg-gray-2 border-none mt-8"
          {...register("password")}
        />
        {errors?.password && (
          <div className="text-red-500">{errors?.password?.message}</div>
        )}

        <input
          name="passwordConfirm"
          type="password"
          placeholder="Confirm Password"
          className="p-5 rounded-md bg-gray-2 border-none mt-8"
          {...register("passwordConfirm")}
        />
        {errors?.passwordConfirm && (
          <div className="text-red-500">{errors?.passwordConfirm?.message}</div>
        )}

        <button
          type="submit"
          className="bg-blue-600 py-5 rounded-md hover:bg-blue-500 text-white mt-8 shadow-2xl flex items-center justify-center"
        >
          {loading && <Spinner className="mr-4" />}
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default Register;

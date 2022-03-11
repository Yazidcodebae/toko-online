import { useAuthAction, useLoginLoading } from "@commons/redux/auth/selector";
import { authAction } from "@commons/redux/auth/slice";
import { Spinner } from "@components/atoms/index";
import { yupResolver } from "@hookform/resolvers/yup";
import React, { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import * as yup from "yup";

const schema = yup.object().shape({
  email: yup.string().required("Email Required"),
  password: yup.string().required("Password Required"),
});

const Login = () => {
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
  const loading = useLoginLoading();
  //#endregion

  //#region HANDLER
  const handleLogin = useCallback(
    (payload) => dispatch(authAction.loginExecute(payload)),
    [dispatch]
  );

  const handleLoginReset = useCallback(
    () => dispatch(authAction.loginReset()),
    [dispatch]
  );
  //#endregion

  //#region WATCHER
  useEffect(() => {
    if (authActionState === authAction.loginSuccess.type) {
      history.replace("/product");
    }
    if (authActionState === authAction.loginFailed.type) {
      handleLoginReset();
    }
  }, [authActionState, history, handleLoginReset]);
  //#endregion

  //#region RESET
  useEffect(() => {
    return () => handleLoginReset();
  }, [handleLoginReset]);
  //#endregion
  return (
    <div className="flex flex-row h-screen items-center justify-center bg-gray-1">
      <div>
        <div className="font-bold text-6xl">
          <div>Sign In to</div>
          <div>Start Shopping</div>
        </div>
        <div className="mt-20">
          <div>If you dont have an account</div>
          <div className="mt-3">
            you can{" "}
            <Link to="/register" className="text-blue-700 font-medium">
              Register Here
            </Link>
          </div>
        </div>
      </div>

      <form
        className="flex flex-col w-80 ml-40"
        onSubmit={handleSubmit(handleLogin)}
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

        <button
          type="submit"
          className="bg-blue-600 py-5 rounded-md hover:bg-blue-500 text-white mt-8 shadow-2xl flex items-center justify-center"
        >
          {loading && <Spinner className="mr-4" />}
          Sign In
        </button>
      </form>
    </div>
  );
};

export default Login;

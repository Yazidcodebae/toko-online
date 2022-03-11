import { authAction } from "@commons/redux/auth/slice";
import React from "react";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";

const SideBar = () => {
  const dispatch = useDispatch();
  return (
    <div className="rounded-md shadow py-4 bg-white mr-4 h-auto w-56 flex flex-col">
      <NavLink
        to="/user/me"
        className="my-1 py-4 font-light pl-4"
        activeClassName="bg-blue-600 text-white"
      >
        Profile
      </NavLink>
      <NavLink
        to="/order"
        className="my-1 py-4 font-light pl-4"
        activeClassName="bg-blue-600 text-white"
      >
        Order
      </NavLink>
      <NavLink
        to="/coupons"
        className="my-1 py-4 font-light pl-4"
        activeClassName="bg-blue-600 text-white"
      >
        Coupon
      </NavLink>
      <NavLink
        to="/login"
        onClick={() => dispatch(authAction.updateToken(undefined))}
        className="my-1 py-4 font-light pl-4"
        activeClassName="bg-blue-600 text-white"
      >
        Logout
      </NavLink>
    </div>
  );
};

export default SideBar;

import img from "@assets/img/index";
import { useRetrieveCartListPagination } from "@commons/redux";
import { cartAction } from "@commons/redux/cart/slice";
import { CircleButton } from "@components/atoms/index";
import React, { useCallback, useEffect } from "react";
import { IoCartOutline, IoPersonOutline, IoSearch } from "react-icons/io5";
import { useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";

const Dashboard = (props) => {
  const dispatch = useDispatch();
  const cartListPagination = useRetrieveCartListPagination();
  const history = useHistory();

  const handleRetrieveCartList = useCallback(() => {
    dispatch(cartAction.retrieveCartListExecute());
  }, [dispatch]);

  useEffect(() => {
    handleRetrieveCartList();
  }, [handleRetrieveCartList]);

  return (
    <div className="bg-white container mx-auto 2xl:max-w-7xl">
      <div className="w-full flex flex-row justify-between">
        <div className="py-4 w-36 flex justify-center items-center mr-10">
          <Link to="/">
            <img src={img.logo} alt="" />
          </Link>
        </div>

        {/* //#region Header  */}
        <div className="flex py-4 flex-row justify-between flex-1">
          <div className="flex flex-row">
            <input
              type="text"
              placeholder="Search . . ."
              className="p-4 rounded-full bg-gray-2 border-none w-80 mr-4"
            />
            <CircleButton className="w-14 h-14">
              <IoSearch />
            </CircleButton>
          </div>
          <div className="flex flex-row">
            <CircleButton
              onClick={() => history.push("/cart")}
              className="w-14 h-14 mr-2 relative"
            >
              {cartListPagination && cartListPagination.total > 0 && (
                <div className="absolute -right-2 top-0 bg-red-600 text-white w-6 h-6 rounded-full">
                  {cartListPagination.total}
                </div>
              )}
              <IoCartOutline />
            </CircleButton>
            <CircleButton
              className="w-14 h-14"
              onClick={() => history.push("/user/me")}
            >
              <IoPersonOutline />
            </CircleButton>
          </div>
        </div>
        {/* //#endregion */}
      </div>
      {props.children}
    </div>
  );
};

export default Dashboard;

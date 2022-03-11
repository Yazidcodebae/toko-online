import { baseApi } from "@commons/config/index";
import { orderAction, useRetrieveOrderListData } from "@commons/redux/order";
import { Button } from "@components/atoms/index";
import { SideBar } from "@components/organisms/index";
import Dashboard from "@components/templates/Dashboard/index";
import { currencyFormat } from "commons/utils/index";
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import "./index.css";

const statusObject = {
  all: "All",
  waiting: "Waiting Payment",
  ordered: "Ordered",
  packed: "Packed",
  sent: "Sent",
  completed: "Completed",
  canceled: "Canceled",
};
const OrderList = () => {
  const dispatch = useDispatch();
  const [status, setStatus] = useState("all");
  const orderListData = useRetrieveOrderListData();

  const handleRetrieveOrder = useCallback(
    (params) => {
      dispatch(orderAction.retrieveOrderListExecute({ status: params }));
    },
    [dispatch]
  );

  useEffect(() => {
    handleRetrieveOrder(status);
  }, [handleRetrieveOrder, status]);

  return (
    <Dashboard>
      <div className="flex flex-row py-4">
        <div>
          <SideBar />
        </div>
        <div className="flex-1">
          <div className="flex">
            {Object.keys(statusObject).map((val, i) => {
              return (
                <Button
                  key={i}
                  className={`mx-1 ${
                    status === val ? "mx-1" : "order__btn-status"
                  }`}
                  type="button"
                  onClick={() => setStatus(val)}
                >
                  {statusObject[val]}
                </Button>
              );
            })}
          </div>
          {orderListData.map((data, i) => {
            return (
              <div
                key={i}
                className="flex flex-row shadow items-center rounded-2xl p-2 my-4 first:mt-0 last:mb-0"
              >
                <div className="flex flex-1">
                  <div className="w-32 h-32">
                    <img
                      alt="dummy"
                      className="rounded-2xl w-full h-full object-cover"
                      src={baseApi + "/" + data.product.image}
                    ></img>
                  </div>

                  <div className="ml-8 flex-1 flex flex-col">
                    <div>
                      <span className="bg-green-200 rounded-full px-3 py-1 text-gray-600">
                        {data.status}
                      </span>
                    </div>
                    <div className="text-xl text-gray-500 line-clamp-2">
                      {data.product.name}
                    </div>
                    <div className="font-bold text-xl text-gray-700">
                      {currencyFormat(data.product.price)}
                    </div>
                    <div className="font-light text-gray-700">
                      x {data.quantity}
                    </div>
                  </div>
                </div>

                <div className="mr-4">
                  <div>Total</div>
                  <div>
                    {currencyFormat(data.product.price * data.quantity)}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Dashboard>
  );
};

export default OrderList;

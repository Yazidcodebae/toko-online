import { SideBar } from "@components/organisms/index";
import Dashboard from "@components/templates/Dashboard/index";
import { useRetrieveCouponListData } from "commons/redux/coupon/selector";
import { couponAction } from "commons/redux/coupon/slice";
import CouponCard from "modules/coupon/components/CouponCard/index";
import React, { useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";

const CouponList = () => {
  const dispatch = useDispatch();

  const couponListData = useRetrieveCouponListData();

  const handleRetrieveCoupon = useCallback(() => {
    dispatch(couponAction.retrieveCouponListExecute());
  }, [dispatch]);

  useEffect(() => {
    handleRetrieveCoupon();
  }, [handleRetrieveCoupon]);

  return (
    <Dashboard>
      <div className="flex flex-row py-4">
        <div>
          <SideBar />
        </div>
        <div className="grid grid-cols-3 gap-2 flex-1">
          {couponListData.map((data, i) => {
            return (
              <CouponCard
                key={i}
                code={data.code}
                description={data.description}
                fixedDiscount={data.fixedDiscount}
                percentage={data.percentage}
              />
            );
          })}
        </div>
      </div>
    </Dashboard>
  );
};

export default CouponList;

import React from "react";
import CouponFixed from "./CouponFixed";
import CouponPercent from "./CouponPercent";

const CouponCard = ({ code, description, percentage, fixedDiscount }) => {
  return (
    <div className="rounded-md shadow bg-white p-4">
      {fixedDiscount !== 0 ? (
        <CouponFixed fixedDiscount={fixedDiscount} />
      ) : (
        <CouponPercent percentage={percentage} />
      )}
      <div className="text-gray-500 font-bold mt-2">{code}</div>
      <div className="text-sm text-gray-500 font-extralight">{description}</div>
    </div>
  );
};

export default CouponCard;

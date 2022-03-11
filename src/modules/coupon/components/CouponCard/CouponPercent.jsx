import React from "react";

const CouponPercent = ({ percentage, ...props }) => {
  return (
    <div className="text-2xl text-gray-800 font-bold">
      <div className="leading-none">Diskon</div>
      <div>{percentage}%</div>
    </div>
  );
};

export default CouponPercent;

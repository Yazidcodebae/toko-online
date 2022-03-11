import { currencyFormat } from "commons/utils/index";
import React from "react";

const CouponFixed = ({ fixedDiscount }) => {
  return (
    <div className="text-2xl text-gray-800 font-bold">
      <div className="leading-none">Diskon</div>
      <div>{currencyFormat(fixedDiscount)}</div>
    </div>
  );
};

export default CouponFixed;

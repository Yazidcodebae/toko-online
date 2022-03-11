import { Button } from "@components/atoms/index";
import React from "react";

const TotalCard = ({ totalItem, totalPrice, onClick, showCoupon }) => {
  return (
    <div className="border rounded-xl w-80 p-4">
      {showCoupon && (
        <>
          <input
            className="mb-4 w-full rounded-xl border border-gray-300"
            type="text"
            placeholder="Coupon"
            name=""
            id=""
          />
          <hr className="border-4 -mx-4 border-gray-100" />
        </>
      )}

      <div className="mt-4">
        <div className="font-semibold mb-4">Ringkasan belanja</div>
        <div className="text-gray-500 flex flex-row text-sm justify-between">
          <div>Total Harga ({totalItem} barang)</div>
          <div>{totalPrice}</div>
        </div>
        <hr className="my-4" />
        <div className="font-semibold flex flex-row justify-between">
          <div>Total</div>
          <div>{totalPrice}</div>
        </div>

        <Button className="w-full mt-4" onClick={onClick}>
          Beli
        </Button>
      </div>
    </div>
  );
};

export default TotalCard;

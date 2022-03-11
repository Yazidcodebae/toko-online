import React from "react";

const CartCard = ({ onClick, image, productName, price, quantity }) => {
  return (
    <div className="flex flex-row">
      <div onClick={onClick} className="w-32 h-32 mb-4">
        <img
          alt="dummy"
          className="rounded-2xl w-full h-full object-cover"
          src={image}
        ></img>
      </div>

      <div className="ml-8 flex-1 flex flex-col justify-start items-start">
        <div className="text-xl text-gray-500 line-clamp-2">{productName}</div>
        <div className="font-bold text-xl text-gray-700">{price}</div>
        <div className="font-light text-gray-700 mb-4">x {quantity}</div>
      </div>
    </div>
  );
};

export default CartCard;

import CartButton from "@components/moleculs/CartButton/index";
import React from "react";

const CartCard = ({
  checked,
  onCheck,
  id,
  onClick,
  image,
  productName,
  price,
  total,
  onCartUpdate,
}) => {
  return (
    <div className="flex flex-row justify-start items-center">
      <input
        type="checkbox"
        className="cart-card__checkbox w-5 h-5 mr-4"
        id={id}
        checked={checked}
        onChange={onCheck}
      />
      <label htmlFor={id} className="flex flex-row">
        <div onClick={onClick} className="w-32 h-32 mb-4">
          <img
            alt="dummy"
            className="rounded-2xl w-full h-full object-cover"
            src={image}
          ></img>
        </div>

        <div className="ml-8 flex-1 flex flex-col justify-start items-start">
          <div className="text-xl text-gray-500 line-clamp-2">
            {productName}
          </div>
          <div className="font-bold text-xl text-gray-700 mb-4">{price}</div>

          <CartButton
            total={total}
            onClick={onCartUpdate}
            buttonClassName="cart__btn"
          />
        </div>
      </label>
    </div>
  );
};

export default CartCard;

import { CircleButton } from "@components/atoms/index";
import React from "react";
import "./index.css";

const CartButton = ({ total = 1, onClick, buttonClassName }) => {
  return (
    <div className="cart-button flex flex-row justify-center">
      <CircleButton
        className={`cart-button__btn ${buttonClassName} ${
          total <= 1 && "pointer-events-none"
        }`}
        onClick={() => total > 1 && onClick(total - 1)}
      >
        -
      </CircleButton>
      <CircleButton
        className={`cart-button__btn mx-0.5 pointer-events-none ${buttonClassName}`}
      >
        {total}
      </CircleButton>
      <CircleButton
        className={`cart-button__btn ${buttonClassName}`}
        onClick={() => onClick(total + 1)}
      >
        +
      </CircleButton>
    </div>
  );
};

export default CartButton;

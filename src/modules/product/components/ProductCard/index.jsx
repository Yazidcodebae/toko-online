import React from "react";

const ProductCard = ({ onClick, image, name, price }) => {
  return (
    <div onClick={onClick} className="rounded-2xl w-full mb-8">
      <img
        alt="dummy"
        className="rounded-2xl w-full h-44 object-cover"
        src={image}
      ></img>
      <div className="mt-2 text-gray-700 font-semibold">{name}</div>
      <div className="text-gray-500 text-sm -mt-1">{price}</div>
    </div>
  );
};

export default ProductCard;

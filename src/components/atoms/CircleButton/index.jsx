import classNames from "classnames";
import React from "react";

const CircleButton = ({ onClick, children, className, labelClassName }) => {
  const classes = classNames(
    className,
    `bg-gray-2 text-gray-500 w-12 h-12 rounded-full hover:bg-gray-200 flex items-center justify-center`
  );
  return (
    <button onClick={onClick} className={classes}>
      <span className={labelClassName}>{children}</span>
    </button>
  );
};

export default CircleButton;

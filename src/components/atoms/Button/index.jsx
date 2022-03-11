import classNames from "classnames";
import React from "react";

const Button = ({ onClick, children, className, labelClassName, type }) => {
  const classes = classNames(
    className,
    `bg-blue-500 h-12 p-3 px-6 rounded-full hover:bg-blue-400 text-white flex items-center justify-center`
  );
  return (
    <button onClick={onClick} className={classes} type={type}>
      <span className={labelClassName}>{children}</span>
    </button>
  );
};

export default Button;

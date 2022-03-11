import React, { useCallback } from "react";
import { IoChevronBack } from "react-icons/io5";
import { useHistory } from "react-router";

const BackButton = ({
  onBack,
  text = "Back",
  icon = <IoChevronBack />,
  className,
}) => {
  const history = useHistory();

  const handleBack = useCallback(
    () => (onBack ? onBack() : history.goBack()),
    [history, onBack]
  );

  return (
    <button onClick={handleBack} className={`flex flex-row ${className}`}>
      <div className="bg-gray-2 p-2 rounded-full hover:bg-gray-3 text-gray-600 flex items-center justify-center">
        {icon}
      </div>
      <div className="ml-4 text-2xl font-bold text-gray-600">{text}</div>
    </button>
  );
};

export default BackButton;

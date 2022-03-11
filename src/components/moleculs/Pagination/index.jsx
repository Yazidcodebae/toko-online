import { CircleButton } from "@components/atoms/index";
import React from "react";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";

const Pagination = ({ active = 1, limit = 1, onClick }) => {
  const activeEqualLimit = active === limit;
  const activeEqualLimitMinusOne = active === limit - 1;
  const activeGtOne = active > 1;
  const activeGtTwo = active > 2;

  const showFirst =
    activeGtTwo && !activeEqualLimitMinusOne && !activeEqualLimit;
  const showSecond = activeGtOne && !activeEqualLimit;
  const showBeforeLast = activeGtOne && !activeEqualLimit;
  const showLast =
    activeGtTwo && !activeEqualLimitMinusOne && !activeEqualLimit;

  return (
    <div className="flex flex-row justify-center">
      <CircleButton
        className={`${!activeGtOne ? "pointer-events-none" : ""}`}
        onClick={() => onClick(active - 1)}
      >
        <IoChevronBack />
      </CircleButton>
      {showFirst && (
        <CircleButton className="mx-0.5" onClick={() => onClick(active - 2)}>
          {active - 2}
        </CircleButton>
      )}
      {showSecond && (
        <CircleButton className="" onClick={() => onClick(active - 1)}>
          {active - 1}
        </CircleButton>
      )}

      <CircleButton className="mx-0.5 bg-gray-500" labelClassName="text-white">
        {active}
      </CircleButton>
      {showBeforeLast && (
        <CircleButton className="" onClick={() => onClick(active + 1)}>
          {active + 1}
        </CircleButton>
      )}
      {showLast && (
        <CircleButton className="mx-0.5" onClick={() => onClick(active + 2)}>
          {active + 2}
        </CircleButton>
      )}
      <CircleButton
        className={`${activeEqualLimit ? "pointer-events-none" : ""}`}
        onClick={() => onClick(active + 1)}
      >
        <IoChevronForward />
      </CircleButton>
    </div>
  );
};

export default Pagination;

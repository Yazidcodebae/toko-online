import { useEffect, useState } from "react";
import Swal2 from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

export const currencyFormat = (number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  }).format(number);
};

export const findCheckedValue = (arr, v) => {
  return arr.includes(v);
};

export const deleteChecked = (arr, v) => {
  return arr.filter((val) => val !== v);
};

export const Swal = withReactContent(Swal2);

export function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);
  return debouncedValue;
}

import { useRef } from "react";

export default function useDebounce(fn, delay = 10) {
  const timer = useRef(null);

  return (...args) => {
    clearTimeout(timer.current);

    timer.current = setTimeout(() => {
      fn(...args);
    }, delay);
  };
}
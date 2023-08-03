import { useEffect, useRef } from "react";

export function useOutsideClick(handler, listenCapturing = true) {
  const ref = useRef(null);

  useEffect(() => {
    const handleClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        handler();
      }
    };

    document.addEventListener("click", handleClick, {
      capture: listenCapturing,
    });
    return () =>
      document.removeEventListener("click", handleClick, {
        capture: listenCapturing,
      });
  }, [handler, listenCapturing]);

  return ref;
}

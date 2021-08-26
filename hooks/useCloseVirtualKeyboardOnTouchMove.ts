import { MutableRefObject, useEffect } from "react";

type UseCloseVirtualKeyboardOnTouchMoveProps = {
  inputRef: MutableRefObject<HTMLInputElement | null>;
};

export function useCloseVirtualKeyboardOnTouchMove({
  inputRef,
}: UseCloseVirtualKeyboardOnTouchMoveProps) {
  useEffect(() => {
    function onTouchMove() {
      if (inputRef.current && document.activeElement === inputRef.current) {
        inputRef.current.blur();
      }
    }

    window.addEventListener("touchmove", onTouchMove);

    return () => {
      window.removeEventListener("touchmove", onTouchMove);
    };
  }, [inputRef]);
}

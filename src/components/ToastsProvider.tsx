import { Frame } from "@shopify/polaris";
import { PropsWithChildren, useRef, useState } from "react";
import {
  Toast,
  ToastContext,
  ToastDescriptor,
  Toasts,
  ToastStateContext,
} from "hooks/toast/context";

export function ToastsProvider({ children }: PropsWithChildren) {
  const [toastState, setToastState] = useState<ToastDescriptor[]>();
  const toast = useRef<Toast>({
    show(toastToShow) {
      setToastState((state = []) => state.concat(toastToShow));
    },
    hide(removeSelector) {
      if (removeSelector) {
        setToastState((state = []) =>
          typeof removeSelector === "function"
            ? state.filter((item) => !removeSelector(item))
            : state.filter((item) => item !== removeSelector)
        );
      } else {
        setToastState([]);
      }
    },
  });

  return (
    <ToastContext.Provider value={toast.current}>
      <ToastStateContext.Provider value={toastState}>
        <Frame>
          {children}
          <Toasts />
        </Frame>
      </ToastStateContext.Provider>
    </ToastContext.Provider>
  );
}

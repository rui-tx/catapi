import { createContext } from "react";

const ToastContext = createContext({
  toasts: [],
  setToasts: () => {},
  addToast: () => {},
  removeToast: () => {},
});

export default ToastContext;

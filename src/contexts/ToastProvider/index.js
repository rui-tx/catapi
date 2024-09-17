import { useState } from "react";
import ToastList from "../../components/ToastList";

import ToastContext from "../ToastContext";

const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const generateUniqueId = () => {
    return Math.random().toString(36).substr(2, 9);
  };

  const addToast = (message, tst) => {
    const newToast = { id: generateUniqueId(), message, tst };
    setToasts((prevToasts) => [...prevToasts, newToast]);
  };

  const removeToast = (id) => {
    setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
  };

  return (
    <ToastContext.Provider value={{ toasts, addToast, removeToast }}>
      <ToastList
        toasts={toasts}
        addToast={addToast}
        removeToast={removeToast}
      />
      {children}
    </ToastContext.Provider>
  );
};

export default ToastProvider;

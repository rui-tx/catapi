import { useState, useEffect } from "react";
import styles from "./styles.css";

const Toast = ({ id, message, tst, duration = 3000, onClose }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, duration);

    return () => clearTimeout(timer);
  }, [duration]);

  const handleAnimationEnd = (e) => {
    if (e.animationName === "slideOut") {
      onClose();
    }
  };

  if (!isVisible) {
    return (
      <div
        className={`toast toast-exit ${tst}`}
        onAnimationEnd={handleAnimationEnd}
      >
        <div className="toast-message">{message}</div>
        <button className="toast-close" onClick={() => setIsVisible(false)}>
          &times;
        </button>
      </div>
    );
  }

  return (
    <div className={`toast toast-enter ${tst}`}>
      <div className="toast-message">{message}</div>
      <button className="toast-close" onClick={() => setIsVisible(false)}>
        &times;
      </button>
    </div>
  );
};

export default Toast;

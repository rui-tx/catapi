import Toast from "../Toast";

const ToastList = ({ toasts, removeToast }) => {
  return (
    <div className="toast-list">
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          message={toast.message}
          tst={toast.tst}
          onClose={() => removeToast(toast.id)}
        />
      ))}
    </div>
  );
};

export default ToastList;

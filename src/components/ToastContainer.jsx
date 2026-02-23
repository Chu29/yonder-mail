import { useEffect } from "react";
import { CheckCircle, XCircle, Info, AlertTriangle, X } from "lucide-react";
import { useToast } from "../context/ToastContext";

const ToastContainer = () => {
  const { toasts, removeToast } = useToast();

  return (
    <div className="fixed top-4 right-4 z-[9999] flex flex-col gap-3 pointer-events-none max-w-md">
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          toast={toast}
          onClose={() => removeToast(toast.id)}
        />
      ))}
    </div>
  );
};

const Toast = ({ toast, onClose }) => {
  useEffect(() => {
    if (toast.duration === 0) return;

    const timer = setTimeout(() => {
      onClose();
    }, toast.duration);

    return () => clearTimeout(timer);
  }, [toast.duration, onClose]);

  const getToastStyles = () => {
    switch (toast.type) {
      case "success":
        return {
          bg: "bg-green-50 border-green-200",
          icon: <CheckCircle className="text-green-500" size={20} />,
          text: "text-green-800",
        };
      case "error":
        return {
          bg: "bg-red-50 border-red-200",
          icon: <XCircle className="text-red-500" size={20} />,
          text: "text-red-800",
        };
      case "warning":
        return {
          bg: "bg-yellow-50 border-yellow-200",
          icon: <AlertTriangle className="text-yellow-500" size={20} />,
          text: "text-yellow-800",
        };
      default:
        return {
          bg: "bg-blue-50 border-blue-200",
          icon: <Info className="text-blue-500" size={20} />,
          text: "text-blue-800",
        };
    }
  };

  const styles = getToastStyles();

  return (
    <div
      className={`${styles.bg} border ${styles.text} rounded-lg shadow-lg p-4 flex items-start gap-3 min-w-[320px] pointer-events-auto animate-slide-in-right`}
    >
      <div className="flex-shrink-0 mt-0.5">{styles.icon}</div>
      <p className="flex-1 text-sm font-medium leading-relaxed">
        {toast.message}
      </p>
      <button
        onClick={onClose}
        className="flex-shrink-0 hover:opacity-70 transition"
        aria-label="Close notification"
      >
        <X size={18} />
      </button>
    </div>
  );
};

export default ToastContainer;

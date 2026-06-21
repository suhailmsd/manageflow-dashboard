import React, { useState, useEffect } from "react";
import { ToastContext } from "../contexts";

export default function ToastProvider({ children }) {
  const [toast, setToast] = useState({
    message: "",
    type: "",
    visible: false,
  });

  const showToast = (type, message) => {
    setToast({ type, message, visible: true });
  };

  useEffect(() => {
    if (!toast.visible) return;

    const timer = setTimeout(() => {
      setToast((prev) => ({ ...prev, visible: false }));
    }, 1000);

    return () => clearTimeout(timer);
  }, [toast.visible]);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}

      {toast.visible && (
        <div className="fixed top-5 right-5 z-50">
          <div
            className={`h-10 w-64 flex items-center justify-center rounded text-white ${
              toast.type === "success" ? "bg-green-500" : "bg-red-500"
            }`}
          >
            {toast.message}
          </div>
        </div>
      )}
    </ToastContext.Provider>
  );
}

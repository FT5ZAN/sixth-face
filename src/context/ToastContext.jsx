import { createContext, useContext, useState, useCallback } from "react";

const ToastContext = createContext();

const icons = {
  success: (
    <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  ),
  error: (
    <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
  ),
  warning: (
    <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v4m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
    </svg>
  ),
};

const styles = {
  success: {
    container: "bg-white/90 dark:bg-[#1e1e20]/95 border-emerald-400/40 dark:border-emerald-500/30",
    icon: "bg-emerald-100 dark:bg-emerald-900/40 text-emerald-600 dark:text-emerald-400",
    title: "text-emerald-700 dark:text-emerald-400",
    message: "text-gray-600 dark:text-gray-300",
    bar: "bg-emerald-500",
    label: "Success",
  },
  error: {
    container: "bg-white/90 dark:bg-[#1e1e20]/95 border-rose-400/40 dark:border-rose-500/30",
    icon: "bg-rose-100 dark:bg-rose-900/40 text-rose-600 dark:text-rose-400",
    title: "text-rose-600 dark:text-rose-400",
    message: "text-gray-600 dark:text-gray-300",
    bar: "bg-rose-500",
    label: "Error",
  },
  warning: {
    container: "bg-white/90 dark:bg-[#1e1e20]/95 border-amber-400/40 dark:border-amber-500/30",
    icon: "bg-amber-100 dark:bg-amber-900/40 text-amber-600 dark:text-amber-400",
    title: "text-amber-600 dark:text-amber-400",
    message: "text-gray-600 dark:text-gray-300",
    bar: "bg-amber-500",
    label: "Warning",
  },
};

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const showToast = useCallback((message, type = "success") => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      removeToast(id);
    }, 2000);
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}

      <div className="fixed top-4 right-4 sm:top-5 sm:right-5 z-[2000]
        flex flex-col gap-2.5 items-end pointer-events-none overflow-hidden">
        {toasts.map((toast) => {
          const s = styles[toast.type] || styles.success;
          return (
            <div
              key={toast.id}
              className={`pointer-events-auto
                flex items-start gap-3
                w-[calc(100vw-2rem)] sm:w-80
                px-3.5 py-3 rounded-2xl
                border backdrop-blur-md shadow-xl shadow-black/10
                animate-slideIn 
                ${s.container}`}
              style={{
                animation: "toastIn 0.3s cubic-bezier(0.34,1.56,0.64,1) both",
              }}
            >
              <span className={`w-7 h-7 rounded-xl flex items-center justify-center mt-0.5 ${s.icon}`}>
                {icons[toast.type] || icons.success}
              </span>

              
              <div className="flex-1 min-w-0 pt-0.5">
                <p className={`text-xs font-bold leading-none mb-1 ${s.title}`}>
                  {s.label}
                </p>
                <p className={`text-xs sm:text-sm leading-snug ${s.message}`}>
                  {toast.message}
                </p>
              </div>

              
            </div>
          );
        })}
      </div>

      <style>{`
        @keyframes toastIn {
          from { opacity: 0; transform: translateX(24px) scale(0.95); }
          to   { opacity: 1; transform: translateX(0)   scale(1); }
        }
        @keyframes toastBar {
          from { width: 100%; }
          to   { width: 0%; }
        }
      `}</style>
    </ToastContext.Provider>
  );
}

export function useToast() {
  return useContext(ToastContext);
}
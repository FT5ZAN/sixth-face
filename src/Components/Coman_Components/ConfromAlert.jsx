import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

function ConfirmAlert({
  isOpen,
  title = "Are you sure?",
  message = "Do you want to continue?",
  confirmText = "Confirm",
  cancelText = "Cancel",
  onConfirm,
  onCancel,
}) {
  const modalRef = useRef(null);

  useEffect(() => {
    const handleEsc = (e) => { if (e.key === "Escape") onCancel(); };
    if (isOpen) window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [isOpen, onCancel]);

  const handleBackdropClick = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) onCancel();
  };

  if (!isOpen) return null;

  return createPortal(
    <>
      <style>{`
        @keyframes alertOverlay {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes alertSheet {
          from { transform: translateY(100%); opacity: 0; }
          to   { transform: translateY(0);    opacity: 1; }
        }
        @keyframes alertModal {
          from { transform: scale(0.9) translateY(16px); opacity: 0; }
          to   { transform: scale(1)   translateY(0);    opacity: 1; }
        }
        .alert-overlay { animation: alertOverlay 0.2s ease both; }
        .alert-sheet   { animation: alertSheet  0.35s cubic-bezier(0.32,0.72,0,1) both; }
        .alert-modal   { animation: alertModal  0.3s  cubic-bezier(0.34,1.4,0.64,1) both; }
      `}</style>

      <div
        onClick={handleBackdropClick}
        className="alert-overlay fixed inset-0 z-[1000] flex items-end sm:items-center justify-center
          bg-black/60 backdrop-blur-sm p-0 sm:p-4"
      >
        <div
          ref={modalRef}
          className="alert-sheet sm:alert-modal
            w-full sm:w-auto sm:min-w-[380px] sm:max-w-sm
           
            rounded-t-3xl sm:rounded-2xl
            shadow-2xl shadow-black/30
            overflow-hidden"
        >
          <div className="sm:hidden flex justify-center pt-3 pb-0">
            <div className="w-9 h-1 rounded-full bg-gray-200 dark:bg-white/10" />
          </div>

          <div className="h-1 w-full bg-gradient-to-r from-rose-400 to-pink-400" />

          <div className="px-6 pt-5 pb-6 sm:pb-5 flex flex-col gap-4">

            <div className="flex items-start gap-4">
              <div className="w-11 h-11 rounded-2xl flex items-center justify-center shrink-0
                bg-rose-100 dark:bg-rose-900/40">
                <svg className="w-5 h-5 text-rose-500 dark:text-rose-400" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round"
                    d="M12 9v4m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
                </svg>
              </div>

              <div className="flex-1 min-w-0 pt-0.5">
                <h3 className="text-base font-bold text-gray-900 dark:text-white leading-snug mb-1">
                  {title}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                  {message}
                </p>
              </div>
            </div>

            <div className="h-px bg-gradient-to-r from-transparent via-gray-100 dark:via-white/10 to-transparent -mx-6" />

            <div className="flex gap-3">
              <button
                onClick={onCancel}
                className="flex-1 px-4 py-3 rounded-xl border text-sm font-semibold
                  border-gray-200 dark:border-white/10
                  text-gray-600 dark:text-gray-300
                  bg-gray-50 dark:bg-white/5
                  hover:bg-gray-100 dark:hover:bg-white/10
                  hover:scale-[1.02] active:scale-95
                  transition-all duration-150"
              >
                {cancelText}
              </button>

              <button
                onClick={onConfirm}
                className="flex-1 px-4 py-3 rounded-xl text-sm font-bold text-white
                  bg-gradient-to-r from-rose-500 to-pink-500
                  hover:from-rose-600 hover:to-pink-600
                  shadow-lg shadow-rose-200 dark:shadow-rose-900/30
                  hover:scale-[1.02] active:scale-95
                  transition-all duration-200"
              >
                {confirmText}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>,
    document.body
  );
}

export default ConfirmAlert;
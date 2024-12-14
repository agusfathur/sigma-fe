"use client";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { useEffect } from "react";

const ModalToast = ({
  isOpen,
  onClose,
  message = "",
  type = "success",
  duration = 3000, // Durasi toast sebelum otomatis tertutup
}: {
  isOpen: boolean;
  onClose?: () => void;
  message?: string;
  type?: "success" | "error";
  duration?: number;
}) => {
  // Auto-close functionality
  useEffect(() => {
    if (isOpen && onClose) {
      const timer = setTimeout(() => onClose(), duration);
      return () => clearTimeout(timer); // Cleanup timer on unmount
    }
  }, [isOpen, onClose, duration]);

  return (
    <>
      {isOpen && (
        <div className="animate-slide-in fixed bottom-5 right-5 z-50 flex max-w-[90%] items-center overflow-hidden rounded-lg bg-white px-3 py-2 shadow-lg duration-500 dark:bg-slate-800 dark:shadow-slate-700 md:max-w-md md:px-4 md:py-3">
          <div className="flex items-center">
            {/* Lottie Icon */}
            <div className="mr-2 flex-shrink-0">
              {type === "success" && (
                <DotLottieReact
                  src="/lottie/oke.lottie"
                  loop
                  autoplay
                  className="h-8 w-8 md:h-10 md:w-10"
                />
              )}
              {type === "error" && (
                <DotLottieReact
                  src="/lottie/alert.lottie"
                  loop
                  autoplay
                  className="h-8 w-8 md:h-10 md:w-10"
                />
              )}
            </div>

            {/* Title and Message */}
            <div className="mb-[2px] flex flex-grow items-center">
              <p className="text-xs font-normal text-slate-600 dark:text-slate-200 md:text-sm md:font-medium">
                {message}
              </p>
            </div>

            {/* Close Button */}
            <button
              aria-label="Close"
              className="ml-2 flex h-6 w-6 items-center justify-center rounded-full bg-gray-200 text-slate-600 hover:bg-gray-300 dark:bg-slate-700 dark:text-slate-200 dark:hover:bg-slate-600 md:ml-4 md:h-8 md:w-8"
              onClick={() => onClose && onClose()}
            >
              ✕
            </button>
          </div>
        </div>
      )}
      <style jsx global>{`
        @keyframes slide-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-slide-in {
          animation: slide-in 0.3s ease-out;
        }
      `}</style>
    </>
  );
};

export default ModalToast;

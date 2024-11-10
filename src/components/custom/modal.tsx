"use client";
import { Cross2Icon } from "@radix-ui/react-icons";
import React from "react";

interface ModalProps {
  children: React.ReactNode;
  textHeader: string;
  isOpen?: boolean;
  //? onClose digunakan untuk menghandle ketika modal ditutup
  onClose?: () => void;
  widthScreenSize?: "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "super";
  heightScreenSize?: "auto" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl";
}

const Modal = ({
  children,
  textHeader,
  isOpen,
  onClose,
  widthScreenSize = "md",
  heightScreenSize = "auto",
}: ModalProps) => {
  const sizes: { [key: string]: string } = {
    sm: "max-w-sm",
    md: "max-w-md",
    lg: "max-w-lg",
    xl: "max-w-xl",
    "2xl": "max-w-2xl",
    "3xl": "max-w-3xl",
    super: "max-w-[80vw]",
  };
  const heights: { [key: string]: string } = {
    auto: "h-auto",
    sm: "h-[30vh]",
    md: "h-[40vh]",
    lg: "h-[50vh]",
    xl: "h-[70vh]",
    "2xl": "h-[80vh]",
    "3xl": "h-[90vh]",
  };
  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 z-40 flex items-center justify-center"
          onClick={() => onClose && onClose()} // Menambahkan onClick untuk menutup modal ketika klik di luar konten
        >
          {/* Background Blur and Dark Overlay */}i
          <div className="absolute inset-0 bg-black bg-opacity-65 backdrop-blur-[2px]"></div>
          <div
            tabIndex={-1}
            className={`relative z-50 flex h-auto max-h-full w-full ${sizes[widthScreenSize]} items-center justify-center p-4 md:p-0`}
            onClick={(e) => e.stopPropagation()} // Mencegah event onClick pada container luar
          >
            <div
              className={`relative ${heights[heightScreenSize]} max-h-[80vh] w-full overflow-y-auto rounded-lg bg-white shadow dark:bg-gray-700 md:max-h-[90vh]`}
            >
              {/* Modal header */}
              <div className="flex items-center justify-between rounded-t border-b px-4 py-3 dark:border-gray-600 md:px-5 md:py-3">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  {textHeader}
                </h3>
                <button
                  type="button"
                  onClick={() => onClose && onClose()}
                  className="end-2.5 ms-auto inline-flex h-8 w-8 items-center justify-center rounded-lg bg-transparent text-sm text-gray-600 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  <Cross2Icon className="h-5 w-5 text-black" />
                  <span className="sr-only">Close modal</span>
                </button>
              </div>
              {/* Modal body */}
              <div className="p-4 md:px-5 md:py-4">{children}</div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;

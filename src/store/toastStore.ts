import { create } from "zustand";

interface ToastState {
  isOpen: boolean;
  message: string;
  type: "success" | "error";
  setToast: (toast: {
    isOpen: boolean;
    message: string;
    type: "success" | "error";
  }) => void;
}

export const useToastStore = create<ToastState>((set) => ({
  isOpen: false,
  message: "",
  type: "success",
  setToast: ({ isOpen, message, type }) => set({ isOpen, message, type }),
}));

import { Button } from "./button";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

const ModalAlert = ({
  isOpen,
  onClose,
  textHeader = "",
  setIsModalAlertOpen,
  type = "success",
}: {
  isOpen: boolean;
  onClose?: () => void;
  textHeader?: string;
  setIsModalAlertOpen: (isOpen: boolean) => void;
  type?: "success" | "error";
}) => {
  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 z-40 flex items-center justify-center"
          onClick={() => onClose && onClose()}
        >
          {/* Background Blur and Dark Overlay */}
          <div
            className="absolute inset-0 bg-black bg-opacity-65 backdrop-blur-[2px]"
            onClick={() => setIsModalAlertOpen(false)}
          ></div>
          <div
            tabIndex={-1}
            className="relative z-50 my-auto flex max-h-[80vh] w-full max-w-xl items-center justify-center p-4 md:p-0"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative flex h-[300px] w-[300px] items-center justify-center overflow-hidden rounded-lg bg-white shadow dark:bg-slate-900">
              {/* Modal Body */}
              <div className="p-4 md:px-5 md:py-4">
                <div className="text-center">
                  {type === "success" && (
                    <DotLottieReact src="/lottie/oke.lottie" loop autoplay />
                  )}
                  {type === "error" && (
                    <DotLottieReact src="/lottie/alert.lottie" loop autoplay />
                  )}
                </div>
                <div className="p-4 text-center md:p-5">
                  <h3 className="mb-5 text-lg font-medium text-slate-800 dark:text-slate-50">
                    {textHeader}
                  </h3>
                  <Button
                    variant="default"
                    className="w-[100px]"
                    onClick={() => setIsModalAlertOpen(false)}
                  >
                    OK
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ModalAlert;

import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { Button } from "./button";

const ModalDelete = ({
  textHeader = "Are you sure?",
  handleDelete,
  setIsModalDeleteOpen,
}: {
  textHeader?: string;
  handleDelete: () => void;
  setIsModalDeleteOpen: (isModalDeleteOpen: boolean) => void;
}) => {
  return (
    <>
      <div className="p-4 text-center md:p-5">
        <DotLottieReact src="/lottie/alert.lottie" loop autoplay />
        <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
          {textHeader}
        </h3>
        <div className="flex w-full justify-between gap-4">
          <Button
            variant="destructive"
            className="w-[200px]"
            onClick={handleDelete}
          >
            Yes, I`m Sure
          </Button>
          <Button
            variant="outline"
            className="w-[200px]"
            onClick={() => setIsModalDeleteOpen(false)}
          >
            No, Cancel
          </Button>
        </div>
      </div>
    </>
  );
};
export default ModalDelete;

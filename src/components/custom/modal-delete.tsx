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
        <svg
          className="mx-auto mb-4 h-12 w-12 text-gray-400 dark:text-gray-200"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 20 20"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
          />
        </svg>
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

import React, { useEffect } from "react";
import clsx from "clsx";
import { fetchHints } from "../../api/requests/getHints";
import { XMarkIcon } from "@heroicons/react/24/outline";
interface ModalPopUpProps {
  onClose: () => void;
}

const ModalPopUp = ({ onClose }: ModalPopUpProps) => {
  const [hints, setHints] = React.useState<string[]>([]);
  useEffect(() => {
    fetchHints(setHints);
  }, []);
  return (
    <div
      className={clsx(
        "transition duration-200 ease-in-out fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50"
      )}
    >
      <div
        className={clsx(
          "relative py-[10px] sm:h-[400px] h-[300px] overflow-auto transition duration-200 ease-in-out",
          "bg-white dark:bg-[#444] rounded-lg shadow-lg px-[10px] sm:w-full w-[80%] max-w-md"
        )}
      >
        <button
          className={clsx(
            "absolute top-2 right-2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition duration-200 ease-in-out"
          )}
          onClick={onClose}
        >
          <XMarkIcon
            className={clsx(
              "size-6 dark:text-[#d3d3d3] dark:hover:text-[#fff] transition-colors duration-200",
              "text-black hover:text-gray-500"
            )}
          />
        </button>
        {hints.map((hint) => (
          <p className="text-gray-700 dark:text-gray-300 mb-[5px]" key={hint}>
            {hint}
          </p>
        ))}
      </div>
    </div>
  );
};
export default ModalPopUp;

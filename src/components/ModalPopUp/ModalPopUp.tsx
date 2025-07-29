import React from "react";
import clsx from "clsx";


interface ModalPopUpProps {
    onClose: () => void;    
}

const ModalPopUp = ({onClose}:ModalPopUpProps) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">Modal Title</h2>
        <p className="text-gray-700 dark:text-gray-300 mb-6">
          This is a modal pop-up example.
        </p>
        <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
}
export default ModalPopUp;
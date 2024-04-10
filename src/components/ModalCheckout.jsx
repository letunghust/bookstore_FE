import React from "react";

const ModalCheckout = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;
  return (
    <div>
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="bg-white rounded-lg p-8 z-10 max-w-screen-xl">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Checkout</h2>
            <button
              className="text-gray-500 hover:text-gray-700"
              onClick={onClose}
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
};

export default ModalCheckout;

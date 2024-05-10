import React from "react";

const ButtonClose = ({ onClick }) => {
  return (
    <div>
      <button
        onClick={onClick} // Gọi hàm đóng modal khi nhấn vào nút đóng
        className="absolute top-0 right-0 m-4 text-gray-500 hover:text-gray-600 focus:outline-none"
      >
        <svg
          className="h-6 w-6"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
    </div>
  );
};

export default ButtonClose;

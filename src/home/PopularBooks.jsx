import React, { useEffect, useState } from "react";
import BookCard from "../components/BookCard";

const PopularBooks = () => {
  const [popularBooks, setPopularBooks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 10;

  const fetchPopularBooks = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_AI}/api/popular-books?page=${currentPage}&limit=${itemsPerPage}`
      );
      console.log(response)
      if (response.ok) {
        const data = await response.json();
        // console.log(data)
        
        // const filteredBooks = data.docs.filter((book) => typeof book["_id"] === "string");
        const mappedBooks = data.map((book) => ({
          _id: book["_id"],
          imageURL: book["imageURL"],
          bookTitle: book["bookTitle"],
        }));
        setPopularBooks(mappedBooks);
        setTotalPages(data.totalPages);
      }
    } catch (error) {
      console.log("Error when get all book popular", error);
    }
  };

  useEffect(() => {
    fetchPopularBooks();
  }, [currentPage]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const renderPagination = () => {
    const pageNumbers = [];

    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={`px-4 py-2 ${
            currentPage === i ? "bg-blue-500 text-white" : "bg-gray-200"
          } rounded`}
        >
          {i}
        </button>
      );
    }

    return (
      <div className="mt-4 flex justify-center space-x-4">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`px-4 py-2 ${
            currentPage === 1 ? "bg-gray-400" : "bg-blue-500 text-white"
          } rounded`}
        >
          Previous
        </button>
        {pageNumbers}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`px-4 py-2 ${
            currentPage === totalPages ? "bg-gray-400" : "bg-blue-500 text-white"
          } rounded`}
        >
          Next
        </button>
      </div>
    );
  };

  return (
    <div>
      <BookCard books={popularBooks} headline="Popular books" />
      {/* {renderPagination()} */}
    </div>
  );
};

export default PopularBooks;
import React, { useEffect, useState } from "react";
import BookCard from "../components/BookCard";

const PopularBooks = () => {
  const [popularBooks, setPopularBooks] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);

  const fetchPopularBooks = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_AI}/api/popular-books`
      );
      // console.log(response);
      // console.log(response.ok)
      if (response.ok) {
        const data = await response.json();
        // console.log(data.length)
        // setTotalPage(data.length/2)
        // setPopularBooks(data);
        const mappedBooks = data.map((book) => ({
          _id: book["Book-Title"],
          imageURL: book["Image-URL-M"],
          bookTitle: book["Book-Title"],
        }));
        setPopularBooks(mappedBooks);
      }
    } catch (error) {
      console.log("Error when get all book popular", error);
    }
  };

  useEffect(() => {
    fetchPopularBooks();
  }, []);

  const handleNextPage = () => {
    if (page < totalPage) {
      setPage(page + 1);
    }
  };

  const handlePrevPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };
  return (
    <div>
      {/* <h1>Popular books</h1> */}
      {/* <ul>
            {popularBooks.map((book) => (
                <li key={book['Book-Title']}> 
                    <p>{book['Book-Title']}</p>
                </li>
            ))}
        </ul> */}
      <BookCard books={popularBooks} headline="Popular books" />
      {/* pagination page */}
      {/* <div className="mt-4 flex justify-center space-x-4">
        <button
          onClick={handlePrevPage}
          disabled={page === 1}
          className={`px-4 py-2 ${
            page === 1 ? "bg-gray-400" : "bg-blue-500 text-white"
          } rounded`}
        >
          Previous
        </button>
        <span>5</span>
        <button
          onClick={handleNextPage}
          disabled={page === totalPage}
          className={`px-4 py-2 ${
            page === totalPage ? "bg-gray-400" : "bg-blue-500 text-white"
          } rounded`}
        >
          Next
        </button>
      </div> */}
    </div>
  );
};

export default PopularBooks;

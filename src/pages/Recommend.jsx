import React, { useEffect, useState } from "react";

const Recommend = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [books, setBooks] = useState([]);
  const [bookResult, setBookResult] = useState([]);

  // search book
  const fetchData = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/books/search?q=${searchTerm}`
      );
      const data = await response.json();
      setBooks(data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (searchTerm) {
      fetchData();
    }
  }, [searchTerm]);

  const handleSearchBook = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
  };
  // end of search book

  const handleSubmit = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_AI}/api/recommend`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ user_input: searchTerm }),
        }
      );
      const data = await response.json();
        console.log(data);
      setBookResult(data);
      //   console.log("book result: ", bookResult);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div className="flex items-center">
        <input
          className="border border-gray-300 px-4 py-2 rounded-l-full focus:outline-none"
          type="search"
          name="search"
          id="search"
          placeholder="Search a book"
          onChange={handleSearchBook}
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-r-full"
          onClick={handleSubmit}
        >
          Recommend
        </button>
      </div>
      <div>
        {/* Hiển thị kết quả tìm kiếm */}
        {books.map((book) => (
          <div key={book._id}>
            <h3>{book.bookTitle}</h3>
            {/* Hiển thị thông tin khác của sách */}
          </div>
        ))}
      </div>
      {bookResult.length > 0 && (
        <div className="grid grid-cols-5 gap-4 my-8">
          {bookResult.slice(0, 10).map((book, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-md overflow-hidden transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-105"
            >
              <img
                src={book[2]}
                alt={book[0]}
                className="w-full h-64 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold mb-2">{book[0]}</h3>
                <p className="text-gray-600">Author: {book[1]}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Recommend;

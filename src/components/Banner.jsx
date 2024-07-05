import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Banner = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/books/search?q=${searchTerm}`
        );
        const data = await response.json();
        console.log(data);
        setBooks(data);
      } catch (error) {
        console.log(error);
      }
    };

    if (searchTerm) {
      fetchData();
    } else {
      setBooks([]); // Clear books when searchTerm is empty
    }
  }, [searchTerm]);

  const handleSearchBook = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
  };

  const handleClickBook = (bookId) => {
    console.log("bookId: ", bookId);
  };

  return (
    <div className="flex justify-center items-center p-8 bg-gray-200 relative">
      <div className="text-lg font-semibold text-blue-500">
        <div className="text-center">
          <h2 className="text-5xl font-bold mb-4">Search books</h2>
          <div className="flex items-center relative">
            <input
              className="border border-gray-300 px-4 py-2 rounded-l-full focus:outline-none"
              type="search"
              name="search"
              id="search"
              placeholder="Search a book"
              onChange={handleSearchBook}
              value={searchTerm}
            />
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-r-full"
            >
              Search
            </button>
          </div>
          {searchTerm && books.length > 0 && (
            <ul className="absolute left-0 right-0 mt-2 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto z-10">
              {books.map((book) => (
                <Link
                  to={`${import.meta.env.VITE_FRONTEND_URL}/book/${book._id}`}
                  key={book._id}
                >
                  <li
                    key={book._id}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={handleClickBook(book._id)}
                  >
                    {book.bookTitle}
                  </li>
                </Link>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default Banner;

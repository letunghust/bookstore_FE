import { useEffect, useState } from "react";

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
        setBooks(data);
      } catch (error) {
        console.log(error);
      }
    };

    if (searchTerm) {
      fetchData();
    }
  }, [searchTerm]);

  const handleSearchBook = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
  };

  return (
    <div className="flex justify-center items-center p-8 bg-gray-200">
      {/* left side bar */}
      <div className="text-lg font-semibold text-blue-500">
        <div className="text-center">
          <h2 className="text-5xl font-bold mb-4">Search books</h2>
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
            >
              Search
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
        </div>
      </div>

      {/* right side bar */}
    </div>
  );
};

export default Banner;

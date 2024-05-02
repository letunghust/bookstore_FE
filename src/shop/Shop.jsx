import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Shop = () => {
  const [books, setBooks] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState('');

  // get all books
  const fetchData = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/all-books?category=${selectedGenre}`
      );
      const data = await response.json();
      setBooks(data.docs);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [selectedGenre]);
  //end of get all books

  const handleGenreFilter = (e) => {
    const genre = e.target.value;
    setSelectedGenre(genre);
    fetchData();
  };

  return (
    <div>
      <div className="flex">
        {/* Sidebar */}
        <div className="w-1/4 bg-white p-4">
          <h3 className="text-lg font-semibold mb-4">Filters</h3>
          <div>
            <h4 className="text-base font-semibold mb-2">Genres</h4>
            <div className="flex flex-col space-y-2">
                {/* history */}
              <div>
                <input
                  type="radio"
                  id="history"
                  value="History"
                  checked={selectedGenre === "History"}
                  onChange={handleGenreFilter}
                />
                <label htmlFor="history" className="ml-2">
                  History
                </label>
              </div>
              {/* thriller */}
              <div>
                <input
                  type="radio"
                  id="thriller"
                  value="Thriller"
                  checked={selectedGenre === "Thriller"}
                  onChange={handleGenreFilter}
                />
                <label htmlFor="thriller" className="ml-2">
                  Thriller
                </label>
              </div>
              {/* romance */}
              <div>
                <input
                  type="radio"
                  id="romance"
                  value="Romance"
                  checked={selectedGenre === "Romance"}
                  onChange={handleGenreFilter}
                />
                <label htmlFor="romance" className="ml-2">
                  Romance
                </label>
              </div>
              {/* romantasty */}
              <div>
                <input
                  type="radio"
                  id="romantasy"
                  value="Romantasy"
                  checked={selectedGenre === "Romantasy"}
                  onChange={handleGenreFilter}
                />
                <label htmlFor="romantasy" className="ml-2">
                  Romantasy
                </label>
              </div>
              {/* fantasty */}
              <div>
                <input
                  type="radio"
                  id="fantasy"
                  value="Fantasy"
                  checked={selectedGenre === "Fantasy"}
                  onChange={handleGenreFilter}
                />
                <label htmlFor="fantasy" className="ml-2">
                  Fantasy
                </label>
              </div>
              {/* science fiction */}
              <div>
                <input
                  type="radio"
                  id="scienceFiction"
                  value="Science Fiction"
                  checked={selectedGenre === "Science Fiction"}
                  onChange={handleGenreFilter}
                />
                <label htmlFor="scienceFiction" className="ml-2">
                  Science Fiction
                </label>
              </div>
              {/* horror */}
              <div>
                <input
                  type="radio"
                  id="horror"
                  value="Horror"
                  checked={selectedGenre === "Horror"}
                  onChange={handleGenreFilter}
                />
                <label htmlFor="horror" className="ml-2">
                  Horror
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Product Grid */}
        <div className="w-3/4 p-4">
          <h2 className="text-2xl font-bold mb-4">Products</h2>
          <div className="grid grid-cols-4 gap-4">
            {books.map((book) => (
              <Link key={book._id} to={`/book/${book._id}`}>
                <div className="bg-white rounded-lg shadow-md overflow-hidden hover:-translate-y-1 hover:scale-105">
                  <img
                    src={book.imageURL}
                    alt={book.bookTitle}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="text-lg font-semibold mb-2">
                      {book.bookTitle}
                    </h3>
                    <p className="text-gray-700">${book.price}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shop;
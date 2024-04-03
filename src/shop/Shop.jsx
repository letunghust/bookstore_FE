import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Shop = () => {
  const [books, setBooks] = useState([]);

  // get all books
  const fetchData = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/all-books`
      );
      const data = await response.json();
      setBooks(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  //end of get all books 

  return (
    <div>
      <div className="flex">
        {/* Sidebar */}
        <div className="w-1/4 bg-white p-4">
          <h3 className="text-lg font-semibold mb-4">Filters</h3>
          {/* Filter options go here */}
        </div>

        {/* Product Grid */}
        <div className="w-3/4 p-4">
          <h2 className="text-2xl font-bold mb-4">Products</h2>
          <div className="grid grid-cols-4 gap-4">
            {books.map((book) => (
              <Link  key={book._id} to={`/book/${book._id}`}> 
                <div
                  className="bg-white rounded-lg shadow-md overflow-hidden"
                >
                  <img
                    src={book.imageURL}
                    alt={book.bookTitle}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="text-lg font-semibold mb-2">{book.bookTitle}</h3>
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

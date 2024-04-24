import React, { useEffect, useState } from "react";
import BookCard from "../components/BookCard";

// console.log(import.meta.env.VITE_BACKEND_URL)
const backend_url = import.meta.env.VITE_BACKEND_URL || "http://localhost:3001";
const FavoriteBooks = () => {
  // const backend_url = import.meta.env.BACKEND_URL;
  const [books, setBooks] = useState([]);
  const [totalPages, setTotalPages] = useState(0);

  // get all book
  const fetchData = async () => {
    try {
      const response = await fetch(`${backend_url}/all-books`);
      const data = await response.json();
      // console.log(data.totalPages);
      setTotalPages(data.totalPages);
      setBooks(data.docs);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  // end of update book

  // get book one page 
  const fetchDataByPage = async (page) => {
    try {
      const response = await fetch(`${backend_url}/all-books?page=${page}`);
      const data = await response.json();
      // console.log(data.docs);  
      setBooks(data.docs);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <BookCard books={books} headline="Favorite Books" />
      <p className="text-center">
        {[...Array(totalPages)].map((_, index) => (
          <button key={index + 1} onClick={() => fetchDataByPage(index + 1)} className="mr-3">
            {" "}
            {index + 1}{" "}
          </button>
        ))}
      </p>
    </div>
  );
};

export default FavoriteBooks;
import React, { useEffect, useState } from 'react'
import BookCard from '../components/BookCard';

console.log(import.meta.env.VITE_BACKEND_URL)
const backend_url = import.meta.env.BACKEND_URL || "http://localhost:3001";
const FavoriteBooks = () => {
    // const backend_url = import.meta.env.BACKEND_URL;
    const [books, setBooks] = useState([]);

    // update book 
    const fetchData = async () => {
      try{
        const response = await fetch(`${backend_url}/all-books`);
        const data = await response.json();
        setBooks(data);
      } catch(error) {
        console.error(error);
      }
    }
    
    useEffect(() => {
      fetchData();
    }, [])
    // end of update book

  return (
    <div>
      <BookCard books={books} headline="Favorite Books"/>
    </div>
  )
}

export default FavoriteBooks

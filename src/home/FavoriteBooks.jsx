import React, { useEffect, useState } from 'react'

// console.log(process.env.BACKEND_URL)
const FavoriteBooks = () => {
    // const backend_url = import.meta.env.BACKEND_URL;
    console.log(import.meta.env.VITE_BACKEND_URL);
    const [books, setBooks] = useState([]);
    // useEffect(() => {
    //     fetch("http://localhost:3001/all-books").then(res => res.json().then(data => console.log(data)))
    // }, [])
  return (
    <div>FavoriteBooks</div>
  )
}

export default FavoriteBooks
// axios try catch

import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const SingleBookHome = () => {
  const { id } = useParams();
  const [bookInfo, setBookInfo] = useState(null);
  const [relatedBooks, setRelatedBooks] = useState([]);

  // hiển thị đúng cuốn sách 
  useEffect(() => {
    const fetchBookInfo = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/book/${id}`);
        const data = response.data;
        setBookInfo(data);
        console.log("res data: ", data);
      } catch (err) {
        console.log(err);
      }
    };

    if (id) {
      fetchBookInfo();
    }
  }, [id]);

  useEffect(() => {
    // Fetch related books based on category or any other criteria
    // In this example, let's assume books have a category field
    const fetchRelatedBooks = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/books?category=${bookInfo.category}`);
        const data = response.data;
        setRelatedBooks(data);
        console.log("related books: ", data);
      } catch (err) {
        console.log(err);
      }
    };

    if (bookInfo) {
      fetchRelatedBooks();
    }
  }, [bookInfo]);

  if (!id || !bookInfo) {
    return <div>Loading...</div>;
  }

  return (
    <div className='flex w-1/3 border-zinc-950'>
      <div className='border-4 border-indigo-500/100'>
        <div className="w-1/3">
          <img src={bookInfo.imageURL} alt={bookInfo.bookTitle} className="w-full h-auto" />
        </div>
        <div className="w-2/3 p-4">
          <h1 className="text-2xl font-bold mb-4">{bookInfo.bookTitle}</h1>
          {/* Thêm mô tả ở đây */}
          <p>{bookInfo.bookDescription}</p>
        </div>
      </div>
    </div>
  );
};

export default SingleBookHome;

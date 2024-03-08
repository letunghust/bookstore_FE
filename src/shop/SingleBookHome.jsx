import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

const SingleBookHome = () => {
  const { id } = useParams();
  const [bookInfo, setBookInfo] = useState(null);
  const [relatedBooks, setRelatedBooks] = useState([]);

  // hiển thị đúng cuốn sách khi bấm vào 1 ảnh 
  useEffect(() => {
    const fetchBookInfo = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/book/${id}`);
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

  // hiển thị các cuốn sách cùng thể loại 
  useEffect(() => {
    // Fetch related books based on category or any other criteria
    // In this example, let's assume books have a category field
    const fetchRelatedBooks = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/all-books?category=${bookInfo.category}`);
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
    <div>
      <div className='flex w-1/3 border-zinc-950'>
      {/* hiển thị ảnh, tiêu đề, mô tả, AI */}
        <div className=''>
          <div className="w-2/3 items-center bottom-5 border-black text-center">
            <img src={bookInfo.imageURL} alt={bookInfo.bookTitle} className="w-full h-auto" />
          </div>
          <div className="w-full">
            <h1 className="text-2xl font-bold mb-4 p-2">{bookInfo.bookTitle}</h1>
            <p className='w-full p-3'>{bookInfo.bookDescription}</p>
          </div>
        </div>
      </div>
      <div className='w-full p-4'>
        {/* hiển thị sách cùng thể loại */}
        <h2 className="text-2xl font-bold mb-4 text-center">Other Books</h2>
        <ul className='flex flex-wrap justify-center gap-5'>
          {relatedBooks.map((relatedBook) => (
            <Link to={`${import.meta.env.VITE_FRONTEND_URL}/book/${relatedBook._id}`} key={relatedBook._id}>
              <li key={relatedBook.id} className="mb-4 mr-4 w-[100px]">
                <div className="flex flex-col items-start">
                  <img src={relatedBook.imageURL} alt={relatedBook.bookTitle} className="w-[94px] h-auto mb-2" />
                  <p className="text-sm">{relatedBook.bookTitle}</p>
                </div>
              </li>          
            </Link>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SingleBookHome;

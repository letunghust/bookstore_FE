import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Button from "../components/Button";

const SingleBookHome = () => {
  const { id } = useParams();
  const [bookInfo, setBookInfo] = useState(null);
  const [res1, setResInfo] = useState("");
  const [relatedBooks, setRelatedBooks] = useState([]);

  // hiển thị đúng cuốn sách khi bấm vào 1 ảnh
  useEffect(() => {
    const fetchBookInfo = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/book/${id}`
        );
        const data = response.data;
        setBookInfo(data);
        // console.log("res data: ", data);
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
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/all-books?category=${
            bookInfo.category
          }`
        );
        const data = response.data;
        
        setRelatedBooks(data.docs);
        // console.log("related books: ", data);
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

  // them sách vào giỏ hàng
  const handleAddToCart = async (bookId) => {
    try {
      const token = localStorage.getItem("token");
      const quantity = 1;
      if (!token) {
        alert("please log in");
      } else {
        // console.log(token)
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/add/${bookId}`,
          {
            // const response = await fetch(`http://localhost:3001/add/65f15cb88efe0f83a96fd451`, {
            method: "POST",
            headers: {
              Accept: "application/json",
              // 'Content-Type': 'application/json',
              "Content-Type": "application/json; charset=UTF-8",
              Authorization: `${token}`,
            },
            body: JSON.stringify({ quantity }),
          }
        );

        if (!response.ok) {
          throw new Error("Error adding book to cart");
        }

        // const res = await response.json();
        const res = await response.json();
        console.log(res);
        // alert(res);
        alert(JSON.stringify(res));
      }
    } catch (error) {
      console.log(error);
      alert("Error adding book to cart");
    }
  };

  return (
    <div>
      <div className="flex border-zinc-950">
        {/* hiển thị ảnh, tiêu đề, mô tả, AI */}
        <div className="flex">
          <div className="w-full flex justify-center bottom-5 border-black text-center">
            <img
              src={bookInfo.imageURL}
              alt={bookInfo.bookTitle}
              className="w-2/3 h-auto"
              // className="w-auto h-2/3"
            />
          </div>
          <div className="w-full">
            <h1 className="text-2xl text-center font-bold mb-4 p-2">
              {bookInfo.bookTitle}
            </h1>
            <h1 className="text-xl text-center text-blue-400">
              {bookInfo.price}$
            </h1>
            <p className="w-full p-3">{bookInfo.bookDescription}</p>
            <p>Quantity: {bookInfo.quantity}</p>
            <div className="flex w-full">
              <a href={bookInfo.bookPDFURL}>
                <Button type="text" label="Download Now " />
              </a>
              <button
                onClick={() => {
                  console.log(bookInfo._id);
                  handleAddToCart(bookInfo._id);
                }}
              >
                {" "}
                Add to Cart{" "}
              </button>
             
            </div>
          </div>
        </div>
      </div>
      {/* hiển thị sách cùng thể loại */}
      <div className="w-full p-4">
        <h2 className="text-2xl font-bold mb-4 text-center">Other Books</h2>
        <ul className="flex flex-wrap justify-center gap-5">
          {relatedBooks.map((relatedBook) => (
            <Link
              to={`${import.meta.env.VITE_FRONTEND_URL}/book/${
                relatedBook._id
              }`}
              key={relatedBook._id}
            >
              <li key={relatedBook.id} className="mb-4 mr-4 w-[100px]">
                <div className="flex flex-col items-start">
                  <img
                    src={relatedBook.imageURL}
                    alt={relatedBook.bookTitle}
                    className="w-[94px] h-auto mb-2"
                  />
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

import React, { useEffect, useState } from "react";
// import vietnam from "../assets/vietnam.jpg"
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import BookCard from "../components/BookCard";

const FavBook = () => {
  const [bookRecommend, setBookRecommend] = useState([]);
  const [User_ID, setUser_ID] = useState();

  const token = localStorage.getItem("token");
  const decodedToken = jwtDecode(token);
  const userID = decodedToken._id;

  const fetchUserData = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/user/${userID}`
      );
      // console.log(response.data)
      // console.log(response.data.User_ID)
      setUser_ID(response.data.User_ID);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchRatedBook = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_AI}/api/recommendSVD?user_id=${User_ID}`
      );
      const data = await response.json();
      // console.log(data);
      console.log(data.recommendations);
      // setBookRecommend(data.recommendations);

      const mappedBooks = data.recommendations.map((book) => (
        {
          _id: book[0],
          imageURL: book[1],
          bookTitle: book[0],
        }
      ));
      setBookRecommend(mappedBooks); 
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUserData();
    // fetchRatedBook();
  }, []);

  useEffect(() => {
    if (User_ID) {
      fetchRatedBook();
    }
  }, [User_ID]);

  return (
    <div className="p-4">
      {/* <h1 className="text-2xl font-bold mb-4 text-center">Top rated book</h1> */}
      {/* <div className="flex flex-wrap gap-4">
        {bookRecommend?.map((book, index) => (
          <div key={index} className="w-40">
            <img
              src={book[1]}
              alt={book[0]}
              className="w-full h-auto object-cover"
            />
            <p className="text-center">{book[0]}</p>
          </div>
        ))}
      </div> */}
      <BookCard books={bookRecommend} headline="Top recommend book"/>
    </div>
  );
};

export default FavBook;

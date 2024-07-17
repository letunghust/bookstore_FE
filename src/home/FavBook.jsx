import React, { useEffect, useState } from "react";
// import vietnam from "../assets/vietnam.jpg"
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import BookCard from "../components/BookCard";

const FavBook = () => {
  const [bookRecommend, setBookRecommend] = useState([]);
  const [User_ID, setUser_ID] = useState();
  const [userID, setUserID] = useState();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        const userID = decodedToken._id;
        setUserID(userID);
        // setUser_ID(userID);
      } catch (error) {
        console.error("Invalid token", error);
      }
    } else {
      console.warn("No token found");
    }
  }, []);

  const fetchUserData = async (userID) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/user/${userID}`
      );
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

      const mappedBooks = data.recommendations.map((book) => ({
        _id: book[0],
        imageURL: book[1],
        bookTitle: book[0],
      }));
      setBookRecommend(mappedBooks);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUserData(userID);
    // fetchRatedBook();
  }, [userID]);

  useEffect(() => {
    if (User_ID) {
      fetchRatedBook();
    }
  }, [User_ID]);

  return (
    <div className="p-4">
      
      <BookCard books={bookRecommend} headline="Top recommend book" />
    </div>
  );
};

export default FavBook;

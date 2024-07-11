import React, { useEffect, useState } from "react";
// import vietnam from "../assets/vietnam.jpg"
import { jwtDecode } from "jwt-decode";
import axios from "axios";

const FavBook = () => {
  const [bookRecommend, setBookRecommend] = useState([]);
  const [User_ID, setUser_ID] = useState();

  const token = localStorage.getItem("token");
  const decodedToken = jwtDecode(token);
  const userID = decodedToken._id;

  const fetchUserData = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/user/${userID}`);
      // console.log(response.data)
      // console.log(response.data.User_ID)
      setUser_ID(response.data.User_ID);
    } catch(error) {
      console.log(error);
    }
  }

  const fetchRatedBook = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_AI}/api/recommendSVD?user_id=${User_ID}`
      );
      const data = await response.json();
      // console.log(data);
      // console.log(data.recommendations);
      setBookRecommend(data.recommendations);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUserData();
    // fetchRatedBook();
  }, []);

  useEffect(() => {
    if(User_ID) {
      fetchRatedBook();
    }
  }, [User_ID])

  return (
    <div>
      <h2>Top rated book</h2>
      {/* <img src={vietnam} alt="" /> */}
      {bookRecommend?.map((book, index) => (
        <p key={index}>{book}</p>
      ))}
    </div>
  );
};

export default FavBook;

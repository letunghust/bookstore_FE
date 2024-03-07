/* eslint-disable react/prop-types */
import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import FavoriteBooks from "../home/FavoriteBooks";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// import "./styles.css";

// import required modules
import { Navigation, Pagination } from 'swiper/modules';

const BookCard = ({headline, books }) => {
    return (
      <div className="my-8 mx-auto max-w-2xl">
        <h2 className="text-3xl font-bold mb-6">{headline}</h2>
        <Swiper
          slidesPerView={1}
          spaceBetween={10}
          pagination={{
            clickable: true,
          }}
          breakpoints={{
            640: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 4,
              spaceBetween: 40,
            },
            1024: {
              slidesPerView: 5,
              spaceBetween: 50,
            },
          }}
          modules={[Pagination]}
          className="mySwiper"
        >
          {books.map((book) => (
            <SwiperSlide key={book._id}>
                <Link to={`/book/${book._id}`}>
                <div className="relative overflow-hidden aspect-ratio-2/3 rounded-lg">
                <img
                  src={book.imageURL}
                  alt=""
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="mt-2 text-sm font-medium">
                {book.bookTitle}
              </div>
                </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    );
  };

export default BookCard
import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";

const BookCard = ({ headline, books }) => {
  return (
    <div className="w-full my-8 mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-center">{headline}</h2>
      <Swiper
        slidesPerView={1}
        spaceBetween={10}
        pagination={{
          clickable: true,
        }}
        navigation={true} // Thêm tham số navigation để hiển thị nút điều hướng
        modules={[Pagination, Navigation]} // Thêm module Navigation
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
              <div className="mt-2 text-sm font-medium">{book.bookTitle}</div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default BookCard;

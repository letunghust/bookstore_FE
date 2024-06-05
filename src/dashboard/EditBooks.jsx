import { Textarea } from "@material-tailwind/react";
import React, { useEffect, useState } from "react";
import Button from "../components/Button";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import {  toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const backend_url = import.meta.env.VITE_BACKEND_URL;
const token = localStorage.getItem("token");
const EditBooks = () => {
  const { id } = useParams();
  const [bookInfo, setBookInfo] = useState(null);
  const bookCategories = [
    "History",
    "Thriller",
    "Romance",
    "Romantasy",
    "Fantasy",
    "Science Fiction",
    "Horror",
  ];

  const [selectedBookCategory, setSelectedBookCategory] = useState(
    bookCategories[0]
  );

  // lựa chọn thể loại sách
  const handleChangeSelectedValue = (event) => {
    console.log(event.target.value);
    setSelectedBookCategory(event.target.value);
  };

  // cập nhật dữ liệu vào form
  const initData = async () => {
    try {
      const response = await axios.get(`${backend_url}/book/${id}`);

      console.log("response", response.data);
      setBookInfo(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  console.log("book info: ", bookInfo);
  useEffect(() => {
    initData();
  }, [id]);

  // xử lý ấn nút submit để thay đổi dữ liệu
  const navigate = useNavigate();
  const handleBookSubmit = async (event) => {
    event.preventDefault();
    const form = event.target;

    const bookTitle = form.bookTitle.value;
    const authorName = form.authorName.value;
    const imageURL = form.imageURL.value;
    const category = form.category.value;
    const bookDescription = form.bookDescription.value;
    const bookPDFURL = form.bookPDFURL.value;
    const price = form.price.value;
    const quantity = form.quantity.value;

    const bookObj = {
      bookTitle,
      authorName,
      imageURL,
      category,
      bookDescription,
      bookPDFURL,
      price,
      quantity,
    };

    try {
      const response = await fetch(`${backend_url}/book/${id}`, {
        method: "PATCH",
        headers: {
          "Content-type": "application/json",
          Authorization: `${token}`,
        },
        body: JSON.stringify(bookObj),
      });

      const data = response.data;
      setBookInfo(data);
      // console.log(data);
      // alert("Update a book sccessfull!");
      toast.success("Update a book sccessfull!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      navigate("/admin/managebook"); // chuyển lại manage khi đã edit xong
    } catch (error) {
      console.error(error);
    }
  };

  const handleInputChange = (e) => {
    e.preventDefault();
    const { id, value } = e.target;
    setBookInfo((prevInfo) => ({
      ...prevInfo,
      [id]: value,
    }));
  };

  return (
    <div className="mx-auto max-w-screen-lg mt-8">
      <h1 className="text-center">Update a book</h1>
      <form
        onSubmit={handleBookSubmit}
        className="w-full  shadow-md rounded px-8 pt-6 pb-8 mb-4"
      >
        {/* first row */}
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="bookTitle"
            >
              Book Title
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              id="bookTitle"
              type="text"
              placeholder="Book Title"
              value={bookInfo?.bookTitle}
              onChange={handleInputChange}
            />
          </div>
          <div className="w-full md:w-1/2 px-3">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="authorName"
            >
              Author Name
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="authorName"
              type="text"
              placeholder="Author Name"
              value={bookInfo?.authorName}
              onChange={handleInputChange}
            />
          </div>
        </div>
        {/* second row */}
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="imageURL"
            >
              Book Image URL
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="imageURL"
              type="text"
              placeholder="Book Image URL"
              value={bookInfo?.imageURL}
              onChange={handleInputChange}
            />
          </div>
          <div className="w-full md:w-1/2 px-3">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="category"
            >
              Book Category
            </label>
            <select
              className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="category"
              name="categoryName"
              value={selectedBookCategory}
              onChange={handleChangeSelectedValue}
            >
              {bookCategories.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        </div>
        {/* third row */}
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full px-3">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="bookDescription"
            >
              Description
            </label>
            <textarea
              className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="bookDescription"
              placeholder="Write your book ..."
              value={bookInfo?.bookDescription}
              onChange={handleInputChange}
            />
          </div>
        </div>
        {/* fourth row */}
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full px-3">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="bookPDFURL"
            >
              Book PDF URL
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              id="bookPDFURL"
              type="text"
              placeholder="Book PDF URL"
              value={bookInfo?.bookPDFURL}
              onChange={handleInputChange}
            />
          </div>
        </div>

        {/* fifth row */}
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full px-3">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="Price"
            >
              Price
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              id="price"
              type="text"
              placeholder="Price "
              value={bookInfo?.price}
              onChange={handleInputChange}
            />
          </div>
          <div className="w-full px-3">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="Quantity"
            >
              Quantity
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              id="quantity"
              type="text"
              placeholder="Quantity "
              value={bookInfo?.quantity}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <Button type="submit" label="Update" />
      </form>
    </div>
  );
};

export default EditBooks;

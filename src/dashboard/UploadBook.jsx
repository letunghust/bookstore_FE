import { Textarea } from '@material-tailwind/react';
import React, { useEffect, useState } from 'react';
import Button from '../components/Button';
import {  useNavigate } from 'react-router-dom';

const backend_url = import.meta.env.BACKEND_URL || "http://localhost:3001";
const UploadBook = () => {
//   const [allBooks, setAllBooks] = useState([]);
//   const fetchDataAllBook = async () => {
//     try{
//       const response = await fetch(`${backend_url}/all-books`);
//       const data = await response.json();
//       console.log(data)
//       setAllBooks(data);
//     } catch(error) {
//       console.error(error)
//     }
//   }
// useEffect(() => {
//   fetchDataAllBook();
// }, []);

  //danh sach các thể loại sách
  const bookCategories = [
    "History",
    "Thriller",
    "Romance", 
    "Romantasy",
    "Fantasy",
    "Science Fiction",
    "Horror",
  ]

  const [selectedBookCategory, setSelectedBookCategory] = useState(bookCategories[0])

  // lựa chọn thể loại sách
  const handleChangeSelectedValue = (event) => {
    setSelectedBookCategory(event.target.value);
  }

  // xử lý submit
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
    
    const bookObj = {bookTitle, authorName, imageURL, category, bookDescription, bookPDFURL }
    console.log(bookObj)

    try {
      const response = await fetch(`${backend_url}/upload-book`, {
        method: "POST",
        headers: {
          "Content-type" : "application/json",
        },
        body: JSON.stringify(bookObj)
      });

      if(!response.ok) {
        throw new Error('Error uploading book');
      }

      // console.log(response)
      // setAllBooks((preBooks) => [data, ...preBooks]);
      // allBooks.unshift(bookObj);
      // console.log(allBooks)
      alert('Book uploaded successfully');
      navigate('/admin/manage'); // chuyển đến bên manage 
      form.reset();
    } catch(error) {
      console.error(error.massage)
    }

  }
  // useEffect(() => {
  //   console.log(allBooks)
  // }, [allBooks])

  return (
      <div className="mx-auto max-w-screen-lg mt-8">
        <h1 className="text-center">Upload a book</h1>
      <form onSubmit={handleBookSubmit} className="w-full  shadow-md rounded px-8 pt-6 pb-8 mb-4">
        {/* first row */}
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="bookTitle">
              Book Title
            </label>
            <input className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="bookTitle" type="text" placeholder="Book Title" />
          </div>
          <div className="w-full md:w-1/2 px-3">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="authorName">
              Author Name 
            </label>
            <input className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="authorName" type="text" placeholder="Author Name" />
          </div>
        </div>
        {/* second row */}
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="imageURL">
              Book Image URL
            </label>
            <input className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="imageURL" type="text" placeholder="Book Image URL" />
          </div>
          <div className="w-full md:w-1/2 px-3">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="category">
              Book Category
            </label>
            <select className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="category" name="categoryName" value={selectedBookCategory} onChange={handleChangeSelectedValue}>
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
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="bookDescription">
              Description
            </label>
            <textarea className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="bookDescription" placeholder="Write your book ..." />
          </div>
        </div>
        {/* fourth row */}
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full px-3">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="bookPDFURL">
              Book PDF URL 
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              id="bookPDFURL"
              type="text"
              placeholder="Book PDF URL"
            />
          </div>
        </div>

        {/* SUBMIT */}
        {/* <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full">
          Submit
        </button> */}
        <Button type="submit" label="Submit"/>
      </form>
    </div>
  );
}

export default UploadBook;

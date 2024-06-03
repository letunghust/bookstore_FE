import React, { useEffect, useState } from 'react'
import { Card, Typography } from "@material-tailwind/react";
import { Link } from 'react-router-dom';
import { FaPencilAlt } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
 
const backend_url = import.meta.env.VITE_BACKEND_URL ;
const token = localStorage.getItem("token");
const ManageBooks = () => {
  const [allBooks, setAllBooks] = useState([]);
  const [totalPages, setTotalPages] = useState(0);

  // get all book 
  const fetchDataAllBook = async () => {
    try{
      const response = await fetch(`${backend_url}/all-books`);
      const data = await response.json();
      // console.log(data.docs)
      setTotalPages(data.totalPages);
      setAllBooks(data.docs);
    } catch(error) {
      console.error(error)
    }
  }
useEffect(() => {
  fetchDataAllBook();
}, []);

// handle delete book 
const handleDelete = async (id) => {
  try{
    const response = fetch(`${backend_url}/book/${id}`, {
      method: 'DELETE',
      headers: {
        "Content-type" : "application/json",
        "Authorization": `${token}`,
      },
    })
    alert('delete successful')
    setAllBooks((prevBooks) => prevBooks.filter((book) => book._id !== id));

  } catch(error) {
    console.error(error.message);
  }
}
// sort lại
const sortBooksByCreatedAt = () => {
  setAllBooks((prevBooks) => [...prevBooks].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
};
useEffect(() => {
  fetchDataAllBook();
  sortBooksByCreatedAt();
}, []);
const TABLE_HEAD = ["Title", "Author", "image URL", "category", "description", "PDF URL", "Price", "Quantity",  "", ""];
  
const TABLE_ROWS = allBooks;
 
  // get book one page 
  const fetchDataByPage = async (page) => {
    try {
      const response = await fetch(`${backend_url}/all-books?page=${page}`);
      const data = await response.json();
      // console.log(data.docs);  
      setAllBooks(data.docs);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className='w-full'>
      <Card className="h-full w-full overflow-scroll">
        <table className="w-full min-w-max table-auto text-left">
          <thead>
            <tr>
              {TABLE_HEAD.map((head) => (
                <th
                  key={head}
                  className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
                >
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal leading-none opacity-70"
                  >
                    {head}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {TABLE_ROWS.map(({_id, bookTitle, authorName, imageURL, category, bookDescription, bookPDFURL, price, quantity }, index) => {
              const isLast = index === TABLE_ROWS.length - 1;
              const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";
        
              return (
                <tr key={bookTitle}>
                  {/* title */}
                  <td className={`${classes} max-w-[200px] overflow-hidden overflow-ellipsis`}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {bookTitle}
                    </Typography>
                  </td>
                  {/* author */}
                  <td className={`${classes} max-w-[200px] overflow-hidden overflow-ellipsis`}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {authorName}
                    </Typography>
                  </td>
                  {/* image URL */}
                  <td className={`${classes} max-w-[200px] overflow-hidden overflow-ellipsis break-words`}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {imageURL}
                    </Typography>
                  </td>
                  {/* category */}
                  <td className={`${classes} max-w-[200px] overflow-hidden overflow-ellipsis`}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {category}
                    </Typography>
                  </td>
                  {/* description */}
                  <td className={`${classes} max-w-[200px] overflow-hidden overflow-ellipsis`}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {bookDescription}
                    </Typography>
                  </td>
                  {/* pdf url */}
                  <td className={`${classes} max-w-[200px] overflow-hidden overflow-ellipsis break-words`}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {bookPDFURL}
                    </Typography>
                  </td>
                  {/* price */}
                  <td className={`${classes} max-w-[200px] overflow-hidden overflow-ellipsis`}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {price}$
                    </Typography>
                  </td>
                  {/* quantity */}
                  <td className={`${classes} max-w-[200px] overflow-hidden overflow-ellipsis`}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {quantity}
                    </Typography>
                  </td>
                  {/* edit */}
                  <td className={`${classes} max-w-[200px] overflow-hidden overflow-ellipsis`}>
                    <Link to={`/admin/edit-books/${_id}`}>
                      <FaPencilAlt />
                    </Link>
                  </td>
                  {/* delete */}
                  <td className={`${classes} max-w-[200px] overflow-hidden overflow-ellipsis`}>
                    {/* <Link to={`/admin/dashboard/edit-books/${_id}`}>
                      <FaPencilAlt />
                    </Link> */}
                    <button onClick={() => handleDelete(_id)}><MdDeleteForever /></button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </Card>

      <p className="text-center">
        {[...Array(totalPages)].map((_, index) => (
          <button key={index + 1} onClick={() => fetchDataByPage(index + 1)} className="mr-3">
            {" "}
            {index + 1}{" "}
          </button>
        ))}
      </p>
    </div>
  )
}

export default ManageBooks
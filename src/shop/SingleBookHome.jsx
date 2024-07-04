import axios from "axios";
import React, { useEffect, useState, useRef, useCallback } from "react";
import { Link, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import Button from "../components/Button";

const SingleBookHome = () => {
  const { id } = useParams();
  const [bookInfo, setBookInfo] = useState(null);
  // const [bookRecommend, setBookRecommend] = useState([]);
  const [bookRecommend, setBookRecommend] = useState();
  // const [res1, setResInfo] = useState("");
  const [relatedBooks, setRelatedBooks] = useState([]);
  const [pendingQuantityChanges, setPendingQuantityChanges] = useState([]);
  const updateQuantityTimer = useRef(null);

  // hiển thị đúng cuốn sách khi bấm vào 1 ảnh
  useEffect(() => {
    const fetchBookInfo = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/book/${id}`
        );
        const data = response.data;
        console.log(data);
        setBookInfo(data);

        const recommendResponse = await axios.post(
          `${import.meta.env.VITE_BACKEND_AI}/api/recommend`,
          {
            // user_input: bookInfo?.bookTitle,
            user_input: data?.bookTitle,

            // user_input: "Madness"
          }
        );
        console.log(recommendResponse);
        let recommendData = recommendResponse.data;
        console.log(recommendData);
        console.log(typeof recommendData);

        // Kiểm tra nếu recommendData là chuỗi
        let finalRecommendData = recommendData;
        if (typeof recommendData === "string") {
          try {
            recommendData = recommendData.replace(/NaN/g, "null");
            finalRecommendData = JSON.parse(recommendData);
          } catch (e) {
            console.error("Error parsing recommendData:", e);
            finalRecommendData = [];
          }
        }

        // Kiểm tra nếu finalRecommendData không phải là mảng
        if (!Array.isArray(finalRecommendData)) {
          console.error("Recommend data is not an array:", finalRecommendData);
          finalRecommendData = [];
        }

        setBookRecommend(finalRecommendData);
      } catch (err) {
        console.log(err);
      }
    };

    if (id) {
      fetchBookInfo();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  // if (!id || !bookInfo) {
  //   return <div>Loading...</div>;
  // }

  // xu lý thay đổi số lượng sách

  // them sách vào giỏ hàng
  const handleAddToCart = async (bookId) => {
    try {
      const token = localStorage.getItem("token");
      const quantity = 1;
      if (!token) {
        alert("please log in");
      } else {
        // Nếu số lượng sách = 0 thì không mua được
        if (bookInfo.quantity === 0) {
          alert("Out of stock");
          return;
        }

        // gọi api để thêm sách vào giỏ hàng
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/add/${bookId}`,
          {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json; charset=UTF-8",
              Authorization: `${token}`,
            },
            body: JSON.stringify({ quantity }),
          }
        );

        if (!response.ok) {
          throw new Error("Error adding book to cart");
        }

        const res = await response.json();
        console.log(res);
        // alert(res);
        // alert(JSON.stringify(res));
        toast.success("Book added to cart successfully", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        // window.location.reload();
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
              src={bookInfo?.imageURL}
              alt={bookInfo?.bookTitle}
              className="w-2/3 h-auto"
              // className="w-auto h-2/3"
            />
          </div>
          <div className="w-full">
            <h1 className="text-2xl text-center font-bold mb-4 p-2">
              {bookInfo?.bookTitle}
            </h1>
            <h1 className="text-xl text-center text-blue-400">
              {bookInfo?.price}$
            </h1>
            <p className="w-full p-3">{bookInfo?.bookDescription}</p>
            <p>Quantity: {bookInfo?.quantity}</p>
            <div className="flex w-full">
              {/* <a href={bookInfo.bookPDFURL}>
                <Button type="text" label="Download Now " />
              </a> */}
              {/* <button
                onClick={() => {
                  // console.log(bookInfo._id);
                  handleAddToCart(bookInfo._id);
                }}
              >
                {" "}
                Add to Cart{" "}
              </button> */}
              <button
                onClick={() => handleAddToCart(bookInfo._id)}
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out"
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* hiển thị sách đề xuất  */}
      <div className="w-full p-4">
        <h2 className="text-2xl font-bold mb-4 text-center">
          Recommended Books
        </h2>
        <ul className="flex flex-wrap justify-center gap-5">
          {bookRecommend?.map((recommendedBook) => (
            <Link
              to={`${import.meta.env.VITE_FRONTEND_URL}/book/${
                recommendedBook._id
              }`}
              key={recommendedBook._id}
            >
              <li key={recommendedBook.id} className="mb-4 mr-4 w-[100px]">
                <div className="flex flex-col items-start">
                  <img
                    src={recommendedBook?.imageURL}
                    alt={recommendedBook.bookTitle}
                    className="w-[94px] h-auto mb-2"
                  />
                  <p className="text-sm">{recommendedBook.bookTitle}</p>
                </div>
              </li>
            </Link>
          ))}
        </ul>
      </div>

      {/* hiển thị sách cùng thể loại */}
      {/* <div className="w-full p-4">
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
      </div> */}
    </div>
  );
};

export default SingleBookHome;

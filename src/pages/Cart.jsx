import React, { useState, useEffect } from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ModalCheckout from "../components/ModalCheckout";
import emptyImage from "../assets/empty-cart.png";

const Cart = () => {
  const [cartItems, setCartItems] = useState("");
  const [cartId, setCartId] = useState("");
  const [userId, setUserId] = useState("");
  const [pendingChanges, setPendingChanges] = useState([]);
  const token = localStorage.getItem("token");
  const [clientSecret, setClientSecret] = useState(null);
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();

  // get all book in cart
  const fetchCart = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/cart`,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json; charset=UTF-8",
            Authorization: `${token}`,
          },
        }
      );

      // console.log("cardId: ", response.data._id);
      // console.log("userId: ", response.data.user);
      setCartId(response.data._id);
      setUserId(response.data.user);
      setCartItems(response.data.books);
    } catch (error) {
      console.log("Lỗi khi lấy thông tin giỏ hàng:", error);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  // clear all book when payment successfull in cart
  const clearCart = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/clear`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `${token}`,
          },
          body: JSON.stringify({}),
        }
      );
      if (response.ok) {
        alert("Delete cart successfully");
        // toast.success("Delete cart successfully", {
        //   position: "top-right",
        //   autoClose: 5000,
        //   hideProgressBar: false,
        //   closeOnClick: true,
        //   pauseOnHover: true,
        //   draggable: true,
        //   progress: undefined,
        // });
      } else {
        console.log("Error when delete cart", response.status);
      }
    } catch (error) {
      console.log("Error when clearing cart", error);
    }
  };

  // handle update quantity when payment success
  const updateBookQuantities = async () => {
    try {
      for (let item of cartItems) {
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/bookquantity/${item.book._id}`,
          {
            method: "PATCH",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json; charset=UTF-8",
            },
            body: JSON.stringify({
              quantity: item.book.quantity - item.quantity,
            }),
          }
        );

        if (!response.ok) {
          throw new Error(`Error updating quantity for book ${item.book._id}`);
        }
      }
      console.log("Updated book quantities successfully");
    } catch (error) {
      console.log("Error updating quantity for book", error);
    }
  };

  // handle increase, decrease quantity and remove item from cart
  const handleIncreaseQuantity = (id) => {
    const updatedCartItems = cartItems.map((item) => {
      if (item._id === id) {
        // return { ...item, quantity: item.quantity + 1 };
        if (item.quantity < item.book.quantity) {
          return { ...item, quantity: item.quantity + 1 };
        } else {
          alert("The quantity in the cart cannot the available stock");
          return item;
        }
      }
      return item;
    });
    setCartItems(updatedCartItems);
    setPendingChanges((prevChanges) => [
      ...prevChanges,
      { type: "increase", itemId: id },
    ]);
  };

  const handleDecreaseQuantity = (id) => {
    const updatedCartItems = cartItems.map((item) => {
      if (item._id === id) {
        return { ...item, quantity: Math.max(item.quantity - 1, 1) };
      }
      return item;
    });
    setCartItems(updatedCartItems);
    setPendingChanges((prevChanges) => [
      ...prevChanges,
      { type: "decrease", itemId: id },
    ]);
  };

  // const handleRemoveItem = (id) => {
  //   const updatedCartItems = cartItems.filter((item) => item._id !== id);
  //   if(updatedCartItems) {
  //   // if(updatedCartItems.length < cartItems.length) {
  //     setCartItems(updatedCartItems);
  //     setPendingChanges((prevChanges) => {
  //       [...prevChanges, { type: "remove", itemId: id }];
  //       // console.log(prevChanges);
  //     });
  //   }
  // };
  const handleRemoveItem = async (id) => {
    console.log(id)
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/remove/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `${token}`,
          },
        }
      );
      if (response.ok) {
        // Lấy phản hồi JSON
        const data = await response.json();
        console.log(data.message);
        alert(data.message)
        window.location.reload()

        // Cập nhật lại danh sách các mục trong giỏ hàng
        const updatedCartItems = cartItems.filter((item) => item._id !== id);
        setCartItems(updatedCartItems);

        // Xóa bỏ thay đổi đang chờ xử lý liên quan đến mục này
        setPendingChanges((prevChanges) =>
          prevChanges.filter((change) => change.itemId !== id)
        );
      } else {
        console.log(`Failed to remove item: ${response.statusText}`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // get request to server
  const sendChangesToserver = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/cart/update`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `${token}`,
          },
          body: JSON.stringify({ books: cartItems }),
        }
      );
      if (response.ok) {
        setPendingChanges([]);
        console.log("Cart updated successfully");
      }
    } catch (error) {
      console.log("Error updating cart: ", error);
    }
  };

  // BI LOI O CHO NAY khi remove đi mà f5 lại sẽ bị mất hết
  useEffect(() => {
    let timeout;
    const handlePendingChanges = async () => {
      if (pendingChanges?.length > 0) {
        timeout = setTimeout(() => {
          sendChangesToserver();
        }, 1000);
      } else {
        // await clearCart();
        // setTimeout(() =>{
        //   sendChangesToserver();
        // }, 1000)
      }
    };

    handlePendingChanges();

    return () => {
      clearTimeout(timeout);
    };
  }, [pendingChanges]);

  // handle payment
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");

  // HANDLE WHEN CLICK "PURCHASE"
  const handleCheckout = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(
        `${
          import.meta.env.VITE_BACKEND_URL
        }/create_payment?cardId=${cartId}&userId=${userId}`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json; charset=UTF-8",
            Authorization: `${token}`,
          },
          body: JSON.stringify({ cartId, userId }),
        }
      );
      // toast.success("Delete cart successfully", {
      //   position: "top-right",
      //   autoClose: 5000,
      //   hideProgressBar: false,
      //   closeOnClick: true,
      //   pauseOnHover: true,
      //   draggable: true,
      //   progress: undefined,
      // })
      // console.log(response);
      if (response.ok) {
        const data = await response.json();
        // console.log("data secret: ", data);
        const { clientSecret } = data;
        // console.log("client secret: ", clientSecret);
        setClientSecret(clientSecret);
        handleOpenModal();
      } else {
        console.log("Error creating payment intent:", response.status);
      }
    } catch (error) {
      console.error("Error creating payment intent:", error);
    }
  };

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  // HANDLE SUBMIT PAYMENT
  const handleSubmitPayment = async (event) => {
    event.preventDefault();
    if (!stripe || !elements || !clientSecret) {
      return;
    }

    const cardElement = elements.getElement(CardElement);

    try {
      const { error, paymentIntent } = await stripe.confirmCardPayment(
        clientSecret,
        {
          payment_method: {
            card: cardElement,
            billing_details: {
              name: name, // Thêm tên người dùng nếu có
              address: {
                line1: address, // Thêm địa chỉ người dùng nếu có
                city: city,
                country: country,
                // postal_code: '',
              },
            },
          },
        }
      );

      if (error) {
        alert("Error confirming card payment: ", error);
        console.error("Error confirming card payment:", error);
      } else {
        // Xử lý thanh toán thành công
        if (paymentIntent.status === "succeeded") {
          alert("Payment successful");

          // Gọi API để xử lý thanh toán thành công và lưu đơn hàng
          const response = await fetch(
            `${import.meta.env.VITE_BACKEND_URL}/payment_success`,
            {
              method: "POST",
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json; charset=UTF-8",
                Authorization: `${token}`,
              },
              body: JSON.stringify({ paymentIntentId: paymentIntent.id }),
            }
          );

          if (response.ok) {
            // Xử lý sau khi gọi API thành công
            console.log("Payment success processed");

            // cap nhật số lượng sách trong kho
            await updateBookQuantities();
          } else {
            // Xử lý khi gọi API thất bại
            console.error("Error processing payment success");
          }

          console.log("Payment successful:", paymentIntent);

          // Gọi API để gửi email xác nhận đơn hàng (nếu cần)
          const orderResponse = await fetch(
            `${import.meta.env.VITE_BACKEND_URL}/orders`,
            {
              method: "POST",
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json; charset=UTF-8",
                Authorization: `${token}`,
              },
              body: "",
            }
          );

          if (orderResponse.ok) {
            alert("Sent mail");
          } else {
            alert("Don't send mail");
          }

          // refresh lại website để ẩn modal
          window.location.reload();

          // gọi API để xóa giỏ hàng
          await clearCart();
        } else {
          alert("Payment status:", paymentIntent.status);
          // toast.info(`Payment status: ${paymentIntent.status}`, {
          //   position: "top-right",
          //   autoClose: 5000,
          //   hideProgressBar: false,
          //   closeOnClick: true,
          //   pauseOnHover: true,
          //   draggable: true,
          //   progress: undefined,
          // });
          console.log("Payment status:", paymentIntent.status);
        }
      }
    } catch (error) {
      console.error("Error confirming card payment:", error);
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-4">
      {/* GIO HANG */}
      <h2 className="text-xl font-bold mb-4">Your Cart</h2>
      {cartItems.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-full">
        {/* <p className="text-gray-600 text-center mb-4">Your cart is empty</p> */}
        <img src={emptyImage} alt="Empty Cart" className="w-1/2"/>
      </div>
      ) : (
        <>
          <ul className="divide-y divide-gray-200">
            {cartItems.map((item) => (
              <li key={item.book._id} className="py-4 flex items-center">
                <img
                  src={item.book.imageURL}
                  alt={item.book.bookTitle}
                  className="w-16 h-20 object-cover mr-4"
                />
                <div className="flex flex-col flex-grow">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold">
                      {item.book.bookTitle}
                    </h3>
                    <button
                      className="text-red-600 hover:text-red-800"
                      onClick={() => handleRemoveItem(item.book._id)}
                    >
                      Remove
                    </button>
                  </div>
                  <p className="text-gray-600">Quantity: {item.quantity}</p>
                  <p className="text-gray-600">Price: {item.book.price}$</p>
                  <p className="text-gray-600">
                    Total price: {item.book.price * item.quantity}$
                  </p>
                  <div className="flex items-center mt-2">
                    <button
                      className="text-blue-500 hover:text-blue-700 mr-2"
                      onClick={() => handleDecreaseQuantity(item._id)}
                    >
                      -
                    </button>
                    <p>{item.quantity}</p>
                    <button
                      className="text-blue-500 hover:text-blue-700 ml-2"
                      onClick={() => handleIncreaseQuantity(item._id)}
                    >
                      +
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>

          <div className="mt-6 flex justify-between items-center">
            <p className="text-red-600 mt-4 font-semibold text-2xl">
              Total Cart Price:{" "}
              {cartItems.reduce(
                (total, item) => (total += item.book.price * item.quantity),
                0
              )}
              $
            </p>
          </div>
          {/* THANH TOAN */}
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
            onClick={handleCheckout}
          >
            Purchase
          </button>

          <ModalCheckout isOpen={showModal} onClose={handleCloseModal}>
            <form className="max-w-screen-2xl mx-auto p-8 bg-white rounded-lg shadow-lg">
              {/* Các trường nhập thông tin thanh toán */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* name */}
                <div>
                  <label
                    htmlFor="name"
                    className="block text-gray-700 font-bold mb-2"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  />
                </div>
                {/* address */}
                <div>
                  <label
                    htmlFor="address"
                    className="block text-gray-700 font-bold mb-2"
                  >
                    Address
                  </label>
                  <input
                    type="text"
                    id="address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  />
                </div>
                {/* city */}
                <div>
                  <label
                    htmlFor="city"
                    className="block text-gray-700 font-bold mb-2"
                  >
                    City
                  </label>
                  <input
                    type="text"
                    id="city"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  />
                </div>
                {/* country */}
                <div>
                  <label
                    htmlFor="country"
                    className="block text-gray-700 font-bold mb-2"
                  >
                    Country
                  </label>
                  <input
                    type="text"
                    id="country"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  />
                </div>
              </div>

              {/* Card Element */}
              <div className="mb-6 mb-6">
                <CardElement
                  options={{
                    style: {
                      base: {
                        fontSize: "16px",
                        color: "#424770",
                        "::placeholder": {
                          color: "#aab7c4",
                        },
                      },
                      invalid: {
                        color: "#9e2146",
                      },
                    },
                  }}
                  onChange={(event) => {
                    if (event.error) {
                      console.log("Error:", event.error.message);
                    } else {
                      console.log("Card details:", event.complete);
                    }
                  }}
                />
              </div>

              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-colors duration-300"
                onClick={handleSubmitPayment}
              >
                Complete Checkout
              </button>
            </form>
          </ModalCheckout>
        </>
      )}
    </div>
  );
};

export default Cart;

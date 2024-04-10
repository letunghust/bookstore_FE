import React, { useState, useEffect } from "react";
import {
  useStripe,
  useElements,
  CardElement,
} from "@stripe/react-stripe-js";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {toast } from "react-toastify";
import ModalCheckout from "../components/ModalCheckout";

// const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISH_KEY);
// const clientSecret = 'sk_test_51P1hnME80pxaWCvIBXXXmc9Dt7m54vH7pAuI9GX0DtrNjO5vZdWSEzSTM0DR2o71mETRJYdLv62Ri740wlNPIg0c00h4EX8zgJ';
const Cart = () => {
  const [cartItems, setCartItems] = useState("");
  const [cartId, setCartId] = useState('');
  const [userId, setUserId] = useState('');
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

      console.log('cardId: ', response.data._id)
      console.log('userId: ', response.data.user)
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
        // alert("Delete cart successfully");
        toast.success('Delete cart successfully', {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      } else {
        console.log("Error when delete cart", response.status);
      }
    } catch (error) {
      console.log('Error when clearing cart' ,error);
    }
  };

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
      console.log(response);
      if (response.ok) {
        const data = await response.json();
        console.log("data secret: ", data);
        const { clientSecret } = data;
        console.log("client secret: ", clientSecret);
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
          // alert("Payment successful");
          toast.success('Payment successful', {
            position: 'top-right',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          console.log("Payment successful:", paymentIntent);

          // gọi API để xóa giỏ hàng
          await clearCart();
        } else {
          // alert("Payment status:", paymentIntent.status);
          toast.info(`Payment status: ${paymentIntent.status}`, {
            position: 'top-right',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
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
        <p className="text-gray-600">Giỏ hàng của bạn đang trống.</p>
      ) : (
        <>
          <ul className="divide-y divide-gray-200 justify-between">
            {cartItems.map((item) => (
              <li key={item.book._id} className="py-4 flex  items-center">
                <img
                  src={item.book.imageURL}
                  alt={item.book.bookTitle}
                  className="w-16 h-20 object-cover mr-4"
                />
                <div>
                  <h3 className="text-lg font-semibold">
                    {item.book.bookTitle}
                  </h3>
                  <p className="text-gray-600">Quantity: {item.quantity}</p>
                  <p className="text-gray-600">Price: {item.book.price}$</p>
                  <p className="text-gray-600">
                    Total price: {item.book.price * item.quantity}$
                  </p>
                </div>
              </li>
            ))}

            <div className="mt-6 flex justify-between items-center">
              <p className="text-red-600 mt-4 font-semibold text-2xl">
                Total Cart Price:{" "}
                {cartItems.reduce(
                  (total, item) => (total += item.book.price * item.quantity),
                  0
                )}
                $
              </p>
              {/* <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-1/10">
                           Purchase
                        </button> */}
            </div>
          </ul>

          {/* THANH TOAN */}
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-1/10"
            onClick={handleCheckout}
          >
            Purchase
          </button>

          <ModalCheckout isOpen={showModal} onClose={handleCloseModal}>
            <form className="max-w-screen-2xl mx-auto">
              {/* Các trường nhập thông tin thanh toán */}
              <div>
                {/* name */}
                <div className="mb-4">
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
                <div className="mb-4">
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
                <div className="mb-4">
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
                <div className="mb-4">
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
                {/* Card Element */}
                <div className="mb-4">
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
              </div>

              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
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

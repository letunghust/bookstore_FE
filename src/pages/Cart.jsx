import React, { useState, useEffect } from "react";
import {loadStripe} from "@stripe/stripe-js";
import axios from "axios";
import ModalCheckout from "../components/ModalCheckout";
import { CardElement, useStripe } from '@stripe/react-stripe-js';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISH_KEY)


const Cart = () => {
  // const [cartItems, setCartItems] = useState([]);
  const [cartItems, setCartItems] = useState("");
  const token = localStorage.getItem("token");
  const [clientSecret, setClientSecret] = useState(null);
//   const stripe = useStripe();
//   const elements = useElements();

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

    //   console.log("data", response.data.books);
      // setCartItems(response.data.books[0].book);
      setCartItems(response.data.books);
      // console.log(cartItems[1].book._id)
    } catch (error) {
      console.log("Lỗi khi lấy thông tin giỏ hàng:", error);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  // handle payment
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");

  const handleCheckout = async (event) => {
    event.preventDefault();
    try {
      const cartId = "660adc615136c742451bc6ac";
      const userId = "6604f17c1dfd7a3f4b4de5b0";

      // const response = await axios.post('/create_payment', {
      //   cartId,
      //   userId,
      // });
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/create_payment?cardId=${cartId}&userId=${userId}`,
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
      console.log(response)
      if(response.ok) {
        const data = await response.json();
        console.log('data secret: ', data)
        const {clientSecret} = data;
        console.log( 'client secret: ',clientSecret)
        setClientSecret(clientSecret);
        handleOpenModal()
      } else {
        console.log("Error creating payment intent:", response.status)
      }
    //   const { clientSecret } = response.data;
    //   setClientSecret(clientSecret);
     
    //   const stripe = await stripePromise;
    //   const {error} = await stripe.confirmCardPayment(clientSecret, {
    //     payment_method: {
    //         card: elements.getElement(CardElement),
    //         billing_details: {
    //             name: "test", 
    //         }
    //     }
    //   })

    //   if (error) {
    //     console.error('Error confirming card payment:', error);
    //   } else {
    //     // Thanh toán thành công, gửi paymentIntentId đến server
    //     const paymentIntentId = response.data.paymentIntent.id;
    //     // const response = await axios.post('/payment_success', { paymentIntentId });
    //     const successResponse = await fetch(`${import.meta.env.VITE_BACKEND_URL}/payment_success`, {
    //         method: "POST",
    //         headers: {
    //           Accept: "application/json",
    //           "Content-Type": "application/json; charset=UTF-8",
    //           Authorization: `${token}`,
    //         },
    //         body: JSON.stringify({ paymentIntentId }),
    //       });
    //       console.log('Payment successful:', successResponse);
    //     }
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
            <form>
              {/* Các trường nhập thông tin thanh toán */}
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
              {/* cardNumber */}
              <div className="mb-4">
                <label
                  htmlFor="cardNumber"
                  className="block text-gray-700 font-bold mb-2"
                >
                  Card Number
                </label>
                <input
                  type="text"
                  id="cardNumber"
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value)}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              {/* expiryDate */}
              <div className="mb-4">
                <label
                  htmlFor="expiryDate"
                  className="block text-gray-700 font-bold mb-2"
                >
                  Expiry Date
                </label>
                <input
                  type="text"
                  id="expiryDate"
                  value={expiryDate}
                  onChange={(e) => setExpiryDate(e.target.value)}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              {/* cvv */}
              <div className="mb-4">
                <label
                  htmlFor="cvv"
                  className="block text-gray-700 font-bold mb-2"
                >
                  CVV
                </label>
                <input
                  type="text"
                  id="cvv"
                  value={cvv}
                  onChange={(e) => setCvv(e.target.value)}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>

              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                // onClick={handleCheckout}
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

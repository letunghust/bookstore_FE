import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const token = localStorage.getItem("token");
const MyOrder = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchOrders = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/myorders`,
        {
          headers: {
            "Content-type": "application/json",
            Authorization: `${token}`,
          },
        }
      );
      console.log(response.data);
      setOrders(response.data);
      setLoading(false);
    } catch (error) {
      setError("Error fetching orders");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Order History</h2>
      {orders.length === 0 ? (
        <p>You have no orders.</p>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div
              key={order._id}
              className="p-4 border rounded-lg shadow-md flex"
            >
              <div className="flex-1">
                <div className="space-y-4">
                  {order.books.map((item) => (
                    <Link
                      key={item.book._id}
                      className="flex items-center space-x-4"
                      to={`/book/${item.book._id}`}
                    >
                      <img
                        src={item.book.imageURL}
                        alt={item.book.bookTitle}
                        className="w-16 h-16 object-cover"
                      />
                      <div>
                        <h1>{item.book.bookTitle}</h1>
                        <p>Quantity: {item.quantity}</p>
                      </div>
                    </Link>
                  ))}
                </div>
                <p className="text-2xl mt-4">
                  Total Price: ${order.total_price}
                </p>
              </div>
              {/* <div className="ml-auto self-start"> {order.order_status}</div> */}
              <div
                className={`ml-auto self-start px-2 py-1 rounded-full ${
                  order.order_status === "confirmed"
                    ? "bg-green-500 text-white"
                    : order.order_status === "pending"
                    ? "bg-gray-500 text-white"
                    : ""
                }`}
              >
                {order.order_status}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyOrder;

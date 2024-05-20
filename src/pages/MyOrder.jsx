import axios from "axios";
import React, { useEffect, useState } from "react";

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
    //   console.log(response.data);
      setOrders(response.data);
      setLoading(false);
    } catch (error) {
      setError("Error fetching orders");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders()
  }, []);

  return (
    <div className="container mx-auto p-4">
    <h2 className="text-2xl font-bold mb-4">Order History</h2>
    {orders.length === 0 ? (
      <p>You have no orders.</p>
    ) : (
      <div className="space-y-4">
        {orders.map((order) => (
          <div key={order._id} className="p-4 border rounded-lg shadow-md">
            {/* <h3 className="text-xl font-semibold">Order ID: {order._id}</h3> */}
          
            <div>
              {order.books.map((item) => (
                <div key={item.book._id} className="flex items-center space-x-4">
                  <img src={item.book.imageURL} alt={item.book.bookTitle} className="w-16 h-16 object-cover" />
                  <div>
                    <h1>{item.book.bookTitle}</h1>
                    <p>Quantity: {item.quantity}</p>
                  </div>
                </div>
              ))}
            </div>
            <p className="text-2xl">Total Price: ${order.total_price}</p>
            {/* <p>Status: {order.payment_status}</p> */}
          </div>

        ))}
      </div>
    )}
  </div>
  )
};

export default MyOrder;

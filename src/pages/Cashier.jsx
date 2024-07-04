import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Cashier = () => {
  const [allPendingOrders, setAllPendingOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // get all pending orders
  const fetchPendingOrder = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/allpendingorders`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setAllPendingOrders(data);
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPendingOrder();
  }, []);

  // handle confirm order when status of order is pending
  const handleConfirmOrder = async (orderId) => {
    console.log(orderId);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/orderconfirm/${orderId}`,
        {
          method: "PATCH",
          headers: {
            "Content-type": "application/json",
          },
          body: "",
        }
      );

      const data = await response.json();

      //   setAllPendingOrders((prevOrders) =>
      //     prevOrders.map((order) =>
      //       order._id === orderId
      //         ? { ...order, order_status: "confirmed" }
      //         : order
      //     )
      //   );
      setAllPendingOrders((prevOrders) =>
        prevOrders.filter((order) => order._id !== orderId)
      );

      // alert('Order confirmed successfully');
      toast.success("Order confirmed successfully!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      //   window.location.reload();
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="container mx-auto p-4">
      {allPendingOrders.length > 0 ? (
        <div>
          {" "}
          <h1 className="text-2xl font-bold mb-6">All Pending Orders</h1>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white">
              <thead className="bg-gray-100">
                <tr>
                  <th className="py-3 px-4 text-left">Order ID</th>
                  <th className="py-3 px-4 text-left">Customer Name</th>
                  <th className="py-3 px-4 text-right">Total Amount</th>
                  <th className="py-3 px-4 text-center">Status</th>
                  <th className="py-3 px-4 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {allPendingOrders.map((order) => (
                  <tr key={order._id} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4">{order._id}</td>
                    <td className="py-3 px-4">{order.user.name}</td>
                    <td className="py-3 px-4 text-right">
                      ${order.total_price.toFixed(2)}
                    </td>
                    <td className="py-3 px-4 text-center">
                      <span className="bg-yellow-200 text-yellow-800 py-1 px-3 rounded-full text-xs">
                        {order.order_status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <button
                        onClick={() => handleConfirmOrder(order._id)}
                        className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-3 rounded text-sm"
                      >
                        Confirm
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>{" "}
        </div>
      ) : (
        <div className="text-center py-4 text-3xl">No Pending Orders</div>
      )}
    </div>
  );
};

export default Cashier;

import React, { useEffect, useState } from 'react'

const ManageOrders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchOrders = async (req, res) => {
        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/allorders`);
            // console.log(response);
            // console.log(response.ok);
            if(response.ok) {
                const data = await response.json();
                console.log(data)
                setOrders(data);
            } else {
                console.log("Failed to fetch orders");
            }
        } catch(error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchOrders();
    }, []); 

    if(loading) {
        return <p>Loading...</p>
    }

    return (
        <div>
        <h1>Order Management</h1>
        <table className="table-auto w-full">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>User ID</th>
              <th>Total Price</th>
              <th>Payment Status</th>
              <th>Payment Method</th>
              <th>Created At</th>
              <th>Books</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td>{order._id}</td>
                <td>{order.user}</td>
                <td>{order.total_price}$</td>
                <td>{order.payment_status}</td>
                <td>{order.payment_method}</td>
                <td>{new Date(order.createdAt).toLocaleString()}</td>
                <td>
                  <ul>
                    {order.books.map((book) => (
                      <li key={book._id}>
                        {book.book} (x{book.quantity})
                      </li>
                    ))}
                  </ul>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    // <></>
  )
}

export default ManageOrders
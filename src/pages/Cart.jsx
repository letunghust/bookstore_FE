import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Cart = () => {
    // const [cartItems, setCartItems] = useState([]);
    const [cartItems, setCartItems] = useState('');
    const token = localStorage.getItem('token');
    console.log('token', token)
    // get all book in cart 
    const fetchCart = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/cart`, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json; charset=UTF-8',
                    'Authorization': `${token}`,
                },
              });
        
              console.log('data', response.data.books)
            // setCartItems(response.data.books[0].book); 
            setCartItems(response.data.books)
            // console.log(cartItems[1].book._id)
            

        } catch (error) {
            console.log('Lỗi khi lấy thông tin giỏ hàng:', error);
        }
    };
    
    useEffect(() => {
        fetchCart(); 
    }, []); 

    return (
        <div className="bg-white shadow-md rounded-lg p-4">
            <h2 className="text-xl font-bold mb-4">Giỏ hàng của bạn</h2>
            {cartItems.length === 0 ? (
                <p className='text-gray-600'>Giỏ hàng của bạn đang trống.</p>
            ) : (
                <ul className="divide-y divide-gray-200 justify-between"> 
                     {cartItems.map((item) => (
                        <li key={item.book._id} className="py-4 flex  items-center">
                        <img
                            src={item.book.imageURL}
                            alt={item.book.bookTitle}
                            className="w-16 h-20 object-cover mr-4"
                        />
                        <div>
                            <h3 className="text-lg font-semibold">{item.book.bookTitle}</h3>
                            <p className="text-gray-600">Quantity: {item.quantity}</p>
                            <p className="text-gray-600">Price: {item.book.price}$</p>
                        </div>
                        </li>
                    ))}
                    {/* <img 
                        src={cartItems.imageURL}  
                        alt={cartItems.bookTitle}
                        className="w-16 h-20 object-cover mr-4"
                    />
                    
                    <h3 className="text-lg font-semibold">{cartItems.bookTitle}</h3>
                    <p className='text-gray-600'>{cartItems.quantity}</p>
                    <p className='text-gray-600'>{cartItems.price}$</p> */}
                </ul>
            )}
        </div>
    );
};

export default Cart;

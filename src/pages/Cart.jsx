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
        
              const data = response;
              console.log('data', response.data.books)
            setCartItems(response.data.books[0].book); 
            console.log(cartItems)
        } catch (error) {
            console.log('Lỗi khi lấy thông tin giỏ hàng:', error);
        }
    };
    
    useEffect(() => {
        fetchCart(); 
    }, []); 

    return (
        <div>
            <h2>Giỏ hàng của bạn</h2>
            {cartItems.length === 0 ? (
                <p>Giỏ hàng của bạn đang trống.</p>
            ) : (
                <ul>
                    <div>{cartItems.bookTitle}</div>
                    <div>{cartItems.quantity}</div>
                    <div>{cartItems.price}</div>
                    {/* {cartItems.map((item, index) => (
                        <li key={index}>
                            <div>
                                <span>{cartItems.bookTitle}</span>
                                <span>Số lượng: {cartItems.quantity}</span>
                                <span>Giá: ${cartItems.price}</span>
                            </div>
                        </li>
                    ))} */}
                </ul>
            )}
        </div>
    );
};

export default Cart;

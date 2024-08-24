import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Cart = () => {
    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        // Fetch cart items from an API (example)
        axios.get('/api/cart')
            .then(response => {
                setCartItems(response.data);
            })
            .catch(error => {
                console.error('Error fetching cart items:', error);
            });
    }, []); // Empty dependency array to run effect only once

    const calculateSubtotal = () => {
        return cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    };

    const calculateTotal = () => {
        // Example: Calculate total with taxes
        const subtotal = calculateSubtotal();
        const taxRate = 0.1; // 10% tax rate (example)
        const total = subtotal * (1 + taxRate);
        return total.toFixed(2); // Format to 2 decimal places
    };

    const handleCheckout = () => {
        // Placeholder for handling checkout process (e.g., redirect to payment gateway)
        console.log('Checkout button clicked');
    };

    return (
        <div>
            <h2>Shopping Cart</h2>
            <div>
                {/* Display cart items */}
                {cartItems.map(item => (
                    <div key={item.id}>
                        <p>{item.name}</p>
                        <p>Quantity: {item.quantity}</p>
                        <p>Price: ${item.price}</p>
                    </div>
                ))}
            </div>
            <div>
                <p>Subtotal: ${calculateSubtotal().toFixed(2)}</p>
                <p>Taxes (10%): ${(calculateSubtotal() * 0.1).toFixed(2)}</p>
                <p>Total: ${calculateTotal()}</p>
            </div>
            <button onClick={handleCheckout}>Checkout</button>
        </div>
    );
};

export default Cart;

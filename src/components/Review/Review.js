import React, { useEffect } from 'react';
import { useState } from 'react';
import { getDatabaseCart, processOrder, removeFromDatabaseCart } from '../../utilities/databaseManager';
import ReviewItem from '../ReviewItem/ReviewItem';
import Cart from '../Cart/Cart';
import gifImage from '../../images/giphy.gif';
import {useNavigate} from 'react-router-dom';

const Review = () => {
    const [cart,setCart]=useState([]);
    const [orderPlaced,setOrderPlaced]=useState(false);
    const navigate = useNavigate();

    const handleProceedCheckout=()=>{
        navigate('/shipment');

    }
    const removeProduct=(productKey)=>{
        const newCart=cart.filter(pd=>pd.key !== productKey);
        setCart(newCart);
        removeFromDatabaseCart(productKey)
    }
    useEffect(()=>{
        //cart
        const savedCart=getDatabaseCart();
        const productKeys=Object.keys(savedCart);

        fetch('https://arcane-sierra-36117.herokuapp.com/productsByKeys',{
            method: 'POST',
            headers:{'Content-Type':'application/json'},
            body: JSON.stringify(productKeys)
        })
        .then(res=>res.json())
        .then(data=>setCart(data))
    },[])
    let thankYou;
    if(orderPlaced){
       thankYou= <img src={gifImage} alt="" />
    }
    return (
        <div className='two-container'>
            <div className="product-container">
            {
                cart.map(pd=><ReviewItem
                    removeProduct={removeProduct}
                    key={pd.key}
                    product={pd}></ReviewItem>)
            }
            {thankYou}
            </div>
            <div className="cart-container">
                <Cart cart={cart}>
                    <button onClick={handleProceedCheckout} className='main-button'>Proceed Checkout</button>
                </Cart>
            </div>
        </div>
    );
};

export default Review;
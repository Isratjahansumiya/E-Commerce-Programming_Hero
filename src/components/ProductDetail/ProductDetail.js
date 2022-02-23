import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Product from '../Product/Product';

const ProductDetail = () => {
    const {productKey}=useParams();
    const [product,setProduct]=useState({});
    useEffect(()=>{
        fetch('https://arcane-sierra-36117.herokuapp.com/product/'+productKey)
        .then(res=>res.json())
        .then(data=>setProduct(data))

    },[productKey])
    return (
        <div>
            <h2>Your product details</h2>
            <Product showAdToCard={false} product={product}></Product>
        </div>
    );
};

export default ProductDetail;
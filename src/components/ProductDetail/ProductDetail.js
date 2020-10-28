import React, { useState } from 'react';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Product from '../Product/Product';

const ProductDetail = () => {
    const [product,setProduct] = useState({})
    const{productkey} = useParams();
    useEffect(() => {
        fetch(`https://young-mesa-39085.herokuapp.com/singleProduct/`+productkey)
        .then(res=>res.json())
        .then(data=>setProduct(data))

    },[productkey])
    // const product = fakeData.find(pd=> pd.key === productkey)
    return (
        <div>
            <h1>Your Product Detail</h1>
            <Product  showAddToCart={false} product={product}></Product>
        </div>
    );
};

export default ProductDetail;
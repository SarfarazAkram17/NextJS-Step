import React from 'react';

const ProductDetails = async ({params}) => {
    const {id}= await params;
    
    return (
        <div>
            productDetails of {id}
        </div>
    );
};

export default ProductDetails;
import React from 'react'; 

import { useDispatch, useSelector } from 'react-redux'; 

import { Link } from 'react-router-dom'; 

import { addProduct, removeProduct } from '../features/productSlice'; 

 

function Products() { 

  const dispatch = useDispatch(); 

  const productList = useSelector((state) => state.products); 

 

  const handleAddProduct = () => { 

    dispatch(addProduct({ id: 6, name: 'Product 6', price: '$60', description: 'This is the sixth product.' })); 

  }; 

 

  const handleRemoveProduct = (id) => { 

    dispatch(removeProduct(id)); 

  }; 

 

  return ( 

    <div> 

      <h2>Product List</h2> 

      <ul> 

        {productList.map(product => ( 

          <li key={product.id}> 

            <Link to={`/product/${product.id}`}> 

              {product.name} - {product.price} 

            </Link> 

            <button onClick={() => handleRemoveProduct(product.id)}>Remove</button> 

          </li> 

        ))} 

      </ul> 

      <button onClick={handleAddProduct}>Add Product</button> 

    </div> 

  ); 

} 

 

export default Products; 
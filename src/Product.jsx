import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { addProduct, removeProduct } from '../features/productSlice';

function Products() {
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.products);

  // State สำหรับจัดการ input form
  const [newProduct, setNewProduct] = useState({
    id: '',
    name: '',
    price: '',
    description: ''
  });

  // ฟังก์ชันสำหรับ handle การเปลี่ยนแปลงในฟอร์ม
  const handleChange = (e) => {
    setNewProduct({
      ...newProduct,
      [e.target.name]: e.target.value,
    });
  };

  // ฟังก์ชันเมื่อผู้ใช้กดเพิ่มสินค้า
  const handleAddProduct = (e) => {
    e.preventDefault();
    if (newProduct.name && newProduct.price && newProduct.description) {
      dispatch(addProduct({ 
        id: productList.length + 1,  // คำนวณ id จากจำนวนสินค้า
        ...newProduct
      }));
      // Reset ค่าในฟอร์ม
      setNewProduct({ id: '', name: '', price: '', description: '' });
    }
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

      {/* Form สำหรับเพิ่มสินค้า */}
      <h3>Add New Product</h3>
      <form onSubmit={handleAddProduct}>
        <input 
          type="text" 
          name="name" 
          placeholder="Product Name" 
          value={newProduct.name} 
          onChange={handleChange}
          required
        />
        <input 
          type="text" 
          name="price" 
          placeholder="Product Price" 
          value={newProduct.price} 
          onChange={handleChange}
          required
        />
        <input 
          type="text" 
          name="description" 
          placeholder="Product Description" 
          value={newProduct.description} 
          onChange={handleChange}
          required
        />
        <button type="submit">Add Product</button>
      </form>
    </div>
  );
}

export default Products;

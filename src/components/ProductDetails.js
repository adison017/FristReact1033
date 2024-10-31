import React, { useEffect, useState } from 'react';
import { getProductById } from '../services/ApiService'; // แก้ไข path ตามจริง

const ProductDetails = ({ match }) => {
  const [product, setProduct] = useState(null);
  const productId = match.params.id;

  useEffect(() => {
    getProductById(productId)
      .then(data => {
        setProduct(data);
      })
      .catch(error => {
        console.error('Error fetching product details', error);
      });
  }, [productId]);

  if (!product) return <div>Loading...</div>;

  return (
    <div>
      <h2>{product.name}</h2>
      <p>{product.description}</p>
      <p>Price: ${product.price}</p>
      {/* เพิ่มปุ่มสำหรับการเพิ่มสินค้าลงตะกร้า */}
      <button>Add to Cart</button>
    </div>
  );
};

export default ProductDetails;

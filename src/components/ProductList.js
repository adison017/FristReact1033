import React, { useEffect, useState } from 'react';
import { getProducts } from '../services/ApiService';
import { useCart } from '../CartContext';
import { motion } from 'framer-motion';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const { addToCart } = useCart();

  useEffect(() => {
    getProducts()
      .then((data) => {
        setProducts(data);
      })
      .catch((error) => {
        console.error('Error fetching products', error);
      });
  }, []);

  const getImageUrl = (category) => {
    if (category === 'Food') {
      return 'https://images.pexels.com/photos/205961/pexels-photo-205961.jpeg?auto=compress&cs=tinysrgb&w=600';
    } else if (category === 'Drink') {
      return 'https://images.pexels.com/photos/2789328/pexels-photo-2789328.jpeg?auto=compress&cs=tinysrgb&w=600';
    } else if (category === 'Electronic') {
      return 'https://images.pexels.com/photos/356056/pexels-photo-356056.jpeg?auto=compress&cs=tinysrgb&w=600';
    } else if (category === 'Fashion') {
      return 'https://images.pexels.com/photos/322207/pexels-photo-322207.jpeg?auto=compress&cs=tinysrgb&w=600';
    } else {
      return 'https://images.pexels.com/photos/70862/pexels-photo-70862.jpeg?auto=compress&cs=tinysrgb&w=600';
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4 max-w-screen-lg">
        {products.map((product) => (
          <motion.div
            key={product.id}
            className="card w-full bg-base-100 shadow-xl transition-transform duration-300 transform hover:scale-105" // เพิ่ม transition และ hover effect
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <figure>
              <img src={getImageUrl(product.category)} alt={product.name} />
            </figure>
            <div className="card-body">
              <h2 className="card-title">{product.name}</h2>
              <p>{product.description}</p>
              <p className="font-bold">{`Price: ฿${product.price}`}</p>
              <p className="text-sm text-gray-500">{`Category: ${product.category}`}</p>
              <div className="card-actions justify-end">
                <button className="btn btn-primary" onClick={() => addToCart(product)}>เพิ่มลงตะกร้า</button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;

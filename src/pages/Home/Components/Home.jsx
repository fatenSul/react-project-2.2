import React, { useEffect, useState } from 'react';
import './Home.css'; 

export default function Home() {
  const [categories, setCategories] = useState([]);

  const getProducts = async () => {
    const response = await fetch(`https://ecommerce-node4.vercel.app/categories/active?page=1&limit=10`);
    const data = await response.json();
    setCategories(data.categories);
    console.log(data.categories);
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <>
      <div>
        {categories.map((category) => (
          <div className='category' key={category._id}>
            <p>{category.name}</p>
            <img src={category.image.secure_url} alt="" />
          </div>
        ))}
      </div>
    </>
  );
}
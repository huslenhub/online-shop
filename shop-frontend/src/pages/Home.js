// src/pages/Home.js
import React from 'react';
import ProductList from '../components/ProductList';

const Home = () => {
  const sampleProducts = Array.from({ length: 12 }, (_, index) => ({
    id: index + 1,
    name: `Product ${index + 1}`,
    category: `Category ${((index % 5) + 1)}`,
    price: (Math.random() * 100).toFixed(2),
  }));

  return (
    <div style={styles.container}>
      <h1>Online Shop</h1>
      <div>
        <ProductList products={sampleProducts} />
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: '20px',
  },
};

export default Home;

// src/components/ProductList.js
import React from 'react';
import { Link } from 'react-router-dom'; // Link 임포트 추가
import { useNavigate } from 'react-router-dom';

const ProductList = ({ products , addToCart }) => {
  const categories = [...new Set(products.map((product) => product.category))];

  const navigate = useNavigate(); // 네비게이션을 위한 useNavigate 훅 사용

  const handleBuyNow = (product) => {
    // 제품 상세 페이지로 이동
    navigate(`/product/${product.id}`);
  };

  return (
    <div>
      {categories.map((category) => (
        <div key={category} style={styles.category}>
          <h2>{category}</h2>
          <div style={styles.productContainer}>
            {products
              .filter((product) => product.category === category)
              .map((product) => (
                <div key={product.id} style={styles.product}>
                  <p>{product.name}</p>
                  <p>${product.price}</p>
                  <Link to={`/product/${product.id}`} style={styles.link}>
                    View Details
                  </Link> {/* 상세보기 버튼 추가 */}
                  <button onClick={() => addToCart(product)}>장바구니에 추가</button>
                  <button onClick={() => handleBuyNow(product)}>바로 구매</button>
                </div>
              ))}
          </div>
        </div>
      ))}
    </div>
  );
};

const styles = {
  category: {
    marginBottom: '30px',
  },
  productContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '10px',
  },
  product: {
    border: '1px solid #ccc',
    padding: '10px',
    width: 'calc(25% - 10px)',
    textAlign: 'center',
  },
  link: {
    color: '#007bff',
    textDecoration: 'none',
  },
};

export default ProductList;

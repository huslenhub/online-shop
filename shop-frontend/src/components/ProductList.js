// src/components/ProductList.js
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const ProductList = ({ products, addToCart }) => {
  const categories = [...new Set(products.map((product) => product.category))];

  const navigate = useNavigate();

  const handleBuyNow = (product) => {
    navigate(`/product/${product.id}`);
  };

  return (
    <div>
      {categories.length === 0 ? (
        <p>등록된 상품이 없습니다.</p>
      ) : (
        categories.map((category) => (
          <div key={category} style={styles.category}>
            <h2>{category}</h2>
            <div style={styles.productContainer}>
              {products
                .filter((product) => product.category === category)
                .map((product) => (
                  <div
                    key={product.id}
                    style={styles.product}
                  >
                    <Link to={`/product/${product.id}`} style={styles.productLink}>
                      <p>{product.name}</p>
                      <p>${product.price}</p>
                    </Link>
                    <button
                      onClick={() => addToCart(product)}
                      style={styles.button}
                    >
                      장바구니에 추가
                    </button>
                    <button
                      onClick={() => handleBuyNow(product)}
                      style={styles.button}
                    >
                      바로 구매
                    </button>
                  </div>
                ))}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

const styles = {
  category: {
    marginBottom: '20px',
  },
  productContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '15px',
  },
  product: {
    width: '200px',
    border: '1px solid #ccc',
    padding: '10px',
    textAlign: 'center',
    cursor: 'pointer', // 상품이 클릭 가능함을 나타냄
  },
  productLink: {
    textDecoration: 'none',
    color: 'black', // 링크 텍스트 스타일 지정
    display: 'block', // 링크 영역을 전체 상품에 걸치도록
    marginBottom: '10px', // 상품명/가격과 버튼 사이에 여백 추가
  },
  button: {
    marginTop: '10px',
    padding: '8px 16px',
    border: 'none',
    backgroundColor: '#F2AF38',
    color: 'black',
    borderRadius: '25px',
    cursor: 'pointer',
    marginRight: '10px',
  },
};

export default ProductList;
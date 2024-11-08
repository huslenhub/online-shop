// src/pages/ProductDetail.js
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const ProductDetail = ({ addToCart }) => {
    const navigate = useNavigate();
  const { id } = useParams(); // URL에서 제품 ID 가져오기
  const [product, setProduct] = useState(null);

  
  const handleBuyNow = () => {
    // 구매 처리 로직 추가 (장바구니에 추가 후 결제 페이지로 이동 등)
    addToCart(product); // 장바구니에 추가
    navigate('/cart'); // 장바구니 페이지로 이동
  };
  useEffect(() => {
    // 예시: 서버나 데이터베이스에서 제품 정보를 가져오는 로직
    const fetchProduct = async () => {
      const sampleProductData = {
        id: id,
        name: `Product ${id}`,
        description: `This is the detailed description for Product ${id}.`,
        price: (Math.random() * 100).toFixed(2),
        imageUrl: `https://via.placeholder.com/300?text=Product+${id}`,
      };
      setProduct(sampleProductData);
    };
    fetchProduct();
  }, [id]);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div style={styles.container}>
      <img src={product.imageUrl} alt={product.name} style={styles.image} />
      <h2>{product.name}</h2>
      <p>{product.description}</p>
      <p style={styles.price}>${product.price}</p>
        <div style={styles.buttonContainer}>
          <button style={styles.button} onClick={() => addToCart(product)}>Add to Cart</button>
          <button style={styles.button} onClick={handleBuyNow}>구매</button>
        </div>
      </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
  },
  image: {
    width: '300px',
    height: '300px',
    marginBottom: '20px',
  },
  price: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    margin: '10px 0',
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
  buttonContainer: {
    display: 'flex',          // 버튼들을 나란히 배치
    justifyContent: 'center', // 가운데 정렬
    gap: '10px',              // 버튼들 사이에 10px 공백 추가
  },
};

export default ProductDetail;

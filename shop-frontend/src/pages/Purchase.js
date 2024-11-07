// src/pages/Purchase.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Purchase = ({ cart }) => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');  // 전화번호 상태 추가
  const [error, setError] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    // 모든 필드가 채워져 있는지 확인
    if (!name || !address || !phone) {
      setError('모든 필드를 입력해 주세요.');
      return;
    }

    // 주문 번호 생성
    const orderNumber = Date.now(); // 간단히 현재 시간으로 주문 번호 생성
    const orderDetails = {
      orderNumber,
      cart,
      name,
      address,
      phone,
      totalPrice: calculateTotal(),
    };

    // 주문 완료 후 주문 완료 페이지로 이동
    navigate('/order-complete', { state: orderDetails });
  };

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
  };

  return (
    <div style={styles.container}>
      <h2>구매 정보</h2>
      {cart.length === 0 ? (
        <p>장바구니가 비어 있습니다.</p>
      ) : (
        <div style={styles.cartDetails}>
          <h3>장바구니</h3>
          <div>
            {cart.map((item, index) => (
              <div key={index} style={styles.cartItem}>
                <img src={item.imageUrl} alt={item.name} style={styles.image} />
                <div style={styles.itemDetails}>
                  <p>{item.name}</p>
                  <p>${item.price} x {item.quantity}</p>
                </div>
              </div>
            ))}
          </div>
          <p style={styles.total}>총 가격: ${calculateTotal()}</p>
        </div>
      )}

      <h3>배송지 및 결제 정보</h3>
      <form onSubmit={handleSubmit} style={styles.form}>
        {error && <p style={styles.error}>{error}</p>}

        <label>
          이름:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={styles.input}
            required
          />
        </label>

        <label>
          배송지:
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            style={styles.input}
            required
          />
        </label>

        <label>
          전화번호:
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            style={styles.input}
            required
          />
        </label>

        <button type="submit" style={styles.submitButton}>주문하기</button>
      </form>
    </div>
  );
};

const styles = {
  container: {
    padding: '20px',
    maxWidth: '600px',
    margin: '0 auto',
  },
  cartDetails: {
    marginBottom: '20px',
  },
  cartItem: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '10px',
    borderBottom: '1px solid #ccc',
    paddingBottom: '10px',
  },
  image: {
    width: '50px',
    height: '50px',
    marginRight: '10px',
  },
  itemDetails: {
    display: 'flex',
    flexDirection: 'column',
  },
  total: {
    fontWeight: 'bold',
    marginTop: '10px',
    fontSize: '1.2rem',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: '20px',
  },
  input: {
    padding: '10px',
    marginBottom: '15px',
    borderRadius: '5px',
    border: '1px solid #ccc',
  },
  submitButton: {
    padding: '10px 20px',
    backgroundColor: '#F2AF38',
    border: 'none',
    color: 'black',
    borderRadius: '25px',
    cursor: 'pointer',
  },
  error: {
    color: 'red',
    marginBottom: '10px',
  },
};

export default Purchase;

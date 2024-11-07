// src/pages/OrderComplete.js
import React from 'react';
import { useLocation } from 'react-router-dom';

const OrderComplete = () => {
  const location = useLocation();
  const { orderNumber, cart, totalPrice } = location.state || {};

  return (
    <div style={styles.container}>
      <div style={styles.orderDetails}>
        <h2>주문 완료</h2>
        {cart && cart.length > 0 ? (
          <div style={styles.cartItems}>
            {cart.map((item, index) => (
              <div key={index} style={styles.cartItem}>
                <img src={item.imageUrl} alt={item.name} style={styles.image} />
                <div>
                  <p>{item.name}</p>
                  <p>${item.price} x {item.quantity}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p>주문 내역이 없습니다.</p>
        )}
      </div>

      <div style={styles.orderInfo}>
        <h3>주문 정보</h3>
        <p>주문 번호: {orderNumber}</p>
        <p>총 가격: ${totalPrice}</p>
        <p>입금 계좌: 123-456789-00 (은행명)</p>
        <p>입금 시 <strong>{orderNumber}</strong> 을(를) 입금 내용으로 기재해 주세요.</p>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '20px',
  },
  orderDetails: {
    flex: '2',
    marginRight: '20px',
  },
  cartItems: {
    borderTop: '1px solid #ccc',
    paddingTop: '10px',
  },
  cartItem: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '15px',
    borderBottom: '1px solid #ccc',
    paddingBottom: '10px',
  },
  image: {
    width: '50px',
    height: '50px',
    marginRight: '15px',
  },
  orderInfo: {
    flex: '1',
    padding: '20px',
    backgroundColor: '#f9f9f9',
    border: '1px solid #ddd',
    borderRadius: '10px',
    position: 'sticky',
    top: '20px',
    height: 'fit-content',
  },
};

export default OrderComplete;

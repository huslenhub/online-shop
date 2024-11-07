import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Cart = ({ cart, setCart }) => {
  const navigate = useNavigate(); // useNavigate 훅을 사용하여 페이지 이동

  const handleIncreaseQuantity = (index) => {
    const newCart = [...cart];
    newCart[index].quantity += 1; // 수량 증가
    setCart(newCart); // 상태 업데이트
  };

  const handleDecreaseQuantity = (index) => {
    const newCart = [...cart];
    if (newCart[index].quantity > 1) {
      newCart[index].quantity -= 1; // 수량 감소
    }
    setCart(newCart); // 상태 업데이트
  };

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
  };

  const calculateTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  const handlePurchase = () => {
    // 구매 버튼 클릭 시 purchase 페이지로 이동
    navigate('/purchase'); // 구매 페이지로 이동
  };

  return (
    <div style={styles.cartContainer}>
      <div style={styles.cartItemsContainer}>
        <h2>Your Cart</h2>
        {cart.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <div>
            {cart.map((item, index) => (
              <div key={index} style={styles.cartItem}>
                <img src={item.imageUrl} alt={item.name} style={styles.image} />
                <div style={styles.itemDetails}>
                  <p style={styles.itemName}>{item.name}</p>
                  <p style={styles.itemPrice}>${item.price}</p>
                  <div style={styles.quantityContainer}>
                    <button 
                      style={styles.quantityButton} 
                      onClick={() => handleDecreaseQuantity(index)}>-</button>
                    <span style={styles.quantity}>{item.quantity}</span>
                    <button 
                      style={styles.quantityButton} 
                      onClick={() => handleIncreaseQuantity(index)}>+</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div style={styles.fixedFooter}>
        <div style={styles.total}>
          <p>Total Items: {calculateTotalItems()}</p>
          <p>Total Price: ${calculateTotal()}</p>
        </div>
        <button style={styles.button} onClick={handlePurchase}>구매</button> {/* 구매 버튼 클릭 시 페이지 이동 */}
      </div>
    </div>
  );
};

const styles = {
  cartContainer: {
    display: 'flex',
    flexDirection: 'column',
    height: '100vh', // 전체 화면을 차지하도록 설정
  },
  cartItemsContainer: {
    flex: 1, // 남은 공간을 채우도록 설정
    padding: '20px',
    overflowY: 'auto', // 내용이 넘치면 스크롤 가능하도록 설정
  },
  cartItem: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '15px',
    borderBottom: '1px solid #ccc',
    paddingBottom: '10px',
  },
  itemDetails: {
    display: 'flex',
    flexDirection: 'column',
    marginLeft: '15px',
  },
  itemName: {
    fontWeight: 'bold',
    color: 'black',  // 노란색
  },
  itemPrice: {
    color: 'black', // 노란색
    fontSize: '1rem',
  },
  quantityContainer: {
    display: 'flex',
    alignItems: 'center',
    marginTop: '5px',
  },
  quantityButton: {
    padding: '5px 10px',
    margin: '0 5px',
    borderRadius: '5px',
    backgroundColor: '#F2AF38',
    border: 'none',
    cursor: 'pointer',
    color: 'black',
  },
  quantity: {
    fontSize: '1rem',
    margin: '0 5px',
    color: 'black',  // 노란색
  },
  total: {
    marginTop: '20px',
    fontWeight: 'bold',
    color: 'black',  // 노란색
  },
  button: {
    marginTop: '20px',
    padding: '10px 20px',
    border: 'none',
    backgroundColor: '#F2AF38',
    color: 'black',
    borderRadius: '25px',
    cursor: 'pointer',
    width: '100%',
  },
  image: {
    width: '70px',
    height: '70px',
    marginRight: '15px',
  },
  fixedFooter: {
    position: 'fixed',
    bottom: '0',
    width: '100%',
    backgroundColor: '#F6D394',
    padding: '10px 20px',
    boxShadow: '0 -2px 5px rgba(0, 0, 0, 0.1)',
    display: 'flex',
    flexDirection: 'column', // 세로로 배치
    alignItems: 'center',
    zIndex: '10',
  },
};

export default Cart;

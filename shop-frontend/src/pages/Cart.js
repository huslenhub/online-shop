// src/pages/Cart.js
import React from 'react';

const Cart = ({ cart }) => {
    const handlePurchase = () => {
        // 구매 처리 로직 추가
        console.log('구매 진행:', cart);
        // 여기서 결제 처리 로직 등을 추가할 수 있습니다.
      };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Your Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          {cart.map((item, index) => (
            <div key={index} style={styles.cartItem}>
              <img src={item.imageUrl} alt={item.name} style={styles.image} />
              <div>
                <p>{item.name}</p>
                <p>${item.price}</p>
              </div>
            </div>
          ))}
           <button onClick={handlePurchase}>구매</button>
        </div>
      )}
    </div>
  );
};

const styles = {
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
};

export default Cart;

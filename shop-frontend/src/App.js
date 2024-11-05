// src/App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import AdminDashboard from './pages/AdminDashboard';
import ProtectedComponent from './components/ProtectedComponent';

const App = () => {
  const [cart, setCart] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [user, setUser] = useState(null); // 사용자 상태 추가

  const addToCart = (product) => {
    setCart((prevCart) => [...prevCart, product]);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    console.log('Search term:', searchTerm);
  };

  const handleLogin = (userData) => {
    setUser(userData); // 로그인 시 사용자 상태 업데이트
  };

  const handleLogout = () => {
    setUser(null); // 로그아웃 시 사용자 상태 초기화
    localStorage.removeItem('token'); // 로컬 저장소에서 토큰 삭제
  };

  return (
    <Router>
      <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px' }}>
        <Link to="/">Home</Link>
        <form onSubmit={handleSearchSubmit} style={{ flex: 1, display: 'flex', justifyContent: 'center', margin: '0 10px' }}>
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={handleSearchChange}
            style={{ width: '200%', padding: '5px', maxWidth: '400px' }}
          />
        </form>
        <div>
          <Link to="/cart" style={{ marginRight: '10px' }}>Cart ({cart.length})</Link>
          {user ? (
            <>
              <span>Welcome, {user.email}</span>
              <button onClick={handleLogout} style={{ marginLeft: '10px' }}>Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" style={{ marginRight: '10px' }}>Login</Link>
              <Link to="/signup">Sign Up</Link>
            </>
          )}
        </div>
      </div>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login onLogin={handleLogin} />} /> {/* 로그인 콜백 전달 */}
        <Route path="/signup" element={<Signup />} />
        <Route path="/product/:id" element={<ProductDetail addToCart={addToCart} />} />
        <Route path="/cart" element={<Cart cart={cart} />} />
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
    </Router>
  );
};

export default App;

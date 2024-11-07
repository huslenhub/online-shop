import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ProductDetail from './pages/ProductDetail';
import ProductList from './components/ProductList';
import Cart from './pages/Cart';
import AdminDashboard from './pages/AdminDashboard';
import logo from './assets/logo.png'; // 로고 이미지 import
import Purchase from './pages/Purchase';
import OrderComplete from './pages/OrderComplete';
import MyPage from './pages/Mypage'; // My Page 컴포넌트 추가
import './App.css';

const App = () => {
  const [cart, setCart] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem('user'));
    if (savedUser) setUser(savedUser);
  }, []);

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
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData)); // 로그인 시 사용자 정보 저장
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  };

  return (
    <Router>
      <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px', alignItems: 'center' }}>
      {/* 로고 이미지에 홈 링크 추가 */}
      <Link to="/" style={{ display: 'flex', alignItems: 'center' }}>
          <img src={logo} alt="Logo" style={{ width: '250px', height: '250px' }} />
        </Link>
        
        <form onSubmit={handleSearchSubmit} style={{ flex: 1, display: 'flex', justifyContent: 'center', margin: '0 10px' }}>
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="search-input" // 클래스 적용
          />
        </form>
        
        
        <div>
        <Link to="/cart" className="cart-button">Cart ({cart.length})</Link>
          {user ? (
            <>
              <span>Welcome, {user.email}</span>
              <Link to="/mypage" >
            My Page
          </Link>
              <button onClick={handleLogout} style={{ marginLeft: '10px' }}>Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className="auth-button">Login</Link>
              <Link to="/signup" className="auth-button">Sign Up</Link>
            </>
          )}
        </div>

      </div>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/product/:id" element={<ProductDetail addToCart={addToCart} />} />
        <Route path="/cart" element={<Cart cart={cart} />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/mypage" element={<MyPage />} /> {/* My Page 경로 추가 */}
      </Routes>
    </Router>
  );
};

export default App;

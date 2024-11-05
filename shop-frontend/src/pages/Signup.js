// src/pages/Signup.js
import React, { useState } from 'react';

const Signup = ({ onLogin }) => {
  const [username, setUsername] = useState(''); // 이메일 대신 사용자명으로 변경
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSignup = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage('Passwords do not match');
      return;
    }

    try {
      const response = await fetch('http://localhost:3000/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }), // 아이디로 변경
      });

      const data = await response.json();

      if (response.ok) {
        // 회원가입 성공 후 바로 로그인 요청
        const loginResponse = await fetch('http://localhost:3000/auth/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ username, password }), // 아이디로 변경
        });

        const loginData = await loginResponse.json();
        if (loginResponse.ok) {
          localStorage.setItem('token', loginData.token); // 토큰 저장
          onLogin({ username }); // 부모 컴포넌트에 사용자 정보 전달
          setMessage('회원가입 및 로그인 성공!');
        } else {
          setMessage(loginData.message);
        }
      } else {
        setMessage(data.message);
      }
    } catch (error) {
      console.error('회원가입 실패:', error);
      setMessage('서버 오류가 발생했습니다.');
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Sign Up</h2>
      <form onSubmit={handleSignup}>
        <div>
          <label>Username:</label> {/* 이메일 대신 사용자명으로 변경 */}
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <div>
          <label>Confirm Password:</label>
          <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
        </div>
        <button type="submit">Sign Up</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default Signup;

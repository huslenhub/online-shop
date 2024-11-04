// routes/auth.js
const express = require('express');
const router = express.Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');


// 회원가입 라우트
router.post('/register', async (req, res) => {
  const { username, password } = req.body;
  
  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: '이미 존재하는 사용자입니다.' });
    }

    const user = new User({ username, password });
    await user.save();

    res.status(201).json({ message: '회원가입이 완료되었습니다.' });
  } catch (error) {
    res.status(500).json({ message: '서버 오류가 발생했습니다.', error });
  }
});

router.post('/login', async (req, res) => {
    const { username, password } = req.body;
  
    try {
      const user = await User.findOne({ username });
      if (!user || !(await user.comparePassword(password))) {
        return res.status(400).json({ message: '사용자 이름 또는 비밀번호가 잘못되었습니다.' });
      }
  
      // JWT 토큰 발행
      const token = jwt.sign({ userId: user._id }, 'your_jwt_secret', { expiresIn: '1h' });
  
      res.json({ message: '로그인 성공', token });
    } catch (error) {
      res.status(500).json({ message: '서버 오류가 발생했습니다.', error });
    }
  });

module.exports = router;
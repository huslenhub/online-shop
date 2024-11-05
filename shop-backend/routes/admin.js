// routes/admin.js
const express = require('express');
const router = express.Router();
const adminMiddleware = require('../middlewares/admin');

router.get('/dashboard', adminMiddleware, (req, res) => {
  // 관리자 대시보드 내용
  res.json({ message: '관리자 대시보드에 오신 것을 환영합니다!' });
});

module.exports = router;

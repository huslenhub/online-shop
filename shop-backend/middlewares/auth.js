// middlewares/admin.js
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const adminMiddleware = async (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: '토큰이 필요합니다.' });
  }

  try {
    const decoded = jwt.verify(token, 'your_jwt_secret');
    const user = await User.findById(decoded.userId);
    if (!user || !user.isAdmin) {
      return res.status(403).json({ message: '관리자 권한이 필요합니다.' });
    }
    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ message: '유효하지 않은 토큰입니다.' });
  }
};

module.exports = adminMiddleware;

// index.js
require('dotenv').config(); // .env 파일 로드
const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/auth');
const cors = require('cors');
const authMiddleware = require('./middlewares/auth');

// 보호할 라우트 예시
app.use('/protected-route', authMiddleware, (req, res) => {
  res.json({ message: '이 데이터는 인증된 사용자만 볼 수 있습니다.' });
});

const app = express();
const PORT = 3000;

// CORS 미들웨어 설정
app.use(cors());

// MongoDB 연결
mongoose.connect('mongodb://127.0.0.1:27017/shopping-mall')
  .then(() => console.log('MongoDB에 연결되었습니다.'))
  .catch((error) => console.error('MongoDB 연결 실패:', error));


// 미들웨어 설정
app.use(express.json());

// 라우트 설정
app.use('/auth', authRoutes);

// 서버 시작
app.listen(PORT, () => {
  console.log(`서버가 http://localhost:${PORT} 에서 실행 중입니다.`);
});
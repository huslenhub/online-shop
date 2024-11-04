// index.js
const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/auth');
const cors = require('cors');

const app = express();
app.use(cors()); // CORS 미들웨어 추가

const PORT = 3000;

// MongoDB 연결
mongoose.connect('mongodb://localhost:27017/shopping-mall', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
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

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true, // 아이디는 고유해야 함
  },
  password: {
    type: String,
    required: true,
  },
  isAdmin: {
    type: Boolean,
    default: false, // 기본값은 false로 설정
  },
});

// 비밀번호 해싱 미들웨어
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next(); // 비밀번호가 수정되지 않은 경우 건너뜀
  this.password = await bcrypt.hash(this.password, 10); // 비밀번호 해싱
  next();
});

// 비밀번호 비교 메소드
userSchema.methods.comparePassword = function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

const User = mongoose.model('User', userSchema);
module.exports = User;

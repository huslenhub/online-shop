// models/User.js
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// 사용자 스키마 정의
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

// 비밀번호 암호화
userSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

// 비밀번호 비교 메서드
userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

module.exports = mongoose.model('User', userSchema);
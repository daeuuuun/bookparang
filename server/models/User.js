import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  userId: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  nickname: { type: String, required: true }, // 기본값은 회원가입 로직에서 설정
  profileImage: {
    type: String,
    default: "https://your-default-image-url.com/default-profile.png", // ✅ 기본 프로필
  },
  createdAt: { type: Date, default: Date.now },
});

// 개발 중 오류 방지용
export default mongoose.models.User || mongoose.model("User", userSchema);

import mongoose from "mongoose";
import bcrypt from "bcrypt";
import User from "./models/User.js";

const MONGO_URI = "mongodb://zoomedia.synology.me:27017/myapp_1g";

const createAdmin = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("✅ MongoDB 연결 성공");

    const existingAdmin = await User.findOne({ role: "admin" });
    if (existingAdmin) {
      console.log("⚠️ 관리자 계정이 이미 존재합니다:", existingAdmin.userId);
      return;
    }

    const hashedPassword = await bcrypt.hash("admin123!", 10); // ✅ 초기 비밀번호

    const adminUser = new User({
      username: "관리자",
      userId: "admin",
      password: hashedPassword,
      nickname: "관리자",
      role: "admin",
      profileImage: "https://your-default-image-url.com/admin-profile.png",
    });

    await adminUser.save();
    console.log("🎉 관리자 계정 생성 완료!");
    console.log("🪪 ID: admin / PW: admin123!");
  } catch (error) {
    console.error("❌ 관리자 생성 실패:", error.message);
  } finally {
    mongoose.connection.close();
  }
};

createAdmin();

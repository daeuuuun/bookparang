import mongoose from "mongoose";

const inquirySchema = new mongoose.Schema({
  userId: { type: String, required: true }, // 문의 작성자
  title: { type: String, required: true },
  content: { type: String, required: true },
  answer: { type: String }, // 관리자 답변
  status: { type: String, enum: ["pending", "answered"], default: "pending" },
  createdAt: { type: Date, default: Date.now },
  answeredAt: { type: Date },
});

export default mongoose.models.Inquiry || mongoose.model("Inquiry", inquirySchema);

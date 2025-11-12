import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
  isbn: { type: String, required: true },
  rating: { type: Number, required: true },
  comment: { type: String, required: true },
  user: {
    id: { type: String, required: true },        // ✅ 고유 userId
    nickname: { type: String, required: true },  // ✅ 표시용 닉네임
  },
  helpful: { type: Number, default: 0 },         // ✅ '좋아요(도움돼요)' 수
  likedBy: { type: [String], default: [] },      // ✅ 누가 눌렀는지 userId 저장 (중복 방지용)
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Review || mongoose.model("Review", reviewSchema);

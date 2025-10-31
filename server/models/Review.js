import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
  isbn: { type: String, required: true },
  rating: { type: Number, required: true },
  comment: { type: String, required: true },
  user: {
    id: { type: String, required: true },        // ✅ 고유 userId
    nickname: { type: String, required: true },  // ✅ 닉네임 (표시용)
  },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Review || mongoose.model("Review", reviewSchema);
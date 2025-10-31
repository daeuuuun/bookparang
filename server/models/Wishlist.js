import mongoose from "mongoose";

const wishlistSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    bookIsbn: { type: String, required: true }, // ✅ ISBN 기반
  },
  { timestamps: true }
);

// ✅ 중복 방지
wishlistSchema.index({ userId: 1, bookIsbn: 1 }, { unique: true });

export default mongoose.model("Wishlist", wishlistSchema);

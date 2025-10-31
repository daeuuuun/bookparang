import mongoose from "mongoose";

const cartSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    bookIsbn: { type: String, required: true },
    quantity: { type: Number, default: 1 },
  },
  { timestamps: true }
);

// ✅ 중복된 책 담기 방지
cartSchema.index({ userId: 1, bookIsbn: 1 }, { unique: true });

export default mongoose.model("Cart", cartSchema);

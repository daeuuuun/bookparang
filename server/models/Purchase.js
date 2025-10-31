import mongoose from "mongoose";

const purchaseSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    bookIsbn: { type: String, required: true },
    price: { type: Number, required: true },
    purchasedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

// 유저가 같은 책을 중복 결제하지 못하게
purchaseSchema.index({ userId: 1, bookIsbn: 1 }, { unique: true });

export default mongoose.model("Purchase", purchaseSchema);

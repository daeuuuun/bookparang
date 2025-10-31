import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String },
  listPrice: { type: Number },   // 📘 정가 (priceStandard)
  salePrice: { type: Number },   // 💸 판매가 (priceSales)
  discountRate: { type: Number }, // 📉 할인율 (옵션)
  category: { type: String },
  isbn: { type: String, unique: true },
  summary: { type: String },
  image: { type: String },
  rating: { type: Number },
});

export default mongoose.model("Book", bookSchema);

import mongoose from "mongoose";

const reportSchema = new mongoose.Schema({
  reviewId: { type: String, required: true },
  reporterId: { type: String, required: true },
  reason: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  resolved: { type: Boolean, default: false },
});

export default mongoose.models.Report || mongoose.model("Report", reportSchema);

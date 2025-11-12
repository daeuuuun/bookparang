import Report from "../models/Report.js";

export const createReport = async (req, res) => {
  const { reviewId, reason } = req.body;
  await Report.create({
    reviewId,
    reporterId: req.user.userId,
    reason,
  });
  res.status(201).json({ message: "신고가 접수되었습니다." });
};

export const getReports = async (req, res) => {
  const reports = await Report.find().sort({ createdAt: -1 });
  res.json(reports);
};

export const resolveReport = async (req, res) => {
  const { id } = req.params;
  const report = await Report.findByIdAndUpdate(id, { resolved: true }, { new: true });
  res.json(report);
};

import jwt from "jsonwebtoken";
import User from "../models/User.js";

export default async function adminAuth(req, res, next) {
  try {
    const token = req.cookies.token;
    if (!token) return res.status(401).json({ error: "관리자 인증 필요" });

    const decoded = jwt.verify(token, "mySecretKey");
    const user = await User.findById(decoded._id);

    if (!user || user.role !== "admin")
      return res.status(403).json({ error: "관리자 권한이 없습니다." });

    req.user = user;
    next();
  } catch {
    res.status(401).json({ error: "인증 실패" });
  }
}

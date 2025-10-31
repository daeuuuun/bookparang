import jwt from "jsonwebtoken";

export default function auth(req, res, next) {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ error: "로그인이 필요합니다." });
    }

    const decoded = jwt.verify(token, "mySecretKey");
    console.log("🟢 [auth.js] 디코딩된 토큰:", decoded); // 반드시 있어야 함

    req.user = decoded; // ✅ { _id, userId }
    next();
  } catch (err) {
    console.error("❌ auth 미들웨어 에러:", err);
    return res.status(401).json({ error: "토큰이 유효하지 않습니다." });
  }
}

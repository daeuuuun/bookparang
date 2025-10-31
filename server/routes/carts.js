import express from "express";
import Cart from "../models/Cart.js";
import Book from "../models/Book.js";
import auth from "../middlewares/auth.js";
import axios from "axios";

const router = express.Router();

/**
 * ✅ [POST] /api/cart/:isbn
 * 장바구니에 책 추가
 */
router.post("/:isbn", auth, async (req, res) => {
  const { isbn } = req.params;
  const userId = req.user._id;

  try {
    // 1️⃣ 이미 존재하는 장바구니 항목인지 확인
    const existing = await Cart.findOne({ userId, bookIsbn: isbn });
    if (existing) {
      return res.status(200).json({ message: "이미 장바구니에 있습니다." });
    }

    // 2️⃣ Book 컬렉션에 도서가 존재하는지 확인
    let book = await Book.findOne({ isbn });
    if (!book) {
      try {
        // 3️⃣ 도서 상세 API 호출
        const resBook = await axios.get(`http://localhost:4000/api/books/detail/${isbn}`);
        const data = resBook.data;

        // ✅ 4️⃣ Book 모델에 맞게 변환
        const newBook = {
          isbn: data.isbn ?? data.isbn13 ?? isbn, // isbn 필드 일치
          title: data.title || "제목 없음",
          author: data.author || "작자 미상",
          image: data.image || data.cover || "",
          salePrice: data.salePrice ?? data.price ?? 0,
          listPrice: data.listPrice ?? data.priceStandard ?? 0,
          discountRate: data.discountRate ?? null,
          summary: data.summary ?? "",
          category: data.categoryName ?? "",
          rating: data.rating ?? 0,
        };

        // 5️⃣ Book 컬렉션에 저장
        book = await Book.create(newBook);
        console.log("📘 Book 자동 저장:", newBook.title);
      } catch (err) {
        console.error("❌ Book 정보 불러오기 실패:", err);
      }
    }

    // 6️⃣ Cart 저장
    const cartItem = new Cart({ userId, bookIsbn: isbn });
    await cartItem.save();

    res.status(201).json({ message: "장바구니에 추가되었습니다.", cartItem });
  } catch (err) {
    console.error("❌ 장바구니 추가 실패:", err);
    res.status(500).json({ error: "장바구니 추가 실패" });
  }
});

/**
 * ✅ [DELETE] /api/cart/:isbn
 * 장바구니에서 책 제거
 */
router.delete("/:isbn", auth, async (req, res) => {
  const { isbn } = req.params;
  const userId = req.user._id;

  try {
    const deleted = await Cart.findOneAndDelete({ userId, bookIsbn: isbn });
    if (!deleted) {
      return res.status(404).json({ message: "장바구니에 존재하지 않습니다." });
    }

    res.json({ message: "장바구니에서 제거되었습니다." });
  } catch (err) {
    console.error("❌ 장바구니 제거 실패:", err);
    res.status(500).json({ error: "장바구니 제거 실패" });
  }
});

/**
 * ✅ [GET] /api/cart
 * 장바구니 목록 조회
 */
router.get("/", auth, async (req, res) => {
  const userId = req.user._id;

  try {
    const list = await Cart.find({ userId }).sort({ createdAt: -1 });
    const isbns = list.map((c) => c.bookIsbn);
    console.log("🧾 장바구니 ISBN 목록:", isbns);

    const books = await Book.find({
      isbn: { $in: isbns },
    }).select("isbn title author image salePrice");

    console.log("📚 조회된 Book 수:", books.length);
    console.log("📚 Book 목록:", books.map((b) => b.isbn));

    const merged = list.map((c) => ({
      bookIsbn: c.bookIsbn,
      quantity: c.quantity,
      book: books.find((b) => b.isbn === c.bookIsbn),
    }));

    res.json(merged);
  } catch (err) {
    console.error("❌ 장바구니 목록 불러오기 실패:", err);
    res.status(500).json({ error: "장바구니 목록 불러오기 실패" });
  }
});

export default router;

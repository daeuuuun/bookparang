import express from "express";
import {
  getAllBooks,
  getBestsellerBooks,
  getNewBooks,
  getBookCategories,
  getBookDetail,
  getAladinBookDetail,
} from "../controllers/bookController.js";

const router = express.Router();

// 🔹 베스트셀러 (카테고리 선택 시 ?category=123 형태로 필터링)
router.get("/bestseller", getBestsellerBooks);

// 🔹 신간 (카테고리 선택 시 ?category=123 형태로 필터링)
router.get("/new", getNewBooks);

// 🔹 전체보기 (카테고리 선택 시 ?category=123 형태로 필터링)
router.get("/all", getAllBooks);

// 🔹 카테고리 목록
router.get("/categories", getBookCategories);

// 🔹 상세조회
router.get("/detail/:isbn", getBookDetail);

// 🔹 알라딘 상세조회
router.get("/aladin", getAladinBookDetail);

// 🔹 검색
router.get("/search", async (req, res) => {
  const { query } = req.query;

  if (!query || query.trim() === "") {
    return res.status(400).json({ message: "검색어를 입력해주세요." });
  }

  try {
    // ✅ 알라딘 API 호출
    const { data } = await axios.get("https://www.aladin.co.kr/ttb/api/ItemSearch.aspx", {
      params: {
        ttbkey: process.env.ALADIN_TTB_KEY,
        Query: query,
        QueryType: "Keyword",
        SearchTarget: "Book",
        Output: "JS",
        Version: "20131101",
        MaxResults: 20,
      },
    });

    if (!data?.item?.length) {
      return res.json([]);
    }

    const books = data.item.map((b) => ({
      id: b.isbn13,
      title: b.title,
      authors: b.author,
      thumbnail: b.cover,
      listPrice: b.priceStandard,
      salePrice: b.priceSales,
      publisher: b.publisher,
      pubDate: b.pubDate,
    }));

    res.json(books);
  } catch (err) {
    console.error("❌ 검색 API 실패:", err.message);
    res.status(500).json({ message: "검색 중 오류가 발생했습니다." });
  }
});

export default router;

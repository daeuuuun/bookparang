import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { fetchBooks } from "../services/bookService.js";
import axios from "axios";
import { categoryIdMap } from "../../src/data/categoryIdMap.js";

// 경로 설정
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ✅ 전체 eBook
export const getAllBooks = async (req, res) => {
  const { category, sort } = req.query;
  try {
    const books = await fetchBooks("ItemNewAll", category, sort);
    res.json(books);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch all ebooks" });
  }
};

// ✅ 베스트셀러
export const getBestsellerBooks = async (req, res) => {
  console.log("🔥 [API 호출됨] /api/books/bestseller");
  const { category, sort } = req.query;

  // ✅ 문자열 → 숫자형 ID 변환
  const categoryId = categoryIdMap[category] || "";

  console.log(`📚 요청 카테고리: ${category} → 변환된 ID: ${categoryId}`);

  try {
    const books = await fetchBooks("Bestseller", categoryId, sort);
    res.json(books);
  } catch (err) {
    console.error("❌ 베스트셀러 API 실패:", err.message);
    res.status(500).json({ message: "Failed to fetch bestseller ebooks" });
  }
};

// ✅ 신간
export const getNewBooks = async (req, res) => {
  console.log("🔥 [API 호출됨] /api/books/new");
  const { category, sort } = req.query;

  // ✅ 문자열 → 숫자형 ID 변환
  const categoryId = categoryIdMap[category] || "";

  try {
    const categoryId = category ? categoryIdMap[category] : undefined;
    const books = await fetchBooks("ItemNewSpecial", categoryId, sort);
    res.json(books);
  } catch (err) {
    console.error("❌ 신간 조회 실패:", err.message);
    res.status(500).json({ message: "Failed to fetch new ebooks" });
  }
};

// ✅ 카테고리
export const getBookCategories = async (req, res) => {
  try {
    const filePath = path.join(__dirname, "../data/ebookCategories.json");
    const rawData = fs.readFileSync(filePath, "utf-8");
    const ebookCategories = JSON.parse(rawData);

    const mapped = ebookCategories.map((c) => ({
      categoryId: c.id,
      categoryName: c.name,
      categoryPath: `eBook > ${c.name}`,
    }));

    res.json(mapped);
  } catch (err) {
    console.error("❌ 카테고리 조회 에러:", err.message);
    res.status(500).json({ message: "Failed to fetch book categories" });
  }
};

// ✅ 도서 상세 조회
export const getBookDetail = async (req, res) => {
  const { isbn } = req.params;

  try {
    // 1️⃣ 알라딘 API 호출
    const { data } = await axios.get("https://www.aladin.co.kr/ttb/api/ItemLookUp.aspx", {
      params: {
        ttbkey: process.env.ALADIN_TTB_KEY,
        ItemIdType: "ISBN", // ✅ ISBN13 대신 ISBN
        ItemId: isbn,
        Output: "JS",
        Version: "20131101",
        // SearchTarget: "eBook",  ❌ 제거 (없애야 조회 잘 됨)
        Cover: "Big",
      },
    });

    console.log("📗 Aladin API 응답:", data);

    if (!data?.item?.length) {
      return res.status(404).json({ message: "Book not found" });
    }

    const book = data.item[0];

    const mapped = {
      isbn: book.isbn13 || book.isbn, // ✅ 둘 다 대응
      title: book.title || "제목 없음",
      author: book.author || "작자 미상",
      publisher: book.publisher || "",
      listPrice: book.priceStandard || 0,
      salePrice: book.priceSales || 0,
      discountRate: book.priceStandard
        ? Math.round(((book.priceStandard - book.priceSales) / book.priceStandard) * 100)
        : 0,
      category: book.categoryName || "",
      summary: book.description || "",
      image: book.cover || "",
      rating: book.customerReviewRank || 0,
      pubDate: book.pubDate || "",
    };

    res.json(mapped);
  } catch (err) {
    console.error("❌ 도서 상세 조회 실패 (전체 로그):", err);
    if (err.response) {
      console.error("🔍 상태 코드:", err.response.status);
      console.error("🔍 응답 데이터:", err.response.data);
    }
    res.status(500).json({ message: "Failed to fetch book detail" });
  }
};
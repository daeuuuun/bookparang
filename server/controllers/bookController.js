import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { fetchBooks } from "../services/bookService.js";
import axios from "axios";

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
  try {
    const books = await fetchBooks("Bestseller", category, sort);
    res.json(books);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch bestseller ebooks" });
  }
};

// ✅ 신간
export const getNewBooks = async (req, res) => {
  const { category, sort } = req.query;
  try {
    const books = await fetchBooks("ItemNewSpecial", category, sort);
    res.json(books);
  } catch (err) {
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
    const { data } = await axios.get("https://www.aladin.co.kr/ttb/api/ItemLookUp.aspx", {
      params: {
        ttbkey: process.env.ALADIN_TTB_KEY,
        ItemIdType: "ISBN13",
        ItemId: isbn,
        Output: "JS",
        Version: "20131101",
        SearchTarget: "eBook",
      },
    });

    if (!data?.item?.length) {
      return res.status(404).json({ message: "Book not found" });
    }

    const book = data.item[0];

    const mapped = {
      title: book.title,
      author: book.author,
      publisher: book.publisher,
      listPrice: book.priceStandard,
      salePrice: book.priceSales,
      discountRate: book.priceStandard
        ? Math.round(((book.priceStandard - book.priceSales) / book.priceStandard) * 100)
        : 0,
      category: book.categoryName,
      isbn: book.isbn13,
      summary: book.description,
      image: book.cover,
      rating: book.customerReviewRank,
      pubDate: book.pubDate,
      comment: comments[index % comments.length],
    };

    res.json(mapped);
  } catch (err) {
    console.error("❌ 도서 상세 조회 실패:", err.message);
    res.status(500).json({ message: "Failed to fetch book detail" });
  }
};

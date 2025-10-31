import express from "express";
import {
  getAllBooks,
  getBestsellerBooks,
  getNewBooks,
  getBookCategories,
  getBookDetail,
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

export default router;

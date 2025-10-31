import fs from "fs";
import path from "path";
import { execSync } from "child_process";

console.log("🚀 책파랑 프로젝트 초기 세팅을 시작합니다...\n");

// ✅ 1️⃣ 폴더 구조 생성
const folders = [
  "src/components/Header",
  "src/pages/HomePage",
  "src/pages/BookSearchPage",
  "src/styles",
  "src/utils",
  "src/hooks",
  "src/context",
  "server",
];

folders.forEach((dir) => {
  fs.mkdirSync(path.join(process.cwd(), dir), { recursive: true });
  console.log("📁 created:", dir);
});

// ✅ 2️⃣ 파일 생성
const files = {
  // Header
  "src/components/Header/Header.tsx": `
import styles from "./Header.module.css";

export default function Header() {
  return (
    <header className={styles.header}>
      <h1>📚 책파랑</h1>
      <nav>
        <a href="#">홈</a>
        <a href="#">소개</a>
      </nav>
    </header>
  );
}
  `,
  "src/components/Header/Header.module.css": `
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 32px;
  background-color: var(--primary-color);
  color: white;
}
.header a {
  color: white;
  text-decoration: none;
  margin-left: 16px;
}
  `,

  // HomePage
  "src/pages/HomePage/HomePage.tsx": `
import styles from "./HomePage.module.css";
import Header from "../../components/Header/Header";

export default function HomePage() {
  return (
    <div className={styles.container}>
      <Header />
      <main className={styles.main}>
        <h2>환영합니다 👋</h2>
        <p>책파랑 메인페이지</p>
      </main>
    </div>
  );
}
  `,
  "src/pages/HomePage/HomePage.module.css": `
.container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}
.main {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex: 1;
  text-align: center;
}
  `,

  // BookSearchPage
  "src/pages/BookSearchPage/BookSearchPage.tsx": `
import { useState } from "react";
import type { FormEvent } from "react";
import useBookSearch from "../../hooks/useBookSearch";
import type { BookData } from "../../hooks/useBookSearch";
import styles from "./BookSearchPage.module.css";

export default function BookSearchPage() {
  const [query, setQuery] = useState<string>("");
  const { books, loading, error, searchBooks } = useBookSearch();

  const handleSearch = (e: FormEvent) => {
    e.preventDefault();
    if (query.trim()) searchBooks(query);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>📚 서점 검색</h1>

      <form onSubmit={handleSearch} className={styles.form}>
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="책 제목을 입력하세요"
          className={styles.input}
        />
        <button className={styles.button}>검색</button>
      </form>

      {error && <p className={styles.error}>{error}</p>}

      {loading ? (
        <ul className={styles.bookList}>
          {Array.from({ length: 5 }).map((_, i) => (
            <li key={i} className={styles.skeletonCard}>
              <div className={styles.skeletonThumbnail}></div>
              <div className={styles.skeletonInfo}>
                <div className={styles.skeletonLine}></div>
                <div className={styles.skeletonLine}></div>
                <div className={styles.skeletonShortLine}></div>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <ul className={styles.bookList}>
          {books.map((book: BookData) => (
            <li key={book.id} className={styles.bookCard}>
              <img
                src={book.thumbnail}
                alt={book.title}
                className={styles.thumbnail}
              />
              <div>
                <h2 className={styles.bookTitle}>{book.title}</h2>
                <p className={styles.bookAuthors}>{book.authors}</p>
                <p className={styles.bookPublisher}>{book.publisher}</p>
                <p>💰 가격: {book.price}원</p>
                <p>⭐ 평점: {book.reviewRank}</p>
                <a
                  href={book.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.link}
                >
                  자세히 보기
                </a>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
  `,
  "src/pages/BookSearchPage/BookSearchPage.module.css": `
.container {
  padding: 24px;
  max-width: 800px;
  margin: 0 auto;
}
.title {
  font-size: 1.75rem;
  font-weight: bold;
  margin-bottom: 16px;
}
.form {
  display: flex;
  gap: 8px;
  margin-bottom: 24px;
}
.input {
  flex: 1;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 6px;
}
.button {
  padding: 8px 16px;
  background-color: #2563eb;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
}
.button:hover {
  background-color: #1e4fc3;
}
.error {
  color: red;
  margin-bottom: 12px;
}
.bookList {
  display: grid;
  gap: 16px;
}
.bookCard {
  display: flex;
  gap: 16px;
  border: 1px solid #ddd;
  border-radius: 10px;
  padding: 16px;
}
.thumbnail {
  width: 80px;
  height: 110px;
  object-fit: cover;
  border-radius: 4px;
}
.bookTitle {
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 4px;
}
.bookAuthors {
  color: #555;
}
.bookPublisher {
  color: #777;
  font-size: 0.9rem;
  margin-bottom: 6px;
}
.link {
  color: #2563eb;
  text-decoration: underline;
}
.skeletonCard {
  display: flex;
  gap: 16px;
  border: 1px solid #eee;
  border-radius: 10px;
  padding: 16px;
  animation: pulse 1.5s infinite;
}
.skeletonThumbnail {
  width: 80px;
  height: 110px;
  background-color: #e5e5e5;
  border-radius: 4px;
}
.skeletonInfo {
  flex: 1;
}
.skeletonLine {
  height: 14px;
  background-color: #e5e5e5;
  margin-bottom: 8px;
  border-radius: 4px;
}
.skeletonShortLine {
  width: 60%;
  height: 14px;
  background-color: #e5e5e5;
  border-radius: 4px;
}
@keyframes pulse {
  0% { opacity: 0.6; }
  50% { opacity: 1; }
  100% { opacity: 0.6; }
}
  `,

  // server
  "server/index.js": `
import express from "express";
import axios from "axios";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 4000;

app.use(cors());

app.get("/api/aladin", async (req, res) => {
  const { isbn } = req.query;

  if (!isbn) return res.status(400).json({ error: "ISBN is required" });

  try {
    const response = await axios.get("https://www.aladin.co.kr/ttb/api/ItemLookUp.aspx", {
      params: {
        TTBKey: process.env.VITE_ALADIN_TTB_KEY,
        ItemIdType: "ISBN13",
        ItemId: isbn,
        Output: "JS",
        Version: "20131101",
      },
    });
    res.json(response.data);
  } catch (error) {
    console.error("Aladin API Error:", error.message);
    res.status(500).json({ error: "Failed to fetch data from Aladin API" });
  }
});

app.listen(PORT, () => {
  console.log(\`🚀 Proxy server running at http://localhost:\${PORT}\`);
});
  `,

  // ✅ .env 파일 자동 생성
  ".env": `
VITE_KAKAO_REST_API_KEY=47f5c57302cf932080ff48aee2546d9f
VITE_ALADIN_TTB_KEY=ttbeowlfhd11030001
  `,
};

// 파일 생성
for (const [filePath, content] of Object.entries(files)) {
  fs.writeFileSync(path.join(process.cwd(), filePath.trim()), content.trim());
  console.log("📝 created:", filePath);
}

// ✅ 3️⃣ .gitignore 수정/추가
const gitignorePath = path.join(process.cwd(), ".gitignore");
let gitignoreContent = "";

if (fs.existsSync(gitignorePath)) {
  gitignoreContent = fs.readFileSync(gitignorePath, "utf-8");
}

if (!gitignoreContent.includes(".env")) {
  gitignoreContent += "\n# 환경 변수 파일\n.env\n";
  fs.writeFileSync(gitignorePath, gitignoreContent.trim() + "\n");
  console.log("🔒 updated: .gitignore (.env 커밋 방지)");
}

// ✅ 4️⃣ npm 패키지 설치
console.log("\n📦 express, axios, cors, dotenv 패키지 설치 중...\n");
execSync("npm install express axios cors dotenv", { stdio: "inherit" });

// ✅ 완료 메시지
console.log("\n✅ 책파랑 프로젝트 기본 세팅 완료! 🎉");
console.log("👉 서버 실행: node server/index.js");
console.log("👉 클라이언트 실행: npm run dev");

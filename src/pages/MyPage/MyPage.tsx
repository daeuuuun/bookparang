import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./MyPage.module.css";
import WishlistTab from "../../components/WishlistTab/WishlistTab";
import ReadingLogTab from "../../components/ReadingLogTab/ReadingLogTab";
import ReviewTab from "../../components/ReviewTab/ReviewTab";

interface WishlistBook {
  isbn: string;
  title: string;
  author?: string;
  image?: string;
  salePrice?: number;
}

interface WishlistItem {
  bookIsbn: string;
  createdAt: string;
  book?: WishlistBook;
}

const MyPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"wishlist" | "reading" | "review">("wishlist");
  const [, setWishlist] = useState<WishlistItem[]>([]);

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const res = await axios.get<WishlistItem[]>("http://localhost:4000/api/wishlist", {
          withCredentials: true,
        });
        setWishlist(res.data);
      } catch (err) {
        console.error("찜 목록 불러오기 실패:", err);
      }
    };
    fetchWishlist();
  }, []);

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>📖 마이페이지</h2>

      <div className={styles.tabs}>
        <button
          className={`${styles.tabBtn} ${activeTab === "wishlist" ? styles.active : ""}`}
          onClick={() => setActiveTab("wishlist")}
        >
          💖 찜 목록
        </button>
        <button
          className={`${styles.tabBtn} ${activeTab === "reading" ? styles.active : ""}`}
          onClick={() => setActiveTab("reading")}
        >
          📚 독서 기록
        </button>
        <button
          className={`${styles.tabBtn} ${activeTab === "review" ? styles.active : ""}`}
          onClick={() => setActiveTab("review")}
        >
          ✍️ 리뷰 관리
        </button>
      </div>

      <div className={styles.content}>
        {activeTab === "wishlist" && <WishlistTab />}
        {activeTab === "reading" && <ReadingLogTab />}
        {activeTab === "review" && <ReviewTab />}
      </div>
    </div>
  );
};

export default MyPage;

import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import styles from "./BookList.module.css";
import { useNavigate } from "react-router-dom";
import BookTile from "../BookTile/BookTile";
import type { Book } from "../../types/books";

interface Review {
  rating: number;
  comment?: string;
  user?: string;
}

interface BookListProps {
  category?: string;
  type?: "bestseller" | "new" | "all";
  sort?: string;
}

const BookList: React.FC<BookListProps> = ({
  category,
  type = "all",
  sort = "latest",
}) => {
  const [books, setBooks] = useState<Book[]>([]);
  const [reviewAverages, setReviewAverages] = useState<Record<string, number>>(
    {}
  );
  const [favorites, setFavorites] = useState<Record<string, boolean>>({}); // ✅ 각 책의 찜 상태
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  // ✅ 로그인 여부 확인
  const fetchUser = useCallback(async () => {
    try {
      const res = await axios.get("http://localhost:4000/api/users/me", {
        withCredentials: true,
      });
      if (res.data) setIsLoggedIn(true);
    } catch {
      setIsLoggedIn(false);
    }
  }, []);

  // ✅ 찜 상태 불러오기
  const fetchFavorites = useCallback(async (bookList: Book[]) => {
    if (!isLoggedIn) return;

    const favMap: Record<string, boolean> = {};
    await Promise.all(
      bookList.map(async (book) => {
        try {
          const res = await axios.get(
            `http://localhost:4000/api/wishlist/${book.isbn}`,
            { withCredentials: true }
          );
          favMap[book.isbn] = res.data.isFavorited;
        } catch {
          favMap[book.isbn] = false;
        }
      })
    );
    setFavorites(favMap);
  }, [isLoggedIn]);

  // ✅ 찜 토글
  const toggleFavorite = async (isbn: string) => {
    if (!isLoggedIn) {
      alert("로그인 후 이용해주세요 😄");
      return;
    }

    try {
      if (favorites[isbn]) {
        await axios.delete(`http://localhost:4000/api/wishlist/${isbn}`, {
          withCredentials: true,
        });
        setFavorites((prev) => ({ ...prev, [isbn]: false }));
      } else {
        await axios.post(`http://localhost:4000/api/wishlist/${isbn}`, {}, {
          withCredentials: true,
        });
        setFavorites((prev) => ({ ...prev, [isbn]: true }));
      }
    } catch (err) {
      console.error("❌ 찜 토글 실패:", err);
    }
  };

  const addToCart = async (isbn: string) => {
    try {
      await axios.post(`http://localhost:4000/api/cart/${isbn}`, {}, { withCredentials: true });
      alert("🛒 장바구니에 추가되었습니다!");
    } catch (err) {
      console.error("❌ 장바구니 추가 실패:", err);
      alert("장바구니 추가 중 오류가 발생했습니다 😢");
    }
  };

  // ✅ 도서 + 리뷰 + 찜 상태 불러오기
  useEffect(() => {
    const fetchBooks = async () => {
      setLoading(true);
      setError(null);

      try {
        const endpointMap = {
          bestseller: "/api/books/bestseller",
          new: "/api/books/new",
          all: "/api/books/all",
        };

        const url = endpointMap[type] || endpointMap["all"];
        const params: Record<string, string> = {};
        if (category) params.category = category;
        if (sort) params.sort = sort;

        const response = await axios.get<Book[]>(url, { params });
        const fetchedBooks = response.data;
        setBooks(Array.isArray(fetchedBooks) ? fetchedBooks : []);

        // 리뷰 평균 불러오기
        const avgMap: Record<string, number> = {};
        await Promise.all(
          fetchedBooks.map(async (book) => {
            try {
              const res = await axios.get<Review[]>(
                `http://localhost:4000/api/reviews/${book.isbn}`
              );
              const reviews = res.data;
              if (reviews.length > 0) {
                const avgUserRating =
                  reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length;
                const combined =
                  ((book.rating ?? 0) + avgUserRating) / 2;
                avgMap[book.isbn] = Number(combined.toFixed(1));
              }
            } catch {
              /* 리뷰 없으면 무시 */
            }
          })
        );

        setReviewAverages(avgMap);

        // ✅ 찜 상태도 함께 불러오기
        await fetchUser();
        await fetchFavorites(fetchedBooks);
      } catch (err) {
        console.error("❌ 도서 불러오기 실패:", err);
        setError("도서를 불러오는 중 문제가 발생했습니다 😢");
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, [category, type, sort, fetchUser, fetchFavorites]);

  if (loading)
    return <p className={styles.message}>📚 도서 목록을 불러오는 중...</p>;
  if (error)
    return <p className={`${styles.message} ${styles.error}`}>{error}</p>;

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>
        {type === "bestseller"
          ? "🔥 베스트셀러"
          : type === "new"
            ? "🆕 신간"
            : "📚 전체 eBook 목록"}
      </h2>

      {books.length === 0 ? (
        <p className={styles.message}>표시할 도서가 없습니다.</p>
      ) : (
        <ul className={styles.grid}>
          {books.map((book) => {
            const displayRating = reviewAverages[book.isbn] ?? book.rating ?? null;
            const isFavorited = favorites[book.isbn];

            return (
              <li key={book.isbn}>
                <BookTile
                  book={book}
                  reviewAverage={displayRating ?? undefined}
                  isFavorited={isFavorited}
                  onFavorite={toggleFavorite}
                  onAddCart={addToCart}
                  onClick={() => navigate(`/book/${book.isbn}`)}
                />
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default BookList;

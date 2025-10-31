import { useState } from "react";
import axios from "axios";

const KAKAO_KEY = import.meta.env.VITE_KAKAO_REST_API_KEY as string;

/* -------------------- 🔹 타입 정의 -------------------- */

// 알라딘 API 응답 타입 (서버에서 이미 가공해서 반환한다고 가정)
export interface AladinBookDetail {
  listPrice?: number;
  salePrice?: number;
  discountRate?: number;
  reviewRank?: number;
  link?: string;
}

// 카카오 API에서 반환되는 책 데이터
export interface KakaoBook {
  title: string;
  contents: string;
  url: string;
  isbn: string;
  datetime: string;
  authors: string[];
  publisher: string;
  translators: string[];
  price: number;
  sale_price: number;
  thumbnail: string;
  status: string;
}

// 카카오 API 전체 응답 구조
interface KakaoBookResponse {
  documents: KakaoBook[];
}

// 클라이언트에서 사용하는 통합 Book 데이터
export interface BookData {
  id: string;
  title: string;
  authors: string;
  publisher: string;
  thumbnail: string;
  listPrice: number | string;
  salePrice: number | string;
  discountRate: number | string;
  reviewRank: number;
  link: string;
}

/* -------------------- 🔹 디바운스 유틸 -------------------- */

function useDebounce<TArgs extends unknown[]>(
  func: (...args: TArgs) => void | Promise<void>,
  delay = 300
): (...args: TArgs) => void {
  let timer: ReturnType<typeof setTimeout> | undefined;
  return (...args: TArgs) => {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      void func(...args);
    }, delay);
  };
}

/* -------------------- 🔹 메인 훅 -------------------- */

export default function useBookSearchWithAutoComplete() {
  const [books, setBooks] = useState<BookData[]>([]);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /* ------------------- 🔍 자동완성 ------------------- */
  const fetchSuggestions = async (query: string): Promise<void> => {
    if (!query.trim()) {
      setSuggestions([]);
      return;
    }

    try {
      const res = await axios.get<KakaoBookResponse>(
        "https://dapi.kakao.com/v3/search/book",
        {
          params: { query, size: 5 },
          headers: { Authorization: `KakaoAK ${KAKAO_KEY}` },
        }
      );

      const titles = res.data.documents.map((book) => book.title);
      setSuggestions(titles);
    } catch (err) {
      console.error(err);
      setSuggestions([]);
    }
  };

  const debouncedFetch = useDebounce(fetchSuggestions, 300);

  /* ------------------- 📚 실제 검색 ------------------- */
  const searchBooks = async (query: string): Promise<void> => {
    if (!query.trim()) return;
    setLoading(true);
    setError(null);

    try {
      const kakaoRes = await axios.get<KakaoBookResponse>(
        "https://dapi.kakao.com/v3/search/book",
        {
          params: { query, size: 10 },
          headers: { Authorization: `KakaoAK ${KAKAO_KEY}` },
        }
      );

      const kakaoBooks = kakaoRes.data.documents;

      const enrichedBooks: BookData[] = await Promise.all(
        kakaoBooks.map(async (book): Promise<BookData> => {
          const isbn = book.isbn.split(" ")[1] || book.isbn.split(" ")[0];

          try {
            const aladinRes = await axios.get<AladinBookDetail>(
              "http://localhost:4000/api/aladin",
              { params: { isbn } }
            );

            const detail = aladinRes.data;

            return {
              id: isbn,
              title: book.title,
              authors: book.authors?.join(", "),
              publisher: book.publisher,
              thumbnail: book.thumbnail,
              listPrice: detail.listPrice ?? book.price ?? "정보 없음",
              salePrice: detail.salePrice ?? book.sale_price ?? "정보 없음",
              discountRate: detail.discountRate ?? "정보 없음",
              reviewRank: detail.reviewRank ?? 0,
              link: detail.link ?? book.url,
            };
          } catch {
            // 알라딘 API 실패 시 카카오 데이터 사용
            return {
              id: isbn,
              title: book.title,
              authors: book.authors?.join(", "),
              publisher: book.publisher,
              thumbnail: book.thumbnail,
              listPrice: book.price ?? "정보 없음",
              salePrice: book.sale_price ?? "정보 없음",
              discountRate: "정보 없음",
              reviewRank: 0,
              link: book.url,
            };
          }
        })
      );

      setBooks(enrichedBooks);
    } catch (err) {
      console.error(err);
      setError("책 정보를 불러오지 못했습니다 😢");
    } finally {
      setLoading(false);
    }
  };

  return {
    books,
    suggestions,
    loading,
    error,
    fetchSuggestions: debouncedFetch,
    searchBooks,
  };
}

export interface Book {
  isbn: string;
  title: string;
  author: string;
  publisher?: string;
  category?: string;

  // 가격 관련
  salePrice?: number;
  listPrice?: number;
  discountRate?: number;
  price?: number;

  // 메타 정보
  rating?: number;
  summary?: string;
  image?: string;
  pubDate?: string;

  // 코멘트
  comment?: string;
}

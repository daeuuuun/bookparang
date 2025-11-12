export interface Review {
  _id: string;
  isbn: string;
  bookIsbn?: string;
  rating: number; // 0~10점 단위
  comment: string;
  user: {
    id: string;
    nickname: string;
  };
  helpful: number;
  likedBy?: string[];
  createdAt: string;
}
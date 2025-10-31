export interface Review {
  _id: string;
  user: {
    id: string;         // ✅ userId (DB 고유 식별자)
    nickname: string;   // ✅ 표시용 닉네임
  };
  rating: number;
  comment: string;
  createdAt: string;
}

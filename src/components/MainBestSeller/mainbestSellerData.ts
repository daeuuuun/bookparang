import book1 from "../MainBestSeller/book1.png";
import book2 from "../MainBestSeller/book2.png";
import book3 from "../MainBestSeller/book3.png";
import book4 from "../MainBestSeller/book4.png";
import book5 from "../MainBestSeller/book5.png";
import book6 from "../MainBestSeller/book6.png";
import book7 from "../MainBestSeller/book7.png";
import book8 from "../MainBestSeller/book8.png";
import book9 from "../MainBestSeller/book9.png";
import book10 from "../MainBestSeller/book10.png";
import book11 from "../MainBestSeller/book11.png";
import book12 from "../MainBestSeller/book12.png";

export interface Book {
  id: number;
  title: string;
  author: string;
  img: string;
  category: string;
}

export const bestSellerBooks: Book[] = [
  { id: 1, title: "사탄탱고", author: "크러스너호르커이 라슬로", img: book1, category: "종합" },
  { id: 2, title: "죽고 싶지만 떡볶이는 먹고 싶어", author: "백세희", img: book2, category: "에세이" },
  { id: 3, title: "저소비 생활", author: "가제노타미", img: book3, category: "경제/경영" },
  { id: 4, title: "좋은지 나쁜지 누가 아는가", author: "류시화", img: book4, category: "에세이" },
  { id: 5, title: "설레는 이에겐 모든 날이 봄입니다", author: "오평선", img: book5, category: "소설/시" },
  { id: 6, title: "다정한 사람이 이긴다", author: "이해인", img: book6, category: "에세이" },
  { id: 7, title: "2026 한국이 열광할 세계 트렌드", author: "KOTRA", img: book7, category: "경제/경영" },
  { id: 8, title: "삼체 1부", author: "류츠신", img: book8, category: "라이트노벨" },
  { id: 9, title: "가공범", author: "히가시노 게이고", img: book9, category: "소설/시" },
  { id: 10, title: "앨저넌에게 꽃을", author: "대니얼 키스", img: book10, category: "소설/시" },
  { id: 11, title: "신비의 섬", author: "쥘 베른", img: book11, category: "소설/시" },
  { id: 12, title: "체스이야기", author: "슈테판 츠바이크", img: book12, category: "소설/시" },
];

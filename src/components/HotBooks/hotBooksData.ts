import book1 from "./book1.png";
import book2 from "./book2.png";
import book3 from "../BookRow/jeolchang.png"; // 새 이미지 파일
import book4 from "../BookRow/sakamoto.png"; // 새 이미지 파일

export interface HotBook {
  id: number;
  title: string;
  author: string;
  img: string;
  ment: string;
  why: string;
}

export const hotBooks: HotBook[] = [
  {
    id: 1,
    title: "사탄탱고",
    author: "크러스너호르커이 라슬로",
    img: book1,
    why: "왜 핫할까?",
    ment: "2025 노벨문학상을 수상한<br/>크러스너호르커이 라슬로의 대표작",
  },
  {
    id: 2,
    title: "저소비 생활",
    author: "가제노타미",
    img: book2,
    why: "왜 핫할까?",
    ment: "2025 노벨문학상을 수상한<br/>크러스너호르커이 라슬로의 대표작",
  },
  {
    id: 3,
    title: "절창",
    author: "구병모",
    img: book3,
    why: "왜 핫할까?",
    ment: "2025 노벨문학상을 수상한<br/>크러스너호르커이 라슬로의 대표작",
  },
  {
    id: 4,
    title: "사카모토 데이즈 23 더블특전판",
    author: "스즈키 유우토",
    img: book4,
    why: "왜 핫할까?",
    ment: "2025 노벨문학상을 수상한<br/>크러스너호르커이 라슬로의 대표작",
  },
];

import book1 from "../BookRow/satantango.png";
import book2 from "../BookRow/satantango.png";
import book3 from "../BookRow/satantango.png";
import profile1 from "./profile.png";
import profile2 from "./profile.png";
import profile3 from "./profile.png";

export interface MemberReview {
  id: number;
  title: string;
  author: string;
  img: string;
  ment: string;
  reviewerName: string;
  reviewerImg: string;
}

export const memberReviews: MemberReview[] = [
  {
    id: 1,
    title: "사탄탱고",
    author: "크러스너호르커이 라슬로",
    img: book1,
    ment: "나에게도 8명의 친구가 생겼다. 뒷이야기가, 친구들의 열린 결말이 너무 궁금하다. 해피엔딩의 새로운 틀 같기도 하다. 영화로 나오면 좋겠다.",
    reviewerName: "hsy0801",
    reviewerImg: profile1,
  },
  {
    id: 2,
    title: "사탄탱고",
    author: "크러스너호르커이 라슬로",
    img: book2,
    ment: "나에게도 8명의 친구가 생겼다. 뒷이야기가, 친구들의 열린 결말이 너무 궁금하다. 해피엔딩의 새로운 틀 같기도 하다. 영화로 나오면 좋겠다.",
    reviewerName: "hsy0801",
    reviewerImg: profile2,
  },
  {
    id: 3,
    title: "사탄탱고",
    author: "크러스너호르커이 라슬로",
    img: book3,
    ment: "나에게도 8명의 친구가 생겼다. 뒷이야기가, 친구들의 열린 결말이 너무 궁금하다. 해피엔딩의 새로운 틀 같기도 하다. 영화로 나오면 좋겠다.",
    reviewerName: "hsy0801",
    reviewerImg: profile3,
  },
];
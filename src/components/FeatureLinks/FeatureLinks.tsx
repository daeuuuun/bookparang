import { useNavigate } from "react-router-dom";
import styles from "./FeatureLinks.module.css";
import event from "../FeatureLinks/event.png";
import discount from "../FeatureLinks/discount.png";
import search from "../FeatureLinks/search.png";

export default function FeatureLinks() {
  const navigate = useNavigate();

  const cards = [
    {
      img: event,
      title: "이벤트",
      comment: "진행중인 이벤트를 확인해보세요",
      color: "#BA6E04",
      onClick: () => navigate("/event"),
    },
    {
      img: discount,
      title: "할인도서",
      comment: "한정특가로 저렴하게 득템!",
      color: "#BA2804",
      onClick: () => navigate("/discount"),
    },
    {
      img: search,
      title: "도서검색",
      comment: "찾으시는 책이 있으신가요?",
      color: "#257CBD",
      onClick: () => {
        // ✅ SearchBar focus 이벤트 발행
        const event = new Event("focusSearchBar");
        window.dispatchEvent(event);
        // 페이지가 Home이 아니라면 홈으로 이동 (SearchBar 있는 곳)
        navigate("/");
      },
    },
  ];

  return (
    <div className={styles.linkWrapper}>
      <div className={styles.linkWrap}>
        {cards.map((card, idx) => (
          <div
            key={idx}
            className={styles.card}
            onClick={card.onClick}
            style={{ cursor: "pointer" }}
          >
            <img src={card.img} alt={card.title} />
            <div className={styles.textWrap}>
              <span className={styles.comment}>{card.comment}</span>
              <span
                className={styles.title}
                style={{ color: card.color }}
              >
                {card.title}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

import { useParams } from "react-router-dom";
import styles from "../EventPage/EventPage.module.css";
import img1 from "./연진_산토리니_여행패키지.jpg";
import img2 from "./주연_태국_여행프로모션.jpg";
import img3 from "./장다은_디자인시안_최종.png";
import noEvent from "../EventPage/Group 67.png";

function EventDetailPage() {
  const { id } = useParams<{ id: string }>();

  // 🔹 이벤트별 데이터 매핑
  const eventMap: Record<string, { title: string; date: string; image: string }> = {
    "1": {
      title: "연진의 산토리니 여행 프로모션",
      date: "2025.10.01 ~ 2025.11.15",
      image: img1,
    },
    "2": {
      title: "주연의 태국 여행 프로모션",
      date: "2025.09.10 ~ 2025.11.30",
      image: img2,
    },
    "3": {
      title: "다은의 산토리니 여행 프로모션",
      date: "2025.11.01 ~ 2025.12.30",
      image: img3,
    },
  };

  // 🔹 id로 이벤트 데이터 찾기 (없으면 기본값)
  const eventData = eventMap[id ?? ""] || {
    title: "이벤트 준비중입니다!",
    date: "-",
    image: noEvent,
  };

  return (
    <div className={styles.eventPage}>
      <div className={styles.eventContainer}>
        {/* ---------- 상단 헤더 ---------- */}
        <div className={styles.eventHeader}>
          <p className={styles.eventSubtitle}>진행중인 이벤트를 확인해보세요!</p>
          <h1 className={styles.eventTitle}>이벤트</h1>
          <div className={styles.fullLine}></div>
        </div>

        {/* ---------- 상세 내용 ---------- */}
        <div className={styles.eventDetail}>
          <h2 className={styles.detailTitle}>{eventData.title}</h2>
          <p className={styles.detailDate}>{eventData.date}</p>
          <div className={styles.detailImageWrap}>
            <img
              src={eventData.image}
              alt={eventData.title}
              className={styles.detailImage}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default EventDetailPage;

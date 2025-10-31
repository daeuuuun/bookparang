import { useParams } from "react-router-dom";
import styles from "../EventPage/EventPage.module.css";
import eventpage from "../../assets/검색.svg";

function EventDetailPage() {
  const { id } = useParams<{ id: string }>();

  const eventData = {
    title: `이벤트 ${id} 제목`,
    date: "2025.10.01 ~ 2025.11.15",
    image: eventpage,
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
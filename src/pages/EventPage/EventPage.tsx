import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./EventPage.module.css";
import icons8 from "../../assets/검색.svg";

function EventPage() {
  const [activeTab, setActiveTab] = useState<"ongoing" | "ended">("ongoing");
  const [currentPage, setCurrentPage] = useState(1);

  const ongoingEvents = Array.from({ length: 23 }).map((_, i) => ({
    id: i + 1,
    title: `진행중 이벤트 ${i + 1}`,
    date: `D-${10 - (i % 10)}`,
  }));

  const endedEvents = Array.from({ length: 17 }).map((_, i) => ({
    id: i + 101,
    title: `종료 이벤트 ${i + 1}`,
    date: "종료",
  }));

  const events = activeTab === "ongoing" ? ongoingEvents : endedEvents;

  const eventsPerPage = 9;
  const totalPages = Math.ceil(events.length / eventsPerPage);

  const startIndex = (currentPage - 1) * eventsPerPage;
  const eventsToShow = events.slice(startIndex, startIndex + eventsPerPage);

  const handlePrev = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
  const handleNext = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages));

  return (
    <div className={styles.eventPage}>
      <div className={styles.eventContainer}>
        {/* ---------- 상단 헤더 ---------- */}
        <div className={styles.eventHeader}>
          <p className={styles.eventSubtitle}>
            {activeTab === "ongoing"
              ? "진행중인 이벤트를 확인해보세요!"
              : "종료된 이벤트 목록"}
          </p>
          <h1 className={styles.eventTitle}>이벤트</h1>
          <div className={styles.fullLine}></div>

          <div className={styles.eventTabsArea}>
            <div className={styles.eventTabsText}>
              <span
                className={`${styles.tab} ${
                  activeTab === "ongoing" ? styles.active : ""
                }`}
                onClick={() => {
                  setActiveTab("ongoing");
                  setCurrentPage(1);
                }}
              >
                진행중인 이벤트
              </span>
              <span
                className={`${styles.tab} ${
                  activeTab === "ended" ? styles.active : ""
                }`}
                onClick={() => {
                  setActiveTab("ended");
                  setCurrentPage(1);
                }}
              >
                종료된 이벤트
              </span>
            </div>

            <div className={styles.searchBox}>
              <input
                type="text"
                placeholder="검색어를 입력하세요"
                className={styles.searchInput}
              />
              <img src={icons8} alt="검색" className={styles.searchIcon} />
            </div>
          </div>
        </div>

        {/* ---------- 카드 영역 ---------- */}
        <div className={styles.eventGrid}>
          {eventsToShow.map((event, i) => (
            <React.Fragment key={event.id}>
              <Link
                to={`/events/${event.id}`}
                className={styles.eventItem}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <div className={styles.eventCard}>
                  {/* 이벤트 카드 이미지 영역 */}
                </div>
                <div className={styles.eventText}>
                  <div className={styles.eventName}>{event.title}</div>
                  <div className={styles.eventDate}>{event.date}</div>
                </div>
              </Link>

              {(i + 1) % 3 === 0 && i !== eventsToShow.length - 1 && (
                <hr className={styles.eventSeparator} />
              )}
            </React.Fragment>
          ))}
        </div>

        {/* ---------- 페이지네이션 ---------- */}
        <div className={styles.eventPagination}>
          <span className={styles.pageArrow} onClick={handlePrev}>
            &lt;
          </span>
          {Array.from({ length: totalPages }).map((_, i) => {
            const page = i + 1;
            return (
              <span
                key={page}
                className={
                  page === currentPage ? styles.pageActive : styles.pageNumber
                }
                onClick={() => setCurrentPage(page)}
              >
                {page}
              </span>
            );
          })}
          <span className={styles.pageArrow} onClick={handleNext}>
            &gt;
          </span>
        </div>
      </div>
    </div>
  );
}

export default EventPage;
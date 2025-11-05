import { useNavigate } from "react-router-dom";
import styles from "./Header.module.css";
import logo from "../Header/logo.png";
// import search from "../Header/search.svg";
import profile from "../Header/profile.svg";
import cart from "../Header/cart.svg";
import SearchBar from "../SearchBar/SearchBar";

export default function Header() {
  const navigate = useNavigate();

  return (
    <header className={styles.header}>
      <div className={styles.topBar}>
        {/* 로고 */}
        <img
          src={logo}
          alt="책파랑 로고"
          className={styles.logo}
          onClick={() => navigate("/")} // ✅ 홈으로 이동
          style={{ cursor: "pointer" }}
        />

        {/* 검색창 */}
        {/* <div className={styles.searchBar}>
          <input
            type="text"
            placeholder="검색해보세요"
            className={styles.searchInput}
          />
          <button className={styles.searchButton}>
            <img src={search} alt="검색" />
          </button>
        </div> */}
        <SearchBar />

        {/* 아이콘 */}
        <div className={styles.iconBar}>
          <img
            src={cart}
            alt="장바구니"
            className={styles.icon}
            onClick={() => navigate("/cart")} // ✅ 장바구니로 이동
          />
          <img
            src={profile}
            alt="마이페이지"
            className={styles.icon}
            onClick={() => navigate("/my")} // ✅ 마이페이지로 이동
          />
        </div>
      </div>
    </header>
  );
}

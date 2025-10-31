import styles from "./Header.module.css";
import logo from "../Header/logo.png";
import search from "../Header/search.svg";
import profile from "../Header/profile.svg";
import cart from "../Header/cart.svg";

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.topBar}>
        {/*로고*/}
        <img src={logo} alt="책파랑 로고" className={styles.logo} />
        {/*검색창*/}
        <div className={styles.searchBar}>
          <input type="text" placeholder="검색해보세요" className={styles.searchInput}/>
          <button className={styles.searchButton}>
            <img src={search} alt="검색" />
          </button>
        </div>
        {/*아이콘*/}
        <div className={styles.iconBar}>
          <img src={cart} alt="장바구니" className={styles.icon}/>
          <img src={profile} alt="마이페이지" className={styles.icon}/>
        </div>
      </div>
    </header>
  );
}
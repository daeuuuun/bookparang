import styles from "./HomePage.module.css";
import Header from "../../components/Header/Header";

export default function HomePage() {
  return (
    <div className={styles.container}>
      <Header />
      <main className={styles.main}>
        <h2>환영합니다 👋</h2>
        <p>책파랑 메인페이지</p>
      </main>
    </div>
  );
}
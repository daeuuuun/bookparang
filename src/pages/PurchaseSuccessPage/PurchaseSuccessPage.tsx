import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./PurchaseSuccessPage.module.css";

const PurchaseSuccessPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <h2>✅ 결제가 완료되었습니다!</h2>
      <p>감사합니다. 결제하신 도서는 마이페이지에서 확인하실 수 있습니다.</p>
      <div className={styles.actions}>
        <button onClick={() => navigate("/mypage")}>📚 마이페이지로 이동</button>
        <button onClick={() => navigate("/")}>🏠 홈으로 돌아가기</button>
      </div>
    </div>
  );
};

export default PurchaseSuccessPage;

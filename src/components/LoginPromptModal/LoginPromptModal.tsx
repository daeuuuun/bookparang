import styles from "./LoginPromptModal.module.css";
import { useNavigate } from "react-router-dom";

interface Props {
  onClose: () => void;
}

export default function LoginPromptModal({ onClose }: Props) {
  const navigate = useNavigate();

  const handleLogin = () => {
    onClose();
    navigate("/login");
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h2 className={styles.title}>로그인이 필요합니다</h2>
        <p className={styles.message}>로그인 후 이용 가능한 서비스입니다.</p>

        <div className={styles.buttons}>
          <button onClick={onClose} className={styles.cancel}>
            취소
          </button>
          <button onClick={handleLogin} className={styles.confirm}>
            로그인하러 가기
          </button>
        </div>
      </div>
    </div>
  );
}

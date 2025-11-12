
import { useNavigate } from 'react-router-dom';
import styles from './TermAgreement.module.css';
import { useEffect } from 'react';

export default function TermAgreements() {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className={styles.container}>
      {/* 1. 목적 */}
      <section className={styles.section}>
        <h3 className={styles.sectionTitle}>제1조 (목적)</h3>
        <p className={styles.content}>
          이 약관은 해당 사이트에서 제공하는 전자상거래 관련 서비스를 이용함에 있어
          회사와 이용자의 권리, 의무 및 책임사항을 규정함을 목적으로 합니다.
        </p>
      </section>

      {/* 2. 정의 */}
      <section className={styles.section}>
        <h3 className={styles.sectionTitle}>제2조 (정의)</h3>
        <p className={styles.content}>
          1. “사이트”란 회사가 재화 또는 용역을 이용자에게 제공하기 위하여 컴퓨터 등 정보통신설비를
          이용하여 재화·용역을 거래할 수 있도록 설정한 가상의 영업장을 의미합니다.<br />
          2. “이용자”란 사이트에 접속하여 이 약관에 따라 서비스를 받는 회원 및 비회원을 말합니다.
        </p>
      </section>

      {/* 3. 약관의 효력 및 변경 */}
      <section className={styles.section}>
        <h3 className={styles.sectionTitle}>제3조 (약관의 효력 및 변경)</h3>
        <p className={styles.content}>
          1. 이 약관은 사이트에 게시하거나 기타의 방법으로 이용자에게 공지함으로써 효력을 발생합니다.<br />
          2. 회사는 관련 법령을 위배하지 않는 범위에서 이 약관을 변경할 수 있으며, 변경 시 사이트를 통해
          사전에 공지합니다.
        </p>
      </section>

      {/* 4. 서비스 이용 */}
      <section className={styles.section}>
        <h3 className={styles.sectionTitle}>제4조 (서비스의 이용)</h3>
        <p className={styles.content}>
          이용자는 사이트를 통해 제공되는 모든 서비스 이용 시 관련 법령과 약관, 이용 안내를 준수해야 합니다.
        </p>
      </section>

      {/* 5. 계약의 성립 */}
      <section className={styles.section}>
        <h3 className={styles.sectionTitle}>제5조 (계약의 성립)</h3>
        <p className={styles.content}>
          사이트에서 제공하는 재화 또는 용역에 대한 구매신청은 이용자가 구매 버튼을 클릭한 시점에 이루어지며,
          회사가 이를 확인하면 계약이 성립합니다.
        </p>
      </section>

      {/* 6. 기타 일반 조항 */}
      <section className={styles.section}>
        <h3 className={styles.sectionTitle}>제6조 (기타 조항)</h3>
        <p className={styles.content}>
          1. 회사는 서비스 제공과 관련하여 이용자로부터 취득한 개인정보를 관련 법령에 따라 안전하게 관리합니다.<br />
          2. 이 약관에 명시되지 않은 사항은 관계 법령 및 일반 상관례에 따릅니다.
        </p>
      </section>

      <div className={styles.backBtnBox}>
        <button
          onClick={() => navigate(-1)}
          className={styles.backBtn}
        >
          ← 돌아가기
        </button>
      </div>
    </div>
  );
}

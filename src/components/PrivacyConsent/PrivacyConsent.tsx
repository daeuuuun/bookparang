import { useNavigate } from 'react-router-dom';
import styles from './PrivacyConsent.module.css';
import { useEffect } from 'react';

export default function PrivacyConsent() {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className={styles.container}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>수집 목적</th>
            <th>수집 항목</th>
            <th>보유 기간</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>회원가입 및 본인확인</td>
            <td>이메일, 비밀번호, 닉네임</td>
            <td>회원 탈퇴 시까지<br />(단, 관련 법령에 따라 별도 보관 가능)</td>
          </tr>

          <tr>
            <td>14세 미만 회원의 법정대리인 동의 확인</td>
            <td>법정대리인 본인인증정보 (이름, DI)</td>
            <td>회원 탈퇴 시까지</td>
          </tr>

          <tr>
            <td>서비스 이용기록 분석 및 부정이용 방지</td>
            <td>IP 주소, 브라우저 종류, 방문일시, 기기정보(OS, 모델명, 버전)</td>
            <td>내부 방침에 따른 기간<br />(회원 탈퇴 후 최대 30일)</td>
          </tr>

          <tr>
            <td>재가입 및 부정이용 방지</td>
            <td>아이디, 이름, CI, DI</td>
            <td>내부 방침에 따른 기간<br />(회원 탈퇴 후 최대 30일)</td>
          </tr>
        </tbody>
      </table>

      <div className={styles.notice}>
        <p>
          회원은 개인정보 수집 및 이용에 대한 동의를 거부할 권리가 있습니다.
          <br />
          단, 동의하지 않을 경우 회원가입 및 서비스 이용이 제한될 수 있습니다.
        </p>
      </div>

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
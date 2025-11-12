import { useNavigate } from 'react-router-dom';
import styles from './MarketingConsent.module.css';
import { useEffect } from 'react';

export default function MarketingConsent() {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>마케팅 수신 동의 (선택)</h2>

      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>수집·이용 목적</h3>
        <div className={styles.content}>
          <ul>
            <li>신간 도서 정보 및 베스트셀러 추천</li>
            <li>할인 이벤트, 쿠폰, 적립금 혜택 안내</li>
            <li>독서 모임, 북토크 등 문화 행사 안내</li>
            <li>개인 맞춤형 도서 추천 서비스</li>
            <li>회원 등급별 특별 혜택 및 서비스 안내</li>
            <li>설문조사, 이벤트 당첨자 발표</li>
          </ul>
        </div>
      </div>

      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>수집하는 개인정보 항목</h3>
        <div className={styles.content}>
          <div className={styles.categoryGroup}>
            <h4>필수 정보</h4>
            <p>이메일 주소, 휴대폰 번호 (SMS 수신 동의 시)</p>
          </div>
          <div className={styles.categoryGroup}>
            <h4>선택 정보</h4>
            <p>성별, 연령대, 선호 장르, 구매 이력, 관심 분야</p>
          </div>
        </div>
      </div>

      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>마케팅 정보 수신 방법</h3>
        <div className={styles.content}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>수신 방법</th>
                <th>발송 내용</th>
                <th>발송 주기</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>이메일</td>
                <td>신간 소식, 할인 정보, 이벤트 안내</td>
                <td>주 1-2회</td>
              </tr>
              <tr>
                <td>SMS</td>
                <td>긴급 할인 정보, 쿠폰, 당첨 안내</td>
                <td>월 2-4회</td>
              </tr>
              <tr>
                <td>앱 푸시</td>
                <td>개인 맞춤 추천, 실시간 이벤트</td>
                <td>주 1-3회</td>
              </tr>
              <tr>
                <td>우편</td>
                <td>VIP 회원 특별 혜택 안내</td>
                <td>분기별</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>보유 및 이용 기간</h3>
        <div className={styles.content}>
          <ul>
            <li><strong>회원 탈퇴 시까지</strong> 또는 <strong>동의 철회 시까지</strong></li>
            <li>다만, 관련 법령에 의해 보존이 필요한 경우 해당 기간 동안 보관</li>
            <li>2년간 서비스 미이용 시 개인정보 처리 정지 (별도 안내 후)</li>
          </ul>
        </div>
      </div>

      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>동의 거부 권리 및 불이익</h3>
        <div className={styles.content}>
          <div className={styles.highlight}>
            <p>
              <strong>이용자는 마케팅 정보 수신에 동의하지 않을 권리가 있습니다.</strong>
            </p>
            <p>
              동의하지 않아도 회원가입 및 서비스 이용에는 제한이 없으나,
              다음과 같은 혜택을 받을 수 없습니다:
            </p>
            <ul>
              <li>신간 도서 및 베스트셀러 정보 안내</li>
              <li>할인 쿠폰 및 적립금 이벤트 정보</li>
              <li>개인 맞춤형 도서 추천 서비스</li>
              <li>독서 모임, 저자 강연회 등 문화 행사 안내</li>
              <li>회원 등급별 특별 혜택</li>
            </ul>
          </div>
        </div>
      </div>

      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>수신 동의 변경 및 철회</h3>
        <div className={styles.content}>
          <p>마케팅 정보 수신 동의는 언제든지 변경하거나 철회할 수 있습니다.</p>
          <div className={styles.withdrawMethods}>
            <h4>철회 방법:</h4>
            <ul>
              <li>웹사이트: 마이페이지 &gt; 개인정보 관리 &gt; 수신 설정</li>
              <li>모바일 앱: 설정 &gt; 알림 설정</li>
              <li>이메일: 수신 메일 하단의 '수신거부' 링크 클릭</li>
              <li>SMS: 'NO' 또는 '수신거부' 회신</li>
              <li>고객센터: 1588-1234 (평일 09:00~18:00)</li>
            </ul>
          </div>
        </div>
      </div>

      <div className={styles.notice}>
        <p>
          ※ 마케팅 수신 동의는 선택사항이며, 거부하셔도 서비스 이용에 제한이 없습니다.
          <br />
          ※ 만 14세 미만의 경우 법정대리인의 동의가 필요합니다.
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
import { useState } from "react";
import styles from "./FAQSection.module.css";

interface FAQ {
  question: string;
  answer: string;
}

export default function FAQSection() {
  const faqs: FAQ[] = [
    {
      question: "실물 도서는 판매하지 않나요?",
      answer:
        "책파랑은 전자책 전문 플랫폼으로 운영되고 있어 실물 도서는 판매하지 않습니다. 모든 책은 디지털 형태로 제공되며, PC나 모바일 기기에서 언제든지 편리하게 읽을 수 있습니다.",
    },
    {
      question: "회원 탈퇴는 어떻게 하나요?",
      answer:
        "마이페이지에서 회원정보 메뉴로 이동하신 뒤, 화면 오른쪽 하단에 있는 ‘회원 탈퇴’ 버튼을 선택하시면 탈퇴가 가능합니다. 진행 전, 보유 중인 전자책 이용 권한이 모두 삭제되니 신중히 진행해주세요.",
    },
    {
      question: "비회원도 주문할 수 있나요?",
      answer:
        "죄송하지만 비회원은 주문이 불가능합니다. 전자책은 이용 권한과 결제 내역이 계정에 연결되어 있어, 회원 인증 절차를 통해서만 안전하게 구매와 열람이 가능합니다.",
    },
    {
      question: "원하는 도서를 신청할 수 있나요?",
      answer:
        "네, 문의게시판을 통해 신청해주시면 담당자가 검토 후 출판사와 협의해 반영 여부를 결정합니다. 가능한 한 많은 요청을 수용할 수 있도록 노력하고 있습니다.",
    },
    {
      question: "구매한 전자책은 어디서 볼 수 있나요?",
      answer:
        "결제 후에는 내 서재 메뉴에서 언제든지 확인하고 읽을 수 있습니다. 로그인 상태에서만 이용할 수 있으며, PC와 모바일 웹 모두 지원합니다.",
    },
    {
      question: "결제 후 환불이 가능한가요?",
      answer:
        "전자책은 콘텐츠 특성상 열람이나 다운로드 이후에는 환불이 어렵습니다. 다만 결제 오류, 중복 결제, 콘텐츠 문제 등이 있을 경우 고객센터를 통해 확인 후 환불이 진행됩니다.",
    },
    {
      question: "지원되는 기기는 어떤 것이 있나요?",
      answer:
        "책파랑은 PC 웹과 모바일 웹 모두에서 이용할 수 있으며, 크롬·사파리·엣지 등 최신 브라우저를 지원합니다. 전용 앱은 추후 출시 예정이며, 인터넷만 연결되어 있다면 어디서든 동일 계정으로 접속해 전자책을 즐기실 수 있습니다.",
    },
  ];

  const [isOpen, setIsOpen] = useState(true);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className={styles.container}>
      <button
        className={styles.titleToggle}
        onClick={() => setIsOpen(!isOpen)}
      >
        <h2 className={styles.title}>자주 묻는 질문 (FAQ)</h2>
        <span className={styles.titleArrow}>{isOpen ? "▲" : "▼"}</span>
      </button>

      {isOpen && (
        <div className={styles.list}>
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className={`${styles.item} ${
                openIndex === idx ? styles.open : ""
              }`}
            >
              <button
                className={styles.question}
                onClick={() => toggleFAQ(idx)}
                aria-expanded={openIndex === idx}
              >
                <span>Q. {faq.question}</span>
                <span className={styles.arrow}>
                  {openIndex === idx ? "▲" : "▼"}
                </span>
              </button>
              {openIndex === idx && (
                <p className={styles.answer}>{faq.answer}</p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

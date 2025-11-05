import axios from "axios";

// ✅ 코멘트 목록 (순환용)
const comments = [
  "요즘 제일 핫한 책",
  "입소문 난 신간!",
  "서점 MD 추천도서",
  "읽고 나면 인생이 달라집니다",
  "지금 가장 많이 팔리는 책!",
  "독자 만족도 최고",
  "SNS에서 화제 중!",
  "한 번 읽으면 멈출 수 없어요",
];

// ✅ 데이터 매핑 함수
const mapBookData = (items) =>
  items.map((b, index) => ({
    title: b.title,
    author: b.author,
    publisher: b.publisher || "출판사 미상",
    listPrice: b.priceStandard,
    salePrice: b.priceSales,
    discountRate: b.priceStandard
      ? Math.round(((b.priceStandard - b.priceSales) / b.priceStandard) * 100)
      : 0,
    category: b.categoryName,
    isbn: b.isbn13,
    summary: b.description,
    image: b.cover,
    pubDate: b.pubDate,
    rating: b.customerReviewRank || 0,
    comment: comments[index % comments.length],
  }));

// ✅ 알라딘 API 안전 호출 함수
export const fetchBooks = async (queryType, category, sort) => {
  const ttbKey = process.env.ALADIN_TTB_KEY;
  if (!ttbKey) {
    console.error("❌ ALADIN_TTB_KEY가 설정되지 않았습니다.");
    return [];
  }

  let allBooks = [];
  let start = 1;
  const seen = new Set();
  const MAX_RESULTS = 50; // 한 번에 가져올 최대 수
  const TARGET_COUNT = 15; // 우리가 필요한 수

  console.log(`🚀 [fetchBooks] ${queryType} 목록 요청 시작`);

  // ✅ 여러 번 호출하면서 부족하면 추가 요청
  while (allBooks.length < TARGET_COUNT) {
    const params = {
      ttbkey: ttbKey,
      QueryType: queryType,
      Start: start,
      MaxResults: MAX_RESULTS,
      Output: "JS",
      Version: "20131101",
      SearchTarget: "eBook",
      Cover: "Big",
    };

    if (category) params.CategoryId = category;

    console.log(`📡 요청 Start=${start} | MaxResults=${MAX_RESULTS}`);

    const { data } = await axios.get(
      "https://www.aladin.co.kr/ttb/api/ItemList.aspx",
      { params }
    );

    const items = data?.item ?? [];
    console.log(`📥 응답=${items.length}개`);

    if (!items.length) {
      console.warn("⚠️ 더 이상 데이터가 없습니다. 루프 종료.");
      break;
    }

    // ✅ 필터링
    const filtered = mapBookData(items).filter(
      (b) =>
        !b.category.includes("BL") &&
        !b.category.includes("GL") &&
        !b.category.includes("오디오북") &&
        !b.category.includes("연재")
    );

    // ✅ 중복 제거
    const unique = filtered.filter((b) => {
      if (seen.has(b.isbn)) return false;
      seen.add(b.isbn);
      return true;
    });

    allBooks.push(...unique);
    console.log(`✅ 누적 ${allBooks.length}권`);

    // ✅ 필요한 수 다 모이면 종료
    if (allBooks.length >= TARGET_COUNT) break;

    // ✅ 다음 페이지로 이동
    start += MAX_RESULTS;

    // 💡 과속 방지 (0.8초 대기)
    await new Promise((resolve) => setTimeout(resolve, 800));
  }

  // ✅ 정렬 처리
  if (sort === "latest") {
    allBooks.sort((a, b) => new Date(b.pubDate) - new Date(a.pubDate));
  } else if (sort === "priceAsc") {
    allBooks.sort((a, b) => a.salePrice - b.salePrice);
  } else if (sort === "priceDesc") {
    allBooks.sort((a, b) => b.salePrice - a.salePrice);
  } else if (sort === "rating") {
    allBooks.sort((a, b) => b.rating - a.rating);
  }

  // ✅ 결과 제한 (최대 30권까지만 반환)
  const result = allBooks.slice(0, TARGET_COUNT);
  console.log(`🏁 최종 반환 ${result.length}권`);
  return result;
};

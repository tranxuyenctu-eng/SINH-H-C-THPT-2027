// CƠ SỞ DỮ LIỆU TÀI LIỆU SINH HỌC
// Bạn có thể dễ dàng thêm bài tập mới bằng cách thêm một đối tượng {} vào danh sách dưới đây.

const BIOLOGY_DATA = [
  // --- SINH HỌC 10 ---
  {
    id: "bio10-01",
    title: "Bài tập: Các cấp độ tổ chức của thế giới sống",
    category: "lop-10",
    topic: "Giới thiệu chung",
    filePath: "data/sinh-hoc-10/bai-1-cac-cap-do-to-chuc-song.html",
    size: "15 KB",
    description: "Câu hỏi trắc nghiệm và tự luận về các cấp độ tổ chức sống từ cấp phân tử, tế bào đến hệ sinh thái và sinh quyển.",
    dateAdded: "2026-06-25"
  },
  {
    id: "bio10-02",
    title: "Bài tập Trắc nghiệm: Các nguyên tố hóa học và nước trong tế bào",
    category: "lop-10",
    topic: "Thành phần hóa học của tế bào",
    filePath: "data/sinh-hoc-10/bai-2-thanh-phan-hoa-hoc-te-bao.html",
    size: "22 KB",
    description: "Bộ câu hỏi ôn tập về vai trò của các nguyên tố đa lượng, vi lượng, và cấu trúc đặc biệt của phân tử nước đối với sự sống.",
    dateAdded: "2026-06-25"
  },
  {
    id: "bio10-03",
    title: "Bài tập Tự luận: Cấu trúc tế bào Nhân sơ và Nhân thực",
    category: "lop-10",
    topic: "Cấu trúc tế bào",
    filePath: "data/sinh-hoc-10/bai-3-cau-truc-te-bao.html",
    size: "18 KB",
    description: "So sánh cấu tạo tế bào vi khuẩn (nhân sơ) và tế bào động vật/thực vật (nhân thực). Phân tích chức năng các bào quan.",
    dateAdded: "2026-06-25"
  },

  // --- SINH HỌC 11 ---
  {
    id: "bio11-01",
    title: "Bài tập: Trao đổi nước và chất dinh dưỡng khoáng ở thực vật",
    category: "lop-11",
    topic: "Trao đổi chất và chuyển hóa năng lượng ở thực vật",
    filePath: "data/sinh-hoc-11/bai-1-trao-doi-nuoc-va-khoang.html",
    size: "25 KB",
    description: "Cơ chế hấp thụ nước và ion khoáng ở rễ, vận chuyển các chất trong cây qua mạch gỗ, mạch rây và quá trình thoát hơi nước.",
    dateAdded: "2026-06-25"
  },
  {
    id: "bio11-02",
    title: "Trắc nghiệm ôn tập: Quang hợp và Hô hấp ở thực vật",
    category: "lop-11",
    topic: "Trao đổi chất và chuyển hóa năng lượng ở thực vật",
    filePath: "data/sinh-hoc-11/bai-2-quang-hop-ho-hap.html",
    size: "30 KB",
    description: "Tổng hợp lý thuyết và bài tập về pha sáng, pha tối quang hợp (C3, C4, CAM) cùng các giai đoạn hô hấp tế bào ở thực vật.",
    dateAdded: "2026-06-25"
  },
  {
    id: "bio11-03",
    title: "Bài tập: Cảm ứng và Hướng động ở thực vật",
    category: "lop-11",
    topic: "Cảm ứng",
    filePath: "data/sinh-hoc-11/bai-3-cam-ung-thuc-vat.html",
    size: "14 KB",
    description: "Các dạng hướng động (hướng sáng, hướng trọng lực, hướng nước...) và ứng động (nở hoa, khép lá) ở cây trồng.",
    dateAdded: "2026-06-25"
  },

  // --- SINH HỌC 12 ---
  {
    id: "bio12-01",
    title: "Bài tập: Gen, Mã di truyền và Quá trình Nhân đôi ADN",
    category: "lop-12",
    topic: "Di truyền học",
    filePath: "data/sinh-hoc-12/bai-1-gen-ma-di-truyen-nhan-doi-adn.html",
    size: "35 KB",
    description: "Tính toán số liên kết hydro, chiều dài, chu kỳ xoắn của ADN. Các bài tập về cơ chế nhân đôi bán bảo toàn.",
    dateAdded: "2026-06-25"
  },
  {
    id: "bio12-02",
    title: "Bài tập trắc nghiệm: Phiên mã và Dịch mã",
    category: "lop-12",
    topic: "Di truyền học",
    filePath: "data/sinh-hoc-12/bai-2-phien-ma-dich-ma.html",
    size: "28 KB",
    description: "Cơ chế sinh tổng hợp ARN và protein trong tế bào. Bài tập xác định trình tự axit amin dựa trên mạch khuôn ADN.",
    dateAdded: "2026-06-25"
  },
  {
    id: "bio12-03",
    title: "Bài tập Quy luật di truyền: Menđen và Tương tác gen",
    category: "lop-12",
    topic: "Di truyền học",
    filePath: "data/sinh-hoc-12/bai-3-quy-luat-di-truyen.html",
    size: "42 KB",
    description: "Phương pháp giải bài tập lai một cặp tính trạng, lai hai cặp tính trạng độc lập và các kiểu tương tác gen (bổ trợ, át chế).",
    dateAdded: "2026-06-25"
  },

  // --- ĐỀ THI THỬ ---
  {
    id: "exam-01",
    title: "Đề thi thử Tốt nghiệp THPT môn Sinh học - Đề số 1 (Có đáp án)",
    category: "de-thi-thu",
    topic: "Đề thi THPT Quốc gia",
    filePath: "data/de-thi-thu/de-thi-thu-tot-nghiep-thpt-lan-1.html",
    size: "48 KB",
    description: "Đề thi cấu trúc chuẩn Bộ Giáo dục & Đào tạo với 40 câu hỏi trắc nghiệm bao quát chương trình lớp 11 và 12, đi kèm đáp án chi tiết.",
    dateAdded: "2026-06-25"
  },
  {
    id: "exam-02",
    title: "Đề thi khảo sát chất lượng đầu năm Sinh học 12 (Có đáp án)",
    category: "de-thi-thu",
    topic: "Đề khảo sát",
    filePath: "data/de-thi-thu/de-thi-hao-sat-dau-nam-12.html",
    size: "32 KB",
    description: "Đề khảo sát đánh giá năng lực học sinh bước vào lớp 12, kiểm tra kiến thức cốt lõi của chương trình Sinh học lớp 11.",
    dateAdded: "2026-06-25"
  },

  // --- INFOGRAPHICS ---
  {
    id: "info-01",
    title: "Sơ đồ Tư duy: Quá trình Quang hợp ở các nhóm thực vật C3, C4, CAM",
    category: "infographics",
    topic: "Sinh học thực vật",
    filePath: "data/infographics/so-do-quang-hop.svg",
    size: "120 KB",
    description: "Infographic định dạng SVG sắc nét, trực quan hóa sự khác biệt giữa ba con đường cố định CO2 ở thực vật thích nghi các môi trường khác nhau.",
    dateAdded: "2026-06-25"
  },
  {
    id: "info-02",
    title: "Tóm tắt Kiến thức: Cơ chế Di truyền và Biến dị cấp độ Phân tử",
    category: "infographics",
    topic: "Di truyền học phân tử",
    filePath: "data/infographics/co-che-di-truyen-cap-phan-tu.svg",
    size: "156 KB",
    description: "Infographic sơ đồ hóa mối liên hệ giữa ADN -> mARN -> Protein và các tác nhân gây đột biến gen phổ biến.",
    dateAdded: "2026-06-25"
  }
];

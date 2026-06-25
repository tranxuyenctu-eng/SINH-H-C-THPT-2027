# BioHub - Kho Bài tập & Tài liệu Sinh học THPT

Chào mừng bạn đến với **BioHub**! Đây là dự án trang web tĩnh (Static Web) được thiết kế hiện đại, mượt mà và trực quan để chia sẻ các tài liệu môn Sinh học học đường bao gồm: Bài tập trắc nghiệm HTML lớp 10, 11, 12, Đề thi thử tốt nghiệp THPT và sơ đồ tư duy Infographic.

Trang web này được xây dựng bằng công nghệ thuần **HTML5, CSS3 (Glassmorphism) và JavaScript**, hoàn toàn tương thích và tối ưu hóa để chạy trực tiếp trên **GitHub Pages** miễn phí.

---

## 📂 Hướng dẫn Sắp xếp Tài liệu thực tế của bạn

Để đưa các file bài tập thực tế của bạn lên web, hãy thực hiện theo 2 bước đơn giản sau:

### Bước 1: Sao chép tệp tin vào thư mục tương ứng
Hãy đưa các file bài tập HTML, tệp PDF đề thi hoặc hình ảnh Infographics của bạn vào đúng các thư mục con bên trong thư mục `data/`:

*   **Sinh học 10:** Copy file bài tập HTML vào `data/sinh-hoc-10/`
*   **Sinh học 11:** Copy file bài tập HTML vào `data/sinh-hoc-11/`
*   **Sinh học 12:** Copy file bài tập HTML vào `data/sinh-hoc-12/`
*   **Đề thi thử:** Copy file HTML/PDF vào `data/de-thi-thu/`
*   **Infographics:** Copy file hình ảnh (SVG, PNG, JPG) hoặc PDF sơ đồ tư duy vào `data/infographics/`

### Bước 2: Đăng ký tài liệu mới vào `data.js`
Mở file `data.js` bằng bất kỳ trình soạn thảo mã nguồn nào (như VS Code, Notepad++ hoặc chính Gemini) và thêm thông tin tài liệu mới của bạn vào trong danh sách `BIOLOGY_DATA`.

**Mẫu khai báo tài liệu mới:**
```javascript
{
  id: "bio10-bai-moi",                                      // Mã định danh duy nhất (không trùng)
  title: "Bài tập Tự luận: Tế bào nhân thực nâng cao",       // Tiêu đề hiển thị trên thẻ bài tập
  category: "lop-10",                                       // Phân loại: 'lop-10', 'lop-11', 'lop-12', 'de-thi-thu', 'infographics'
  topic: "Cấu trúc tế bào",                                 // Tên chủ đề/chương học
  filePath: "data/sinh-hoc-10/te-bao-nhan-thuc-nang-cao.html", // Đường dẫn chính xác tới file bạn đã lưu ở Bước 1
  size: "18 KB",                                            // Dung lượng file hiển thị
  description: "Trắc nghiệm ôn tập củng cố cấu trúc màng sinh chất và các bào quan.", // Mô tả ngắn gọn
  dateAdded: "2026-06-25"                                   // Ngày thêm (YYYY-MM-DD)
}
```

*Lưu ý: Luôn chú ý dấu phẩy `,` ngăn cách giữa các đối tượng tài liệu trong mảng.*

---

## 🚀 Hướng dẫn Đăng tải lên GitHub Pages

Để xuất bản trang web này lên internet miễn phí bằng GitHub Pages, hãy làm theo các bước chi tiết sau:

### Phần A: Chuẩn bị tài khoản GitHub và Git
1.  Truy cập [GitHub.com](https://github.com/) và đăng ký/đăng nhập tài khoản của bạn.
2.  Đảm bảo máy tính của bạn đã cài đặt công cụ **Git**. Nếu chưa cài đặt, bạn tải về tại [git-scm.com](https://git-scm.com/) và cài đặt với các thiết lập mặc định.

### Phần B: Tạo Repository mới trên GitHub
1.  Tại trang chủ GitHub của bạn, click vào nút **New** (hoặc dấu cộng `+` ở góc phải chọn **New repository**).
2.  Đặt tên kho chứa (Repository name), ví dụ: `biology-hub`.
3.  Chọn chế độ **Public** (Bắt buộc phải chọn Public thì mới dùng được tính năng GitHub Pages miễn phí).
4.  Để trống tất cả các tùy chọn khác (Không tích chọn *Add a README file*, *Add .gitignore*, *Choose a license*).
5.  Click nút **Create repository**.

### Phần C: Đẩy mã nguồn từ máy tính lên GitHub
Mở Terminal/PowerShell tại thư mục `biology-hub` trên máy tính của bạn và chạy các lệnh sau:

```bash
# 1. Khởi tạo Git cục bộ
git init

# 2. Thêm tất cả các file trong thư mục vào Git quản lý
git add .

# 3. Tạo bản lưu đầu tiên (Commit)
git commit -m "Khoi tao website BioHub chia se tai lieu"

# 4. Đổi tên nhánh mặc định thành main
git branch -M main

# 5. Liên kết thư mục trên máy tính với repository trên GitHub
# (Thay thế <tên-tài-khoản-github> bằng tên tài khoản thật của bạn)
git remote add origin https://github.com/<tên-tài-khoản-github>/biology-hub.git

# 6. Đẩy mã nguồn lên GitHub
git push -u origin main
```

### Phần D: Kích hoạt GitHub Pages để tạo link web
1.  Truy cập vào Repository `biology-hub` của bạn trên trang web GitHub.
2.  Click chọn tab **Settings** (biểu tượng bánh răng răng trên thanh công cụ dự án).
3.  Ở menu bên trái, tìm và click vào mục **Pages** (nằm trong phần *Code and automation*).
4.  Tại phần **Build and deployment**:
    *   Mục **Source**: Chọn `Deploy from a branch` (mặc định).
    *   Mục **Branch**: Chọn nhánh `main` và thư mục `/ (root)`.
5.  Bấm nút **Save**.
6.  Đợi khoảng 1 - 2 phút để GitHub tiến hành biên dịch trang web. Sau đó tải lại trang Settings Pages, bạn sẽ thấy đường link trang web xuất hiện ở đầu trang có dạng:
    👉 **`https://<tên-tài-khoản-github>.github.io/biology-hub/`**

Bạn có thể chia sẻ đường link này cho học sinh, đồng nghiệp để họ truy cập học tập trực tuyến!

---

## 🛠️ Phát triển & Kiểm thử Cục bộ (Local Test)

Bạn có thể chạy thử nghiệm trang web ngay trên máy tính của mình bằng cách:
*   Mở tệp `index.html` bằng cách kích đúp chuột (mở trực tiếp bằng Chrome, Edge, Firefox).
*   *Lưu ý khi test offline:* Trình duyệt có thể chặn tải Iframe đối với một số liên kết file cục bộ do chính sách bảo mật CORS. Để có trải nghiệm mượt mà và kiểm tra chính xác tính năng làm bài tập trên modal, bạn nên chạy web thông qua một Server cục bộ như plugin **Live Server** trên VS Code hoặc cài đặt máy chủ Node.js đơn giản.

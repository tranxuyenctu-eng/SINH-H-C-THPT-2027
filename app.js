// SCRIPT ĐIỀU KHIỂN HOẠT ĐỘNG - BIOHUB
document.addEventListener("DOMContentLoaded", () => {
    // --- KHAI BÁO CÁC PHẦN TỬ DOM ---
    const searchInput = document.getElementById("search-input");
    const searchClearBtn = document.getElementById("search-clear-btn");
    const materialsGrid = document.getElementById("materials-grid");
    const emptyState = document.getElementById("empty-state");
    const resetSearchBtn = document.getElementById("reset-search-btn");
    
    // Thống kê nhanh
    const statTotal = document.getElementById("stat-count-total");
    const statExercises = document.getElementById("stat-count-exercises");
    const statExams = document.getElementById("stat-count-exams");
    const statInfographics = document.getElementById("stat-count-infographics");

    // Bộ lọc danh mục
    const filterTabs = document.querySelectorAll(".filter-tab");
    const badgeAll = document.getElementById("badge-all");
    const badgeLop10 = document.getElementById("badge-lop-10");
    const badgeLop11 = document.getElementById("badge-lop-11");
    const badgeLop12 = document.getElementById("badge-lop-12");
    const badgeDeThiThu = document.getElementById("badge-de-thi-thu");
    const badgeInfographics = document.getElementById("badge-infographics");

    // Modal xem trước
    const previewModal = document.getElementById("preview-modal");
    const modalBackdrop = document.getElementById("modal-backdrop");
    const modalCloseBtn = document.getElementById("modal-close-btn");
    const modalCloseAction = document.getElementById("modal-close-action");
    const modalCategory = document.getElementById("modal-category");
    const modalTitle = document.getElementById("modal-title");
    const modalFileSize = document.getElementById("modal-file-size");
    const modalDownloadBtn = document.getElementById("modal-download-btn");
    const iframeContainer = document.getElementById("iframe-container");
    const previewIframe = document.getElementById("preview-iframe");
    const imagePreviewContainer = document.getElementById("image-preview-container");
    const previewImage = document.getElementById("preview-image");

    // Chuyển đổi giao diện (Dark/Light mode)
    const themeToggle = document.getElementById("theme-toggle");

    // --- TRẠNG THÁI ỨNG DỤNG ---
    let currentCategory = "all";
    let searchQuery = "";

    // --- CHUYỂN ĐỔI CHỦ ĐỀ SÁNG/TỐI (THEME TOGGLE) ---
    // Kiểm tra chủ đề đã lưu hoặc tùy chọn hệ thống
    const savedTheme = localStorage.getItem("theme");
    const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    
    if (savedTheme === "dark" || (!savedTheme && systemPrefersDark)) {
        document.body.classList.add("dark-theme");
    } else {
        document.body.classList.remove("dark-theme");
    }

    themeToggle.addEventListener("click", () => {
        document.body.classList.toggle("dark-theme");
        const theme = document.body.classList.contains("dark-theme") ? "dark" : "light";
        localStorage.setItem("theme", theme);
    });

    // --- LOẠI BỎ DẤU TIẾNG VIỆT (PHỤC VỤ TÌM KIẾM KHÔNG DẤU) ---
    function removeVietnameseTones(str) {
        if (!str) return "";
        return str
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .replace(/đ/g, "d")
            .replace(/Đ/g, "D")
            .toLowerCase();
    }

    // --- CẬP NHẬT THỐNG KÊ DANH MỤC ---
    function updateStatsAndBadges() {
        const total = BIOLOGY_DATA.length;
        const lop10 = BIOLOGY_DATA.filter(item => item.category === "lop-10").length;
        const lop11 = BIOLOGY_DATA.filter(item => item.category === "lop-11").length;
        const lop12 = BIOLOGY_DATA.filter(item => item.category === "lop-12").length;
        const deThiThu = BIOLOGY_DATA.filter(item => item.category === "de-thi-thu").length;
        const info = BIOLOGY_DATA.filter(item => item.category === "infographics").length;

        // Thống kê lớn trên Hero
        if (statTotal) statTotal.textContent = total;
        if (statExercises) statExercises.textContent = lop10 + lop11 + lop12;
        if (statExams) statExams.textContent = deThiThu;
        if (statInfographics) statInfographics.textContent = info;

        // Số đếm trên các Tab
        if (badgeAll) badgeAll.textContent = total;
        if (badgeLop10) badgeLop10.textContent = lop10;
        if (badgeLop11) badgeLop11.textContent = lop11;
        if (badgeLop12) badgeLop12.textContent = lop12;
        if (badgeDeThiThu) badgeDeThiThu.textContent = deThiThu;
        if (badgeInfographics) badgeInfographics.textContent = info;
    }

    // --- THIẾT LẬP TÊN DANH MỤC THÂN THIỆN ---
    function getCategoryName(category) {
        switch (category) {
            case "lop-10": return "Sinh học 10";
            case "lop-11": return "Sinh học 11";
            case "lop-12": return "Sinh học 12";
            case "de-thi-thu": return "Đề thi thử";
            case "infographics": return "Infographics";
            default: return "Tài liệu";
        }
    }

    // --- RENDER DANH SÁCH THẺ BÀI TẬP ---
    function renderMaterials() {
        materialsGrid.innerHTML = "";
        
        // Lọc dữ liệu theo danh mục và từ khóa tìm kiếm
        const filteredData = BIOLOGY_DATA.filter(item => {
            const matchesCategory = currentCategory === "all" || item.category === currentCategory;
            
            const normalizedTitle = removeVietnameseTones(item.title);
            const normalizedTopic = removeVietnameseTones(item.topic);
            const normalizedDesc = removeVietnameseTones(item.description);
            const normalizedQuery = removeVietnameseTones(searchQuery);
            
            const matchesSearch = normalizedTitle.includes(normalizedQuery) || 
                                  normalizedTopic.includes(normalizedQuery) || 
                                  normalizedDesc.includes(normalizedQuery);
            
            return matchesCategory && matchesSearch;
        });

        // Nếu không tìm thấy kết quả nào
        if (filteredData.length === 0) {
            materialsGrid.style.display = "none";
            emptyState.style.display = "flex";
            return;
        }

        materialsGrid.style.display = "grid";
        emptyState.style.display = "none";

        // Tạo thẻ cho từng tài liệu
        filteredData.forEach(item => {
            const card = document.createElement("div");
            card.className = "material-card glass-card";
            
            // Đặt màu chủ đề cho thẻ dựa trên danh mục
            let accentTheme = "var(--primary-color)";
            let accentBgTheme = "var(--primary-light)";
            
            if (item.category === "lop-10") {
                accentTheme = "var(--color-lop10)";
                accentBgTheme = "var(--color-lop10-bg)";
            } else if (item.category === "lop-11") {
                accentTheme = "var(--color-lop11)";
                accentBgTheme = "var(--color-lop11-bg)";
            } else if (item.category === "lop-12") {
                accentTheme = "var(--color-lop12)";
                accentBgTheme = "var(--color-lop12-bg)";
            } else if (item.category === "de-thi-thu") {
                accentTheme = "var(--color-dethithu)";
                accentBgTheme = "var(--color-dethithu-bg)";
            } else if (item.category === "infographics") {
                accentTheme = "var(--color-info)";
                accentBgTheme = "var(--color-info-bg)";
            }

            card.style.setProperty("--accent-theme", accentTheme);
            card.style.setProperty("--accent-bg-theme", accentBgTheme);

            card.innerHTML = `
                <div class="card-header">
                    <span class="category-tag">${getCategoryName(item.category)}</span>
                    <span class="date-added">${formatDate(item.dateAdded)}</span>
                </div>
                <h3 class="card-title" title="${item.title}">${item.title}</h3>
                <p class="card-description" title="${item.description}">${item.description}</p>
                <div class="card-footer">
                    <div class="file-info">
                        <span class="file-topic">${item.topic}</span>
                        <span class="file-size">Dung lượng: ${item.size}</span>
                    </div>
                    <div class="card-actions">
                        <button class="action-btn action-btn-primary preview-trigger" title="Xem trước / Làm bài trực tuyến" data-id="${item.id}">
                            <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" stroke-width="2" fill="none">
                                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                                <circle cx="12" cy="12" r="3"></circle>
                            </svg>
                        </button>
                        <a href="${item.filePath}" download class="action-btn" title="Tải xuống tệp tin">
                            <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" stroke-width="2" fill="none">
                                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                                <polyline points="7 10 12 15 17 10"></polyline>
                                <line x1="12" y1="15" x2="12" y2="3"></line>
                            </svg>
                        </a>
                    </div>
                </div>
            `;

            // Lắng nghe sự kiện click mở modal preview
            const previewBtn = card.querySelector(".preview-trigger");
            previewBtn.addEventListener("click", () => openPreviewModal(item));

            materialsGrid.appendChild(card);
        });
    }

    // Định dạng ngày hiển thị (YYYY-MM-DD -> DD/MM/YYYY)
    function formatDate(dateStr) {
        const parts = dateStr.split("-");
        if (parts.length === 3) {
            return `${parts[2]}/${parts[1]}/${parts[0]}`;
        }
        return dateStr;
    }

    // --- MỞ MODAL XEM TRƯỚC / LÀM BÀI ---
    function openPreviewModal(item) {
        modalCategory.textContent = getCategoryName(item.category);
        modalTitle.textContent = item.title;
        modalFileSize.textContent = `Dung lượng: ${item.size}`;
        modalDownloadBtn.href = item.filePath;
        
        // Đặt màu chủ đề cho modal giống với màu của thẻ bài tập
        let accentColor = "var(--primary-color)";
        if (item.category === "lop-10") accentColor = "var(--color-lop10)";
        else if (item.category === "lop-11") accentColor = "var(--color-lop11)";
        else if (item.category === "lop-12") accentColor = "var(--color-lop12)";
        else if (item.category === "de-thi-thu") accentColor = "var(--color-dethithu)";
        else if (item.category === "infographics") accentColor = "var(--color-info)";
        modalCategory.style.color = accentColor;

        // Phân biệt định dạng file để hiển thị Iframe (HTML) hay Ảnh (SVG, PNG, JPG)
        const fileExtension = item.filePath.split('.').pop().toLowerCase();
        
        if (fileExtension === "html") {
            // Hiển thị khung Iframe làm bài tập
            iframeContainer.style.display = "block";
            imagePreviewContainer.style.display = "none";
            previewIframe.src = item.filePath;
        } else if (["png", "jpg", "jpeg", "svg"].includes(fileExtension)) {
            // Hiển thị hình ảnh Infographic
            iframeContainer.style.display = "none";
            imagePreviewContainer.style.display = "flex";
            previewImage.src = item.filePath;
            previewImage.alt = item.title;
        } else {
            // Dự phòng cho các tệp tin khác (PDF...)
            iframeContainer.style.display = "block";
            imagePreviewContainer.style.display = "none";
            previewIframe.src = item.filePath;
        }

        // Hiện modal kèm hiệu ứng
        previewModal.classList.add("show");
        document.body.style.overflow = "hidden"; // Ngăn cuộn trang chính khi mở modal
    }

    // --- ĐÓNG MODAL XEM TRƯỚC ---
    function closePreviewModal() {
        previewModal.classList.remove("show");
        document.body.style.overflow = "auto"; // Cho phép cuộn trang lại
        // Giải phóng tài nguyên Iframe để tránh tốn RAM và chạy ngầm
        previewIframe.src = "";
        previewImage.src = "";
    }

    // Lắng nghe sự kiện đóng modal
    modalCloseBtn.addEventListener("click", closePreviewModal);
    modalCloseAction.addEventListener("click", closePreviewModal);
    modalBackdrop.addEventListener("click", closePreviewModal);

    // Đóng modal bằng phím ESC
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && previewModal.classList.contains("show")) {
            closePreviewModal();
        }
    });

    // --- BỘ LỌC DANH MỤC (CATEGORY FILTER CLICK) ---
    filterTabs.forEach(tab => {
        tab.addEventListener("click", (e) => {
            // Xóa hoạt động trên tất cả các tab
            filterTabs.forEach(t => {
                t.classList.remove("active");
                t.setAttribute("aria-selected", "false");
            });

            // Kích hoạt tab được bấm
            const clickedTab = e.currentTarget;
            clickedTab.classList.add("active");
            clickedTab.setAttribute("aria-selected", "true");

            // Cập nhật bộ lọc và render lại thẻ
            currentCategory = clickedTab.getAttribute("data-category");
            renderMaterials();
        });
    });

    // --- TÌM KIẾM DỮ LIỆU (SEARCH LOGIC) ---
    searchInput.addEventListener("input", (e) => {
        searchQuery = e.target.value;
        
        // Hiện/Ẩn nút xóa tìm kiếm
        if (searchQuery.trim().length > 0) {
            searchClearBtn.style.display = "block";
        } else {
            searchClearBtn.style.display = "none";
        }

        renderMaterials();
    });

    // Bấm nút xóa tìm kiếm
    searchClearBtn.addEventListener("click", () => {
        searchInput.value = "";
        searchQuery = "";
        searchClearBtn.style.display = "none";
        searchInput.focus();
        renderMaterials();
    });

    // Nút khôi phục trong trạng thái không tìm thấy kết quả
    resetSearchBtn.addEventListener("click", () => {
        searchInput.value = "";
        searchQuery = "";
        searchClearBtn.style.display = "none";
        
        // Khôi phục về tab Tất cả
        filterTabs.forEach(t => t.classList.remove("active"));
        document.getElementById("tab-all").classList.add("active");
        currentCategory = "all";
        
        renderMaterials();
    });

    // --- KHỞI CHẠY LẦN ĐẦU ---
    updateStatsAndBadges();
    renderMaterials();
});

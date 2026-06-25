// SCRIPT ĐIỀU KHIỂN HOẠT ĐỘNG - BIOHUB
document.addEventListener("DOMContentLoaded", () => {
    // --- KHAIR BÁO CÁC PHẦN TỬ DOM ---
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

        if (statTotal) statTotal.textContent = total;
        if (statExercises) statExercises.textContent = lop10 + lop11 + lop12;
        if (statExams) statExams.textContent = deThiThu;
        if (statInfographics) statInfographics.textContent = info;

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
        
        const filteredData = BIOLOGY_DATA.filter(item => {
            const matchesCategory = currentCategory === "all" || item.category === currentCategory;
            
            const normalizedTitle = removeVietnameseTones(item.title);
            const normalizedTopic = removeVietnameseTones(item.topic);
            const normalizedDesc = removeVietnameseTones(item.description);
            const normalizedQuery = removeVietnameseTones(searchQuery);
            
            return matchesCategory && (normalizedTitle.includes(normalizedQuery) || 
                                       normalizedTopic.includes(normalizedQuery) || 
                                       normalizedDesc.includes(normalizedQuery));
        });

        if (filteredData.length === 0) {
            materialsGrid.style.display = "none";
            emptyState.style.display = "flex";
            return;
        }

        materialsGrid.style.display = "grid";
        emptyState.style.display = "none";

        filteredData.forEach(item => {
            const card = document.createElement("div");
            card.className = "material-card glass-card";
            
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
                        <button class="action-btn action-btn-primary preview-trigger" style="width: auto; padding: 0 16px; font-size: 0.85rem;" title="Xem trước / Làm bài trực tuyến" data-id="${item.id}">
                            Làm bài / Xem trước
                        </button>
                    </div>
                </div>
            `;

            const previewBtn = card.querySelector(".preview-trigger");
            previewBtn.addEventListener("click", () => openPreviewModal(item));

            materialsGrid.appendChild(card);
        });
    }

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
        
        let accentColor = "var(--primary-color)";
        if (item.category === "lop-10") accentColor = "var(--color-lop10)";
        else if (item.category === "lop-11") accentColor = "var(--color-lop11)";
        else if (item.category === "lop-12") accentColor = "var(--color-lop12)";
        else if (item.category === "de-thi-thu") accentColor = "var(--color-dethithu)";
        else if (item.category === "infographics") accentColor = "var(--color-info)";
        modalCategory.style.color = accentColor;

        const fileExtension = item.filePath.split('.').pop().toLowerCase();
        
        if (fileExtension === "html") {
            iframeContainer.style.display = "block";
            imagePreviewContainer.style.display = "none";
            previewIframe.src = item.filePath;
        } else if (["png", "jpg", "jpeg", "svg"].includes(fileExtension)) {
            iframeContainer.style.display = "none";
            imagePreviewContainer.style.display = "flex";
            previewImage.src = item.filePath;
            previewImage.alt = item.title;
        } else {
            iframeContainer.style.display = "block";
            imagePreviewContainer.style.display = "none";
            previewIframe.src = item.filePath;
        }

        previewModal.classList.add("show");
        document.body.style.overflow = "hidden";
    }

    function closePreviewModal() {
        previewModal.classList.remove("show");
        document.body.style.overflow = "auto";
        previewIframe.src = "";
        previewImage.src = "";
    }

    modalCloseBtn.addEventListener("click", closePreviewModal);
    modalCloseAction.addEventListener("click", closePreviewModal);
    modalBackdrop.addEventListener("click", closePreviewModal);

    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && previewModal.classList.contains("show")) {
            closePreviewModal();
        }
    });

    filterTabs.forEach(tab => {
        tab.addEventListener("click", (e) => {
            filterTabs.forEach(t => {
                t.classList.remove("active");
                t.setAttribute("aria-selected", "false");
            });

            const clickedTab = e.currentTarget;
            clickedTab.classList.add("active");
            clickedTab.setAttribute("aria-selected", "true");

            currentCategory = clickedTab.getAttribute("data-category");
            renderMaterials();
        });
    });

    searchInput.addEventListener("input", (e) => {
        searchQuery = e.target.value;
        if (searchQuery.trim().length > 0) {
            searchClearBtn.style.display = "block";
        } else {
            searchClearBtn.style.display = "none";
        }
        renderMaterials();
    });

    searchClearBtn.addEventListener("click", () => {
        searchInput.value = "";
        searchQuery = "";
        searchClearBtn.style.display = "none";
        searchInput.focus();
        renderMaterials();
    });

    resetSearchBtn.addEventListener("click", () => {
        searchInput.value = "";
        searchQuery = "";
        searchClearBtn.style.display = "none";
        
        filterTabs.forEach(t => t.classList.remove("active"));
        document.getElementById("tab-all").classList.add("active");
        currentCategory = "all";
        
        renderMaterials();
    });

    // --- KHỞI CHẠY LẦN ĐẦU ---
    updateStatsAndBadges();
    renderMaterials();

    // --- BẢO VỆ TÀI LIỆU (CHỐNG TẢI VỀ / CHỐNG SAO CHÉP) ---
    // Ngăn chặn menu chuột phải trên toàn trang
    document.addEventListener("contextmenu", (e) => {
        e.preventDefault();
    });

    // Ngăn chặn các phím tắt lưu trang (Ctrl + S, Ctrl + P)
    document.addEventListener("keydown", (e) => {
        if ((e.ctrlKey || e.metaKey) && ["s", "S", "p", "P"].includes(e.key)) {
            e.preventDefault();
            alert("Chức năng tải và in tài liệu đã bị chặn để bảo vệ bản quyền.");
        }
    });
});

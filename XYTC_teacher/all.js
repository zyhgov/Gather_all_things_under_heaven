// 全局配置
const CONFIG = {
    pageSize: 12,
    jsonPath: './teacher.json',
    defaultAvatar: './img/apple-touch-icon.png'
};

// 全局状态
const STATE = {
    currentPage: 1,
    teachers: [],
    filteredTeachers: [],
    isLoading: false,
    isError: false
};

// 页面初始化
async function initialize() {
    try {
        showLoading();
        await loadTeachers();
        setupEventListeners();
        
        // 处理URL参数
        const urlParams = new URLSearchParams(window.location.search);
        const searchQuery = urlParams.get('q') || '';
        document.getElementById('searchInput').value = searchQuery;
        
        filterTeachers(true);
    } catch (error) {
        handleLoadError(error);
    } finally {
        hideLoading();
    }
}

// 数据加载
async function loadTeachers() {
    try {
        const response = await fetch(CONFIG.jsonPath);
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const data = await response.json();
        
        // 数据校验
        if (!data?.teachers?.length) throw new Error('教师数据为空');
        
        STATE.teachers = data.teachers.map(teacher => ({
            ...teacher,
            avatar: teacher.avatar || CONFIG.defaultAvatar
        }));
        
    } catch (error) {
        console.error('数据加载失败:', error);
        throw error;
    }
}

// 事件监听器设置
function setupEventListeners() {
    // 搜索输入防抖
    let timeout;
    const searchInput = document.getElementById('searchInput');
    
    // 输入防抖
    searchInput.addEventListener('input', () => {
        clearTimeout(timeout);
        timeout = setTimeout(() => filterTeachers(true), 300);
    });

    // 回车搜索
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            filterTeachers(true);
        }
    });

    // 高级搜索切换
    document.getElementById('advancedToggle').addEventListener('click', () => {
        const advSearch = document.getElementById('advancedSearch');
        advSearch.classList.toggle('hidden');
    });

    // 高级筛选
    document.querySelectorAll('#advancedSearch select').forEach(select => {
        select.addEventListener('change', () => filterTeachers(true));
    });

    // 分页控制
    setupPaginationControls();
}

// 分页控制逻辑（新增输入限制）
function setupPaginationControls() {
    const pageInput = document.getElementById('pageInput');
    const totalPages = () => Math.ceil(STATE.filteredTeachers.length / CONFIG.pageSize);

    // 上一页
    document.getElementById('prevPage').addEventListener('click', () => {
        if (STATE.currentPage > 1) {
            STATE.currentPage--;
            updatePageInput();
            filterTeachers(false);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    });

    // 下一页
    document.getElementById('nextPage').addEventListener('click', () => {
        if (STATE.currentPage < totalPages()) {
            STATE.currentPage++;
            updatePageInput();
            filterTeachers(false);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    });

    // 跳转按钮
    document.getElementById('jumpButton').addEventListener('click', handlePageJump);

    // 输入框事件
    pageInput.addEventListener('input', (e) => {
        // 过滤非数字字符
        let value = e.target.value.replace(/[^0-9]/g, '');
        value = value === '' ? 1 : Math.min(Number(value), totalPages());
        e.target.value = value;
    });

    // 键盘事件
    pageInput.addEventListener('keydown', (e) => {
        // 阻止上下箭头默认行为
        if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
            e.preventDefault();
            handleArrowKeys(e.key);
        }
    });

    // 回车事件
    pageInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handlePageJump();
        }
    });
}

// 处理方向键
function handleArrowKeys(key) {
    const total = Math.ceil(STATE.filteredTeachers.length / CONFIG.pageSize);
    if (key === 'ArrowUp') {
        STATE.currentPage = Math.min(STATE.currentPage + 1, total);
    } else {
        STATE.currentPage = Math.max(STATE.currentPage - 1, 1);
    }
    updatePageInput();
    filterTeachers(false);
}

// 更新输入框值
function updatePageInput() {
    const pageInput = document.getElementById('pageInput');
    pageInput.value = STATE.currentPage;
}

// 分页跳转处理（增强验证）
function handlePageJump() {
    const pageInput = document.getElementById('pageInput');
    const pageNumber = parseInt(pageInput.value, 10) || 1;
    const totalPages = Math.ceil(STATE.filteredTeachers.length / CONFIG.pageSize);

    if (pageNumber < 1 || pageNumber > totalPages) {
        showToast(`请输入 1-${totalPages} 之间的页码`, 'warning');
        pageInput.value = STATE.currentPage;
        return;
    }

    STATE.currentPage = pageNumber;
    filterTeachers(false);
}

// 搜索过滤逻辑
function filterTeachers(resetPage = true) {
    if (STATE.isError) return;

    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    const college = document.getElementById('collegeSelect').value;
    const department = document.getElementById('departmentSelect').value;
    const gender = document.getElementById('genderSelect').value;

    const startTime = performance.now();
    
    // 过滤逻辑
    STATE.filteredTeachers = STATE.teachers.filter(teacher => {
        const nameMatch = teacher.name.toLowerCase().includes(searchTerm);
        const introMatch = teacher.intro.toLowerCase().includes(searchTerm);
        return (nameMatch || introMatch) &&
            (!college || teacher.college === college) &&
            (!department || teacher.department === department) &&
            (!gender || teacher.gender === gender);
    });

    // 更新统计
    document.getElementById('resultCount').textContent = STATE.filteredTeachers.length;
    document.getElementById('searchTime').textContent = 
        (performance.now() - startTime).toFixed(2);

    // 重置分页
    if (resetPage) {
        STATE.currentPage = 1;
        updatePageInput();
    }

    updatePagination();
    renderTeachers();
}

// 分页状态更新
function updatePagination() {
    const totalPages = Math.ceil(STATE.filteredTeachers.length / CONFIG.pageSize);
    document.getElementById('totalPages').textContent = totalPages;
    updatePageInput();
    
    // 禁用按钮状态
    document.getElementById('prevPage').disabled = STATE.currentPage === 1;
    document.getElementById('nextPage').disabled = STATE.currentPage === totalPages;

    // 输入框最大限制
    document.getElementById('pageInput').max = totalPages;
}

// 渲染教师卡片
function renderTeachers() {
    const container = document.getElementById('teacherContainer');
    const start = (STATE.currentPage - 1) * CONFIG.pageSize;
    const end = start + CONFIG.pageSize;
    const teachersToShow = STATE.filteredTeachers.slice(start, end);
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();

    if (!teachersToShow.length) {
        container.innerHTML = `
            <div class="col-span-full text-center py-12" style="margin-bottom: 200px;">
                <div class="text-black-400 font-bold text-4xl mb-4">🔍 <br> 没有找到匹配的教师</div>
                <button onclick="clearSearch()" 
                    class="px-4 py-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors">
                    ✕ 清除搜索条件
                </button>
            </div>`;
        return;
    }

    container.innerHTML = teachersToShow.map(teacher => `
        <div class="bg-white rounded-xl shadow-md p-4 relative card-hover">
            <div class="absolute right-5 top-5">
                <img src="./img/白色透明格式.png" class="w-10 h-10">
            </div>
            <div class="aspect-[3/4] overflow-hidden rounded-lg mb-4 bg-gray-100">
                <img src="${teacher.avatar}" 
                     loading="lazy"
                     class="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                     alt="${teacher.name}照片">
            </div>
            <h3 class="text-xl font-bold mb-2">${highlightText(teacher.name, searchTerm)}</h3>
            <div class="text-sm text-gray-500 mb-2">
                <span>${teacher.department}</span> | 
                <span>${teacher.college}</span>
            </div>
            <div class="flex flex-wrap gap-2 mb-3">
                ${teacher.tags.map(tag => `
                    <span class="px-2 py-1 bg-blue-50 text-blue-600 text-xs rounded-full">
                        ${tag}
                    </span>
                `).join('')}
            </div>
            <p class="text-sm text-gray-600 line-clamp-3 mb-4">
                ${highlightText(teacher.intro, searchTerm)}
            </p>
            <a href="${teacher.link}" 
               class="inline-block w-full text-center py-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors">
               查看详情 →
            </a>
        </div>
    `).join('');
}

// 工具函数
function highlightText(text, term) {
    return term ? text.replace(new RegExp(term, 'gi'), '<mark>$&</mark>') : text;
}

function clearSearch() {
    document.getElementById('searchInput').value = '';
    document.getElementById('collegeSelect').value = '';
    document.getElementById('departmentSelect').value = '';
    document.getElementById('genderSelect').value = '';
    filterTeachers(true);
}

// 全局搜索联动
function handleGlobalSearch() {
    const searchInput = document.getElementById('globalSearch');
    const keyword = searchInput.value.trim();
    if (keyword) {
        window.location.href = `all.html?q=${encodeURIComponent(keyword)}`;
    }
}

// 加载状态管理
function showLoading() {
    document.getElementById('loadingOverlay').classList.remove('hidden');
}

function hideLoading() {
    document.getElementById('loadingOverlay').classList.add('hidden');
}

// 错误处理
function handleLoadError(error) {
    STATE.isError = true;
    document.getElementById('teacherContainer').innerHTML = `
        <div class="col-span-full text-center py-12" style="margin-bottom: 200px;">
            <div class="text-red-500 text-4xl mb-4">⚠️ <br> 数据加载失败</div>
            <div class="text-sm text-gray-400 mb-4">${error.message}</div>
            <button onclick="window.location.reload()" 
                    class="px-4 py-2 bg-red-100 text-red-500 rounded-lg hover:bg-red-200">
                重新加载
            </button>
        </div>`;
}

// 消息提示
function showToast(message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = `px-4 py-2 rounded-lg ${{
        success: 'bg-green-100 text-green-700',
        error: 'bg-red-100 text-red-700',
        info: 'bg-blue-100 text-blue-700'
    }[type]}`;
    toast.textContent = message;
    
    const container = document.getElementById('toastContainer');
    container.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
}

// 启动初始化
document.addEventListener('DOMContentLoaded', initialize);

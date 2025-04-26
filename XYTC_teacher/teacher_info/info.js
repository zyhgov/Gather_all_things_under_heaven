    // 搜索功能实现
    function handleGlobalSearch() {
        const searchInput = document.getElementById('globalSearch');
        const keyword = searchInput.value.trim();
        if (keyword) {
            window.location.href = `https://zyhorg.ac.cn/XYTC_teacher/all.html?q=${encodeURIComponent(keyword)}`;
        }
    }

    // 回车键触发搜索
    document.getElementById('globalSearch').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleGlobalSearch();
        }
    });
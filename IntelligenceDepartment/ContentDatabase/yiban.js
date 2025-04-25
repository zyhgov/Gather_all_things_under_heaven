        // 图片放大功能
        function toggleImage(imgContainer) {
            imgContainer.classList.toggle('fullscreen');
            document.querySelector('.close-button').style.display = 
                imgContainer.classList.contains('fullscreen') ? 'block' : 'none';
        }

        function closeImage() {
            const imgContainer = document.querySelector('.image-container');
            imgContainer.classList.remove('fullscreen');
            document.querySelector('.close-button').style.display = 'none';
        }

        // 搜索功能
        function toggleSearch() {
            document.getElementById('header-search').classList.toggle('active');
        }

        document.querySelector('.search-box form').addEventListener('submit', function(e) {
            e.preventDefault();
            const query = this.q.value.trim();
            if(query) {
                window.location.href = `https://zyhorg.ac.cn/IntelligenceDepartment/search.html?q=${encodeURIComponent(query)}`;
                // window.location.href = `http://127.0.0.1:5500/IntelligenceDepartment/search.html?q=${encodeURIComponent(query)}`;
                // window.location.href = `../search.html?q=${encodeURIComponent(query)}`;
            }
        });
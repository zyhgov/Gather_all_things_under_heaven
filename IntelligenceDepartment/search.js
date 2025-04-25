        // 新增排序状态
        let currentSort = 'relevance';
        // 配置常量
        const ITEMS_PER_PAGE = 10;
        let currentPage = 1;
        let totalItems = 0;
        let searchQuery = '';
        let searchDuration = 0;

        // 测试数据
        let articles = []; // 声明空数组
  // 新增加载JSON数据的函数
  async function loadData() {
    try {
      const response = await fetch('data.json');
      const data = await response.json();
      articles = data.articles;
      initializeSearch(); // 数据加载完成后初始化搜索
    } catch (error) {
      console.error('数据加载失败:', error);
      document.getElementById('searchResults').innerHTML = '<div class="no-results">数据加载失败，请检查控制台</div>';
    }
  }

  // 将原有DOMContentLoaded事件处理改为：
  document.addEventListener('DOMContentLoaded', () => {
    loadData(); // 开始加载数据
  });

  // 将原有初始化搜索的代码封装到函数中
  function initializeSearch() {
    searchQuery = getQueryParam('q') || '';
    document.getElementById('searchInput').value = searchQuery;
    performSearch(searchQuery);
  }



        // 主题配置
        const THEMES = {
            day: {
                primary: '#1a365d',
                bg: 'linear-gradient(15deg, #f7fafc 0%, #edf2f7 100%)',
                text: '#2d3748',
                cardBg: 'rgba(255, 255, 255, 0.95)'
            },
            night: {
                primary: '#2c5282',
                bg: 'linear-gradient(215deg, #1a202c 0%, #2d3748 100%)',
                text: '#e2e8f0',
                cardBg: 'rgba(26, 32, 44, 0.95)'
            }
        };

        // 初始化加载
        document.addEventListener('DOMContentLoaded', () => {
            searchQuery = getQueryParam('q') || '';
            document.getElementById('searchInput').value = searchQuery;
            performSearch(searchQuery);
        });

        // 核心搜索功能
        function performSearch(query) {
            const startTime = performance.now();
            const filtered = query ? fuzzySearch(query, articles) : [...articles];
            totalItems = filtered.length;
            searchDuration = (performance.now() - startTime).toFixed(2);
            
            renderResults(filtered);
            renderPagination();
            updateSearchStats();
        }

        // 模糊搜索
        function fuzzySearch(query, items) {
    const keywords = query.toLowerCase().split(/\s+/).filter(Boolean);
    if (!keywords.length) return items;

    return items.filter(item => {
        const searchContent = [
            item.title,
            item.source,
            ...item.tags,
            item.abstract
        ].join(' ').toLowerCase();

        // 权重计算逻辑
        let matchScore = 0;
        
        keywords.forEach(kw => {
            // 完整匹配权重最高
            if (searchContent.includes(kw)) {
                matchScore += 3;
                return;
            }
            
            // 部分连续匹配（至少2个连续字符）
            const partialMatch = kw.split('').some((_, i) => {
                const substr = kw.slice(0, i+2);
                return substr.length >= 2 && searchContent.includes(substr);
            });
            
            if (partialMatch) matchScore += 1;
        });

        // 至少有一个完整匹配 或者 总评分超过阈值
        return matchScore >= keywords.length * 2 || 
               keywords.some(kw => searchContent.includes(kw));
    });
}

        // 渲染结果
        // 修改渲染函数添加图片
// 修改后的renderResults函数
function renderResults(items) {
    const container = document.getElementById('searchResults');
    const paginatedData = items.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
    );
    
    container.innerHTML = `
        <div class="sort-controls">
            <span>排序方式：</span>
            <select class="sort-select" id="sortOrder" onchange="updateSort()">
                <option value="relevance" ${currentSort === 'relevance' ? 'selected' : ''}>相关性排序</option>
                <option value="date_asc" ${currentSort === 'date_asc' ? 'selected' : ''}>时间升序</option>
                <option value="date_desc" ${currentSort === 'date_desc' ? 'selected' : ''}>时间降序</option>
            </select>
        </div>
        ${paginatedData.map(article => `
            <article class="intel-document-card">
                <!-- 左侧图片 -->
                <img src="${article.image}" class="result-image" alt="情报封面">
                
                <!-- 右侧内容 -->
                <div class="card-content-wrapper">
                    <div class="title-section">
                        <h2 class="document-title">
                            ${article.url ? 
                                `<a href="${article.url}" target="_blank" class="title-link">${highlightText(article.title, searchQuery)}</a>` :
                                highlightText(article.title, searchQuery)
                            }
                            ${renderIntelMarkers(article)}
                        </h2>
                    </div>
                    <div class="content-section">
                        <div class="document-meta">
                            <span>来源：${highlightText(article.source, searchQuery)}</span>
                            <span>日期：${article.date}</span>
                        </div>
                        <div class="document-tags">
                            ${article.tags.map(tag => `
                                <span class="document-tag">${highlightText(tag, searchQuery)}</span>
                            `).join('')}
                        </div>
                        <p class="document-abstract">${highlightText(article.abstract, searchQuery)}</p>
                    </div>
                </div>
            </article>
        `).join('') || `<div class="no-results">情报本厅 <br> 未发现相关情报数据</div>`}
    `;
}
        // 新增排序处理函数
        function sortResults(items) {
            switch(currentSort) {
                case 'date_asc':
                    return items.sort((a, b) => new Date(a.date) - new Date(b.date));
                case 'date_desc':
                    return items.sort((a, b) => new Date(b.date) - new Date(a.date));
                case 'relevance':
                default:
                    return items.sort((a, b) => {
                        // 相关性评分计算（示例）
                        const getScore = (item) => {
                            let score = 0;
                            if (item.title.toLowerCase().includes(searchQuery)) score += 100;
                            if (item.abstract.toLowerCase().includes(searchQuery)) score += 50;
                            return score;
                        };
                        return getScore(b) - getScore(a);
                    });
            }
        }

        // 更新排序函数
        function updateSort() {
            currentSort = document.getElementById('sortOrder').value;
            performSearch(searchQuery);
        }

        // 修改核心搜索函数
        function performSearch(query) {
            const startTime = performance.now();
            let filtered = query ? fuzzySearch(query, articles) : [...articles];
            
            // 添加排序逻辑
            filtered = sortResults(filtered);
            
            totalItems = filtered.length;
            searchDuration = (performance.now() - startTime).toFixed(2);
            
            renderResults(filtered);
            renderPagination();
            updateSearchStats();
        }

        // 修改分页渲染函数
        function renderPagination() {
            const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);
            const container = document.createElement('div');
            container.className = 'pagination';
            
            // 保持分页按钮在搜索结果底部
            const resultsContainer = document.getElementById('searchResults');
            resultsContainer.insertAdjacentHTML('beforeend', `
                ${Array.from({length: totalPages}, (_, i) => `
                    <div class="page-item ${i+1 === currentPage ? 'active' : ''}" 
                         onclick="changePage(${i+1})">${i+1}</div>
                `).join('')}
            `);
        }
        // 分页功能
        function renderPagination() {
            const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);
            const container = document.createElement('div');
            container.className = 'pagination';
            
            for(let i = 1; i <= totalPages; i++) {
                container.innerHTML += `
                    <div class="page-item ${i === currentPage ? 'active' : ''}" 
                         onclick="changePage(${i})">${i}</div>
                `;
            }
            
            document.getElementById('searchResults').appendChild(container);
        }

        // 更新统计信息
        function updateSearchStats() {
            const statsContainer = document.createElement('div');
            statsContainer.className = 'search-stats';
            statsContainer.innerHTML = `
                找到约 ${totalItems} 条结果（用时 ${searchDuration} 秒）
            `;
            document.getElementById('searchResults').prepend(statsContainer);
        }

        // 分页切换
        function changePage(newPage) {
            currentPage = newPage;
            performSearch(searchQuery);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }

        // 智能推荐
        function getSmartSuggestions(query) {
            if (!query) return articles.slice(0, 5);
            
            const keyword = query.toLowerCase().trim();
            const results = [];
            
            for (const item of articles) {
                let score = 0;
                
                if (item.title.toLowerCase().includes(keyword)) {
                    score += 100 - item.title.toLowerCase().indexOf(keyword);
                    results.push({ ...item, score });
                    continue;
                }
                
                const fields = [item.source, ...item.tags, item.abstract];
                for (const text of fields) {
                    const index = text.toLowerCase().indexOf(keyword);
                    if (index > -1) score += 50 - index;
                }
                
                if (score > 0) results.push({ ...item, score });
                if (results.length >= 100) break;
            }
            
            return results.sort((a, b) => b.score - a.score).slice(0, 5);
        }

        // 显示搜索建议
        function showSearchSuggestions(query) {
            const suggestions = getSmartSuggestions(query);
            const container = document.getElementById('searchSuggestions');
            
            if (!query || suggestions.length === 0) {
                container.style.display = 'none';
                return;
            }

            container.innerHTML = suggestions.map(item => `
                <div class="suggestion-item" onclick="selectSuggestion('${item.title}')">
                    <div class="suggestion-title">${highlightMatch(item.title, query)}</div>
                    <div class="suggestion-tags">
                        ${item.tags.map(tag => `
                            <span class="tag">${highlightMatch(tag, query)}</span>
                        `).join('')}
                    </div>
                </div>
            `).join('');
            container.style.display = 'block';
        }

        // 高亮处理
        function highlightText(text, query) {
            if(!query) return text;
            const regex = new RegExp(`(${escapeRegExp(query)})`, 'gi');
            return text.replace(regex, '<span class="highlight">$1</span>');
        }

        function highlightMatch(text, query) {
            return highlightText(text, query);
        }

        function escapeRegExp(string) {
            return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        }

        // 情报标记
        function renderIntelMarkers(article) {
            const markers = [];
            if(article.tags.includes('机密')) markers.push('🔒');
            if(article.tags.includes('紧急')) markers.push('⚠️');
            if(isNewArticle(article.date)) markers.push('🆕');
            return markers.map(m => `<span class="intel-marker">${m}</span>`).join('');
        }

        function isNewArticle(dateStr) {
            const articleDate = new Date(dateStr);
            const sevenDaysAgo = new Date();
            sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
            return articleDate > sevenDaysAgo;
        }

        // 选择建议
        function selectSuggestion(keyword) {
            document.getElementById('searchInput').value = keyword;
            document.getElementById('searchSuggestions').style.display = 'none';
            performSearch(keyword);
        }

        // 工具函数
        function getQueryParam(name) {
            const params = new URLSearchParams(window.location.search);
            return params.get(name)?.trim() || '';
        }

        // 主题切换
        function toggleTheme(theme) {
            const root = document.documentElement;
            root.style.setProperty('--intel-primary', THEMES[theme].primary);
            root.style.background = THEMES[theme].bg;
            root.style.setProperty('--intel-text', THEMES[theme].text);
            root.style.setProperty('--card-bg', THEMES[theme].cardBg);
        }

        // 事件监听
        let debounceTimer;
        document.getElementById('searchInput').addEventListener('input', function(e) {
            clearTimeout(debounceTimer);
            debounceTimer = setTimeout(() => {
                searchQuery = e.target.value;
                currentPage = 1;
                performSearch(searchQuery);
                showSearchSuggestions(searchQuery);
            }, 300);
        });

        document.querySelector('form').addEventListener('submit', function(e) {
            e.preventDefault();
            performSearch(document.getElementById('searchInput').value);
        });

        document.addEventListener('click', (e) => {
            if (!e.target.closest('.intel-search-box')) {
                document.getElementById('searchSuggestions').style.display = 'none';
            }
        });
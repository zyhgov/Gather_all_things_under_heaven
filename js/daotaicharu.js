document.addEventListener('DOMContentLoaded', () => {
    const navbar = document.querySelector('.navbar');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 10) {  // 滚动超过10px时
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
});
// 新闻数据
const newsData = [
    {
        month: "一月",
        year: "2025",
        imageUrl: "http://www.news.cn/20250115/65877e3f8d884a349be2fbe2c6fd2917/eMLnTUZe4irzR4LC.jpg",
        topic: "国际快讯",
        title: "尹锡悦今日10时33分被捕",
        time: "2025-01-15",
        link: "/news/2025/1/20250115_GJ_001.html"
    },{
        month: "一月",
        year: "2025",
        imageUrl: "/news/news_img/sgp.jpg",
        topic: "历史课堂",
        title: "石国鹏 : 人文精神的起源",
        time: "2025-01-15",
        link: "/news/2025/1/sgp_20250114_001.html"
    },{
        month: "一月",
        year: "2025",
        imageUrl: "/news/news_img/Conan2025_biaoz.webp",
        topic: "《名侦探柯南》制作委员会",
        title: "名侦探柯南：独眼的残像 维基百科",
        time: "2025-01-15",
        link: "/news/2025/1/Conan2025.html"
    },{
        month: "一月",
        year: "2025",
        imageUrl: "/news/news_img/nhk.jpg",
        topic: "NHK",
        title: "中国军队东部战区代表团将时隔6年访日",
        time: "2025-01-14",
        link: "/news/2025/1/20250114_zffr.html"
    },{
        month: "一月",
        year: "2025",
        imageUrl: "/news/news_img/text.jpg",
        topic: "Website 安全声明",
        title: "长期承诺保护安全隐私",
        time: "2025-01-14",
        link: "/news/2025/1/Safety-Statement.html"
    },
    {
        month: "一月",
        year: "2025",
        imageUrl: "https://picx.zhimg.com/v2-d611170694de74c0ed37356ddfb66e28_1440w.jpg",
        topic: "测试页面",
        title: "此页面用于测试页面样式布局",
        time: "2025-01-14",
        link: "/news/2025/1/test.html"
    },
    {
        month: "十二月",
        year: "2024",
        imageUrl: "https://www.gov.cn/yaowen/liebiao/202412/W020241231696161575742_ORIGIN.JPG",
        topic: "新华社",
        title: "国家主席习近平发表二〇二五年新年贺词",
        time: "2024-12-31",
        link: "/news/2024/12/ny2025.html"
    }
];

// 插入新闻内容的函数
function insertNews(data, keyword = "", start = 0, count = 5) {
    const container = document.getElementById('news-container');
    
    let currentMonth = ""; // 用来判断是否需要添加月份和年份

    data.slice(start, start + count).forEach(news => {
        // 如果月份变化了，插入新的月份和年份
        if (currentMonth !== `${news.month} ${news.year}`) {
            currentMonth = `${news.month} ${news.year}`;
            const dateContainer = document.createElement('div');
            dateContainer.classList.add('date-container');
            dateContainer.innerHTML = `
                <p>
                    <span class="m">${news.month}</span>
                    <span class="y">${news.year}</span>
                </p>
            `;
            container.appendChild(dateContainer);
            container.appendChild(document.createElement('hr'));
        }

        // 高亮标题中的关键词
        const highlightedTitle = highlightText(news.title, keyword);

        // 创建一个链接包裹整个新闻项
        const newsLink = document.createElement('a');
        newsLink.href = news.link;
        newsLink.classList.add('news-box-link'); // 添加类名以便应用样式

        // 创建新闻项的内容
        newsLink.innerHTML = `
            <div class="news-box">
                <div class="image">
                    <img src="${news.imageUrl}" alt="News Image">
                </div>
                <div class="content">
                    <div class="topic">${news.topic}</div>
                    <div class="title">${highlightedTitle}</div>
                    <div class="time">${news.time}</div>
                </div>
            </div>
        `;

        // 将链接添加到容器中
        container.appendChild(newsLink);
    });

    // 检查是否还有更多的新闻可以加载
    if (data.length > start + count) {
        addLoadMoreButton(data, keyword, start + count);
    }
}

// 页面加载时插入前5条新闻
window.onload = function() {
    insertNews(newsData, '', 0, 5);
};
function addLoadMoreButton(data, keyword, nextStart) {
    const loadMoreButton = document.createElement('button');
    loadMoreButton.textContent = '加载更多';
    loadMoreButton.onclick = function() {
        this.remove(); // 移除加载更多按钮
        insertNews(data, keyword, nextStart, 5); // 加载下一批新闻
    };
    document.getElementById('pagination').appendChild(loadMoreButton);
}

// 高亮显示搜索词
function highlightText(text, keyword) {
    if (!keyword) return text;
    const regex = new RegExp(`(${keyword})`, 'gi');
    return text.replace(regex, `<span class="highlight">$1</span>`);
}

// 模糊搜索函数
function searchNews() {
    const keyword = document.getElementById('search-input').value.trim();
    const topic = document.getElementById('topic-select').value;
    const year = document.getElementById('year-select').value;
    const month = document.getElementById('month-select').value;
    
    let filteredData = [...newsData];

    // 根据选择的筛选条件过滤新闻
    if (topic) filteredData = filteredData.filter(news => news.topic === topic);
    if (year) filteredData = filteredData.filter(news => news.year === year);
    if (month) filteredData = filteredData.filter(news => news.month === month);

    // 根据关键词进行模糊搜索
    if (keyword) {
        filteredData = filteredData.filter(news =>
            news.title.toLowerCase().includes(keyword.toLowerCase()) || 
            news.topic.toLowerCase().includes(keyword.toLowerCase()) ||
            news.time.toLowerCase().includes(keyword.toLowerCase())
        );
    }

    // 对搜索结果按标题匹配度排序，取前5个
    filteredData = filteredData.sort((a, b) => {
        return (b.title.toLowerCase().match(keyword.toLowerCase()) || []).length - 
               (a.title.toLowerCase().match(keyword.toLowerCase()) || []).length;
    }).slice(0, 5);  // 只取最匹配的5条数据

    // 清空现有新闻内容并重新插入
    document.getElementById('news-container').innerHTML = '';
    if (filteredData.length > 0) {
        insertNews(filteredData, keyword);
    } else {
        // 显示提示信息
        document.getElementById('news-container').innerHTML = '<p class="no">没有找到匹配的内容</p>';
    }

    // 更新推荐条目
    updateRecommendations(filteredData, keyword);
}

// 更新推荐条目
function updateRecommendations(filteredData, keyword) {
    const recommendationContainer = document.getElementById('recommendations');
    recommendationContainer.innerHTML = ''; // 清空推荐列表

    if (filteredData.length === 0) {
        const noResults = document.createElement('p');
        noResults.textContent = "没有找到匹配的内容";
        recommendationContainer.appendChild(noResults);
        return;
    }

    // 显示前5个推荐条目
    filteredData.slice(0, 5).forEach(news => {
        const highlightedTitle = highlightText(news.title, keyword);

        const recommendationItem = document.createElement('div');
        recommendationItem.classList.add('recommendation-item');
        recommendationItem.innerHTML = `
            <div class="title">${highlightedTitle}</div>
            <div class="topic">${news.topic}</div>
        `;
        recommendationContainer.appendChild(recommendationItem);
    });
}

// 监听输入框变化，实时搜索
document.getElementById('search-input').addEventListener('keyup', searchNews);

// 页面加载时插入所有新闻（可选）
window.onload = function() {
    insertNews(newsData, '');
    updateRecommendations(newsData, ''); // 加载推荐条目
};

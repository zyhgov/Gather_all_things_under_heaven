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
 // 显示加载提示
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('loading').style.display = 'block';
});
// 新闻数据
const newsData = [
    {
        month: "三月",
        year: "2025",
        imageUrl: "/asset/open_img/unhub_xytc_ds.svg",
        topic: "大模型",
        title: "襄阳职业技术学院专属版DeepSeek智能助手：一位职教学子的技术实践与探索",
        time: "2025-03-06",
        link: "/news/2025/3/xytc-DeepSeek.html"
    },{
        month: "二月",
        year: "2025",
        imageUrl: "/news/news_img/2/vid-placeholder.webp",
        topic: "联合库UNHub游戏",
        title: "世界盒子 WorldBox 0.14.2版本 解压即玩",
        time: "2025-02-25",
        link: "/news/2025/2/WorldBox.html"
    },{
        month: "二月",
        year: "2025",
        imageUrl: "/news/news_img/2/cities-skylines-ii-keyart-clean-3200px.jpg",
        topic: "联合库UNHub游戏",
        title: "城市：天际线 Cities: Skylines 豪华中文收藏版 解压即玩",
        time: "2025-02-25",
        link: "/news/2025/2/Cities-Skylines-i.html"
    },{
        month: "二月",
        year: "2025",
        imageUrl: "/news/news_img/wisdom.jpg",
        topic: "大模型",
        title: "来自阿里云Qwen MAX蒸馏训练的WINDOM文殊大模型",
        time: "2025-02-11",
        link: "/news/2025/2/20250211_wisdom.html"
    },{
        month: "一月",
        year: "2025",
        imageUrl: "/news/news_img/360.jpg",
        topic: "联合库UNHub网络安全中心",
        title: "境外高级持续性威胁（APT）组织百科一览",
        time: "2025-01-31",
        link: "/news/2025/1/360apt.html"
    },{
        month: "一月",
        year: "2025",
        imageUrl: "/asset/NextBook.gif",
        topic: "Notion Wikis",
        title: "杖雍皓zyhorg 联合库UNHub 公开数据库Wikis百科 - Notion",
        time: "2025-01-31",
        link: "/news/2025/1/notion.html"
    },{
        month: "一月",
        year: "2025",
        imageUrl: "../news/news_img/paper.jpg",
        topic: "襄阳职业技术学院（毕业）论文",
        title: "基于 Hadoop 平台的就业趋势预测",
        time: "2025-01-31",
        link: "/news/2025/1/20250131_paper.html"
    },{
        month: "一月",
        year: "2025",
        imageUrl: "../news/news_img/she_2025.jpg",
        topic: "RockstarGames",
        title: "在线模式中欢庆农历新年",
        time: "2025-01-23",
        link: "/news/2025/1/20250123_GJ_003.html"
    },{
        month: "一月",
        year: "2025",
        imageUrl: "../news/news_img/JFK_limousine.png",
        topic: "国际快讯",
        title: "特朗普总统下令解密肯尼迪总统遇刺案所有文件",
        time: "2025-01-23",
        link: "/news/2025/1/20250123_GJ_002.html"
    },{
        month: "一月",
        year: "2025",
        imageUrl: "../news/news_img/kejie.jpg",
        topic: "国际快讯",
        title: "中国围棋协会关于第29届LG杯决赛的声明",
        time: "2025-01-23",
        link: "/news/2025/1/20250123_GJ_001.html"
    },{
        month: "一月",
        year: "2025",
        imageUrl: "../news/news_img/benchmark.jpg",
        topic: "DeepSeek",
        title: "DeepSeek-R1 发布，性能对标 OpenAI o1 正式版",
        time: "2025-01-20",
        link: "/news/2025/1/20250120_GN_001.html"
    },{
        month: "一月",
        year: "2025",
        imageUrl: "../news/news_img/info01.jpg",
        topic: "联合库UNHub",
        title: "联合库UNHub网站信息公示",
        time: "2025-01-20",
        link: "/news/2025/1/MyWebsiteInfo.html"
    },{
        month: "一月",
        year: "2025",
        imageUrl: "../news/news_img/r/kt (1).jpg",
        topic: "小红书",
        title: "中国十二生肖Hello Kitty限定版头像",
        time: "2025-01-20",
        link: "/news/2025/1/20250120_kt.html"
    },{
        month: "一月",
        year: "2025",
        imageUrl: "../news/news_img/r/jng (2).jpg",
        topic: "小红书",
        title: "中国十二生肖杰尼龟限定版头像",
        time: "2025-01-20",
        link: "/news/2025/1/20250120_jng.html"
    },{
        month: "一月",
        year: "2025",
        imageUrl: "../news/news_img/r/xhl (1).jpg",
        topic: "小红书",
        title: "中国十二生肖小火龙限定版头像",
        time: "2025-01-20",
        link: "/news/2025/1/20250120_xhl.html"
    },{
        month: "一月",
        year: "2025",
        imageUrl: "../news/news_img/r/kdy (1).jpg",
        topic: "小红书",
        title: "中国十二生肖可达鸭限定版头像",
        time: "2025-01-20",
        link: "/news/2025/1/20250120_kdy.html"
    },{
        month: "一月",
        year: "2025",
        imageUrl: "../news/news_img/r/mll (1).jpg",
        topic: "小红书",
        title: "中国十二生肖毛利兰限定版头像",
        time: "2025-01-20",
        link: "/news/2025/1/20250120_mll.html"
    },{
        month: "一月",
        year: "2025",
        imageUrl: "../news/news_img/r/gtxy (1).jpg",
        topic: "小红书",
        title: "中国十二生肖工藤新一&江户川柯南限定版头像",
        time: "2025-01-20",
        link: "/news/2025/1/20250120_gtxy.html"
    },{
        month: "一月",
        year: "2025",
        imageUrl: "../news/news_img/r/mq (1).jpg",
        topic: "小红书",
        title: "中国十二生肖米老鼠限定版头像",
        time: "2025-01-20",
        link: "/news/2025/1/20250120_mickey.html"
    },{
        month: "一月",
        year: "2025",
        imageUrl: "../news/news_img/r/jfm (1).jpg",
        topic: "小红书",
        title: "中国十二生肖加菲猫限定版头像",
        time: "2025-01-20",
        link: "/news/2025/1/20250120_garfield.html"
    },{
        month: "一月",
        year: "2025",
        imageUrl: "../news/news_img/r/mld (1).jpg",
        topic: "小红书",
        title: "中国十二生肖美乐蒂限定版头像",
        time: "2025-01-20",
        link: "/news/2025/1/20250120_melody.html"
    },{
        month: "一月",
        year: "2025",
        imageUrl: "../news/news_img/r/sdz (1).jpg",
        topic: "小红书",
        title: "新年史迪仔限定版头像",
        time: "2025-01-20",
        link: "/news/2025/1/20250120_stitch.html"
    },{
        month: "一月",
        year: "2025",
        imageUrl: "../news/news_img/hanzheng.jpeg",
        topic: "国际快讯",
        title: "中国派出副主席韩正出席特朗普就职典礼",
        time: "2025-01-18",
        link: "/news/2025/1/20250118_GJ_001.html"
    },{
        month: "一月",
        year: "2025",
        imageUrl: "https://media-rockstargames-com.akamaized.net/tina-uploads/posts/4kk9o9a811o27k/65e6332db34bacc884b2a59e73e5df26208fcdc3.jpg",
        topic: "GTA在线模式",
        title: "在档案：暴力破解中潜入桑库多堡垒",
        time: "2025-01-16",
        link: "/news/2025/1/20250116_GJ_002.html"
    },{
        month: "一月",
        year: "2025",
        imageUrl: "../news/news_img/Donald J. Trump.jpeg",
        topic: "国际快讯",
        title: "唐纳德·约翰·特朗普官方肖像发布",
        time: "2025-01-16",
        link: "/news/2025/1/20250116_GJ_001.html"
    },{
        month: "一月",
        year: "2025",
        imageUrl: "../news/news_img/W020250115386588485834.jpg",
        topic: "审查调查",
        title: "重庆市铜梁区委书记谭庆接受纪律审查和监察调查",
        time: "2025-01-15",
        link: "/news/2025/1/20250115_GN_003.html"
    },{
        month: "一月",
        year: "2025",
        imageUrl: "../news/news_img/screen-shot-preview.jpg",
        topic: "GitHub",
        title: "通过在线拖拽模块快速生成简历",
        time: "2025-01-15",
        link: "/news/2025/1/20250115_GN_002.html"
    },{
        month: "一月",
        year: "2025",
        imageUrl: "../news/news_img/gongshi.jpg",
        topic: "教育部",
        title: "教育部关于拟同意设置本科高等学校的公示",
        time: "2025-01-15",
        link: "/news/2025/1/20250115_GN_001.html"
    },{
        month: "一月",
        year: "2025",
        imageUrl: "../news/news_img/eMLnTUZe4irzR4LC.jpg",
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
    const loading = document.getElementById('loading');
    
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

    // 隐藏加载提示
    loading.style.display = 'none';

    // 检查是否还有更多的新闻可以加载
    if (data.length > start + count) {
        addLoadMoreButton(data, keyword, start + count);
    }
}

// 添加加载更多按钮
function addLoadMoreButton(data, keyword, nextStart) {
    const loadMoreButton = document.createElement('button');
    loadMoreButton.textContent = '加载更多';
    loadMoreButton.onclick = function() {
        const loading = document.getElementById('loading');
        loading.style.display = 'block'; // 显示加载提示
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
    const loading = document.getElementById('loading');
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

    // 显示加载提示
    loading.style.display = 'block';

    // 清空现有新闻内容并重新插入
    document.getElementById('news-container').innerHTML = '';
    if (filteredData.length > 0) {
        insertNews(filteredData, keyword);
    } else {
        // 隐藏加载提示
        loading.style.display = 'none';
        // 显示提示信息
        document.getElementById('news-container').innerHTML = '<p class="no">没有找到匹配的内容</p>';
    }
}

// 页面加载时插入前5条新闻
window.onload = function() {
    // 隐藏加载提示
    const loading = document.getElementById('loading');
    loading.style.display = 'none';
    
    // 插入新闻数据
    insertNews(newsData, '');
};

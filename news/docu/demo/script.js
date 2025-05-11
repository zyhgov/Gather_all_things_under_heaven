$(document).ready(function () {
    // 模拟新闻数据
    const newsData = [
        { id: 1, title: "公司扩展领导层", category: "公司", date: "2025-05-07", description: "阅读 Sam 今天早些时候与公司分享的信息。" },
        { id: 2, title: "OpenAI 结构演变", category: "公司", date: "2025-05-05", description: "OpenAI 董事会关于将营利实体转变为公益公司的更新，强化了其使命驱动的结构，在非营利监督下推动创新。" },
        { id: 3, title: "宣布非营利委员会顾问", category: "公司", date: "2025-04-15", description: "OpenAI 正在任命四位新顾问，以帮助指导其慈善努力。" },
        // ... 更多数据
    ];

    let currentPage = 1;
    const itemsPerPage = 9;
    let filteredData = [...newsData]; // 初始化为所有数据

    // 渲染新闻卡片
    function renderNewsCards(data) {
        const newsContainer = $("#news-container");
        newsContainer.empty();

        for (let i = 0; i < Math.min(itemsPerPage, data.length); i++) {
            const card = `
                <div class="news-item">
                    <div class="info">
                        <p class="category">${data[i].category}</p>
                        <p class="date">${data[i].date}</p>
                    </div>
                    <div class="content">
                        <h3 class="title">${data[i].title}</h3>
                        <p class="description">${data[i].description}</p>
                    </div>
                </div>
            `;
            newsContainer.append(card);
        }
    }

    // 初始化渲染
    renderNewsCards(filteredData);

    // 加载更多按钮逻辑
    $("#load-more-btn").click(function () {
        currentPage++;
        const start = (currentPage - 1) * itemsPerPage;
        const end = start + itemsPerPage;

        if (end > filteredData.length) {
            $(this).text("没有更多内容").prop("disabled", true);
        } else {
            renderNewsCards(filteredData.slice(start, end));
        }
    });

    // 筛选功能
    $("#filter-btn").click(function () {
        $("#filter-modal").show();
    });

    $("#cancel-filter-btn").click(function () {
        $("#filter-modal").hide();
    });

    $("#apply-filter-btn").click(function () {
        const selectedCategories = [];
        const selectedYears = [];

        // 获取选中的类别
        $("#filter-modal .checkbox-group input:checked").each(function () {
            selectedCategories.push($(this).val());
        });

        // 获取选中的年份
        $("#filter-modal .checkbox-group input:checked").each(function () {
            selectedYears.push($(this).val());
        });

        // 过滤数据
        filteredData = newsData.filter(item => {
            const categoryMatch = selectedCategories.length === 0 || selectedCategories.includes(item.category);
            const yearMatch = selectedYears.length === 0 || selectedYears.includes(item.date.split("-")[0]);
            return categoryMatch && yearMatch;
        });

        // 重置分页并重新渲染
        currentPage = 1;
        renderNewsCards(filteredData);
        $("#filter-modal").hide();
    });

    // 排序功能
    $("#sort-btn").click(function () {
        $("#sort-modal").show();
    });

    $("#cancel-sort-btn").click(function () {
        $("#sort-modal").hide();
    });

    $("#apply-sort-btn").click(function () {
        const sortOption = $("input[name='sort']:checked").val();

        // 排序数据
        switch (sortOption) {
            case "newest":
                filteredData.sort((a, b) => new Date(b.date) - new Date(a.date));
                break;
            case "oldest":
                filteredData.sort((a, b) => new Date(a.date) - new Date(b.date));
                break;
            case "alphabetical_asc":
                filteredData.sort((a, b) => a.title.localeCompare(b.title));
                break;
            case "alphabetical_desc":
                filteredData.sort((a, b) => b.title.localeCompare(a.title));
                break;
        }

        // 重置分页并重新渲染
        currentPage = 1;
        renderNewsCards(filteredData);
        $("#sort-modal").hide();
    });

    // 监听滚动事件，为导航栏添加/移除 "scrolled" 类
    window.addEventListener('scroll', function () {
        const navbar = document.getElementById('navbar');
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
});


document.querySelector('.copy-button').addEventListener('click', function () {
    const codeElement = document.getElementById('code-example');
    const text = codeElement.innerText;

    // 创建临时 textarea 元素进行复制
    const tempTextArea = document.createElement('textarea');
    tempTextArea.value = text;
    document.body.appendChild(tempTextArea);
    tempTextArea.select();
    tempTextArea.setSelectionRange(0, 99999); // For mobile devices

    try {
        document.execCommand('copy');
        this.textContent = '已复制'; // 改变按钮文字提示用户
        setTimeout(() => {
            this.textContent = '复制';
        }, 2000);
    } catch (err) {
        alert('复制失败，请手动复制代码。');
    }

    document.body.removeChild(tempTextArea);
});
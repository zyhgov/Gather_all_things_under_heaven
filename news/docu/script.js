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


document.querySelectorAll('.copy-button').forEach(button => {
    button.addEventListener('click', function () {
        const codeElement = this.closest('.code-block').querySelector('code');
        const text = codeElement.innerText;

        const tempTextArea = document.createElement('textarea');
        tempTextArea.value = text;
        document.body.appendChild(tempTextArea);
        tempTextArea.select();
        tempTextArea.setSelectionRange(0, 99999);

        try {
            document.execCommand('copy');
            this.textContent = '已复制';
            setTimeout(() => {
                this.textContent = '复制';
            }, 2000);
        } catch (err) {
            alert('复制失败，请手动复制代码。');
        }

        document.body.removeChild(tempTextArea);
    });
});

document.addEventListener("DOMContentLoaded", function () {
    const sidebarNav = document.querySelector("#sidebar-nav ul");
    const headings = document.querySelectorAll("h1, h2, h3");
    const sections = [];

    let currentH2 = null;

    // 清空默认的 h1 锚点
    sidebarNav.innerHTML = '';

    // 创建回到顶部链接
    const topLink = document.createElement("li");
    const topA = document.createElement("a");
    topA.href = "#top";
    topA.textContent = "↑ 返回顶部";
    topA.classList.add("nav-link", "active");
    topLink.appendChild(topA);
    sidebarNav.appendChild(topLink);

    // 动态生成锚点
    headings.forEach((heading, index) => {
        const id = `section-${index}`;
        heading.setAttribute("id", id);
        sections.push({ id, element: heading });

        const link = document.createElement("a");
        link.href = `#${id}`;
        link.textContent = heading.textContent;
        link.classList.add("nav-link");

        if (heading.tagName === "H2") {
            currentH2 = { el: heading, ul: document.createElement("ul") };
            const li = document.createElement("li");
            link.classList.add("h2-link");
            li.appendChild(link);
            sidebarNav.appendChild(li);
            li.appendChild(currentH2.ul);
        } else if (heading.tagName === "H3" && currentH2) {
            const li = document.createElement("li");
            link.classList.add("h3-link");
            li.appendChild(link);
            currentH2.ul.appendChild(li);
        }
    });

    // 滚动监听高亮
    window.addEventListener("scroll", () => {
        const scrollPosition = window.scrollY + 200; // 偏移量调整

        sections.forEach((section, i) => {
            const nextSection = sections[i + 1];
            const sectionTop = section.element.offsetTop;
            const sectionBottom = nextSection ? nextSection.element.offsetTop : document.body.scrollHeight;

            const navLinks = document.querySelectorAll(".nav-link");
            if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                navLinks.forEach(link => {
                    link.classList.remove("active");
                    if (link.getAttribute("href") === `#${section.id}`) {
                        link.classList.add("active");
                    }
                });
            }
        });
    });

    // 点击锚点平滑滚动
document.querySelectorAll(".nav-link").forEach(link => {
    link.addEventListener("click", function (e) {
        const targetId = this.getAttribute("href");

        if (targetId === "#top") {
            window.scrollTo({ top: 0, behavior: "smooth" });
            e.preventDefault();
        } else if (targetId.startsWith("#")) {
            e.preventDefault();
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: "smooth"
                });
            }
        }
    });
});
});
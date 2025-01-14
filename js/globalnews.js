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
function wrapDivWithLink(divId, linkUrl) {
    // 查找具有指定ID的div元素
    const divElement = document.getElementById(divId);
    
    if (!divElement) {
        console.error(`没有找到ID为 ${divId} 的div`);
        return;
    }

    // 创建一个<a>标签
    const aTag = document.createElement('a');
    aTag.href = linkUrl;
    aTag.classList.add('news-box-link'); // 添加类名以便应用样式

    // 将div的所有子节点移动到<a>标签内
    while (divElement.firstChild) {
        aTag.appendChild(divElement.firstChild);
    }

    // 将<a>标签插入到原来的div中
    divElement.appendChild(aTag);
}

// 示例调用：给ID为news-1的div添加超链接
wrapDivWithLink('znews-1', '/news/2025/1/test.html');
wrapDivWithLink('znews-2', '/news/2024/12/ny2025.html');
wrapDivWithLink('znews-3', '/news/2025/1/Conan2025.html');
wrapDivWithLink('znews-4', '/news/2025/1/20250114_zffr.html');
wrapDivWithLink('snews-1', '/news/2025/1/sgp_20250114_001.html');
wrapDivWithLink('snews-2', '#');
wrapDivWithLink('snews-3', '#');
wrapDivWithLink('snews-4', '#');
wrapDivWithLink('snews-5', '#');
wrapDivWithLink('snews-6', '#');
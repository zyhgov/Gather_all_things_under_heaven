// link
document.querySelectorAll('a').forEach(link => {
    const href = link.getAttribute('href');
    const target = link.getAttribute('target');
    let text = '';

    if (href.includes('.pdf')) {
        text = '（PDFを別タブで開く）';
    } else if (href.includes('.doc')) {
        text = '（Wordをダウンロード）';
    } else if (href.includes('.xls')) {
        text = '（Excelをダウンロード）';
    } else if (href.includes('.ppt')) {
        text = '（PowerPointをダウンロード）';
    } else if (href.includes('.zip')) {
        text = '（Zipをダウンロード）';
    } else if (target === '_blank') {
        text = '（別タブで開く）';
    }

    if (text) {
        link.innerHTML += `<span class="visually-hidden">${text}</span>`;
    }
});

// current
document.addEventListener('DOMContentLoaded', () => {
    const currentPath = location.pathname;
    const parentPath = '/' + location.pathname.split('/').slice(1, 3).join('/') + '/';
    const navLinks = document.querySelectorAll('.header-navi__link');

    navLinks.forEach(link => {
        const linkHref = link.getAttribute('href');
        if (linkHref === currentPath) {
            link.setAttribute('aria-current', 'page');
        } else if (linkHref === parentPath) {
            link.setAttribute('aria-current', 'true');
        }
    });
});

// hover
document.addEventListener('DOMContentLoaded', () => {
    if (window.matchMedia('(hover: hover)').matches) {
        const images = document.querySelectorAll('img[data-hover="1"]');

        images.forEach(img => {
            const originalSrc = img.getAttribute('src');
            const hoverSrc = originalSrc.replace(/(\.\w+)$/, '_on$1');

            img.addEventListener('mouseover', () => {
                img.setAttribute('src', hoverSrc);
            });

            img.addEventListener('mouseout', () => {
                img.setAttribute('src', originalSrc);
            });
        });
    }
});

// header-hamburger
document.querySelector('.header-hamburger').addEventListener('click', function() {
    let expanded = this.getAttribute('aria-expanded');
    if (expanded === 'false') {
        this.setAttribute('aria-expanded', 'true');
    } else if (expanded === 'true') {
        this.setAttribute('aria-expanded', 'false');
    }
});

// header-search-trigger
document.querySelector('.header-search-trigger').addEventListener('click', function() {
    let expanded = this.getAttribute('aria-expanded');
    if (expanded === 'false') {
        this.setAttribute('aria-expanded', 'true');
    } else if (expanded === 'true') {
        this.setAttribute('aria-expanded', 'false');
    }
});

// table scroll
document.querySelectorAll('.table-scroll').forEach(element => {
    element.outerHTML = `<div class="table-scroll-text">次の表は横スクロールできます。</div><div class="table-scroll-wrap table-scroll-wrap--shadow">${element.outerHTML}</div>`;
});

// table scroll - tabindex
function updateTabIndex() {
    const tableScrollWrap = document.querySelector('.table-scroll-wrap');
    if (tableScrollWrap) {
        if (window.innerWidth <= 1023) {
            tableScrollWrap.setAttribute('tabindex', '0');
        } else {
            tableScrollWrap.removeAttribute('tabindex');
        }
    }
}
updateTabIndex();
window.addEventListener('resize', updateTabIndex);

// table scroll - shadow
document.querySelectorAll('.table-scroll-wrap').forEach(tableScrollWrap => {
    tableScrollWrap.addEventListener('scroll', () => {
        const maxScrollLeft = tableScrollWrap.scrollWidth - tableScrollWrap.clientWidth;
        if (tableScrollWrap.scrollLeft >= maxScrollLeft) {
            tableScrollWrap.classList.remove('table-scroll-wrap--shadow');
        } else {
            tableScrollWrap.classList.add('table-scroll-wrap--shadow');
        }
    });
});
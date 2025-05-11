let currentCategory = 'all';
let currentSort = 'desc';
let currentIndex = 0;
const perPage = 6;

// 高亮关键词
function highlightKeyword(text, keyword) {
  if (!keyword) return text;
  const escaped = keyword.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const regex = new RegExp(escaped, 'gi');
  return text.replace(regex, match => `<span class="highlight">${match}</span>`);
}

// 渲染分类标签
function categoryLabel(category) {
  switch (category) {
    case 'news': return '新闻';
    case 'research': return '研究';
    case 'blog': return '博客';
    case 'safety': return '安全';
    case 'science': return '科技';
    case 'Wiki': return 'Wiki';
    default: return '其他';
  }
}
const startTime = performance.now();  // 查询开始时间
function showLoading() {
    $('#loading').show();
}

function hideLoading() {
    $('#loading').hide();
}
// 渲染新闻列表
function renderNews(reset = false) {
  const $list = $('#news-list');
  if (reset) {
    $list.empty();
    currentIndex = 0;
    $('#no-more').hide();
  }

  let filtered = newsData.filter(item =>
    currentCategory === 'all' || item.category === currentCategory
  );

  const keyword = $('#searchInput').val().trim().toLowerCase();
  if (keyword) {
    filtered = filtered.filter(item =>
      item.title.toLowerCase().includes(keyword) ||
      item.desc.toLowerCase().includes(keyword)
    );
  }

  filtered.sort((a, b) =>
    currentSort === 'asc'
      ? new Date(a.date) - new Date(b.date)
      : new Date(b.date) - new Date(a.date)
  );

  const nextItems = filtered.slice(currentIndex, currentIndex + perPage);

  if (nextItems.length === 0 && currentIndex === 0) {
    $list.html('<div class="no-result">没有找到相关内容。</div>');
    $('#load-more').hide();
    $('#no-more').hide();
    return;
  }

  nextItems.forEach(item => {
    const title = highlightKeyword(item.title, keyword);
    const desc = highlightKeyword(item.desc, keyword);
    const link = item.link ? item.link : '#';

    const html = `
      <a href="${link}" target="_blank" class="news-item-link">
        <div class="news-item">
          <div class="news-meta">${categoryLabel(item.category)} ｜ ${item.date}</div>
          <div class="news-title">${title}</div>
          <div class="news-desc">${desc}</div>
        </div>
      </a>
    `;
    $list.append(html);
  });

  currentIndex += perPage;

  if (currentIndex >= filtered.length) {
    $('#load-more').hide();
    $('#no-more').show();
  } else {
    $('#load-more').show();
    $('#no-more').hide();
  }

  const endTime = performance.now();
const usedTime = ((endTime - startTime) / 1000).toFixed(2); // 秒，保留两位小数
const totalCount = filtered.length;

$('#stats').html(`数据库共找到 ${totalCount} 条数据，用时 ${usedTime} 秒`);

}

$(document).ready(function () {
  renderNews(true);

  // 分类按钮切换
  $('.tab').on('click', function () {
    $('.tab').removeClass('active');
    $(this).addClass('active');
    currentCategory = $(this).data('category');
    renderNews(true);
  });

  // 排序切换
  $('#sortSelect').on('change', function () {
    currentSort = $(this).val();
    renderNews(true);
  });

  // 加载更多
  $('#load-more').on('click', function () {
    renderNews(false);
  });

  // 搜索框
  $('#searchInput').on('input', function () {
    renderNews(true);
  });
});

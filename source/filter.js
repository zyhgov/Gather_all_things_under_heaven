// 获取数据并初始化
let allData = [];

// 加载 JSON 数据
fetch('data.json')
  .then(response => response.json())
  .then(data => {
    allData = data; // 存储原始数据
    renderCards(allData); // 初始渲染
  })
  .catch(error => console.error('Error loading JSON:', error));

// 渲染卡片
function renderCards(data) {
  const container = document.getElementById('card-container');
  container.innerHTML = ''; // 清空容器

  if (data.length === 0) {
    // 如果没有数据，显示“没有找到结果”
    const noResultsMessage = document.createElement('div');
    noResultsMessage.className = 'text-center text-gray-500 py-4 text-3xl';
    noResultsMessage.textContent = '没有找到结果';
    container.appendChild(noResultsMessage);
    return;
  }

  data.forEach(item => {
    const card = document.createElement('div');
    card.className = 'bg-white rounded-lg border border-gray-100 p-4 hover:shadow-md transition';

    const header = document.createElement('div');
    header.className = 'flex items-center space-x-3 mb-4';

    const imageWrapper = document.createElement('div');
    imageWrapper.className = 'w-12 h-12 rounded-lg overflow-hidden';
    const img = document.createElement('img');
    img.src = item.image;
    img.className = 'w-full h-full object-cover';
    img.alt = item.title;
    imageWrapper.appendChild(img);

    const content = document.createElement('div');
    content.className = 'flex-1';

    const titleRow = document.createElement('div');
    titleRow.className = 'flex items-center gap-2 mb-1';
    const title = document.createElement('h3');
    title.className = 'font-medium';
    title.textContent = item.title;

    const categoryTag = document.createElement('span');
    categoryTag.className = 'px-2 py-0.5 text-xs bg-blue-50 text-blue-600 rounded-full';
    categoryTag.textContent = item.category;

    titleRow.appendChild(title);
    titleRow.appendChild(categoryTag);

    const description = document.createElement('p');
    description.className = 'text-sm text-gray-500';
    description.textContent = item.description;

    content.appendChild(titleRow);
    content.appendChild(description);

    header.appendChild(imageWrapper);
    header.appendChild(content);

    const footer = document.createElement('div');
    footer.className = 'flex flex-col sm:flex-row items-start sm:items-center justify-between mt-4 space-y-2 sm:space-y-0';

    // 状态和查看链接
    const statusAndLink = document.createElement('div');
    statusAndLink.className = 'flex items-center space-x-4';

    const link = document.createElement('a');
    link.href = item.link;
    link.target = '_blank'; 
    link.className = 'text-primary text-sm hover:text-primary/80';
    link.textContent = '立即查看';

    const status = document.createElement('span');
    status.className = `inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
      item.status === '可用' ? 'bg-green-50 text-green-700' :
      item.status === '等待' ? 'bg-yellow-50 text-yellow-700' :
      'bg-red-50 text-red-700'
    }`;
    status.textContent = item.status;

    statusAndLink.appendChild(link);
    statusAndLink.appendChild(status);

    // 源头来源和最后更新时间
    const sourceAndDate = document.createElement('div');
    sourceAndDate.className = 'text-xs text-gray-500 flex flex-col sm:flex-row items-start sm:items-center space-y-1 sm:space-y-0 sm:space-x-4';

    const source = document.createElement('span');
    source.textContent = `来源: ${item.source}`;

    const lastUpdated = document.createElement('span');
    lastUpdated.textContent = `更新时间: ${item.lastUpdated}`;

    sourceAndDate.appendChild(source);
    sourceAndDate.appendChild(lastUpdated);

    footer.appendChild(statusAndLink);
    footer.appendChild(sourceAndDate);

    card.appendChild(header);
    card.appendChild(footer);

    container.appendChild(card);
  });
}

// 筛选功能
document.querySelectorAll('.filter-category').forEach(button => {
  button.addEventListener('click', () => {
    // 移除所有按钮的 active 类
    document.querySelectorAll('.filter-category').forEach(btn => btn.classList.remove('active'));

    // 为当前点击的按钮添加 active 类
    button.classList.add('active');

    // 获取当前选中的分类
    const category = button.getAttribute('data-category');

    // 筛选数据
    const filteredByCategory = category === '全部'
      ? allData
      : allData.filter(item => item.category === category);

    // 获取当前选中的状态（如果有）
    const activeStatusButton = document.querySelector('.filter-status.active');
    const status = activeStatusButton ? activeStatusButton.getAttribute('data-status') : '全部';

    const filteredData = status === '全部'
      ? filteredByCategory
      : filteredByCategory.filter(item => item.status === status);

    // 渲染卡片
    renderCards(filteredData);
  });
});

document.querySelectorAll('.filter-status').forEach(button => {
  button.addEventListener('click', () => {
    // 移除所有按钮的 active 类
    document.querySelectorAll('.filter-status').forEach(btn => btn.classList.remove('active'));

    // 为当前点击的按钮添加 active 类
    button.classList.add('active');

    // 获取当前选中的状态
    const status = button.getAttribute('data-status');

    // 获取当前选中的分类（如果有）
    const activeCategoryButton = document.querySelector('.filter-category.active');
    const category = activeCategoryButton ? activeCategoryButton.getAttribute('data-category') : '全部';

    // 筛选数据
    const filteredByCategory = category === '全部'
      ? allData
      : allData.filter(item => item.category === category);

    const filteredData = status === '全部'
      ? filteredByCategory
      : filteredByCategory.filter(item => item.status === status);

    // 渲染卡片
    renderCards(filteredData);
  });
});
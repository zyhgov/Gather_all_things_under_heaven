/**
 * 动态生成卡片内容
 * @param {Array} data - JSON 数据数组
 */
function generateGridItems(data) {
  const container = document.querySelector('.grid'); // 获取容器

  data.forEach(item => {
    // 创建外层卡片容器
    const card = document.createElement('div');
    card.className = 'bg-white rounded-lg border border-gray-100 p-4 hover:shadow-md transition';

    // 图片和标题部分
    const header = document.createElement('div');
    header.className = 'flex items-center space-x-3 mb-4';

    // 图片部分
    const imageWrapper = document.createElement('div');
    imageWrapper.className = 'w-12 h-12 rounded-lg overflow-hidden';

    const img = document.createElement('img');
    img.src = item.image;
    img.className = 'w-full h-full object-cover';
    img.alt = item.title;

    imageWrapper.appendChild(img);

    // 标题和描述部分
    const content = document.createElement('div');
    content.className = 'flex-1';

    // 标题行
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

    // 标签
    item.tags.forEach(tag => {
      const tagSpan = document.createElement('span');
      tagSpan.className = 'px-2 py-0.5 text-xs bg-purple-50 text-purple-600 rounded-full';
      tagSpan.textContent = tag;
      titleRow.appendChild(tagSpan);
    });

    // 描述
    const description = document.createElement('p');
    description.className = 'text-sm text-gray-500';
    description.textContent = item.description;

    content.appendChild(titleRow);
    content.appendChild(description);

    header.appendChild(imageWrapper);
    header.appendChild(content);

    // 底部信息部分
    const footer = document.createElement('div');
    footer.className = 'flex flex-col sm:flex-row items-start sm:items-center justify-between mt-4 space-y-2 sm:space-y-0';

    // 状态和查看链接
    const statusAndLink = document.createElement('div');
    statusAndLink.className = 'flex items-center space-x-4';

    const link = document.createElement('a');
    link.href = item.link;
    link.target = '_blank'; // 打开新标签页
    link.rel = 'noopener noreferrer'; // 提高安全性
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

    // 将所有部分添加到卡片中
    card.appendChild(header);
    card.appendChild(footer);

    // 将卡片添加到容器中
    container.appendChild(card);
  });
}

// 加载 JSON 数据并生成内容
fetch('data.json')
  .then(response => response.json())
  .then(data => generateGridItems(data))
  .catch(error => console.error('Error loading JSON:', error));
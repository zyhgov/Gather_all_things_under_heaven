// 获取数据并初始化
let searchData = [];

// 加载 JSON 数据
fetch('data.json')
  .then(response => {
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  })
  .then(data => {
    searchData = data; // 存储原始数据
    // console.log('JSON 数据加载成功:', searchData); // 打印日志
  })
  .catch(error => {
    console.error('Error loading JSON:', error);
    console.error('Check the path or network conditions.');
  });

// 监听搜索框输入事件
document.getElementById('search-input').addEventListener('input', (event) => {
  const query = event.target.value.trim().toLowerCase(); // 获取输入值并转换为小写
//   console.log('用户输入:', query); // 打印日志

  const resultsContainer = document.getElementById('search-results');

  if (!query) {
    // 如果输入为空，隐藏推荐结果
    resultsContainer.innerHTML = '';
    resultsContainer.classList.add('hidden');
    // console.log('清空推荐结果'); // 打印日志
    return;
  }

  // 根据输入值筛选数据
  const filteredResults = searchData
    .filter(item =>
      item.title.toLowerCase().includes(query) ||
      item.description.toLowerCase().includes(query) ||
      item.source.toLowerCase().includes(query)
    )
    .slice(0, 5); // 最多显示 5 条结果

//   console.log('筛选结果:', filteredResults); // 打印日志

  // 渲染推荐结果
  renderSearchResults(filteredResults, query);

  // 显示推荐结果容器
  resultsContainer.classList.remove('hidden');
//   console.log('显示推荐结果容器'); // 打印日志
});

// 渲染推荐结果
function renderSearchResults(results, query) {
    const container = document.getElementById('search-results');
    container.innerHTML = ''; // 清空容器
  
    if (results.length === 0) {
      // 如果没有结果，显示提示信息
      const noResultsMessage = document.createElement('div');
      noResultsMessage.className = 'text-center text-gray-500';
      noResultsMessage.textContent = '未找到相关结果';
      container.appendChild(noResultsMessage);
      return;
    }
  
    results.forEach(item => {
      const resultItem = document.createElement('a'); // 使用 <a> 标签来创建链接
      let linkUrl = item.link;
  
      // 确保链接是绝对路径，并且包含协议前缀
      if (!/^https?:\/\//i.test(linkUrl)) {
        linkUrl = 'https://' + linkUrl; // 添加默认协议前缀
      }
      resultItem.href = linkUrl; // 设置跳转链接
      resultItem.target = "_blank"; // 在新标签页中打开链接
      resultItem.className = 'block bg-white rounded-lg border border-gray-100 p-4 hover:shadow-md transition text-decoration-none';
  
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
  
      // 高亮显示标题中的关键词
      const title = document.createElement('h3');
      title.className = 'font-medium text-gray-800';
      title.innerHTML = highlightKeyword(item.title, query);
  
      // 高亮显示描述中的关键词
      const description = document.createElement('p');
      description.className = 'text-sm text-gray-500';
      description.innerHTML = highlightKeyword(item.description, query);
  
      content.appendChild(title);
      content.appendChild(description);
  
      header.appendChild(imageWrapper);
      header.appendChild(content);
  
      resultItem.appendChild(header);
      container.appendChild(resultItem);
    });
  }

// 高亮显示关键词
function highlightKeyword(text, keyword) {
  if (!keyword) return text; // 如果没有关键词，直接返回原文本
  const regex = new RegExp(`(${keyword})`, 'gi'); // 创建正则表达式（忽略大小写）
  return text.replace(regex, '<span class="bg-yellow-200">$1</span>'); // 包裹匹配的关键词
}
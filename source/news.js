/**
 * 动态生成最新动态内容
 * @param {Array} data - JSON 数据数组
 */
function generateNewsItems(data) {
    const newsList = document.getElementById('news-list'); // 获取列表容器
  
    // 按时间从最新到最老排序
    data.sort((a, b) => new Date(b.date) - new Date(a.date));
  
    data.forEach(item => {
      // 创建列表项
      const listItem = document.createElement('li');
      listItem.className = 'flex flex-col space-y-1';
  
      // 标题
      const title = document.createElement('span');
      title.className = 'font-medium text-gray-800';
      title.textContent = item.title;
  
      // 描述
      const description = document.createElement('span');
      description.className = 'text-sm text-gray-500';
      description.textContent = item.description;
  
      // 时间
      const date = document.createElement('span');
      date.className = 'text-xs text-gray-400';
      date.textContent = item.date;
  
      // 将内容添加到列表项中
      listItem.appendChild(title);
      listItem.appendChild(description);
      listItem.appendChild(date);
  
      // 将列表项添加到列表容器中
      newsList.appendChild(listItem);
    });
  }
  
  // 加载 JSON 数据并生成内容
  fetch('news.json')
    .then(response => response.json())
    .then(data => generateNewsItems(data))
    .catch(error => console.error('Error loading JSON:', error));
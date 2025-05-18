  function showToast(message) {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 3000);
  }

  // 显示用名称映射表
  const displayMapping = {
    "https://datawarehouse-7gl81i6ib89c2edd-1314221350.tcloudbaseapp.com ": "datawarehouse根服务器地址",
    "ChinaTextbook-master": "联合库UNHub教育服务中心API"
  };

function buildTree(data) {
  const root = {};
  data.forEach(item => {
    const domain = item.main_domain.trim();

    // 使用 displayMapping 映射域名
    const displayDomain = displayMapping[domain] || domain;

    let current = root[displayDomain] = root[displayDomain] || {};

    item.path.forEach(p => {
      const displayName = displayMapping[p.name] || p.name;

      if (!current.children) current.children = [];

      current = current.children.find(c => c.name === displayName) ||
                (() => {
                  const newObj = { name: displayName, children: [], files: [] };
                  current.children.push(newObj);
                  return newObj;
                })();
    });

    // 添加文件信息
    item.content.size = item.content.size || Math.floor(Math.random() * 10 + 1) * 1024 * 1024;
    item.content.fullPath = domain + '/' + item.path.map(p => p.name).join('/') + '/' + item.content.file;

    current.files.push({
      name: item.content.file,
      size: item.content.size,
      fullPath: item.content.fullPath
    });
  });
  return root;
}
  function highlightText(text, query) {
    if (!query) return text;
    const regex = new RegExp(`(${query})`, 'gi');
    return text.replace(regex, '<mark>$1</mark>');
  }

function renderTree(container, tree, level = 0, query = '') {
  const ul = $('<ul class="pl-2 space-y-1"></ul>');

  Object.keys(tree).forEach(domain => {
    const domainNode = tree[domain];
    const domainLi = $('<li>').addClass(`tree-node level-bg-${Math.min(level, 6)} ml-${level * 4} rounded-md`);
    const wrapper = $(`
      <div class="flex items-center cursor-pointer p-1 rounded hover:bg-gray-100">
        <span class="folder-icon">▶</span>
        <img src="/Chinese-Textbooks/text-icon/服务器.svg" class="inline w-4 h-4 mr-2" />
        <span class="text-sm font-semibold">${domain}</span>
      </div>
    `);

    const childrenContainer = $('<div class="ml-4 hidden"></div>');
    const domainChildren = domainNode.children || [];

    wrapper.click(() => {
      childrenContainer.toggle('fast');
      wrapper.find('.folder-icon').text(childrenContainer.is(':visible') ? '▼' : '▶');
    });

    domainLi.append(wrapper);
    renderDirectory(childrenContainer, domainChildren, level + 1, query);
    domainLi.append(childrenContainer);
    ul.append(domainLi);
  });

  container.append(ul);
}

function renderDirectory(container, nodes, level, query) {
  const ul = $('<ul class="pl-2 space-y-1"></ul>');
  (nodes || []).forEach(node => {
    const li = $('<li>').addClass(`tree-node level-bg-${Math.min(level, 6)} ml-${level * 4} rounded-md`);

    const wrapper = $(`
      <div class="flex items-center cursor-pointer p-1 rounded hover:bg-gray-100">
        <span class="folder-icon">▶&nbsp;</span>
        <img src="/Chinese-Textbooks/text-icon/文件夹.svg" class="inline w-4 h-4 mr-2" />
        <span class="text-sm font-semibold">${highlightText(node.name, query)}</span>
      </div>
    `);

    const childrenContainer = $('<div class="ml-4 hidden"></div>');

    // 展开/折叠目录逻辑
    wrapper.click(() => {
      childrenContainer.toggle('fast');
      wrapper.find('.folder-icon').text(childrenContainer.is(':visible') ? '▼' : '▶');
    });

    // 如果有子级目录，递归渲染
    if (node.children?.length > 0) {
      renderDirectory(childrenContainer, node.children, level + 1, query);
    }

    // 如果有文件列表，渲染所有 PDF 文件
    if (node.files?.length > 0) {
      node.files.forEach(file => {
        const fileSize = file.size ? `${(file.size / 1024 / 1024).toFixed(2)} MB` : '未知';
        const highlightedName = highlightText(file.name, query);
        const fileEl = $(`
          <div class="flex items-center cursor-pointer p-1 ml-4 rounded hover:bg-gray-100">
            <img src="/Chinese-Textbooks/text-icon/PDF.svg" class="inline w-4 h-4 mr-2" />
            <span class="text-sm">${highlightedName} (${fileSize})</span>
          </div>
        `).click(() => previewPDF(file)); // 绑定点击预览

        childrenContainer.append(fileEl);
      });
    }

    li.append(wrapper);
    li.append(childrenContainer);
    ul.append(li);
  });
  container.append(ul);
}

function previewPDF(fileMeta) {
  $('#preview-container').html(`
    <div class="bg-white border shadow-lg rounded p-4 animate-fade-in flex flex-col gap-4 preview-container">
      <div class="flex justify-between items-center">
        <h2 class="font-semibold text-lg">${fileMeta.name}</h2>
        <button onclick="$('#preview-container').empty()" class="text-gray-500 hover:text-red-500">&times;</button>
      </div>
      <iframe src="${fileMeta.fullPath}" class="w-full h-[600px] border rounded" loading="lazy"></iframe>
      <div class="flex gap-4 button-group">
        <a href="${fileMeta.fullPath}" target="_blank" class="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600">新标签页打开</a>
        <a href="${fileMeta.fullPath}" target="_blank" download class="bg-green-500 text-white px-4 py-1 rounded hover:bg-green-600">下载</a>
        <button class="bg-gray-500 text-white px-4 py-1 rounded hover:bg-gray-600" onclick="navigator.clipboard.writeText('${fileMeta.fullPath}'); showToast('链接已复制')">复制链接</button>
      </div>
    </div>
  `);
}

  function filterTree(query) {
    let hasResult = false;
    query = query.toLowerCase();
    $('#file-tree li.tree-node').each(function () {
      const $li = $(this);
      const text = $li.text().toLowerCase();
      const match = text.includes(query);
      if (match) hasResult = true;
      $li.toggle(match);
      if (match) {
        $li.parents('li.tree-node, div').show(); // 显示父节点
      }
    });
    $('#no-result').toggleClass('hidden', hasResult);
  }

  $(async function () {
    const res = await $.getJSON('/asset/data/compressed_parsed_hierarchical_structure.json');
    const tree = buildTree(res);

    function resetTree() {
      $('#file-tree').empty();
      renderTree($('#file-tree'), tree);
      $('#no-result').addClass('hidden');
      autoExpandThreeLevels(); // 页面加载后自动展开三级
    }

    function autoExpandThreeLevels() {
      const allToggles = $('#file-tree .flex.items-center.cursor-pointer');
      for (let i = 0; i < Math.min(allToggles.length, 2); i++) {
        const $toggle = $(allToggles[i]);
        const $nextDiv = $toggle.next('div');
        if ($nextDiv.length) {
          $toggle.find('.folder-icon').text('▼'); // 更改图标为展开
          $nextDiv.show();
        }
      }
    }

// 设置默认提示文字（含图标）
$('#preview-container').html(`
  <div class="p-4 text-center text-gray-500">
    <img src="/Chinese-Textbooks/text-icon/PDF.svg" class="inline-block w-16 h-16 mb-4" />
    <div class="text-2xl font-medium">请打开 PDF 文件以查看内容</div>
    <div class="text-sm mt-2">左侧树状目录中点击任意 PDF 文件即可预览</div>
  </div>
`);

    resetTree();

    $('#search').on('input', function () {
      const val = $(this).val().trim();
      if (val === '') {
        resetTree();
      } else {
        $('#file-tree').empty();
        renderTree($('#file-tree'), tree, 0, val);
        filterTree(val);
      }
    });
  });

// 小屏幕检测 + 高斯模糊提示
function checkScreenSize() {
  const warning = document.getElementById('mobile-warning-wrapper');
  if (window.innerWidth < 600) {
    warning.classList.remove('hidden');
    document.body.style.overflow = 'hidden'; // 禁止滚动
  } else {
    warning.classList.add('hidden');
    document.body.style.overflow = '';
  }
}

window.addEventListener('load', checkScreenSize);
window.addEventListener('resize', checkScreenSize);

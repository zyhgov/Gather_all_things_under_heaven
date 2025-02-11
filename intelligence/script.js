document.addEventListener("DOMContentLoaded", () => {
  loadConversationsFromStorage(); // 加载对话列表

  // 如果对话列表为空，显示提示内容
  if (conversations.length === 0) {
    showEmptyChatPrompt();
  }
});
// 动态标题切换逻辑
const dynamicTitle = document.getElementById("dynamic-title");

// 定义标题切换的内容
const titles = [
  "UNHub & Qwen MAX",
  "开创智能交互新纪元"
];

// 定义图片路径数组
const logoImages = [
  "zyhgov.png",
  "wisdom_heng.png",
  "unhub_wisdom_qwen.png", // 替换为你的其他图片路径
];

// 获取图片元素
const zhuLogo = document.getElementById("zhu_logo");

let currentImageIndex = 0; // 当前显示的图片索引

// 更新图片内容的函数
function updateLogo() {
  currentImageIndex = (currentImageIndex + 1) % logoImages.length; // 循环切换到下一张图片
  zhuLogo.src = logoImages[currentImageIndex]; // 更新图片路径
}

// 每隔 3 秒切换一次图片
setInterval(updateLogo, 3000);

let currentIndex = 0; // 当前显示的标题索引

// 更新标题内容的函数
function updateTitle() {
  // 先让当前标题淡出
  dynamicTitle.classList.remove("visible");
  
  // 等待淡出动画完成后再更新内容并淡入
  setTimeout(() => {
    dynamicTitle.textContent = titles[currentIndex];
    currentIndex = (currentIndex + 1) % titles.length; // 循环切换到下一个标题
    
    // 让新标题淡入
    setTimeout(() => {
      dynamicTitle.classList.add("visible");
    }, 50); // 短暂延迟以确保淡出完成
  }, 500); // 等待淡出动画完成
}

// 初始显示第一个标题
dynamicTitle.textContent = titles[0];
dynamicTitle.classList.add("visible");

// 每隔 3 秒切换一次标题
setInterval(updateTitle, 3000);
// 折叠侧边栏功能
const sidebar = document.getElementById("sidebar");
const toggleSidebarButton = document.getElementById("toggle-sidebar");
const sidebarToggleIcon = document.getElementById("sidebar-toggle-icon");
let isSidebarCollapsed = false; // 标记侧边栏是否已折叠

toggleSidebarButton.addEventListener("click", () => {
  if (isSidebarCollapsed) {
    // 展开侧边栏
    sidebar.classList.remove("w-25"); // 从最小宽度恢复到正常宽度
    sidebar.classList.add("w-64");
    sidebarToggleIcon.src = "收起侧边栏.svg"; // 切换为“收起”图标
    isSidebarCollapsed = false;
  } else {
    // 收缩侧边栏
    sidebar.classList.remove("w-64");
    sidebar.classList.add("w-25"); // 设置最小宽度
    sidebarToggleIcon.src = "收起侧边栏.svg"; // 切换为“展开”图标
    isSidebarCollapsed = true;
  }
});
toggleSidebarButton.addEventListener("click", () => {
  if (isSidebarCollapsed) {
    // 展开侧边栏
    sidebar.classList.remove("w-20");
    sidebar.classList.add("sm:w-64");
    isSidebarCollapsed = false;
  } else {
    // 收缩侧边栏
    sidebar.classList.remove("sm:w-64");
    sidebar.classList.add("w-20");
    isSidebarCollapsed = true;
  }
});
// 获取按钮元素
const goHomeButton = document.getElementById("go-home");

// 绑定点击事件
goHomeButton.addEventListener("click", () => {
  // 在新标签页中跳转到 /index.html
  window.open("/index.html", "_blank");
});
// 全局变量
let currentConversationId = null; // 当前对话 ID
let conversations = []; // 存储所有对话

// 获取 DOM 元素
const chatBox = document.getElementById("chat-box");
const userInput = document.getElementById("user-input");
const sendBtn = document.getElementById("send-btn");
const newConversationBtn = document.getElementById("new-conversation");
const conversationList = document.getElementById("conversations");
const welcomeArea = document.getElementById("welcome-area");

// 添加消息到聊天框
// 添加消息到聊天框
function addMessage(role, content) {
  const messageDiv = document.createElement("div");
  messageDiv.classList.add("message", role);
  // 使用 marked.js 渲染 Markdown 内容
  const renderedContent = marked.parse(content || "");
  // 动态调整气泡宽度
  const maxWidth = "max-w-full"; // 最大宽度为父容器的宽度
  const bubbleClass = role === "user" ? "bg-blue-100" : "bg-gray-100"; // 区分用户和 AI 的背景颜色
  messageDiv.innerHTML = `
    <div class="message-content ${bubbleClass} p-3 rounded-lg mb-4 text-gray-800 custom-font-size">
      ${renderedContent}
    </div>
  `;
  chatBox.appendChild(messageDiv);
  chatBox.scrollTop = chatBox.scrollHeight; // 滚动到底部
}
// 显示加载提示
function showLoading() {
  const loadingBubble = document.createElement("div");
  loadingBubble.classList.add("message", "bot");
  loadingBubble.innerHTML = `
    <div class="message-content bg-gray-100 text-gray-800 p-3 rounded-lg max-w-md flex items-center space-x-2">
      <!-- 旋转图标 -->
      <!-- <div class="loading-spinner w-5 h-5 border-t-2 border-b-2 border-blue-500 rounded-full animate-spin"></div>-->
      <!-- From Uiverse.io by Pradeepsaranbishnoi --> 
<div class="three-body">
<div class="three-body__dot"></div>
<div class="three-body__dot"></div>
<div class="three-body__dot"></div>
</div>
      <!-- 加载文本 -->
      <span class="text-gray-500">组织语言中...</span>
    </div>
  `;
  chatBox.appendChild(loadingBubble);
  return loadingBubble;
}

// 隐藏加载提示
function hideLoading(loadingBubble) {
  chatBox.removeChild(loadingBubble);
}

// 隐藏欢迎区域
function hideWelcomeArea() {
  welcomeArea.style.display = "none";
}

// 调用通义千问API
async function sendMessageToAI(userMessage) {
  try {
    // 显示加载提示
    const loadingBubble = showLoading();
    const response = await fetch("https://dashscope.aliyuncs.com/compatible-mode/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer sk-db00bb55194e4cf483aaf0c4b1d50a2a`, // 替换为你的API密钥
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "qwen-max",
        messages: [
          { role: "system", content: "You are a helpful assistant." },
          { role: "user", content: userMessage }
        ]
      })
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    const botReply = data.choices[0].message.content;

    // 隐藏加载提示并添加 AI 回复
    hideLoading(loadingBubble);
    addMessage("bot", botReply);

    // 将消息保存到当前对话
    saveMessage(currentConversationId, "bot", botReply);
  } catch (error) {
    console.error("Error calling API:", error);
    hideLoading(loadingBubble);
    addMessage("bot", "Sorry, I encountered an error while processing your request.");
  }
}
// 获取“一键清除缓存并重置”按钮
const clearCacheButton = document.getElementById("clear-cache");

// 绑定点击事件
clearCacheButton.addEventListener("click", () => {
  const confirmed = confirm("确定要清除所有缓存并重置到初始状态吗？");
  if (confirmed) {
    // 清除 localStorage 中的数据
    localStorage.removeItem("conversations");

    // 刷新页面以恢复到初始状态
    location.reload();
  }
});
// 显示“没有对话”的提示内容
function showEmptyChatPrompt() {
  chatBox.innerHTML = `
    <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-3xl">
      <img src="unhub_wisdom_qwen.png" alt="Logo" class="w-100 h-20 mx-auto mb-4">
      <p>您还没有任何对话。</p>
      <p>请点击<span style="color: #007AFF;">“♾️ 开启新对话”</span>开始。</p>
    </div>
  `;
}
// 发送按钮点击事件
sendBtn.addEventListener("click", () => {
  const userMessage = userInput.value.trim();
  if (userMessage === "") return;

  // 隐藏欢迎区域
  hideWelcomeArea();

  // 显示用户消息
  addMessage("user", userMessage);

  // 如果是新对话，设置标题
  if (!currentConversationId) {
    startNewConversation(userMessage);
  }

  // 将消息保存到当前对话
  saveMessage(currentConversationId, "user", userMessage);

  // 清空输入框
  userInput.value = "";

  // 发送消息给AI
  sendMessageToAI(userMessage);
});

// 示例问题点击事件
document.querySelectorAll(".example-question").forEach((button) => {
  button.addEventListener("click", () => {
    const question = button.textContent.trim(); // 获取示例问题文本
    userInput.value = question; // 填充输入框
    sendBtn.click(); // 触发发送操作
  });
});

// 按下回车键发送消息
userInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter" && !event.shiftKey) {
    event.preventDefault(); // 防止换行
    sendBtn.click();
  }
});


// 保存对话列表到 localStorage
function saveConversationsToStorage() {
  localStorage.setItem("conversations", JSON.stringify(conversations));
}
// 从 localStorage 加载对话列表
function loadConversationsFromStorage() {
  const storedConversations = localStorage.getItem("conversations");
  if (storedConversations) {
    conversations = JSON.parse(storedConversations);
    updateConversationList();
  }
}
// 新建对话
// 新建对话
function startNewConversation(title) {
  const conversationId = Date.now(); // 使用时间戳作为唯一 ID
  currentConversationId = conversationId;

  // 创建新的对话对象
  const newConversation = {
    id: conversationId,
    title: title || "新对话",
    messages: []
  };

  conversations.push(newConversation);
  saveConversationsToStorage(); // 保存到 localStorage
  updateConversationList(); // 更新对话列表

  // 清空聊天窗口并隐藏提示内容
  chatBox.innerHTML = "";
  welcomeArea.style.display = "none"; // 隐藏欢迎区域
}

// 更新对话列表
// 更新对话列表
function updateConversationList() {
  const conversationList = document.getElementById("conversations");
  conversationList.innerHTML = ""; // 清空现有列表

  if (conversations.length === 0) {
    // 如果对话列表为空，显示提示内容
    showEmptyChatPrompt();
    return;
  }

  conversations.forEach((conversation) => {
    const li = document.createElement("li");
    li.classList.add(
      "flex",
      "items-center",
      "justify-between",
      "p-2",
      "rounded-md",
      "hover:bg-gray-100",
      "cursor-pointer",
      "text-sm"
    );

    // 对话标题
    const titleSpan = document.createElement("span");
    titleSpan.textContent = conversation.title;
    titleSpan.classList.add("flex-grow");

    // 修改标题按钮
    const editButton = document.createElement("button");
    editButton.innerHTML = '<img src="edit.svg" alt="Edit" class="w-4 h-4">';
    editButton.classList.add("ml-2", "text-gray-500", "hover:text-gray-700");
    editButton.addEventListener("click", () => editConversationTitle(conversation.id));

    // 删除按钮
    const deleteButton = document.createElement("button");
    deleteButton.innerHTML = '<img src="delete.svg" alt="Delete" class="w-4 h-4">';
    deleteButton.classList.add("ml-2", "text-red-500", "hover:text-red-700");
    deleteButton.addEventListener("click", () => deleteConversation(conversation.id));

    // 将元素添加到列表项
    li.appendChild(titleSpan);
    li.appendChild(editButton);
    li.appendChild(deleteButton);

    // 点击列表项加载对话
    li.addEventListener("click", () => loadConversation(conversation.id));

    conversationList.appendChild(li);
  });
}
// 修改对话标题
function editConversationTitle(conversationId) {
  const newTitle = prompt("请输入新的对话标题：");
  if (newTitle && newTitle.trim() !== "") {
    const conversation = conversations.find((conv) => conv.id === conversationId);
    if (conversation) {
      conversation.title = newTitle.trim();
      saveConversationsToStorage(); // 保存到 localStorage
      updateConversationList(); // 更新对话列表
    }
  }
}
// 删除对话
function deleteConversation(conversationId) {
  const confirmed = confirm("确定要删除此对话吗？");
  if (confirmed) {
    conversations = conversations.filter((conv) => conv.id !== conversationId);
    saveConversationsToStorage(); // 保存到 localStorage
    updateConversationList(); // 更新对话列表

    // 如果删除的是当前对话，清空聊天窗口并显示欢迎区域
    if (currentConversationId === conversationId) {
      currentConversationId = null;
      chatBox.innerHTML = "";
      welcomeArea.style.display = "block";
    }

    // 检查对话列表是否为空
    if (conversations.length === 0) {
      showEmptyChatPrompt();
    }
  }
}
// 加载指定对话
function loadConversation(conversationId) {
  const conversation = conversations.find((conv) => conv.id === conversationId);
  if (!conversation) return;

  currentConversationId = conversationId;

  // 清空聊天窗口并加载消息
  chatBox.innerHTML = "";
  conversation.messages.forEach((msg) => {
    addMessage(msg.role, msg.content);
  });

  // 隐藏欢迎区域
  hideWelcomeArea();
}

// 保存消息到当前对话
function saveMessage(conversationId, role, content) {
  const conversation = conversations.find((conv) => conv.id === conversationId);
  if (conversation) {
    conversation.messages.push({ role, content });
  }
}

// 点击新建对话按钮
newConversationBtn.addEventListener("click", () => {
  startNewConversation();
});

// 自定义 marked.js 渲染器
const renderer = new marked.Renderer();

// 自定义代码块渲染
renderer.code = function (code, language) {
  return `
    <pre class="bg-gray-900 text-white p-4 rounded-lg overflow-auto">
      <code class="language-${language}">
        ${code}
      </code>
    </pre>
  `;
};

// 自定义公式渲染（假设使用 KaTeX 或 MathJax）
renderer.html = function (html) {
  // 如果是公式内容，添加专门的样式
  if (html.includes("$$")) {
    return `<div class="formula bg-gray-100 p-3 rounded-lg text-center">${html}</div>`;
  }
  return html;
};

// 使用自定义渲染器
marked.setOptions({
  renderer: renderer,
  gfm: true, // 启用 GitHub Flavored Markdown
  breaks: true, // 支持换行
});


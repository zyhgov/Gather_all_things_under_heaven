// 修改后的 DOMContentLoaded 事件处理
document.addEventListener("DOMContentLoaded", () => {
  if (localStorage.getItem('sidebarState') === 'open' && window.innerWidth < 768) {
    document.body.classList.add('sidebar-open');
  }
  loadConversationsFromStorage();
  
  if (conversations.length === 0) {
    showEmptyChatPrompt();
  } else {
    const lastConversation = conversations[conversations.length - 1];
    if (lastConversation) {
      currentConversationId = lastConversation.id; // 显式赋值
      loadConversation(lastConversation.id);
    }
  }
  if (conversations.length === 0) {
    startNewConversation("初始对话");
    addMessage("bot", "UNHub智能助手为您服务，本系统基于DeepSeek架构和私有化知识库训练");
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
  "deepseek r1.svg", // 替换为你的其他图片路径
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
const STORAGE_KEY = "wisdom_conversations_v2"; // 所有存储操作使用此常量
// 在现有代码基础上修改以下部分

// 添加消息到聊天框
// 增强的 addMessage 函数
// 修改后的 addMessage 函数
// 修正后的addMessage函数
function addMessage(role, content) {
  const messageDiv = document.createElement("div");
  messageDiv.className = `message ${role}`; // 确保类名正确拼接
  
  const styleConfig = {
    user: { label: "您的问题" },
    bot: { label: "思考结果" },
    thinking: { label: "思考过程" }
  };

  // 强制使用标准消息结构
  messageDiv.innerHTML = `
    <div class="message-content">
      <div class="message-header">${styleConfig[role].label}</div>
      ${role === 'thinking' ? '<div class="thinking-status">深度思考内容</div>' : ''}
      <div class="message-body">${marked.parse(content)}</div>
    </div>
  `;

  chatBox.appendChild(messageDiv);
  chatBox.scrollTop = chatBox.scrollHeight;
}

// 修改后的 showLoading 函数
function showLoading() {
  const loadingBubble = document.createElement("div");
  loadingBubble.classList.add("message", "thinking");
  
  // 严格遵循消息结构
  loadingBubble.innerHTML = `
    <div class="message-content">
      <div class="message-header">思考过程</div>
      <div class="thinking-status">
        深度思考中
        <div class="three-body">
          <div class="three-body__dot"></div>
          <div class="three-body__dot"></div>
          <div class="three-body__dot"></div>
        </div>
      </div>
    </div>
  `;
  
  chatBox.appendChild(loadingBubble);
  chatBox.scrollTop = chatBox.scrollHeight;
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
const controller = new AbortController();
setTimeout(() => controller.abort(), 30000); // 30秒超时
// 修改后的 sendMessageToAI 函数
// 修改后的 sendMessageToAI 函数
async function sendMessageToAI(userMessage) {
  try {
    const loadingBubble = showLoading();
    
    // 新增知识检索
    const knowledge = await searchKnowledge(userMessage);
    const systemPrompt = knowledge ? 
      `你是由UNHub训练的深度智能助手，请严格根据知识库内容回答。知识库内容：\n${knowledge}\n\n当前问题：` : 
      "你是由UNHub训练的深度智能助手";

    const response = await fetch("https://dashscope.aliyuncs.com/compatible-mode/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer sk-db00bb55194e4cf483aaf0c4b1d50a2a`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "deepseek-r1",
        messages: [
          {
            role: "system",
            content: systemPrompt
          },
          {
            role: "user",
            content: userMessage
          }
        ],
        stream: true
      })
    });

    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

    let thinkingContent = "";
    let finalContent = "";

    // 关键修复：正确创建消息容器
    const thinkingDiv = createMessageContainer("thinking");
    const answerDiv = createMessageContainer("bot");

    const reader = response.body.getReader();
    const decoder = new TextDecoder();

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      const chunk = decoder.decode(value);
      const lines = chunk.split('\n').filter(line => line.trim() !== '');

      for (const line of lines) {
        if (!line.startsWith('data:')) continue;
        const jsonStr = line.slice(5).trim();
        if (jsonStr === '[DONE]') continue;

        const data = JSON.parse(jsonStr);
        const delta = data.choices[0].delta;

        // 动态更新内容
        if (delta.reasoning_content) {
          thinkingContent += delta.reasoning_content;
          updateMessageContent(thinkingDiv, thinkingContent);
        }
        if (delta.content) {
          finalContent += delta.content;
          updateMessageContent(answerDiv, finalContent);
        }
      }
    }

    hideLoading(loadingBubble);
    saveMessage(currentConversationId, "user", userMessage);
    saveMessage(currentConversationId, "bot", finalContent);
    saveMessage(currentConversationId, "thinking", thinkingContent);
    saveConversationsToStorage();
  } catch (error) {
    console.error("Error:", error);
    hideLoading(loadingBubble);
    addMessage("bot", `请求出错：${error.message}`);
  }
}
// 优化向量生成（使用TextEncoder模拟）
async function getEmbedding(text) {
  // 更合理的文本向量化方法
  const encoder = new TextEncoder();
  const encoded = encoder.encode(text.toLowerCase());
  const normalized = new Array(128).fill(0);
  
  // 生成更合理的向量
  encoded.forEach((val, index) => {
    normalized[index % 128] += val;
  });

  // 归一化处理
  const magnitude = Math.sqrt(normalized.reduce((sum, val) => sum + val * val, 0));
  return normalized.map(val => val / magnitude);
}

// 增强系统提示模板
const SYSTEM_PROMPTS = {
  IDENTITY: `你是由UNHub智能平台训练的深度语言模型，具备以下特性：
  1. 基于DeepSeek架构的千亿参数模型
  2. 训练数据包含企业知识库和专业领域数据
  3. 回答问题时优先使用预置知识库内容
  4. 遇到不确定的内容应明确告知"根据UNHub知识库，..."`,
  
  DEFAULT: `你是UNHub智能平台训练的AI助手，请始终遵循：
  1. 用中文简洁回答
  2. 知识库优先级高于通用知识
  3. 涉及技术问题必须引用知识库内容
  4. 回答以"UNHub智能助手为您解答"开头`
};
// 在知识检索函数中添加调试

// 辅助函数：创建消息容器
function createMessageContainer(role) {
  const div = document.createElement("div");
  div.classList.add("message", role);
  chatBox.appendChild(div);
  return div;
}

// 辅助函数：逐字更新内容
function updateMessageContent(container, text) {
  container.innerHTML = marked.parse(text);
  chatBox.scrollTop = chatBox.scrollHeight; // 自动滚动
}
function smoothAppend(text, container) {
  let index = 0;
  const animate = () => {
    if (index < text.length) {
      container.innerHTML = marked.parse(text.slice(0, index));
      index++;
      requestAnimationFrame(animate);
    }
  };
  requestAnimationFrame(animate);
}
const fragment = document.createDocumentFragment();
//...更新操作
chatBox.appendChild(fragment);
// 获取“一键清除缓存并重置”按钮
const clearCacheButton = document.getElementById("clear-cache");

// 绑定点击事件
clearCacheButton.addEventListener("click", () => {
  const confirmed = confirm("确定要清除所有缓存并重置到初始状态吗？");
  if (confirmed) {
    // 清除 localStorage 中的数据
    localStorage.removeItem(STORAGE_KEY);

    // 刷新页面以恢复到初始状态
    location.reload();
  }
});
// 显示“没有对话”的提示内容
function showEmptyChatPrompt() {
  chatBox.innerHTML = `
    <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-3xl">
      <img src="deepseek r1.svg" alt="Logo" class="w-100 h-20 mx-auto mb-4">
      <p>您还没有任何对话。</p>
      <p>请点击<span style="color: #007AFF;">“♾️ 开启新对话”</span>开始。</p>
      <div class="space-y-2">
          <button id="but" class="example-question bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600">你能做什么?</button>
          <button id="but" class="example-question bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600">用python打印九九乘法表</button>
          <button id="but" class="example-question bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">苏格拉底式提问方法是什么意思？</button>
        </div>
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
  saveMessage(currentConversationId, "user", userMessage);

  // 如果是新对话，设置标题
  if (!currentConversationId) {
    startNewConversation(userMessage);
  }

  // 清空输入框
  userInput.value = "";

  // 发送消息给 AI
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
  if (Array.isArray(conversations)) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(conversations));
  } else {
    console.error("Invalid conversations data. Cannot save to localStorage.");
  }
}
// 从 localStorage 加载对话列表
// 从 localStorage 加载对话列表
function loadConversationsFromStorage() {
  const storedConversations = localStorage.getItem(STORAGE_KEY);
  if (storedConversations) {
    try {
      conversations = JSON.parse(storedConversations).filter(conv => {
        return conv.messages.every(msg => msg.content.trim() !== ""); // 过滤空内容
      });
      if (!Array.isArray(conversations)) conversations = [];
    } catch (error) {
      conversations = [];
    }
  } else {
    conversations = [];
  }
  updateConversationList();
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

  if (!Array.isArray(conversations)) {
    console.error("Conversations is not an array. Resetting to empty array.");
    conversations = [];
  }

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

    // 截断标题逻辑
    const maxTitleLength = 10; // 最大字符数（包括中文和英文）
    const originalTitle = conversation.title;

    // 判断是否需要截断
    if (originalTitle.length > maxTitleLength) {
      titleSpan.textContent = originalTitle.slice(0, maxTitleLength) + "...";
      titleSpan.title = originalTitle; // 设置完整标题为 tooltip 提示
    } else {
      titleSpan.textContent = originalTitle;
    }

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
// 加载指定对话
function loadConversation(conversationId) {
  const conversation = conversations.find(conv => conv.id === conversationId);
  if (!conversation) {
    showEmptyChatPrompt(); // 未找到对话时显示提示
    return;
  }
  
  currentConversationId = conversationId;
  chatBox.innerHTML = "";
  
  // 去重并渲染消息
  const uniqueMessages = [];
  const seenUserMessages = new Set();
  
  conversation.messages.forEach(msg => {
    if (msg.role === "user") {
      if (!seenUserMessages.has(msg.content)) {
        seenUserMessages.add(msg.content);
        uniqueMessages.push(msg);
      }
    } else {
      uniqueMessages.push(msg);
    }
  });
  
  uniqueMessages.forEach(msg => addMessage(msg.role, msg.content));
  hideWelcomeArea();
}
function saveMessage(conversationId, role, content) {
  const conversation = conversations.find(conv => conv.id === conversationId);
  if (conversation) {
    const newMessage = { role, content, timestamp: Date.now() };
    
    if (["bot", "thinking"].includes(role)) {
      const lastMsg = conversation.messages[conversation.messages.length - 1];
      if (lastMsg && lastMsg.role === role) {
        lastMsg.content = content; // 覆盖最后一条同类型消息
      } else {
        conversation.messages.push(newMessage);
      }
    } else {
      conversation.messages.push(newMessage);
    }
    saveConversationsToStorage();
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
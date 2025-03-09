  // 页面加载完成后显示弹窗
  window.addEventListener('load', () => {
    const modal = document.getElementById('intro-modal');
    const closeBtn = document.getElementById('close-intro');
    
    // 显示弹窗
    modal.classList.remove('hidden');
    
    // 关闭事件
    closeBtn.addEventListener('click', () => {
      modal.classList.add('hidden');
    });

    // 点击背景关闭
    modal.addEventListener('click', (e) => {
      if(e.target === modal) {
        modal.classList.add('hidden');
      }
    });
  });

// 在<script>中添加移动端适配逻辑
document.getElementById('mobile-sidebar-toggle').addEventListener('click', () => {
    document.body.classList.toggle('sidebar-open');
  });
  
// 统一侧边栏切换控制
let isSidebarOpen = false;

const toggleSidebar = () => {
  if (window.innerWidth >= 768) return; // 桌面端禁用切换
  
  isSidebarOpen = !isSidebarOpen;
  document.body.classList.toggle('sidebar-open', isSidebarOpen);
  localStorage.setItem('sidebarState', isSidebarOpen ? 'open' : 'closed');
};

// 响应式重置
const handleResize = () => {
  if (window.innerWidth >= 768) {
    // 桌面端强制显示
    document.body.classList.remove('sidebar-open');
    isSidebarOpen = false;
  }
};

// 事件监听
window.addEventListener('resize', handleResize);
document.getElementById('toggle-sidebar').addEventListener('click', toggleSidebar);
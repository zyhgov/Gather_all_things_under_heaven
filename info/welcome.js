// 在 welcome.html 页面加载时，显示用户名并更新页面标题
document.addEventListener('DOMContentLoaded', () => {
    const username = localStorage.getItem('username');
    
    if (username) {
      // 更新欢迎消息
      document.getElementById('welcome-message').textContent = `欢迎您，${username}`;
      
      // 更新页面标题
      document.title = `欢迎您，${username}`;
    } else {
      // 如果没有用户名，重定向到登录页面
      window.location.href = 'login.html';
    }
  });
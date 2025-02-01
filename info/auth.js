// 获取模态对话框元素
const modal = document.getElementById("forgot-password-modal");
const closeModal = document.getElementById("close-modal");

// 获取忘记密码链接并添加点击事件监听器
document.getElementById("forgot-password-link").addEventListener("click", function(event) {
  event.preventDefault(); // 阻止默认行为
  modal.style.display = "block"; // 显示模态对话框
});

// 关闭按钮点击事件监听器
closeModal.addEventListener("click", function() {
  modal.style.display = "none"; // 隐藏模态对话框
});

// 点击模态对话框外部区域也可以关闭对话框
window.addEventListener("click", function(event) {
  if (event.target === modal) {
    modal.style.display = "none";
  }
});

const supabaseUrl = 'https://izlpowheyzdtyxqmodzs.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml6bHBvd2hleXpkdHl4cW1vZHpzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzY2ODc4MzYsImV4cCI6MjA1MjI2MzgzNn0.XlcbEAo1hOcO_ogZnLTHXovbUc71PugpLkOGwpOrR7w';
const supabase = window.supabase.createClient(supabaseUrl, supabaseKey);

function nextStep() {
    const email = document.getElementById('login-email').value.trim();
    if (email) {
      // 显示加载指示器
      document.querySelector('.loader').style.display = 'block';
      // 禁用表单以防止重复提交
      document.getElementById('login-form').querySelectorAll('input, button').forEach(item => item.disabled = true);
  
      checkEmailExists(email)
        .then(exists => {
          if (exists) {
            document.getElementById('user-email').textContent = email;
            document.getElementById('login-box').style.display = 'none';
            document.getElementById('password-box').style.display = 'block';
          } else {
            document.getElementById('error-message').textContent = '该邮箱不存在，请先注册';
          }
          // 隐藏加载指示器
          document.querySelector('.loader').style.display = 'none';
          document.getElementById('login-form').querySelectorAll('input, button').forEach(item => item.disabled = false);
        })
        .catch(error => {
          console.error('Error checking email:', error);
          document.getElementById('error-message').textContent = '服务器错误，请稍后再试';
          // 隐藏加载指示器
          document.querySelector('.loader').style.display = 'none';
          document.getElementById('login-form').querySelectorAll('input, button').forEach(item => item.disabled = false);
        });
    } else {
      document.getElementById('error-message').textContent = '请输入有效的邮箱地址';
    }
  }
  

function checkEmailExists(email) {
  return supabase
    .from('users')
    .select('username')
    .eq('email', email)
    .single()
    .then(({ data }) => !!data)
    .catch(() => false);
}

function attemptLogin() {
    const email = document.getElementById('user-email').textContent;
    const password = document.getElementById('login-password').value.trim();

    if (!password) {
        alert('请输入密码');
        return;
    }

    // 显示加载指示器（确保选择正确的 .loader 元素）
    const loader = document.querySelector('#password-box .loader');
    loader.style.display = 'block';

    // 禁用表单以防止重复提交
    document.getElementById('password-box').querySelectorAll('input, button').forEach(item => item.disabled = true);

    loginWithEmailAndPassword(email, password)
        .then(user => {
            if (user) {
                localStorage.setItem('username', user.username);
                localStorage.setItem('useremail', email); // 确保这里正确存储了邮箱
                window.location.href = 'welcome.html';
            } else {
                // 显示错误信息
                document.getElementById('error-message1').textContent = '登录失败: 密码错误';
            }
            // 隐藏加载指示器
            loader.style.display = 'none';
            // 启用表单
            document.getElementById('password-box').querySelectorAll('input, button').forEach(item => item.disabled = false);
        })
        .catch(error => {
            console.error('Error logging in:', error);
            // 显示错误信息
            document.getElementById('error-message1').textContent = '服务器错误，请稍后再试';
            // 隐藏加载指示器
            loader.style.display = 'none';
            // 启用表单
            document.getElementById('password-box').querySelectorAll('input, button').forEach(item => item.disabled = false);
        });
}
function loginWithEmailAndPassword(email, password) {
  return supabase
    .from('users')
    .select('username')
    .eq('email', email)
    .eq('password', password)
    .single()
    .then(({ data }) => data)
    .catch(() => null);
}

// 在 welcome.html 页面加载时，显示用户名
if (window.location.pathname.includes('welcome.html')) {
  document.addEventListener('DOMContentLoaded', () => {  
    const username = localStorage.getItem('username');
    const useremail = localStorage.getItem('useremail');
    if (username && useremail) { // 使用逻辑与确保两个变量都存在
      document.getElementById('welcome-message').textContent = `欢迎，${username}`;
      document.getElementById('welcome-email').textContent = `您的邮箱是 ${useremail}`;
    } else {
      window.location.href = 'login.html';
    }
  });
}

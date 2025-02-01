// 初始化Supabase客户端
const supabaseUrl = 'https://izlpowheyzdtyxqmodzs.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml6bHBvd2hleXpkdHl4cW1vZHpzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzY2ODc4MzYsImV4cCI6MjA1MjI2MzgzNn0.XlcbEAo1hOcO_ogZnLTHXovbUc71PugpLkOGwpOrR7w';
const supabase = window.supabase.createClient(supabaseUrl, supabaseKey);

// 获取DOM元素
const form = document.getElementById('login-form');
const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');
const messageElement = document.getElementById('message');

// 添加表单提交事件监听器
form.addEventListener('submit', async (event) => {
  event.preventDefault(); // 阻止表单默认提交行为

  const username = usernameInput.value.trim();
  const password = passwordInput.value.trim();

  if (!username || !password) {
    messageElement.textContent = '用户名和密码不能为空';
    return;
  }

  try {
    // 使用Supabase的认证登录
    const { data, error } = await supabase.auth.signIn({
      email: username,
      password: password,
    });

    if (error) {
      throw error;
    }

    if (data.user) {
      // 登录成功，跳转到欢迎页面
      window.location.href = 'welcome.html';
    }
  } catch (error) {
    messageElement.textContent = `登录失败: ${error.message}`;
  }
});

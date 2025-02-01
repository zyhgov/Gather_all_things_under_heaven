const supabaseUrl = 'https://izlpowheyzdtyxqmodzs.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml6bHBvd2hleXpkdHl4cW1vZHpzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzY2ODc4MzYsImV4cCI6MjA1MjI2MzgzNn0.XlcbEAo1hOcO_ogZnLTHXovbUc71PugpLkOGwpOrR7w';
const supabase = window.supabase.createClient(supabaseUrl, supabaseKey);



function nextStep() {
  const email = document.getElementById('register-email').value.trim();
  if (email) {
    // 显示加载指示器
    document.querySelector('#email-box .loader').style.display = 'block';

    checkEmailExists(email)
      .then(exists => {
        if (exists) {
          document.getElementById('error-message').textContent = '该邮箱已存在，请直接登录';
        } else {
          document.getElementById('user-email').textContent = email;
          document.getElementById('email-box').style.display = 'none';
          document.getElementById('credentials-box').style.display = 'block';
        }
        // 隐藏加载指示器
        document.querySelector('#email-box .loader').style.display = 'none';
      })
      .catch(error => {
        console.error('Error checking email:', error);
        document.getElementById('error-message').textContent = '服务器错误，请稍后再试';
        // 隐藏加载指示器
        document.querySelector('#email-box .loader').style.display = 'none';
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

function nextStepCredentials() {
  const username = document.getElementById('username').value.trim();
  const password = document.getElementById('password').value.trim();
  const confirmPassword = document.getElementById('confirm-password').value.trim();

  if (!username || !password || !confirmPassword) {
    document.getElementById('credentials-error-message').textContent = '用户名、密码和确认密码不能为空';
    return;
  }

  if (password !== confirmPassword) {
    document.getElementById('credentials-error-message').textContent = '密码和确认密码不匹配';
    return;
  }

  // 显示加载指示器
  document.querySelector('#credentials-box .loader').style.display = 'block';

  setTimeout(() => {
    document.getElementById('final-user-email').textContent = document.getElementById('user-email').textContent;
    document.getElementById('credentials-box').style.display = 'none';
    document.getElementById('optional-box').style.display = 'block';
    // 隐藏加载指示器
    document.querySelector('#credentials-box .loader').style.display = 'none';
  }, 1000); // 模拟延迟
}

function register() {
  const email = document.getElementById('final-user-email').textContent;
  const username = document.getElementById('username').value.trim();
  const password = document.getElementById('password').value.trim();
  const nickname = document.getElementById('nickname').value.trim();
  const bio = document.getElementById('bio').value.trim();

  // 显示加载指示器
  document.querySelector('#optional-box .loader').style.display = 'block';

  signUpWithEmailAndPassword(email, password, username, nickname, bio)
    .then(() => {
      document.getElementById('optional-error-message').textContent = '注册成功!';
      setTimeout(() => { window.location.href = 'login.html'; }, 2000);
    })
    .catch(error => {
      console.error('Error registering user:', error);
      document.getElementById('optional-error-message').textContent = `注册失败: ${error.message}`;
      // 隐藏加载指示器
      document.querySelector('#optional-box .loader').style.display = 'none';
    });
}

function skip() {
  window.location.href = 'login.html';
}

async function signUpWithEmailAndPassword(email, password, username, nickname, bio) {
  try {
    // 使用Supabase的signUp方法注册用户
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email: email,
      password: password,
    });

    if (authError) {
      throw authError;
    }

    if (authData.user) {
      // 用户注册成功，插入额外信息到users表
      const { data: userData, error: userError } = await supabase
        .from('users')
        .insert([
          { 
            username: username,
            email: email,
            password: password,
            nickname: nickname,
            bio: bio,
            role: 0,
            status: 0,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          }
        ])
        .select();

      if (userError) {
        throw userError;
      }
    }
    // 隐藏加载指示器
    document.querySelector('#optional-box .loader').style.display = 'none';
  } catch (error) {
    throw new Error(`注册失败: ${error.message}`);
  }
}
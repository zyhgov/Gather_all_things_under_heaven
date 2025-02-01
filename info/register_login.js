// 初始化Supabase客户端
const supabaseUrl = 'https://izlpowheyzdtyxqmodzs.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml6bHBvd2hleXpkdHl4cW1vZHpzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzY2ODc4MzYsImV4cCI6MjA1MjI2MzgzNn0.XlcbEAo1hOcO_ogZnLTHXovbUc71PugpLkOGwpOrR7w';
const supabaseClient = createClient(supabaseUrl, supabaseKey);

function toggleForm(formType) {
    const registerContainer = document.getElementById('register-container');
    const loginContainer = document.getElementById('login-container');

    if (formType === 'register') {
        registerContainer.style.display = 'block';
        loginContainer.style.display = 'none';
    } else {
        registerContainer.style.display = 'none';
        loginContainer.style.display = 'block';
    }
}

// 注册表单提交事件监听器
document.getElementById('register-form').addEventListener('submit', async (event) => {
    event.preventDefault();

    const username = document.getElementById('username').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();
    const nickname = document.getElementById('nickname').value.trim();
    const bio = document.getElementById('bio').value.trim();

    if (!username || !email || !password) {
        document.getElementById('register-message').textContent = '用户名、邮箱和密码不能为空';
        return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        document.getElementById('register-message').textContent = '请输入有效的邮箱地址';
        return;
    }

    if (password.length < 6) {
        document.getElementById('register-message').textContent = '密码至少需要6个字符';
        return;
    }

    try {
        // 使用Supabase的signUp方法注册用户
        const { data: signUpData, error: signUpError } = await supabaseClient.auth.signUp({
            email: email,
            password: password,
        });

        if (signUpError) {
            throw signUpError;
        }

        if (signUpData.user) {
            // 用户注册成功，插入额外信息到users表
            const { data: userData, error: userError } = await supabaseClient
                .from('users')
                .insert([
                    { 
                        username: username,
                        email: email,
                        nickname: nickname,
                        bio: bio,
                        role: 0,
                        status: 1,
                        created_at: new Date().toISOString(),
                        updated_at: new Date().toISOString()
                    }
                ])
                .select();

            if (userError) {
                throw userError;
            }

            document.getElementById('register-message').textContent = '注册成功!';
            document.getElementById('register-form').reset();
            toggleForm('login'); // 切换到登录表单
        }
    } catch (error) {
        console.error('注册失败:', error);
        document.getElementById('register-message').textContent = `注册失败: ${error.message}`;
    }
});

// 登录表单提交事件监听器
document.getElementById('login-form').addEventListener('submit', async (event) => {
    event.preventDefault();

    const email = document.getElementById('login-email').value.trim();
    const password = document.getElementById('login-password').value.trim();

    if (!email || !password) {
        document.getElementById('login-message').textContent = '邮箱和密码不能为空';
        return;
    }

    try {
        const { data, error } = await supabaseClient.auth.signInWithPassword({
            email: email,
            password: password,
        });

        if (error) {
            console.error('登录API错误:', error);
            if (error.message.includes('Invalid login credentials')) {
                document.getElementById('login-message').textContent = '电子邮件或密码错误，请检查你的输入。';
            } else if (error.message.includes('User not found')) {
                document.getElementById('login-message').textContent = '用户不存在，请先注册。';
            } else {
                document.getElementById('login-message').textContent = `登录失败：${error.message}`;
            }
            throw error;
        }

        if (data.user) {
            window.location.href = 'welcome.html';
        }
    } catch (error) {
        console.error('登录错误:', error);
        document.getElementById('login-message').textContent = `登录失败：${error.message}`;
    }
});
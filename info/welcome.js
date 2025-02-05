document.addEventListener('DOMContentLoaded', () => {
    const username = localStorage.getItem('username');
    const useremail = localStorage.getItem('useremail'); // 获取用户邮箱

    if (username && useremail) { // 确保两个变量都存在
        // 更新欢迎消息
        document.getElementById('welcome-message').textContent = `${username}`;
        document.getElementById('welcome-email').textContent = `${useremail}`;

        // 更新页面标题
        document.title = `联合库UNHub - ${username}`;

        // 初始化 Supabase 客户端
        const supabaseUrl = 'https://izlpowheyzdtyxqmodzs.supabase.co';
        const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml6bHBvd2hleXpkdHl4cW1vZHpzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzY2ODc4MzYsImV4cCI6MjA1MjI2MzgzNn0.XlcbEAo1hOcO_ogZnLTHXovbUc71PugpLkOGwpOrR7w';

        const supabase = window.supabase.createClient(supabaseUrl, supabaseKey);

        // 获取用户ID
        let userId;

        supabase
            .from('users')
            .select('id')
            .eq('username', username)
            .single()
            .then(({ data }) => {
                if (data) {
                    userId = data.id;
                    return fetchUserAvatar(userId);
                }
            })
            .catch(error => {
                console.error('Error fetching user ID:', error);
            });

        // 处理头像上传
        const fileInput = document.querySelector('.file-input');
        const updateAvatarBtn = document.querySelector('.custom-button'); // 确保选择正确的按钮
        const uploadMessageContainer = document.getElementById('upload-message-container');
        const uploadMessage = document.getElementById('upload-message');

        // 点击按钮时触发文件选择对话框
        updateAvatarBtn.addEventListener('click', () => {
            fileInput.click(); // 触发文件输入元素的点击事件
        });

        fileInput.addEventListener('change', async () => {
            const file = fileInput.files[0];

            if (!file) {
                alert('请选择一张图片');
                return;
            }

            // 显示上传提示信息
            uploadMessageContainer.style.display = 'block';

            // 调用带有简单提示信息的上传函数
            await uploadFile(file, userId, supabaseUrl, supabaseKey);

            // 隐藏上传提示信息
            uploadMessageContainer.style.display = 'block';
        });

        // 添加安全退出事件监听器
        document.getElementById('logout-link').addEventListener('click', () => {
            // 清除本地存储中的用户名和邮箱信息
            localStorage.removeItem('username');
            localStorage.removeItem('useremail');

            // 重定向到登录页面
            window.location.href = '/index.html';
        });
    } else {
        // 如果没有用户名或邮箱，重定向到登录页面
        window.location.href = 'login.html';
    }
});

// 使用 XMLHttpRequest 来上传文件
async function uploadFile(file, userId, supabaseUrl, supabaseKey) {
    const fileName = `${userId}-${Date.now()}-${file.name}`;
    const formData = new FormData();
    formData.append('file', file);

    const xhr = new XMLHttpRequest();
    xhr.open('POST', `${supabaseUrl}/storage/v1/object/avatars/${fileName}`, true);
    xhr.setRequestHeader('Authorization', `Bearer ${supabaseKey}`);

    xhr.onload = async function() {
        if (xhr.status === 200 || xhr.status === 201) {
            const avatarUrl = `${supabaseUrl}/storage/v1/object/public/avatars/${fileName}`;

            // 更新 user_avatars 表
            const supabase = window.supabase.createClient(supabaseUrl, supabaseKey);
            try {
                await supabase
                    .from('user_avatars')
                    .insert([{ user_id: userId, avatar_url: avatarUrl }])
                    .single();

                // 显示上传后的头像
                document.getElementById('current-avatar').src = avatarUrl;
                document.getElementById('sidebar-avatar').src = avatarUrl;
                document.getElementById('user-avatar').src = avatarUrl;

                // 提示用户上传成功
                alert('头像上传成功！请刷新页面。');
            } catch (error) {
                console.error('Error updating user avatars:', error);
                alert('上传失败，请重试');
            }
        } else {
            console.error('Upload failed with status:', xhr.status);
            alert('上传失败，请重试');
        }
    };

    xhr.onerror = function() {
        console.error('Unexpected error occurred during upload');
        alert('发生意外错误，请重试');
    };

    xhr.send(formData);
}

// 获取并显示用户的最新头像
async function fetchUserAvatar(userId) {
    const supabaseUrl = 'https://izlpowheyzdtyxqmodzs.supabase.co';
    const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml6bHBvd2hleXpkdHl4cW1vZHpzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzY2ODc4MzYsImV4cCI6MjA1MjI2MzgzNn0.XlcbEAo1hOcO_ogZnLTHXovbUc71PugpLkOGwpOrR7w';


    const supabase = window.supabase.createClient(supabaseUrl, supabaseKey);

    // 查询最新的头像记录
    const { data, error } = await supabase
        .from('user_avatars')
        .select('avatar_url')  // 只选择我们需要的列
        .eq('user_id', userId)
        .order('updated_at', { ascending: false }) // 按更新时间降序排列
        .limit(1); // 只取一条记录

    if (error) {
        console.error('Error fetching latest avatar:', error);
        return;
    }

    if (data.length > 0) {
        // 使用最新的一条记录更新头像
        document.getElementById('current-avatar').src = data[0].avatar_url;
        document.getElementById('sidebar-avatar').src = data[0].avatar_url;
        document.getElementById('user-avatar').src = data[0].avatar_url;
    } else {
        console.log('No avatar found for this user.');
    }
}

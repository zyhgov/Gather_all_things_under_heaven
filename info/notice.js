document.getElementById('notice').addEventListener('click', toggleNotice);

let noticeStatus = false;

function toggleNotice() {
    noticeStatus = !noticeStatus;
    shownoticeAlert();
}

function shownoticeAlert() {
    const alertMessage = noticeStatus 
        ? '通知发送与查看功能在下面，往下翻👇' 
        : '通知发送与查看功能在下面，往下翻👇';
    
    // 创建弹窗
    const alertDiv = document.createElement('div');
    alertDiv.textContent = alertMessage;
    alertDiv.classList.add(
        'fixed', 'top-5', 'left-1/2', 'transform', '-translate-x-1/2', 
        'text-white', 'p-4', 'rounded-lg', 'shadow-lg', 'text-center', 
        'w-3/4', 'md:w-1/2', 'z-50', 'opacity-0', 'transition-opacity', 'duration-500',
        'font-bold', 'tracking-wider'  // 添加粗体和字间距
    );

    // 设置背景颜色根据状态不同
    if (noticeStatus) {
        alertDiv.classList.add('bg-yellow-500'); // 开启时绿色背景
    } else {
        alertDiv.classList.add('bg-yellow-500'); // 关闭时红色背景
    }

    document.body.appendChild(alertDiv);

    // 设置弹窗显示并在3秒后隐藏
    setTimeout(() => {
        alertDiv.classList.remove('opacity-0');
        alertDiv.classList.add('opacity-100');
    }, 100);

    setTimeout(() => {
        alertDiv.classList.remove('opacity-100');
        alertDiv.classList.add('opacity-0');
        setTimeout(() => alertDiv.remove(), 500); // 完全移除元素
    }, 3000);
}


document.addEventListener('DOMContentLoaded', () => {
    const username = localStorage.getItem('username');
    const useremail = localStorage.getItem('useremail'); // 获取用户邮箱

    if (username && useremail) { // 确保用户名和邮箱存在
        // 初始化 Supabase 客户端
        const supabaseUrl = 'https://izlpowheyzdtyxqmodzs.supabase.co';
        const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml6bHBvd2hleXpkdHl4cW1vZHpzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzY2ODc4MzYsImV4cCI6MjA1MjI2MzgzNn0.XlcbEAo1hOcO_ogZnLTHXovbUc71PugpLkOGwpOrR7w';   
        const supabase = window.supabase.createClient(supabaseUrl, supabaseKey);

        // 获取用户信息
        async function getUserInfo() {
            const { data: users, error } = await supabase
                .from('users')
                .select('*')
                .eq('username', username)
                .eq('email', useremail)
                .single(); // 获取当前用户信息

            if (error) {
                console.error('获取用户信息失败:', error);
            } else {
                return users;
            }
        }

        // 检查用户是否为管理员
        async function isAdmin() {
            const userInfo = await getUserInfo();
            return userInfo.role === 1; // 判断角色是否为管理员
        }

        // 加载通知内容
        async function loadNotifications() {
            const { data: notifications, error } = await supabase
                .from('notifications')
                .select('*')
                .order('time', { ascending: false }); // 获取所有通知，按时间降序排列

            if (error) {
                console.error('加载通知失败:', error);
                return;
            }

            const notificationSection = document.getElementById('notification-section');
            notificationSection.innerHTML = ''; // 清空当前通知内容

            notifications.forEach(notification => {
                const notificationDiv = document.createElement('div');
                notificationDiv.classList.add('p-6', 'mb-6', 'rounded-2xl', 'shadow-lg', 'transition', 'duration-300', 'ease-in-out');
            
                // 根据通知类别设置样式
                switch (notification.category) {
                    case 'success':
                        notificationDiv.classList.add('bg-green-50', 'border-green-300');
                        break;
                    case 'warning':
                        notificationDiv.classList.add('bg-yellow-50', 'border-yellow-300');
                        break;
                    case 'failure':
                        notificationDiv.classList.add('bg-red-50', 'border-red-300');
                        break;
                    case 'grant':
                        notificationDiv.classList.add('bg-blue-50', 'border-blue-300');
                        break;
                    case 'collect':
                        notificationDiv.classList.add('bg-purple-50', 'border-purple-300');
                        break;
                    default:
                        notificationDiv.classList.add('bg-gray-50', 'border-gray-300');
                }
            
                // 设置文字样式
                notificationDiv.innerHTML = `
                    <h3 class="font-semibold text-xl text-gray-900 mb-2">${notification.title}</h3>
                    <p class="text-sm text-gray-600 mb-3">${notification.content}</p>
                    <p class="text-xs text-gray-500">发送时间: ${new Date(notification.time).toLocaleString()}</p>
                `;
            
                notificationSection.appendChild(notificationDiv);
            });
            
        }

        // 展示通知内容
        async function showNotifications() {
            const notificationSection = document.getElementById('notification-section');
            notificationSection.style.display = 'block'; // 显示通知区

            if (await isAdmin()) {
                // 检查发送通知表单是否已经存在
                if (!document.getElementById('send-notification')) {
                    // 如果是管理员，显示发送通知的表单
                    const sendNotificationForm = `
                                <div id="send-notification" class="card p-8 space-y-6 max-w-xl mx-auto bg-white rounded-xl shadow-lg">
            <h2 class="text-3xl font-semibold text-gray-900">发送通知</h2>
            <h2 class="text-xl font-semibold text-gray-900">管理员目前只能发送无法接收</h2>
            <form id="send-notification-form" class="space-y-6">
                <label class="block">
                    <span class="text-gray-700 text-sm">通知类别</span>
                    <select id="category" class="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                        <option value="success">成功</option>
                        <option value="warning">警告</option>
                        <option value="failure">失败</option>
                        <option value="grant">发放</option>
                        <option value="collect">收集</option>
                    </select>
                </label>
                
                <label class="block">
                    <span class="text-gray-700 text-sm">通知标题</span>
                    <input type="text" id="title" class="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" required>
                </label>
                
                <label class="block">
                    <span class="text-gray-700 text-sm">通知内容</span>
                    <textarea id="content" class="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" required></textarea>
                </label>
                
                <label class="block">
                    <span class="text-gray-700 text-sm">选择用户</span>
                    <select id="user-selection" multiple class="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                        <!-- 动态加载用户列表 -->
                    </select>
                </label>
                
                <label class="block flex items-center">
                    <input type="checkbox" id="select-all" class="mr-2 rounded-full">
                    <span class="text-gray-700 text-sm">发送给所有用户</span>
                </label>
                
                <button type="submit" class="mt-6 px-8 py-3 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition duration-300">发送通知</button>
            </form>
        </div>
    `;

                    notificationSection.insertAdjacentHTML('beforebegin', sendNotificationForm);

                    // 加载用户列表
                    const { data: users, error } = await supabase.from('users').select('*');
                    if (error) {
                        console.error('加载用户列表失败:', error);
                    } else {
                        const userSelection = document.getElementById('user-selection');
                        users.forEach(user => {
                            const option = document.createElement('option');
                            option.value = user.id;
                            option.textContent = user.username; // 显示用户名
                            userSelection.appendChild(option);
                        });
                    }

                    // 监听“选择所有用户”复选框的变化
                    document.getElementById('select-all').addEventListener('change', (e) => {
                        const userSelection = document.getElementById('user-selection');
                        if (e.target.checked) {
                            // 选中所有用户
                            Array.from(userSelection.options).forEach(option => option.selected = true);
                        } else {
                            // 取消选中所有用户
                            Array.from(userSelection.options).forEach(option => option.selected = false);
                        }
                    });

                    // 处理表单提交
                    document.getElementById('send-notification-form').addEventListener('submit', async (e) => {
                        e.preventDefault();

                        const category = document.getElementById('category').value;
                        const title = document.getElementById('title').value;
                        const content = document.getElementById('content').value;
                        const selectedUsers = Array.from(document.getElementById('user-selection').selectedOptions).map(option => option.value);
                        const sendToAll = document.getElementById('select-all').checked;

                        // 如果没有选择用户，并且没有勾选发送给所有用户，则提示用户选择用户
                        if (!sendToAll && selectedUsers.length === 0) {
                            alert('请至少选择一个用户或选择发送给所有用户');
                            return;
                        }

                        // 发送通知到数据库
                        const notificationData = {
                            category,
                            title,
                            content,
                            sender_id: (await getUserInfo()).id,
                            time: new Date().toISOString()
                        };

                        // 插入通知数据
                        const { data, error } = await supabase
                            .from('notifications')
                            .insert([notificationData]);

                        if (error) {
                            alert('发送通知失败');
                            console.error('发送通知错误:', error);
                        } else {
                            // 如果选择了发送给所有用户，向所有用户发送通知
                            const usersToNotify = sendToAll ? selectedUsers.concat(Array.from(document.getElementById('user-selection').options).map(option => option.value)) : selectedUsers;

                            usersToNotify.forEach(userId => {
                                supabase
                                    .from('user_notifications')
                                    .insert([{ notification_id: data[0].id, user_id: userId }]); // 假设有 user_notifications 表来关联用户和通知
                            });

                            loadNotifications();
                            alert('通知已发送');
                        }
                    });
                }
            } else {
                // 普通用户只显示通知列表
                loadNotifications();
            }
        }

        // 监听点击通知偏好
        document.getElementById('notice').addEventListener('click', showNotifications);
        
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const username = localStorage.getItem('username');
    const useremail = localStorage.getItem('useremail'); // 获取用户邮箱

    if (username && useremail) { // 确保两个变量都存在
        // 初始化 Supabase 客户端
        const supabaseUrl = 'https://izlpowheyzdtyxqmodzs.supabase.co';
        const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml6bHBvd2hleXpkdHl4cW1vZHpzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzY2ODc4MzYsImV4cCI6MjA1MjI2MzgzNn0.XlcbEAo1hOcO_ogZnLTHXovbUc71PugpLkOGwpOrR7w';

        const supabase = window.supabase.createClient(supabaseUrl, supabaseKey);

        // 获取用户ID和角色
        let userId;
        let userRole;

        supabase
            .from('users')
            .select('id, nickname, bio, role, status')
            .eq('username', username)
            .single()
            .then(({ data }) => {
                if (data) {
                    userId = data.id;
                    userRole = data.role;
                    fillUserInfo(data);
                    updateSidebarItems(userRole);
                }
            })
            .catch(error => {
                console.error('Error fetching user info:', error);
            });
            document.getElementById('account-info-link').addEventListener('click', showDefaultContent);
            document.getElementById('user-div-avatar').addEventListener('click', userdivavatar);
        function fillUserInfo(user) {
            // 清空现有的内容
            const cardContainer = document.querySelector('.card.p-6.space-y-5');
            cardContainer.innerHTML = '';

            // 添加显示您的昵称输入框
            const nicknameFormGroup = createFormGroup('您的昵称', user.nickname || '', 'text');
            cardContainer.appendChild(nicknameFormGroup);

            // 添加个性签名输入框
            const bioFormGroup = createFormGroup('个性签名', user.bio || '', 'textarea');
            cardContainer.appendChild(bioFormGroup);
            // 添加保存按钮
            const saveButton = createSaveButton();
            cardContainer.appendChild(saveButton);
            // 添加用户角色输入框
            const roleFormGroup = createReadOnlyFormGroup('用户角色', user.role === 0 ? '普通用户' : '管理员');
            cardContainer.appendChild(roleFormGroup);

            // 添加用户状态输入框
            const statusFormGroup = createReadOnlyFormGroup('用户状态', user.status === 0 ? '未激活' : (user.status === 1 ? '正常' : '禁用'));
            cardContainer.appendChild(statusFormGroup);

            
        }

        function createFormGroup(labelText, defaultValue, inputType = 'text') {
            const formGroup = document.createElement('div');
            formGroup.classList.add('form-group');

            const label = document.createElement('label');
            label.classList.add('text-[13px]', 'font-medium', 'text-gray-600', 'mb-2', 'block');
            label.textContent = labelText;

            if (inputType === 'textarea') {
                const textarea = document.createElement('textarea');
                textarea.classList.add('w-full', 'p-3', 'rounded-lg', 'border', 'border-gray-200', 'h-24', 'focus:ring-2', 'focus:ring-blue-500', 'focus:border-blue-500', 'outline-none', 'transition-all');
                textarea.placeholder = `输入您的${labelText}`;
                textarea.value = defaultValue;
                formGroup.appendChild(label);
                formGroup.appendChild(textarea);
            } else {
                const input = document.createElement('input');
                input.type = inputType;
                input.classList.add('w-full', 'p-3', 'rounded-lg', 'border', 'border-gray-200', 'focus:ring-2', 'focus:ring-blue-500', 'focus:border-blue-500', 'outline-none', 'transition-all');
                input.placeholder = `输入您的${labelText}`;
                input.value = defaultValue;
                formGroup.appendChild(label);
                formGroup.appendChild(input);
            }

            return formGroup;
        }

        function createReadOnlyFormGroup(labelText, value) {
            const formGroup = document.createElement('div');
            formGroup.classList.add('form-group');

            const label = document.createElement('label');
            label.classList.add('text-[13px]', 'font-medium', 'text-gray-600', 'mb-2', 'block');
            label.textContent = labelText;

            const input = document.createElement('input');
            input.type = 'text';
            input.classList.add('w-full', 'p-3', 'rounded-lg', 'border', 'border-gray-200', 'focus:ring-2', 'focus:ring-blue-500', 'focus:border-blue-500', 'outline-none', 'transition-all');
            input.value = value;
            input.readOnly = true;

            formGroup.appendChild(label);
            formGroup.appendChild(input);

            return formGroup;
        }

        function createSaveButton() {
            const button = document.createElement('button');
            button.classList.add('custom-button', 'inline-flex', 'items-center', 'gap-2', 'px-6', 'py-3', 'mt-4');
            button.textContent = '保存更改';
            button.addEventListener('click', handleSaveClick);
            return button;
        }

        function handleSaveClick() {
            const nicknameInput = document.querySelector('.form-group input[placeholder="输入您的您的昵称"]');
            const bioTextarea = document.querySelector('.form-group textarea[placeholder="输入您的个性签名"]');

            const updatedNickname = nicknameInput.value;
            const updatedBio = bioTextarea.value;

            supabase
                .from('users')
                .update({ nickname: updatedNickname, bio: updatedBio })
                .eq('id', userId)
                .then(() => {
                    alert('个人信息更新成功！');
                })
                .catch(error => {
                    console.error('Error updating user info:', error);
                    alert('个人信息更新失败，请重试！');
                });
        }
        
        function updateSidebarItems(role) {
            if (role === 1) { // 如果是管理员
                const securitySettingsItem = Array.from(document.querySelectorAll('.function-menu li')).find(li => li.textContent.includes('安全设置'));
                if (securitySettingsItem) {
                    const userManagementItem = document.createElement('li');
                    userManagementItem.classList.add('sidebar-item');
                    userManagementItem.textContent = '🕹️ 用户管理';
                    securitySettingsItem.before(userManagementItem);
        
                    // 添加点击事件监听器
                    userManagementItem.addEventListener('click', loadUserManagementContent);
                }
            }
        }
        
        function showDefaultContent() {
            const defaultContent = document.querySelector('.default-content');
            const userManagementContainer = document.querySelector('.user-management-container');
        
            if (!defaultContent || !userManagementContainer) {
                console.error("DOM elements not found:", defaultContent, userManagementContainer);
                return;
            }
        
            defaultContent.style.display = 'block';
            userManagementContainer.style.display = 'none';
        }
        
        function loadUserManagementContent() {
            console.log("Loading user management content...");
            const defaultContent = document.querySelector('.default-content');
            const userManagementContainer = document.querySelector('.user-management-container');
        
            if (!defaultContent || !userManagementContainer) {
                console.error("DOM elements not found:", defaultContent, userManagementContainer);
                return;
            }
            defaultContent.style.display = 'none';
            userManagementContainer.style.display = 'block';
        }
        
    } else {
        // 如果没有用户名或邮箱，重定向到登录页面
        window.location.href = 'login.html';
    }
});

// Polyfill for :contains selector in JavaScript
(function ($) {
    $.expr[':'].contains = function (a, i, m) {
        return $(a).text().toUpperCase().indexOf(m[3].toUpperCase()) >= 0;
    };
})(jQuery);
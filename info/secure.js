document.addEventListener('DOMContentLoaded', () => {
    const useremail = localStorage.getItem('useremail'); // 获取用户邮箱

    if (useremail) { // 确保用户邮箱存在
        // 初始化 Supabase 客户端
        const supabaseUrl = 'https://izlpowheyzdtyxqmodzs.supabase.co';
        const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml6bHBvd2hleXpkdHl4cW1vZHpzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzY2ODc4MzYsImV4cCI6MjA1MjI2MzgzNn0.XlcbEAo1hOcO_ogZnLTHXovbUc71PugpLkOGwpOrR7w';

        const supabase = window.supabase.createClient(supabaseUrl, supabaseKey);

        // 动态生成安全设置内容
        let secureContent;

        function renderSecureContent() {
            const rightContent = document.querySelector('.right-content');
            secureContent = document.createElement('div');
            secureContent.classList.add('card', 'p-6', 'space-y-5', 'secure-content');
            secureContent.style.display = 'none'; // 默认隐藏

            // 添加更新密码表单
            const passwordForm = createPasswordForm();
            secureContent.appendChild(passwordForm);

            rightContent.appendChild(secureContent);
        }

        function createPasswordForm() {
            const formGroup = document.createElement('div');
            formGroup.classList.add('form-group');

            const labelNewPassword = document.createElement('label');
            labelNewPassword.classList.add('text-[13px]', 'font-medium', 'text-gray-600', 'mb-2', 'block');
            labelNewPassword.textContent = '新密码';

            const inputNewPassword = document.createElement('input');
            inputNewPassword.type = 'password';
            inputNewPassword.classList.add('w-full', 'p-3', 'rounded-lg', 'border', 'border-gray-200', 'focus:ring-2', 'focus:ring-blue-500', 'focus:border-blue-500', 'outline-none', 'transition-all');
            inputNewPassword.placeholder = '输入新密码';

            const labelConfirmPassword = document.createElement('label');
            labelConfirmPassword.classList.add('text-[13px]', 'font-medium', 'text-gray-600', 'mb-2', 'block');
            labelConfirmPassword.textContent = '确认新密码';

            const inputConfirmPassword = document.createElement('input');
            inputConfirmPassword.type = 'password';
            inputConfirmPassword.classList.add('w-full', 'p-3', 'rounded-lg', 'border', 'border-gray-200', 'focus:ring-2', 'focus:ring-blue-500', 'focus:border-blue-500', 'outline-none', 'transition-all');
            inputConfirmPassword.placeholder = '再次输入新密码';

            const saveButton = createSaveButton('update-password', handleUpdatePassword);

            formGroup.appendChild(labelNewPassword);
            formGroup.appendChild(inputNewPassword);
            formGroup.appendChild(labelConfirmPassword);
            formGroup.appendChild(inputConfirmPassword);
            formGroup.appendChild(saveButton);

            return formGroup;
        }

        function createSaveButton(actionType, clickHandler) {
            const button = document.createElement('button');
            button.classList.add('custom-button', 'inline-flex', 'items-center', 'gap-2', 'px-6', 'py-3', 'mt-4');
            button.textContent = '保存更改';
            button.dataset.actionType = actionType;
            button.addEventListener('click', clickHandler);
            return button;
        }

        function validatePasswords(inputNewPassword, inputConfirmPassword) {
            const newPassword = inputNewPassword.value;
            const confirmPassword = inputConfirmPassword.value;

            if (newPassword !== confirmPassword) {
                inputNewPassword.classList.remove('border-green-500');
                inputNewPassword.classList.add('border-red-500');
                inputConfirmPassword.classList.remove('border-green-500');
                inputConfirmPassword.classList.add('border-red-500');
            } else {
                inputNewPassword.classList.remove('border-red-500');
                inputNewPassword.classList.add('border-green-500');
                inputConfirmPassword.classList.remove('border-red-500');
                inputConfirmPassword.classList.add('border-green-500');
            }
        }

        async function handleUpdatePassword(event) {
            const newPasswordInput = document.querySelector('.form-group input[placeholder="输入新密码"]');
            const confirmPasswordInput = document.querySelector('.form-group input[placeholder="再次输入新密码"]');

            const newPassword = newPasswordInput.value;
            const confirmPassword = confirmPasswordInput.value;

            if (newPassword !== confirmPassword) {
                alert('新密码和确认密码不匹配，请检查后重试。');
                return;
            }

            // 获取用户ID
            let userId;
            const { data, error } = await supabase
                .from('users')
                .select('id')
                .eq('email', useremail)
                .single();

            if (error) {
                console.error('Error fetching user ID:', error);
                alert('获取用户信息失败，请重试！');
                return;
            }

            userId = data.id;

            // 更新数据库中的密码
            const { error: updateError } = await supabase
                .from('users')
                .update({ password: newPassword })
                .eq('id', userId);

            if (updateError) {
                console.error('Error updating password in database:', updateError);
                alert('密码更新失败，请重试！');
            } else {
                alert('密码更新成功！');

                // 清空输入框内容
                newPasswordInput.value = '';
                confirmPasswordInput.value = '';

                // 移除或重置样式类以清除之前的验证状态
                [newPasswordInput, confirmPasswordInput].forEach(input => {
                    input.classList.remove('border-green-500', 'border-red-500');
                });
            }
        }

        // 渲染安全设置内容
        renderSecureContent();

        // 绑定“安全设置”链接的点击事件监听器
        const securitySettingsLink = document.getElementById('secure');
        if (securitySettingsLink) {
            securitySettingsLink.addEventListener('click', toggleSecureContent);
        }

        // 保存需要隐藏的 div
        const userDivAvatar = document.getElementById('user-div-avatar');
        const defaultContent = document.querySelector('.default-content');

        function toggleSecureContent(event) {
            event.preventDefault(); // 防止默认行为（如页面跳转）

            if (secureContent.style.display === 'none') {
                secureContent.style.display = 'block';
                userDivAvatar.style.display = 'none';
                defaultContent.style.display = 'none';
            } else {
                secureContent.style.display = 'none';
                userDivAvatar.style.display = 'block';
                defaultContent.style.display = 'block';
            }
        }

        // 绑定其他 li 元素的点击事件监听器
        const sidebarItems = document.querySelectorAll('.sidebar-item');
        sidebarItems.forEach(item => {
            item.addEventListener('click', function(event) {
                if (item.id !== 'secure') {
                    secureContent.style.display = 'none';
                    userDivAvatar.style.display = 'block';
                    defaultContent.style.display = 'block';
                }
            });
        });
    } else {
        // 如果没有用户名或邮箱，重定向到登录页面
        window.location.href = 'login.html';
    }
});
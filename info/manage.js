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
                    if (userRole === 1) { // 如果是管理员
                        fetchUsers();
                    }
                }
            })
            .catch(error => {
                console.error('Error fetching user info:', error);
            });

        function fetchUsers() {
            supabase
                .from('users')
                .select('*')
                .then(({ data }) => {
                    if (data) {
                        renderUserList(data);
                    }
                })
                .catch(error => {
                    console.error('Error fetching users:', error);
                });
        }

        function renderUserList(users) {
            const userManagementContainer = document.querySelector('.user-management-container');
            userManagementContainer.innerHTML = ''; // 清空现有内容

            const table = document.createElement('table');
            table.classList.add('user-table', 'min-w-full', 'divide-y', 'divide-gray-200');

            const thead = document.createElement('thead');
            const headerRow = document.createElement('tr');
            ['ID', '用户名', '邮箱', '昵称', '角色', '状态', '操作'].forEach(headerText => {
                const th = document.createElement('th');
                th.classList.add('px-6', 'py-3', 'bg-gray-50', 'text-left', 'text-xs', 'font-medium', 'text-gray-500', 'uppercase', 'tracking-wider');
                th.textContent = headerText;
                headerRow.appendChild(th);
            });
            thead.appendChild(headerRow);
            table.appendChild(thead);

            const tbody = document.createElement('tbody');
            users.forEach(user => {
                const tr = document.createElement('tr');
                tr.classList.add('border-b', 'border-gray-200');

                const idCell = createTableCell(user.id.toString());
                const usernameCell = createTableCell(user.username);
                const emailCell = createTableCell(user.email);
                const nicknameCell = createTableCell(user.nickname || '');
                const roleCell = createTableCell(user.role === 0 ? '普通用户' : '管理员');
                const statusCell = createTableCell(user.status === 0 ? '未激活' : (user.status === 1 ? '正常' : '禁用'));
                const actionCell = createActionCell(user);

                [idCell, usernameCell, emailCell, nicknameCell, roleCell, statusCell, actionCell].forEach(cell => {
                    tr.appendChild(cell);
                });

                tbody.appendChild(tr);
            });
            table.appendChild(tbody);

            userManagementContainer.appendChild(table);
        }

        function createTableCell(text) {
            const td = document.createElement('td');
            td.classList.add('px-6', 'py-4', 'whitespace-nowrap', 'text-sm', 'font-medium', 'text-gray-900');
            td.textContent = text;
            return td;
        }

        function createActionCell(user) {
            const td = document.createElement('td');
            td.classList.add('px-6', 'py-4', 'whitespace-nowrap', 'text-right', 'text-sm', 'font-medium');

            const deleteButton = document.createElement('button');
            deleteButton.classList.add('custom-button', 'inline-flex', 'items-center', 'gap-2', 'px-4', 'py-2', 'mr-2', 'bg-red-600', 'text-white', 'rounded-lg', 'hover:bg-red-700', 'focus:outline-none', 'focus:ring-2', 'focus:ring-red-500', 'focus:ring-offset-2');
            deleteButton.textContent = '删除';
            deleteButton.addEventListener('click', () => handleDeleteUser(user.id));

            const toggleRoleButton = document.createElement('button');
            toggleRoleButton.classList.add('custom-button', 'inline-flex', 'items-center', 'gap-2', 'px-4', 'py-2', 'mr-2', 'bg-blue-600', 'text-white', 'rounded-lg', 'hover:bg-blue-700', 'focus:outline-none', 'focus:ring-2', 'focus:ring-blue-500', 'focus:ring-offset-2');
            toggleRoleButton.textContent = user.role === 0 ? '设为管理员' : '设为普通用户';
            toggleRoleButton.addEventListener('click', () => handleToggleUserRole(user.id));

            const toggleStatusButton = document.createElement('button');
            toggleStatusButton.classList.add('custom-button', 'inline-flex', 'items-center', 'gap-2', 'px-4', 'py-2', 'bg-green-600', 'text-white', 'rounded-lg', 'hover:bg-green-700', 'focus:outline-none', 'focus:ring-2', 'focus:ring-green-500', 'focus:ring-offset-2');
            toggleStatusButton.textContent = user.status === 0 ? '激活' : (user.status === 1 ? '禁用' : '恢复正常');
            toggleStatusButton.addEventListener('click', () => handleToggleUserStatus(user.id));

            td.appendChild(deleteButton);
            td.appendChild(toggleRoleButton);
            td.appendChild(toggleStatusButton);

            return td;
        }

        function handleDeleteUser(userId) {
            if (confirm('确定要删除该用户吗？')) {
                supabase
                    .from('users')
                    .delete()
                    .eq('id', userId)
                    .then(() => {
                        alert('用户删除成功！');
                        fetchUsers();
                    })
                    .catch(error => {
                        console.error('Error deleting user:', error);
                        alert('用户删除失败，请重试！');
                    });
            }
        }

        function handleToggleUserRole(userId) {
            supabase
                .from('users')
                .select('role')
                .eq('id', userId)
                .single()
                .then(({ data }) => {
                    const newRole = data.role === 0 ? 1 : 0;
                    supabase
                        .from('users')
                        .update({ role: newRole })
                        .eq('id', userId)
                        .then(() => {
                            alert('用户角色更新成功！');
                            fetchUsers();
                        })
                        .catch(error => {
                            console.error('Error updating user role:', error);
                            alert('用户角色更新失败，请重试！');
                        });
                })
                .catch(error => {
                    console.error('Error fetching user role:', error);
                });
        }

        function handleToggleUserStatus(userId) {
            supabase
                .from('users')
                .select('status')
                .eq('id', userId)
                .single()
                .then(({ data }) => {
                    const newStatus = data.status === 0 ? 1 : (data.status === 1 ? 2 : 0);
                    supabase
                        .from('users')
                        .update({ status: newStatus })
                        .eq('id', userId)
                        .then(() => {
                            alert('用户状态更新成功！');
                            fetchUsers();
                        })
                        .catch(error => {
                            console.error('Error updating user status:', error);
                            alert('用户状态更新失败，请重试！');
                        });
                })
                .catch(error => {
                    console.error('Error fetching user status:', error);
                });
        }
    } else {
        // 如果没有用户名或邮箱，重定向到登录页面
        window.location.href = 'login.html';
    }
});
document.addEventListener('DOMContentLoaded', function () {
    // 获取元素
    const alertBox = document.getElementById('alert-box');
    const alertTitle = document.getElementById('alert-title');
    const alertMessage = document.getElementById('alert-message');

    // 获取IP地址和相关信息的函数
    function getNetworkInfo() {
        // 使用https://ipinfo.io/json 来获取用户的IP和网络信息
        axios.get('https://ipinfo.io/json?token=b2a740212238f8')
            .then(response => {
                console.log('Response data:', response.data);
                const data = response.data;
                checkNetworkSecurity(data);
            })
            .catch(error => {
                console.error('Error fetching IP information:', error);
                showAlert('网络检查失败 Network Check Failed', '无法获取您的网络信息，UNHub网络安全中心无法保证您的安全，请稍后重试。', 'warning');
            });
    }

    // 检查网络安全性
    function checkNetworkSecurity(data) {
        const { ip, country, org } = data; // 直接使用 org 而不是 company
        const orgName = org || '未知'; // 如果 org 存在则使用，否则设置为 '未知'

        // 这里可以根据实际情况判断网络是否安全
        const isSafeNetwork = (orgName && orgName.toLowerCase().includes('vpn')) ? false : true;

        if (isSafeNetwork) {
            showAlert('网络安全 Network Security', `您的网络连接安全。&nbsp;IP地址: <strong>${ip}</strong> &nbsp;,&nbsp;国家或地区是: <span class="fi fi-${country.toLowerCase()}"></span>&nbsp;<strong>${country}</strong><br>网络运营商:<strong>${orgName}</strong>`, 'safe');
        } else {
            showAlert('网络不安全 Network Insecurity', `检测到您使用了VPN或不安全的网络。&nbsp;IP地址: <strong>${ip}</strong> &nbsp;,&nbsp;国家或地区是: <span class="fi fi-${country.toLowerCase()}"></span>&nbsp;<strong>${country}</strong><br>网络运营商:<strong>${orgName}</strong>`, 'warning');
        }
    }

    // 显示提示框
    function showAlert(title, message, type) {
        alertTitle.textContent = title;
        alertMessage.innerHTML = message; // 使用 innerHTML 以便插入 HTML 内容
        alertBox.className = `alert-box ${type} show`; // 添加 'show' 类以启动进入动画
    
        // 等待动画完成后，设置定时器隐藏提示框
        setTimeout(() => {
            alertBox.classList.add('hide'); // 添加 'hide' 类以启动退出动画
            // 确保在动画完成后再将元素设为不可见
            setTimeout(() => {
                alertBox.classList.remove('show', 'hide', type); // 移除所有类以准备下一次显示
            }, 2000); // 动画持续时间应与CSS中定义的时间相匹配
        }, 5000); // 3秒后隐藏
    }

    // 执行网络检查
    getNetworkInfo();
});

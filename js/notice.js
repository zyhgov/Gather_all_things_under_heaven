document.addEventListener('DOMContentLoaded', function() {
    // 创建模糊背景层
    const overlay = document.createElement('div');
    overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(255, 255, 255, 0.4);
        backdrop-filter: saturate(180%) blur(20px);
        -webkit-backdrop-filter: saturate(180%) blur(20px);
        z-index: 999;
    `;

    // 创建通知卡片
    const notificationCard = document.createElement('div');
    notificationCard.className = 'system-notification';
    notificationCard.style.zIndex = '1000'; // 确保在模糊层之上

    // 构建卡片内容
    notificationCard.innerHTML = `
        <button class="close-button" aria-label="关闭通知"></button>
        <div class="notification-content">
            <div class="notification-title">🌐 网站通告 2025年03号</div>
            <p class="notification-text">由于管理员(杖雍皓)近期参与实习工作，网站内容更新频率将阶段性调整：</p>
            <p class="notification-text">⚠️ 版本迭代周期延长至4-6周<br>
                                🔏 安全维护移交 Cloudflare 持续保障<br>
                                📞 用户反馈响应保持48小时内<br>
                                📨 邮箱：info@zyhorg.cn</p>
            <p class="notification-text">我们将持续优化基础设施稳定性，感谢您的理解与支持。</p>
        </div>
    `;

    // 关闭功能增强
    const closeHandler = () => {
        notificationCard.style.opacity = '0';
        overlay.style.opacity = '0';
        setTimeout(() => {
            notificationCard.remove();
            overlay.remove();
        }, 300);
    };

    // 点击背景层也可关闭
    overlay.addEventListener('click', closeHandler);
    notificationCard.querySelector('.close-button').addEventListener('click', closeHandler);

    // 添加到页面
    document.body.append(overlay, notificationCard);
});
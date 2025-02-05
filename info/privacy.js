document.getElementById('privacy').addEventListener('click', togglePrivacy);

let privacyStatus = false;

function togglePrivacy() {
    privacyStatus = !privacyStatus;
    showPrivacyAlert();
}

function showPrivacyAlert() {
    const alertMessage = privacyStatus 
        ? '您的设备已开启隐私保护模式，受联合库UNHub专线VPN加密数据！' 
        : '您的设备已取消隐私保护模式，当前已暴露数据传输通道至公网！';
    
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
    if (privacyStatus) {
        alertDiv.classList.add('bg-green-500'); // 开启时绿色背景
    } else {
        alertDiv.classList.add('bg-red-500'); // 关闭时红色背景
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

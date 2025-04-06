// 时间格式化函数（补零处理）
const formatTime = (number) => String(number).padStart(2, '0');
        
// 更新日期时间的函数
function updateDateTime() {
    const now = new Date();
    
    // 公历日期处理
    const year = now.getFullYear();
    const month = formatTime(now.getMonth() + 1);
    const day = formatTime(now.getDate());
    const weekday = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'][now.getDay()];
    
    // 时间处理（24小时制）
    const hours = formatTime(now.getHours());
    const minutes = formatTime(now.getMinutes());
    const seconds = formatTime(now.getSeconds());
    const timeStr = `${hours}:${minutes}:${seconds}`;

    // 农历转换
    const lunar = Lunar.fromDate(now);
    const lunarYear = lunar.getYearInGanZhi();
    const lunarMonth = lunar.getMonthInChinese();
    const lunarDay = lunar.getDayInChinese();

    // 组合显示内容
    const dateTimeStr = `公元${year}年${month}月${day}日 ${weekday} ${timeStr} 农历${lunarYear}年${lunarMonth}${lunarDay}`;
    document.getElementById('dateTime').innerHTML = dateTimeStr;
    document.getElementById('dateTime2').innerHTML = dateTimeStr;
    document.getElementById('dateTime3').innerHTML = dateTimeStr;
}

// 初始化并启动实时更新
document.addEventListener('DOMContentLoaded', () => {
    updateDateTime(); // 立即执行一次
    setInterval(updateDateTime, 1000); // 每秒更新
});
// 定义起始时间
const startTime = new Date('2023-08-01T00:00:00Z');

// 更新运行时间的函数
function updateUptime() {
    const now = new Date(); // 当前时间
    const diff = now - startTime; // 时间差（毫秒）

    // 将时间差转换为天、小时、分钟和秒
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    // 格式化显示内容
    const uptimeText = `
        ${days} 天 ${hours} 小时 ${minutes} 分钟 ${seconds} 秒
    `;

    // 更新到页面上的 uptime 元素
    document.getElementById('uptime').textContent = uptimeText.trim();
    document.getElementById('uptime2').textContent = uptimeText.trim();
}

// 每秒更新一次运行时间
setInterval(updateUptime, 1000);

// 页面加载时立即调用一次
updateUptime();
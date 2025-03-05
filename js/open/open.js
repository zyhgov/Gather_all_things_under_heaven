      // 页面加载完成后显示弹窗
      window.addEventListener('load', () => {
        const modal = document.getElementById('intro-modal');
        const closeBtn = document.getElementById('close-intro');
        
        // 显示弹窗
        modal.classList.remove('hidden');
        
        // 关闭事件
        closeBtn.addEventListener('click', () => {
          modal.classList.add('hidden');
        });
    
        // 点击背景关闭
        modal.addEventListener('click', (e) => {
          if(e.target === modal) {
            modal.classList.add('hidden');
          }
        });
      });
      document.addEventListener("DOMContentLoaded", function () {
        // 获取按钮元素
        const button = document.getElementById("deepseek-button");
    
        // 为目标 URL 定义变量
        const targetUrl = "https://open.zyhorg.ac.cn/";
    
        // 为按钮添加点击事件监听器
        button.addEventListener("click", function () {
            // 在新标签页中打开目标 URL
            window.open(targetUrl, "_blank");
        });
    });
    const slides = document.querySelectorAll('.slide');
    const dynamicTitles = [
    '开启智慧新纪元',
    '赋予学习独特个性',
    '科技注入职教灵魂',
    '面向未来人才培养'
    ];
    let currentSlide = 0;
    function nextSlide() {
    slides[currentSlide].classList.remove('active');
    currentSlide = (currentSlide + 1) % slides.length;
    slides[currentSlide].classList.add('active');
    const titleElement = document.getElementById('dynamicTitle');
    titleElement.style.opacity = '0';
    setTimeout(() => {
    titleElement.textContent = dynamicTitles[currentSlide];
    titleElement.style.opacity = '1';
    }, 500);
    }
    setInterval(nextSlide, 5000);
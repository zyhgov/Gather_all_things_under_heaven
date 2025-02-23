document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuButton = document.getElementById('mobileMenuButton');
    const mobileMenu = document.getElementById('mobileMenu');
    mobileMenuButton.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
    });
    // 点击页面其他地方关闭菜单
    document.addEventListener('click', (event) => {
      if (!mobileMenuButton.contains(event.target) && !mobileMenu.contains(event.target)) {
        mobileMenu.classList.add('hidden');
      }
    });
    const categoryButtons = document.querySelectorAll('.w-48 button');
    categoryButtons.forEach(button => {
    button.addEventListener('click', function() {
    categoryButtons.forEach(btn => {
    btn.classList.remove('bg-primary/5', 'text-primary');
    btn.classList.add('text-gray-600');
    });
    this.classList.add('bg-primary/5', 'text-primary');
    this.classList.remove('text-gray-600');
    });
    });
    const sortButtons = document.querySelectorAll('.flex.items-center.space-x-4 button');
    sortButtons.forEach(button => {
    button.addEventListener('click', function() {
    sortButtons.forEach(btn => {
    btn.classList.remove('bg-primary/5', 'text-primary');
    btn.classList.add('text-gray-600');
    });
    this.classList.add('bg-primary/5', 'text-primary');
    this.classList.remove('text-gray-600');
    });
    });
    // 轮播图功能
    let currentSlide = 0;
    const slides = document.querySelectorAll('.carousel-item');
    const dots = document.querySelectorAll('[data-index]');
    const totalSlides = slides.length;
    function showSlide(index) {
    slides.forEach(slide => slide.style.opacity = '0');
    dots.forEach(dot => dot.classList.replace('bg-primary', 'bg-gray-300'));
    slides[index].style.opacity = '1';
    dots[index].classList.replace('bg-gray-300', 'bg-primary');
    }
    function nextSlide() {
    currentSlide = (currentSlide + 1) % totalSlides;
    showSlide(currentSlide);
    }
    dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
    currentSlide = index;
    showSlide(currentSlide);
    });
    });
    setInterval(nextSlide, 5000);
    });
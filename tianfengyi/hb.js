    // 汉堡菜单交互
    document.getElementById('menuBtn').addEventListener('click', () => {
        const nav = document.getElementById('navLinks');
        nav.classList.toggle('hidden');
      });
      
      // 输入框自动聚焦
      if (window.innerWidth < 768) {
        document.querySelector('select').focus(); 
      }
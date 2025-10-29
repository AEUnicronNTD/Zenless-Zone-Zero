function toggleTheme() {
      const html = document.documentElement; //設置html常數
      const current = html.getAttribute('data-theme'); //獲取當前主題
      const newTheme = current === 'dark' ? 'light' : 'dark'; //切換主題 ===是否相等
      html.setAttribute('data-theme', newTheme); //設置新主題
    }
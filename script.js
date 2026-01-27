// 暗黑模式切換（提供給按鈕 onclick 使用）
function toggleTheme() {
  const html = document.documentElement;
  const current = html.getAttribute("data-theme") || "light";
  const next = current === "dark" ? "light" : "dark";
  html.setAttribute("data-theme", next);
  localStorage.setItem("theme", next);
}

// 頁面載入完成後，做初始化與事件綁定
document.addEventListener("DOMContentLoaded", () => {
  // 主題記憶：讀取上次使用的主題
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme) {
    document.documentElement.setAttribute("data-theme", savedTheme);
  }
  
  // 登入視窗相關元素
  const loginBtn = document.getElementById("loginBtn");
  const overlay = document.querySelector(".overlay");
  const modal = document.querySelector(".login-modal");
  const closeModalBtn = document.querySelector(".close-modal");

  // 彈窗內的三個畫面
  const loginView = document.querySelector(".login-view");
  const problemView = document.querySelector(".problem-view");
  const registerView = document.querySelector(".register-view");

  function showLoginView() {
    if (loginView) loginView.classList.remove("hidden");
    if (problemView) problemView.classList.add("hidden");
    if (registerView) registerView.classList.add("hidden");
  }

  function showProblemView() {
    if (loginView) loginView.classList.add("hidden");
    if (registerView) registerView.classList.add("hidden");
    if (problemView) problemView.classList.remove("hidden");
  }

  function showRegisterView() {
    if (loginView) loginView.classList.add("hidden");
    if (problemView) problemView.classList.add("hidden");
    if (registerView) registerView.classList.remove("hidden");
  }

  // 打開登入視窗
  function openModal() {
    if (!overlay || !modal) return;
    overlay.classList.remove("hidden");
    modal.classList.remove("hidden");
    showLoginView(); // 每次打開都先回到登入畫面
  }

  // 關閉登入視窗
  function closeModal() {
    if (!overlay || !modal) return;
    overlay.classList.add("hidden");
    modal.classList.add("hidden");
  }

  // 綁定事件（存在才綁，避免報錯）
  if (loginBtn) {
    loginBtn.addEventListener("click", openModal);
  }
  // 讓所有 .problem / .register 點擊時，在同一顆彈窗裡切換畫面
  const problemLinks = document.querySelectorAll(".problem");
  const registerLinks = document.querySelectorAll(".register");

  problemLinks.forEach((el) => {
    el.addEventListener("click", (e) => {
      e.preventDefault();
      openModal();
      showProblemView();
    });
  });

  registerLinks.forEach((el) => {
    el.addEventListener("click", (e) => {
      e.preventDefault();
      openModal();
      showRegisterView();
    });
  });

  // 問題/註冊畫面中的「返回登入」按鈕
  const backToLoginBtns = document.querySelectorAll(".back-to-login");
  backToLoginBtns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      showLoginView();
    });
  });

  if (closeModalBtn) {
    closeModalBtn.addEventListener("click", closeModal);
  }
  if (overlay) {
    overlay.addEventListener("click", closeModal); // 點背景也關閉（可選）
  }

  // 彈窗內登入按鈕：取得所有 class 為「login-submit」的按鈕（目前只有一顆「登入」）
  const loginSubmit = document.querySelectorAll(".login-submit");

  // 對每一顆登入按鈕都加上「點擊事件」
  loginSubmit.forEach((btn) => {
    btn.addEventListener("click", () => {
      // 1. 先找到包住帳號＋密碼輸入框的外層區塊（class="login-info"）
      const loginInfo = document.querySelector(".login-info");
      if (!loginInfo) {
        // 如果找不到，印一條訊息在 console，方便之後除錯
        console.log("找不到 .login-info 區塊");
        return; // 提早結束這次點擊事件
      }

      // 2. 在 login-info 裡，分別找到帳號與密碼兩個輸入框
      const emailInput = loginInfo.querySelector("input[type='email']");  // 帳號 / 電子信箱輸入框
      const passwordInput = loginInfo.querySelector("input[type='password']"); // 密碼輸入框

      // 2-1. 找到每個輸入框下方的錯誤訊息文字
      const emBox = document.querySelector('.em');
      const pwBox = document.querySelector('.pw');
      const emError = emBox ? emBox.querySelector('.error-text') : null;
      const pwError = pwBox ? pwBox.querySelector('.error-text') : null;

      // 3. 讀取使用者輸入的值
      //    email 用 trim() 把前後空白去掉，避免只打空白被當成有輸入
      const email = emailInput ? emailInput.value.trim() : "";
      const password = passwordInput ? passwordInput.value : "";

      // 4. 把目前輸入的帳號 / 密碼印在瀏覽器的 console 裡（純測試用）
      console.log("登入測試 - 帳號:", email, "密碼:", password);

      // 4-1. 先把舊的錯誤提示都隱藏
      if (emError) emError.classList.remove('show');
      if (pwError) pwError.classList.remove('show');

      // 5. 做最基本的前端檢查：有沒有把帳號、密碼都填好
      if (!email || !password) {
        // 哪一個是空的，就顯示哪一行紅色錯誤文字
        if (!email && emError) emError.classList.add('show');
        if (!password && pwError) pwError.classList.add('show');
        alert("請輸入帳號與密碼!");
        return; // 沒填好就不要再往下驗證了
      }

      // 6. 格式驗證（練習）：Email 格式、密碼長度
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // 很簡單的 Email 檢查
      if (!emailPattern.test(email)) {
        alert("Email 格式看起來不正確 (練習驗證)");
        return;
      }

      if (password.length < 6) {
        alert("密碼至少需要 6 個字元 (練習驗證)");
        return;
      }

      // 7. 練習用「假帳號資料」：當成是後端資料庫裡存的帳號
      const demoEmail = "test@example.com";      // 你可以改成自己想要的帳號
      const demoPassword = "123456";             // 練習用密碼

      // 8. 驗證：把使用者輸入的帳號密碼，和「假資料」比對
      if (email === demoEmail && password === demoPassword) {
        alert("登入成功！（練習用，比對到假帳號資料）");
      } else {
        alert("帳號或密碼錯誤（練習用，比對失敗）");
      }
    });
  });
  // 社群登入按鈕（例如 Google / Facebook 按鈕）
  const socialBtns = document.querySelectorAll(".social-btn");
  socialBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      alert("展示用登入介面，未串接實際帳號系統");
    });
  });
});



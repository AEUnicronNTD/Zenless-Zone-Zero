if (localStorage.getItem("theme") === "dark") { // 讀取設定
  document.documentElement.classList.add("dark"); // 套用主題
}


document.getElementById("theme-toggle").addEventListener("click", () => { // 切換按鈕
  document.documentElement.classList.toggle("dark"); // 切換主題
  if (document.documentElement.classList.contains("dark")) { // 儲存設定
    localStorage.setItem("theme", "dark"); // 儲存主題為暗色
  } else {
    localStorage.setItem("theme", "light"); // 儲存主題為亮色
  }
});


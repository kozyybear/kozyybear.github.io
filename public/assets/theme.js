try {
  if (localStorage.getItem("kozybear-theme") === "light") {
    document.documentElement.dataset.theme = "light";
    document.querySelector('meta[name="theme-color"]').content = "#f7f5f2";
  }
} catch {
  // The initial dark theme also works when storage is disabled.
}

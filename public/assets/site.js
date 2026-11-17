"use strict";

const headerActions = document.querySelector(".header-actions");
const themeToggle = headerActions.querySelector(".theme-toggle");
const searchToggle = headerActions.querySelector(".search-toggle");
const dialog = document.querySelector(".search-dialog");
const searchInput = dialog.querySelector("input");
const results = dialog.querySelector(".search-results");
const announcement = dialog.querySelector(".search-announcement");
const themeColor = document.querySelector('meta[name="theme-color"]');
const root = document.documentElement;

function updateThemeControl() {
  const isLight = root.dataset.theme === "light";
  const label = isLight ? "Bật giao diện tối" : "Bật giao diện sáng";
  themeToggle.setAttribute("aria-label", label);
  themeToggle.title = label;
  themeColor.content = isLight ? "#f7f5f2" : "#18171d";
}

function simplify(text) {
  return text.toLowerCase().normalize("NFD").replace(/\p{M}/gu, "").replace(/đ/g, "d");
}

const searchablePosts = (window.journalPosts || []).map((post) => ({
  ...post,
  searchableText: simplify([post.title, post.category, post.summary].join(" ")),
}));

function searchResult(post) {
  const link = document.createElement("a");
  link.href = post.url;
  link.className = "search-result";

  const title = document.createElement("span");
  title.className = "search-result-title";
  title.textContent = post.title;

  const meta = document.createElement("span");
  meta.className = "search-result-meta";
  meta.textContent = post.category + " · " + post.date;

  link.append(title, meta);
  return link;
}

function updateResults() {
  const query = simplify(searchInput.value.trim());
  const terms = query.split(/\s+/).filter(Boolean);
  const matches = terms.length
    ? searchablePosts.filter((post) => terms.every((term) => post.searchableText.includes(term)))
    : searchablePosts.slice(0, 3);

  if (matches.length) {
    results.replaceChildren(...matches.map(searchResult));
    announcement.textContent = matches.length + " bài viết.";
    return;
  }
  const message = document.createElement("p");
  message.className = "empty-state";
  message.textContent = "Không tìm thấy bài viết phù hợp.";
  results.replaceChildren(message);
  announcement.textContent = message.textContent;
}

function openSearch() {
  if (dialog.open) {
    searchInput.focus();
    return;
  }
  searchInput.value = "";
  updateResults();
  dialog.showModal();
  searchInput.focus();
}

themeToggle.addEventListener("click", () => {
  root.dataset.theme = root.dataset.theme === "light" ? "dark" : "light";
  updateThemeControl();
  try {
    localStorage.setItem("kozybear-theme", root.dataset.theme);
  } catch {
    // The theme still changes when storage is unavailable.
  }
});

const meteorToggle = headerActions.querySelector(".meteor-toggle");
if (meteorToggle) {
  const sky = document.querySelector(".meteor-sky");
  const preference = "kozybear-meteors";

  function setMeteors(enabled) {
    sky.classList.toggle("is-animated", enabled);
    meteorToggle.setAttribute("aria-pressed", String(enabled));
    meteorToggle.title = enabled ? "Tắt sao băng" : "Bật sao băng";
  }

  let enabled = true;
  try {
    enabled = localStorage.getItem(preference) !== "off";
  } catch {
    // The toggle is also usable without storage.
  }
  setMeteors(enabled);

  meteorToggle.addEventListener("click", () => {
    enabled = !enabled;
    setMeteors(enabled);
    try {
      localStorage.setItem(preference, enabled ? "on" : "off");
    } catch {
      // Only the preference for the next visit needs storage.
    }
  });
}

if (typeof dialog.showModal === "function") {
  searchToggle.addEventListener("click", openSearch);
  searchInput.addEventListener("input", updateResults);
  dialog.addEventListener("close", () => searchToggle.focus());
  searchInput.addEventListener("keydown", (event) => {
    const firstResult = results.querySelector("a");
    if (!firstResult) return;
    if (event.key === "ArrowDown") {
      event.preventDefault();
      firstResult.focus();
    }
    if (event.key === "Enter" && searchInput.value.trim()) {
      event.preventDefault();
      firstResult.click();
    }
  });
  document.addEventListener("keydown", (event) => {
    if (event.defaultPrevented || event.altKey) return;
    const editing = event.target.matches("input, textarea, select, [contenteditable]");
    const shortcut = (event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k";
    const slash = event.key === "/" && !editing && !event.ctrlKey && !event.metaKey;
    if (shortcut || slash) {
      event.preventDefault();
      openSearch();
    }
  });
} else {
  searchToggle.hidden = true;
}
updateThemeControl();
headerActions.hidden = false;

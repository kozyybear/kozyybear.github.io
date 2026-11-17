# Kozybear · Ghi chép lúc rảnh

Blog Astro tĩnh bằng tiếng Việt. Dùng Node.js 22.23.4 trở lên. Phiên bản trong `.nvmrc` đáp ứng yêu cầu của Astro 7.

Nếu dùng nvm, chọn phiên bản Node.js cho dự án trước khi cài thư viện:

```sh
nvm install
nvm use
```

```sh
npm ci
npm run dev
npm run build
```

Bản build nằm trong `dist/`. Chạy `npm run preview` để xem bản build trên máy.

Khi deploy, chọn Node.js từ 22.23.4 trở lên, lệnh build `npm run build` và thư mục xuất bản `dist`.

## Deploy lên GitHub Pages

Repository: `https://github.com/kozyybear/kozyybear.github.io`.
Website: `https://kozyybear.github.io/`.

Trong repository trên GitHub, mở **Settings → Pages → Build and deployment → Source** và chọn **GitHub Actions**.

Workflow `.github/workflows/deploy.yml` sẽ build và deploy mỗi khi push lên nhánh `main`. Có thể chạy lại trong tab **Actions → Deploy to GitHub Pages → Run workflow**. Workflow dùng quyền tích hợp của GitHub, không cần thêm API key hay token cá nhân.

Tên repo trùng với `kozyybear.github.io`, nên website chạy ở tên miền gốc và không cần cấu hình `base`. Chỉ xuất bản bản build trong `dist/`; các file môi trường và file khóa được loại khỏi Git bằng `.gitignore`.

## Thêm bài viết

Tạo một file `.md` trong `src/content/blog/`. Tên file xác định đường dẫn bài viết.

```markdown
---
title: "Tiêu đề bài viết"
date: 2026-11-17
tags:
  - Forensics
description: "Tóm tắt hiển thị trong danh sách và tìm kiếm."
---

## Mục đầu tiên

Nội dung bài viết bằng Markdown.
```

Dùng `##` để thêm một mục vào mục lục. Astro cập nhật danh sách bài, bộ lọc chủ đề và chỉ mục tìm kiếm từ cùng bộ file Markdown.

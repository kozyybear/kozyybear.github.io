---
title: "Một dòng log đủ ngữ cảnh"
date: 2026-11-08
tags:
  - "Công nghệ"
description: "Những trường mình muốn giữ lại khi cần đọc một sự kiện sau vài tuần."
---

## Viết cho người đọc sau

Lúc đang debug, một dòng thông báo ngắn thường là đủ vì mình biết thao tác nào vừa diễn ra. Vài tuần sau, khi tìm lại một sự kiện, mình cần biết thời gian, thành phần phát log, hành động và kết quả. Nếu mỗi nơi ghi theo một kiểu, tìm cùng một loại sự kiện sẽ mất thêm thao tác.

Bốn trường này tạo ra một điểm bắt đầu chung. Trong ví dụ dưới đây, thông tin đều là dữ liệu giả từ một môi trường thử nghiệm.

```text
timestamp=2026-11-08T13:40:02Z
service=journal-demo
action=save_draft
result=success
request_id=demo-a41
```

## Giữ một khóa để đối chiếu

Khi một thao tác đi qua nhiều thành phần, cùng một request ID có thể giúp nối các dòng liên quan. Giá trị này cần nhất quán xuyên suốt thao tác để người đọc tìm được cả lúc bắt đầu và lúc hoàn tất.

Phần mô tả nên chỉ giữ chi tiết có ích cho việc điều tra lỗi. Trước khi đưa thêm dữ liệu vào log, mình thường thử tìm một sự kiện mẫu để xem trường nào thực sự giúp trả lời câu hỏi.

## Đọc thử từ phía người nhận

Chọn một quy trình quen thuộc rồi chỉ nhìn vào log để kể lại chuyện gì đã xảy ra. Những chỗ khó lần theo sẽ cho thấy cần đổi tên trường, ghi rõ kết quả hay bổ sung một điểm ghi log.

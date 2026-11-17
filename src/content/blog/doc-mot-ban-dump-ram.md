---
title: "Đọc một bản dump RAM từ đâu?"
date: 2026-11-14
tags:
  - "Forensics"
description: "Từ danh sách tiến trình đến những câu hỏi có thể trả lời bằng dấu vết trong bộ nhớ."
---

## Bắt đầu từ thời điểm thu thập

Một bản dump RAM là ảnh chụp bộ nhớ tại một thời điểm. Trước khi mở công cụ phân tích, hãy ghi lại máy nào được thu thập, thời gian thu thập và điều gì đã dẫn tới việc lấy mẫu. Khi đối chiếu với log, chi tiết về múi giờ và thời gian thu thập sẽ ảnh hưởng trực tiếp đến cách dựng timeline.

Nếu đề bài là một máy trạm đang có kết nối bất thường, câu hỏi đầu tiên có thể rất hẹp. Tiến trình nào liên quan đến kết nối đó? Nó được mở trong phiên của ai? Hai câu hỏi này cho mình một đích đến cụ thể khi đọc kết quả.

## Đọc cây tiến trình theo quan hệ

Tên tiến trình chỉ là một phần thông tin. Xem nó được khởi chạy từ đâu, tiến trình cha là gì và nó xuất hiện lúc nào. Một tiến trình đang chạy ở đường dẫn lạ có thể đáng để kiểm tra thêm, đặc biệt khi đường dẫn và thời điểm trùng với dấu vết ở nguồn khác.

Mình thường ghi lại PID, thời gian tạo và đường dẫn khi có. Như vậy, lúc chuyển sang kết nối mạng hoặc vùng nhớ của tiến trình, mình có thể quay lại đúng đối tượng cần xem.

## Ghi lại mức độ chắc chắn

Tách điều đã quan sát được khỏi suy đoán. Nếu thấy một tiến trình có kết nối đến địa chỉ cần điều tra, ghi nó là một quan sát cùng nguồn dữ liệu. Dùng log mạng hoặc log điểm cuối để xem kết nối có lặp lại và có khớp với thời gian trong bộ nhớ hay không.

Khi viết lại kết quả, mình thích dùng mỗi dòng cho một dấu vết và một câu hỏi còn mở. Tới lần xem tiếp theo, các câu hỏi đó giúp mình biết cần tìm thêm dữ liệu nào.

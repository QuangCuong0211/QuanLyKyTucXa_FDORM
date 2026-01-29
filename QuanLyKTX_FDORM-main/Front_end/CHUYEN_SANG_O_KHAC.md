# Chuyển project sang ổ khác (tránh hết dung lượng ổ C:)

## Bước 1: Copy project sang ổ D: (hoặc E:, F:...)

1. Mở **File Explorer**, vào thư mục:
   ```
   c:\laragon\www\QuanLyKTX_FDORM-main (2)\QuanLyKTX_FDORM-main
   ```

2. **Copy** cả thư mục **Front_end** (chuột phải → Copy).

3. Vào ổ **D:** (hoặc ổ nào còn nhiều chỗ trống).

4. **Paste** vào đó. Có thể đổi tên cho dễ, ví dụ:
   ```
   D:\QuanLyKTX_Front_end
   ```
   hoặc giữ nguyên:
   ```
   D:\Front_end
   ```

5. **(Quan trọng)** Xóa thư mục `node_modules` trong bản copy trên D: (nếu có), vì sẽ cài lại mới:
   - Vào `D:\QuanLyKTX_Front_end` (hoặc tên bạn đặt)
   - Xóa thư mục **node_modules** (chuột phải → Delete)

---

## Bước 2: Chỉnh npm dùng cache trên ổ D:

Mở **CMD** hoặc **PowerShell**, chạy lần lượt:

```bash
npm config set cache "D:\npm-cache"
npm config set tmp "D:\npm-tmp"
```

Tạo thư mục (nếu chưa có):

```bash
mkdir D:\npm-cache
mkdir D:\npm-tmp
```

---

## Bước 3: Mở project từ ổ D: trong Cursor

1. Trong **Cursor**: **File → Open Folder** (hoặc Ctrl+K Ctrl+O).
2. Chọn thư mục project trên D:, ví dụ: **D:\QuanLyKTX_Front_end**.
3. Mở **Terminal** trong Cursor (Ctrl+`).

---

## Bước 4: Cài dependency và chạy

Trong terminal (đã ở thư mục project trên D:):

```bash
npm install
```

Đợi cài xong, sau đó:

**Terminal 1 – chạy API:**
```bash
npm run db
```

**Terminal 2 – chạy web:**
```bash
npm run dev
```

Mở trình duyệt: **http://localhost:5173**

---

## Tóm tắt đường dẫn mới

| Việc            | Đường dẫn (ví dụ)     |
|-----------------|------------------------|
| Project         | D:\QuanLyKTX_Front_end |
| npm cache       | D:\npm-cache           |
| npm tmp         | D:\npm-tmp             |

Sau khi chuyển, mở folder và làm việc luôn trên **D:\...** để tránh hết chỗ ổ C:.

# Hệ thống quản lý Ký túc xá (FDORM)

## Tính năng

- **Đăng ký / Đăng nhập**: Tài khoản sinh viên, phân quyền (admin, staff, student).
- **Phân quyền**: Admin/Staff quản lý khu – phòng và duyệt đơn; Sinh viên đăng ký ở KTX.
- **API Backend**:
  - Auth: `POST /api/auth/register`, `POST /api/auth/login`, `GET /api/auth/me`
  - Khu: `GET/POST /api/areas`, `PUT/DELETE /api/areas/:id` (admin/staff)
  - Phòng: `GET/POST /api/rooms`, `PUT/DELETE /api/rooms/:id` (admin/staff)
  - Đăng ký ở KTX: `GET/POST /api/registrations`, `PATCH /api/registrations/:id` (duyệt đơn – admin/staff)
- **Giao diện**: Trang chủ, đăng nhập, đăng ký tài khoản, đăng ký ở KTX, khu vực quản trị (khu, phòng, đơn đăng ký).

## Cách chạy

### Backend (Node.js)

```bash
cd backend
npm install
npm start
```

Server chạy tại `http://localhost:3000`.  
Lần đầu chạy sẽ tạo tài khoản admin: **admin@ktx.vn** / **123456**.

### Frontend (React + Vite)

```bash
cd frontend
npm install
npm run dev
```

Mở trình duyệt tại `http://localhost:5173`.

## Luồng sử dụng

1. **Sinh viên**: Đăng ký tài khoản → Đăng nhập → Vào "Đăng ký ở KTX" → Điền form và gửi đơn.
2. **Admin/Staff**: Đăng nhập (admin@ktx.vn / 123456) → Vào "Quản trị" → Quản lý khu, phòng, duyệt đơn đăng ký.

## Công nghệ

- **Backend**: Express, JWT, bcryptjs, lưu dữ liệu JSON (thư mục `backend/data`).
- **Frontend**: React 19, TypeScript, Vite, React Router, Bootstrap 5.

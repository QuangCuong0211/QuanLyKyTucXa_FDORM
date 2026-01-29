@echo off
chcp 65001 >nul
cd /d "%~dp0frontend"
echo Đang cài đặt thư viện frontend (lần đầu có thể mất 1-2 phút)...
call npm install
if errorlevel 1 ( pause & exit /b 1 )
echo.
echo Đang chạy giao diện tại http://localhost:5173
echo Mở trình duyệt và vào: http://localhost:5173
echo.
call npm run dev
pause

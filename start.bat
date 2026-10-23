@echo off
echo ========================================================
echo   MENJALANKAN WEBSITE SERVER SABLENG SMP FULL-STACK
echo ========================================================
echo.
echo Memastikan port 5000 siap...
for /f "tokens=5" %%a in ('netstat -aon ^| findstr :5000 ^| findstr LISTENING') do taskkill /F /PID %%a >nul 2>&1
echo.
echo Server backend dan frontend sedang aktif!
echo Silakan buka browser di: http://localhost:5000
echo Password Panel Admin: admin123
echo ========================================================
echo.
npm start
pause

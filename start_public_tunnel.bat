@echo off
title Sableng SMP - Public Web Server
echo ========================================================
echo   WEBSITE MINECRAFT SABLENG SMP (ONLINE UNTUK SEMUA)
echo ========================================================
echo.
echo 1. Memulai Server Backend...
start "Sableng SMP Server" node server\server.js
timeout /t 2 /nobreak >nul
echo 2. Membuka Cloudflare Tunnel Gratis...
echo Link publik akan muncul di bawah ini (bisa langsung dibuka dari HP/Internet):
echo.
.\cloudflared.exe tunnel --url http://localhost:5000
pause

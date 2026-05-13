@echo off
REM Orbit Platform - Quick Setup Script for Windows
REM This script sets up the entire Orbit platform

echo.
echo 🚀 Setting up Orbit Task Management Platform...
echo.

REM Check Node.js installation
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo ❌ Node.js is not installed. Please install Node.js v16 or higher.
    pause
    exit /b 1
)

echo ✅ Node.js is installed: 
node --version

REM Check npm installation
where npm >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo ❌ npm is not installed. Please install npm v7 or higher.
    pause
    exit /b 1
)

echo ✅ npm is installed: 
npm --version
echo.

REM Install root dependencies
echo 📦 Installing root dependencies...
call npm install

REM Install client dependencies
echo.
echo 📦 Installing frontend dependencies...
cd client
call npm install
cd ..

REM Install server dependencies
echo.
echo 📦 Installing backend dependencies...
cd server
call npm install
cd ..

echo.
echo ✅ Installation complete!
echo.
echo 🎯 Next steps:
echo 1. Run 'npm run dev' to start both servers
echo 2. Frontend: http://localhost:5173
echo 3. Backend: http://localhost:5000
echo.
echo 📝 Demo Credentials:
echo    Tasker: tasker@orbit.com / Tasker@123456
echo    QL: ql@orbit.com / QL@123456
echo    PL: pl@orbit.com / PL@123456
echo.
echo 🚀 Happy coding with Orbit!
echo.
pause

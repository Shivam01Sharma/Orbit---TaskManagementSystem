#!/bin/bash

# Orbit Platform - Quick Setup Script
# This script sets up the entire Orbit platform

echo "🚀 Setting up Orbit Task Management Platform..."
echo ""

# Check Node.js installation
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js v16 or higher."
    exit 1
fi

echo "✅ Node.js is installed: $(node --version)"

# Check npm installation
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install npm v7 or higher."
    exit 1
fi

echo "✅ npm is installed: $(npm --version)"
echo ""

# Install root dependencies
echo "📦 Installing root dependencies..."
npm install

# Install client dependencies
echo ""
echo "📦 Installing frontend dependencies..."
cd client || exit
npm install
cd .. || exit

# Install server dependencies
echo ""
echo "📦 Installing backend dependencies..."
cd server || exit
npm install
cd .. || exit

echo ""
echo "✅ Installation complete!"
echo ""
echo "🎯 Next steps:"
echo "1. Run 'npm run dev' to start both servers"
echo "2. Frontend: http://localhost:5173"
echo "3. Backend: http://localhost:5000"
echo ""
echo "📝 Demo Credentials:"
echo "   Tasker: tasker@orbit.com / Tasker@123456"
echo "   QL: ql@orbit.com / QL@123456"
echo "   PL: pl@orbit.com / PL@123456"
echo ""
echo "🚀 Happy coding with Orbit!"

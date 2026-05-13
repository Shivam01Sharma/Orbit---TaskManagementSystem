#!/bin/bash
set -e

echo "📦 Installing root dependencies..."
npm ci --legacy-peer-deps

echo "📦 Installing client dependencies..."
cd client
npm ci --legacy-peer-deps
npm run build
cd ..

echo "📦 Installing server dependencies..."
cd server
npm ci --legacy-peer-deps
npm run build
cd ..

echo "✅ Build completed successfully!"

#!/bin/bash

echo "🔄 Restarting GWIN.ai development server..."

# Kill any existing Next.js processes
echo "🛑 Killing existing Next.js processes..."
pkill -f "next dev" || echo "No existing processes found"

# Wait a moment for processes to terminate
sleep 2

# Clean Next.js cache
echo "🧹 Cleaning Next.js cache..."
rm -rf .next

# Start the development server with all permissions to bypass sandbox
echo "🚀 Starting development server on port 3002..."
PORT=3002 npm run dev > dev.log 2>&1 &
SERVER_PID=$!

echo "📝 Server PID: $SERVER_PID"
echo "📋 Logs saved to: dev.log"

# Wait for server to start
echo "⏳ Waiting for server to start..."
sleep 10

# Check if server is responding
PORT=${PORT:-3001}
if curl -s -o /dev/null -w "%{http_code}" http://localhost:$PORT/ | grep -q "200\|404"; then
    echo "✅ Server is running successfully!"
    echo "🌐 Visit: http://localhost:$PORT/"
    echo "🤖 AI Builder: http://localhost:$PORT/builder"
else
    echo "❌ Server failed to start. Check dev.log for errors."
    echo "📋 Last 20 lines of dev.log:"
    tail -20 dev.log
fi

echo "📊 Server PID: $SERVER_PID (use 'kill $SERVER_PID' to stop)"

@echo off
echo Starting Endurance App Server...
echo.
echo Open your browser and go to: http://localhost:8000
echo On iPhone, you can access it via your computer's IP address
echo (e.g., http://192.168.1.100:8000)
echo.
echo To add to iPhone home screen:
echo 1. Open in Safari
echo 2. Tap Share button
echo 3. Tap "Add to Home Screen"
echo 4. Tap "Add"
echo.
echo Press Ctrl+C to stop the server
echo.

REM Try Python first
python -m http.server 8000 2>nul
if %errorlevel% neq 0 (
    echo Python not found, trying Node.js...
    npx http-server -p 8000 2>nul
    if %errorlevel% neq 0 (
        echo Neither Python nor Node.js found.
        echo Please install Python or Node.js to run a local server.
        echo.
        echo Alternative: Use any web server and serve the files from this directory.
        pause
    )
)

Write-Host "Starting Endurance App Server..." -ForegroundColor Green
Write-Host ""
Write-Host "Open your browser and go to: http://localhost:8000" -ForegroundColor Yellow
Write-Host "On iPhone, you can access it via your computer's IP address" -ForegroundColor Yellow
Write-Host "(e.g., http://192.168.1.100:8000)" -ForegroundColor Yellow
Write-Host ""
Write-Host "To add to iPhone home screen:" -ForegroundColor Cyan
Write-Host "1. Open in Safari" -ForegroundColor White
Write-Host "2. Tap Share button" -ForegroundColor White
Write-Host "3. Tap 'Add to Home Screen'" -ForegroundColor White
Write-Host "4. Tap 'Add'" -ForegroundColor White
Write-Host ""
Write-Host "Press Ctrl+C to stop the server" -ForegroundColor Red
Write-Host ""

# Try Python first
try {
    Write-Host "Starting Python HTTP server..." -ForegroundColor Blue
    python -m http.server 8000
}
catch {
    # Try Node.js if Python fails
    try {
        Write-Host "Python not found, trying Node.js..." -ForegroundColor Blue
        npx http-server -p 8000
    }
    catch {
        Write-Host "Neither Python nor Node.js found." -ForegroundColor Red
        Write-Host "Please install Python or Node.js to run a local server." -ForegroundColor Red
        Write-Host ""
        Write-Host "Alternative: Use any web server and serve the files from this directory." -ForegroundColor Yellow
        Read-Host "Press Enter to exit"
    }
}

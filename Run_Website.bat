@echo off
TITLE Thiru.Vi.Ka. School Website
echo =============================================
echo   THIRU.VI.KA. SCHOOL WEBSITE STARTER
echo =============================================
echo.

REM Try Python first
python --version >nul 2>&1
if %ERRORLEVEL% EQU 0 (
    echo Starting server with Python...
    start "" http://localhost:8080
    python -m http.server 8080 -d "."
    goto :EOF
)

REM Try Python3
python3 --version >nul 2>&1
if %ERRORLEVEL% EQU 0 (
    echo Starting server with Python3...
    start "" http://localhost:8080
    python3 -m http.server 8080 -d "."
    goto :EOF
)

REM Fallback: just open the HTML file directly
echo Python not found. Opening HTML file directly...
start "" "c:\anti db\index.html"

:EOF
echo.
echo Press any key to stop the server...
pause >nul

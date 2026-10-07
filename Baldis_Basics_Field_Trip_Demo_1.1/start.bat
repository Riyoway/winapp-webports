@echo off
cd /d "%~dp0"
where py >nul 2>nul
if not errorlevel 1 (py -3 start_server.py & goto :done)
where python >nul 2>nul
if not errorlevel 1 (python start_server.py & goto :done)
echo Python 3 is required to run the local server.
:done
if errorlevel 1 pause

@echo off
setlocal
set "MARIO_PYTHON=%LOCALAPPDATA%\Programs\Python\Python310\python.exe"
if exist "%MARIO_PYTHON%" goto run
where py.exe >nul 2>nul
if not errorlevel 1 (
    py -3 "%~dp0start_server.py"
    goto done
)
python "%~dp0start_server.py"
goto done
:run
"%MARIO_PYTHON%" "%~dp0start_server.py"
:done
if errorlevel 1 pause

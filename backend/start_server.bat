@echo off
echo Installing Python dependencies...
cd /d "c:\Users\User\Desktop\hkgrow\backend"
pip install -r requirements.txt

echo.
echo Starting Flask server...
python app.py
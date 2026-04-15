@echo off
echo Copying profile photo...
copy /Y "C:\Users\DELL\Pictures\AIZS7139.JPG" "D:\Masters Program 2025-2027\Semester 1_2\Artificial Intelligence and Large  Models\RoadMap\images\profile.jpg"
if %errorlevel% equ 0 (echo   OK - profile.jpg copied) else (echo   FAILED - check source path)

echo Copying Beihang logo...
copy /Y "D:\Masters Program 2025-2027\Semester 1_2\Artificial Intelligence and Large  Models\Assignmnets\Assignment 2\SCHOOL LOGO.png" "D:\Masters Program 2025-2027\Semester 1_2\Artificial Intelligence and Large  Models\RoadMap\images\beihang-logo.png"
if %errorlevel% equ 0 (echo   OK - beihang-logo.png copied) else (echo   FAILED - check source path)

echo.
echo Done. Both images are now in RoadMap\images\
pause

@echo off
cd /d "D:\Masters Program 2025-2027\Semester 1_2\Artificial Intelligence and Large  Models\RoadMap"

echo Staging all changes...
git add -A

echo.
echo Committing...
git commit -m "Add AI course section, hero logo, map speed fix, image support"

echo.
echo Pushing to GitHub...
git push origin master

echo.
echo Done. Netlify will redeploy automatically in ~30 seconds.
pause

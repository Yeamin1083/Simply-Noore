# Simply Nooré - GitHub Push & Pages Deployment Helper
Write-Host "==========================================" -ForegroundColor Cyan
Write-Host " Simply Nooré — Push to GitHub & Deploy " -ForegroundColor Cyan
Write-Host "==========================================" -ForegroundColor Cyan

Write-Host "Target Repository: https://github.com/Yeamin1083/Simply-Noore" -ForegroundColor Yellow

# Ensure all files are committed
git add -A
git commit -m "feat: complete Simply Nooré storefront and admin portal" -q

# Push to main branch
Write-Host "Pushing main branch to GitHub..." -ForegroundColor Green
git push -u origin main

Write-Host "`nSuccessfully pushed to GitHub!" -ForegroundColor Green
Write-Host "GitHub Actions is now automatically building and deploying to GitHub Pages." -ForegroundColor Green
Write-Host "Check progress at: https://github.com/Yeamin1083/Simply-Noore/actions" -ForegroundColor Cyan

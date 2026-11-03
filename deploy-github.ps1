# Simply Noore - Terminal Deployment and GitHub Push Helper
Write-Host "==========================================" -ForegroundColor Cyan
Write-Host " Simply Noore - Push to GitHub and Deploy " -ForegroundColor Cyan
Write-Host "==========================================" -ForegroundColor Cyan

Write-Host "Target Repository: https://github.com/Yeamin1083/Simply-Noore" -ForegroundColor Yellow

# Step 1: Save work and commit changes to main branch codebase
Write-Host "`n[1/3] Staging and committing source files..." -ForegroundColor Yellow
git add -A
git commit -m "feat: updated configurations for manual terminal deployment" -q

# Step 2: Push source code up to your primary main repository branch
Write-Host "[2/3] Pushing main branch code to GitHub..." -ForegroundColor Green
git push -u origin main

# Step 3: Run the new local compilation build and deploy the out folder directly
Write-Host "[3/3] Initiating local Next.js build and branch deployment..." -ForegroundColor Green
npm run deploy

Write-Host "`n==========================================" -ForegroundColor Cyan
Write-Host " SUCCESS: Simply Noore is completely live! " -ForegroundColor Green
Write-Host " Visit site at: https://github.io " -ForegroundColor Cyan
Write-Host "==========================================" -ForegroundColor Cyan
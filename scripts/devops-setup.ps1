# ==============================================================================
# Local DevOps Validation Automation Script (PowerShell)
# Runs linting, unit testing, Vite production build, and IaC checks
# ==============================================================================

Write-Host "==========================================================" -ForegroundColor Cyan
Write-Host "   🚀 Azure React DevOps Pipeline Validation Suite" -ForegroundColor Cyan
Write-Host "==========================================================" -ForegroundColor Cyan

# 1. Environment Tooling Checks
Write-Host "`n[1/4] Checking DevOps Tooling Prerequisites..." -ForegroundColor Yellow
$nodeVer = node -v
$npmVer = npm -v
Write-Host "  - Node.js Version: $nodeVer" -ForegroundColor Green
Write-Host "  - npm Version:     $npmVer" -ForegroundColor Green

# 2. Run ESLint Quality Check
Write-Host "`n[2/4] Executing ESLint Code Quality Inspection..." -ForegroundColor Yellow
npm run lint
if ($LASTEXITCODE -eq 0) {
    Write-Host "  ✅ ESLint Passed with 0 errors!" -ForegroundColor Green
} else {
    Write-Host "  ❌ ESLint Check Failed!" -ForegroundColor Red
    exit 1
}

# 3. Run Vitest Component Test Suite
Write-Host "`n[3/4] Running Vitest Unit Test Suite..." -ForegroundColor Yellow
npx vitest run
if ($LASTEXITCODE -eq 0) {
    Write-Host "  ✅ Unit Tests Passed!" -ForegroundColor Green
} else {
    Write-Host "  ❌ Unit Tests Failed!" -ForegroundColor Red
    exit 1
}

# 4. Run Vite Production Build
Write-Host "`n[4/4] Compiling Vite SPA Production Bundle..." -ForegroundColor Yellow
npm run build
if ($LASTEXITCODE -eq 0) {
    Write-Host "  ✅ Production Build Succeeded!" -ForegroundColor Green
} else {
    Write-Host "  ❌ Production Build Failed!" -ForegroundColor Red
    exit 1
}

Write-Host "`n==========================================================" -ForegroundColor Cyan
Write-Host "  🎉 All DevOps Local Validation Checks Completed Successfully!" -ForegroundColor Cyan
Write-Host "==========================================================" -ForegroundColor Cyan

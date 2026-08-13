#!/usr/bin/env bash
# ==============================================================================
# Local DevOps Validation Automation Script (Bash)
# ==============================================================================
set -e

echo "=========================================================="
echo "   🚀 Azure React DevOps Pipeline Validation Suite"
echo "=========================================================="

echo -e "\n[1/4] Checking DevOps Prerequisites..."
echo "Node.js: $(node -v)"
echo "npm:     $(npm -v)"

echo -e "\n[2/4] Executing ESLint Code Quality Inspection..."
npm run lint

echo -e "\n[3/4] Running Vitest Unit Test Suite..."
npx vitest run

echo -e "\n[4/4] Compiling Vite SPA Production Bundle..."
npm run build

echo -e "\n=========================================================="
echo "  🎉 All DevOps Local Validation Checks Completed Successfully!"
echo "=========================================================="

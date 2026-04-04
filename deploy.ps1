# deploy.ps1 — helper script to deploy toppick-resume to Vercel

Set-StrictMode -Version Latest

Write-Host 'Deploy helper - ensure you ran the Volta installer and opened a new PowerShell.' -ForegroundColor Cyan

Push-Location "$(Split-Path -Path $MyInvocation.MyCommand.Path -Parent)"

Write-Host 'Checking Volta and Node versions...'
volta --version
node --version

Write-Host 'Installing dependencies (if any)...'
npm install

Write-Host 'Committing current changes (skip if not using git)'
git add -A
try {
    git commit -m "Deploy toppick-resume" -q
} catch {
    Write-Host 'No commit created (maybe nothing to commit).' -ForegroundColor Yellow
}

Write-Host 'Pushing to remote (if configured)...'
try {
    git push
} catch {
    Write-Host 'Git push failed or no remote configured. Continue with vercel deploy manually.' -ForegroundColor Yellow
}

Write-Host 'Running Vercel deploy (interactive if needed)...'
vercel --prod

Pop-Location

Deployment guide for `toppick-resume`

Prerequisites
- Volta installed and Node pinned (we added `volta` to package.json).
- Vercel account and `vercel` CLI installed (`npm i -g vercel`).

Quick deploy (PowerShell)

1. Open a new PowerShell window (after installing Volta).
2. Run:

```powershell
cd D:\trendsetter_agency\The_Trendsetter_Agency\apps\toppick-resume
volta --version
node --version
npm install

# Commit & push to your Git remote (if using Git-based deploys)
git add -A
git commit -m "Deploy toppick-resume"
git push

# Deploy to Vercel (interactive the first time)
vercel --prod

# Non-interactive (if already linked):
vercel --confirm --prod
```

Domain
- DNS records are in `domain-config.json`. After successful deploy, add `www.thetrendsetteragency.com` in Vercel dashboard and assign the alias.

If something fails, capture the build logs and open an issue or paste them here.

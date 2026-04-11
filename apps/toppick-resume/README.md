# TopPick Resume

Deployment notes
- Backend variable name: `TOPPICK_BACKEND_URL` (set to your Railway public URL)
- API key variable name (optional): `TOPPICK_API_KEY` (set in Vercel Project Settings)

Files in this folder:
- `app/index.html` — launcher page that opens the Railway app and embeds a preview.
- `privacy/index.html` — TopPick privacy policy page.
- `index.html` — main TopPick marketing and form page.

To configure:
1. Set `TOPPICK_BACKEND_URL` in Vercel to your Railway public URL.
2. If your API requires a key, set `TOPPICK_API_KEY` in Vercel and update the frontend fetch to include the auth header.

# Health Logic

Deployment notes
- Backend variable name: `HEALTH_LOGIC_BACKEND_URL` (set to your Railway public URL)
- API key variable name (optional): `HEALTH_LOGIC_API_KEY`

Files in this folder:
- `app/index.html` — launcher page (update the `url` variable in the file).
- `privacy/index.html` — privacy placeholder page.
- `index.html` — main Health Logic marketing page.

To configure:
1. Set `HEALTH_LOGIC_BACKEND_URL` in Vercel to the Railway public URL for Health Logic.
2. If your API requires a key, set `HEALTH_LOGIC_API_KEY` in Vercel and update the frontend fetch to include the auth header.

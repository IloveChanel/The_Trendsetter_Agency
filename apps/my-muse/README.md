# My Muse

Deployment notes
- Backend variable name: `MY_MUSE_BACKEND_URL` (set to your Railway public URL)
- API key variable name (optional): `MY_MUSE_API_KEY`

Files in this folder:
- `app/index.html` — launcher page (update the `url` variable in the file).
- `privacy/index.html` — privacy placeholder page.
- `index.html` — main My Muse marketing page.

To configure:
1. Set `MY_MUSE_BACKEND_URL` in Vercel to the Railway public URL for My Muse.
2. If your API requires a key, set `MY_MUSE_API_KEY` in Vercel and update the frontend fetch to include the auth header.

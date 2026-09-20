# Reddit Lead Finder

Watches a list of subreddits for buying-intent phrases ("looking for a
developer", "need an app built", etc.) and files a **GitHub issue** for each
new match so it can be reviewed and pitched manually. This is the free,
self-hosted approach: PRAW (Reddit's official API wrapper) on a schedule,
no paid SaaS involved.

It never posts, comments, or DMs on Reddit automatically — it only reads
public posts/comments and creates issues in this repo for a human to act on.

## How it runs

A GitHub Actions workflow (`.github/workflows/reddit-lead-finder.yml`) runs
this script every 30 minutes automatically once the secrets below are set.
Each run:

1. Scans the subreddits in `config.yaml` for new posts/comments.
2. Matches them against the keyword list in `config.yaml`.
3. Opens a GitHub issue (labeled `reddit-lead`) for each new match, with the
   link, subreddit, author, and matched phrase.
4. Remembers what it's already scanned (via GitHub Actions cache) so you
   never get duplicate issues.

The first run just indexes what's currently posted (no issues filed) so you
don't get flooded with backlog — only genuinely new posts/comments after
that trigger a lead.

## One-time setup (5 minutes, free)

1. **Create a Reddit API app**
   - Go to <https://www.reddit.com/prefs/apps> while logged into the
     account you want this to run as.
   - Click "create app" → choose type **script**.
   - Name it anything (e.g. `trendsetter-lead-finder`), leave the redirect
     URI as `http://localhost:8080`.
   - After creating it, note the string under the app name (client ID) and
     the "secret" field (client secret).

2. **Add repo secrets**
   - In this repo: Settings → Secrets and variables → Actions → New
     repository secret.
   - Add `REDDIT_CLIENT_ID` and `REDDIT_CLIENT_SECRET` with the values from
     step 1.

3. That's it — the workflow is already committed and scheduled. It will
   start filing issues on its next run (or trigger it immediately from the
   Actions tab → "Reddit Lead Finder" → "Run workflow").

## Customizing

Edit `config.yaml` — no code changes needed:

- `subreddits`: list of subreddit names (no `r/` prefix).
- `keywords`: phrases that count as a match (case-insensitive substring).
- `post_limit` / `comment_limit`: how many recent items to scan per
  subreddit per run.

## Running locally instead

```bash
cd tools/reddit-lead-finder
pip install -r requirements.txt
export REDDIT_CLIENT_ID=xxx
export REDDIT_CLIENT_SECRET=xxx
python reddit_lead_finder.py
```

Without `GITHUB_TOKEN`/`GITHUB_REPOSITORY` set (as they are automatically in
Actions), matches just print to the console instead of filing issues.

## Notes

- Uses the official Reddit API within PRAW's default rate limiting —
  nothing here scrapes HTML or exceeds Reddit's API terms.
- Every "lead" is a link for a human to read and respond to in their own
  voice — treat it as a shortlist, not an auto-outreach tool.

#!/usr/bin/env python3
"""Scan configured subreddits for buying-intent phrases and file a lead
for each new match (a GitHub issue in CI, or a console line locally).

Read-only use of the official Reddit API (PRAW) — no auto-posting, no
auto-DMing. Every match is meant for a human to review and reach out to
manually.
"""
import json
import os
import sys
from pathlib import Path

import praw
import requests
import yaml

ROOT = Path(__file__).parent
STATE_FILE = ROOT / "state" / "seen_ids.json"
CONFIG_FILE = ROOT / "config.yaml"


def load_config():
    with open(CONFIG_FILE) as f:
        return yaml.safe_load(f)


def load_seen():
    if STATE_FILE.exists():
        return set(json.loads(STATE_FILE.read_text()))
    return set()


def save_seen(seen):
    STATE_FILE.parent.mkdir(parents=True, exist_ok=True)
    STATE_FILE.write_text(json.dumps(sorted(seen)))


def build_reddit(client_id, client_secret):
    return praw.Reddit(
        client_id=client_id,
        client_secret=client_secret,
        user_agent=os.environ.get(
            "REDDIT_USER_AGENT", "trendsetter-lead-finder/1.0"
        ),
    )


def match_keywords(text, keywords):
    text_lower = text.lower()
    return [kw for kw in keywords if kw.lower() in text_lower]


def file_github_issue(title, body):
    token = os.environ.get("GITHUB_TOKEN")
    repo = os.environ.get("GITHUB_REPOSITORY")
    if not token or not repo:
        return False
    resp = requests.post(
        f"https://api.github.com/repos/{repo}/issues",
        headers={
            "Authorization": f"Bearer {token}",
            "Accept": "application/vnd.github+json",
        },
        json={"title": title, "body": body, "labels": ["reddit-lead"]},
        timeout=30,
    )
    resp.raise_for_status()
    return True


def collect_leads(reddit, config, seen):
    leads = []
    for sub_name in config["subreddits"]:
        subreddit = reddit.subreddit(sub_name)

        for submission in subreddit.new(limit=config.get("post_limit", 25)):
            if submission.id in seen:
                continue
            seen.add(submission.id)
            hits = match_keywords(
                f"{submission.title} {submission.selftext}", config["keywords"]
            )
            if hits:
                leads.append(
                    {
                        "type": "post",
                        "subreddit": sub_name,
                        "text": submission.title,
                        "url": f"https://reddit.com{submission.permalink}",
                        "author": str(submission.author),
                        "matched": hits,
                    }
                )

        for comment in subreddit.comments(limit=config.get("comment_limit", 50)):
            if comment.id in seen:
                continue
            seen.add(comment.id)
            hits = match_keywords(comment.body, config["keywords"])
            if hits:
                leads.append(
                    {
                        "type": "comment",
                        "subreddit": sub_name,
                        "text": comment.body[:200],
                        "url": f"https://reddit.com{comment.permalink}",
                        "author": str(comment.author),
                        "matched": hits,
                    }
                )
    return leads


def main():
    client_id = os.environ.get("REDDIT_CLIENT_ID", "")
    client_secret = os.environ.get("REDDIT_CLIENT_SECRET", "")
    if not client_id or not client_secret:
        print(
            "REDDIT_CLIENT_ID / REDDIT_CLIENT_SECRET not set — add them as "
            "repo secrets to activate lead finding. See README.md."
        )
        sys.exit(0)

    config = load_config()
    is_bootstrap = not STATE_FILE.exists()
    seen = load_seen()
    reddit = build_reddit(client_id, client_secret)

    leads = collect_leads(reddit, config, seen)
    save_seen(seen)

    if is_bootstrap:
        print(f"Bootstrap run: indexed {len(seen)} existing items, filed no leads.")
        return

    for lead in leads:
        title = f"[Reddit Lead] r/{lead['subreddit']}: {lead['text'][:80]}"
        body = (
            f"**Type:** {lead['type']}\n"
            f"**Subreddit:** r/{lead['subreddit']}\n"
            f"**Author:** u/{lead['author']}\n"
            f"**Matched phrases:** {', '.join(lead['matched'])}\n"
            f"**Link:** {lead['url']}\n"
        )
        if not file_github_issue(title, body):
            print(f"LEAD: {title}\n{body}")

    print(f"Checked {len(config['subreddits'])} subreddits, found {len(leads)} new lead(s).")


if __name__ == "__main__":
    main()

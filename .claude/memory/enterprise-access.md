# Enterprise Access: saved for later (not started)

Status: ON HOLD. Michelle said to build this only after everything else is done
and there is a real client (a hospital or a larger business). Do not work on it
until she asks. Recorded 2026-09-30 from the Control Tower review (master dcbc665).

## What it is (my understanding; confirm with Michelle before building)
Organizations (hospital, employer, grocery chain, clinic, gym) get their own
Control Tower signup/login, a User Connect link + QR code their members use to
connect their HealthLogic app account, and a dashboard of their members' usage
(connected users, profiles, scans, top allergies/conditions/diets from the
Profile Tags master, flagged ingredients, activity over time, exports). Members
appear as totals and anonymous user IDs. Built by converting the Affiliate
Platform and the Grocery Store demo, not from scratch.
Open questions: who the enterprises are, what they may see about members,
whether affiliates stay as-is alongside Enterprise.

## Reusable in Control Tower today
- Models: Client, User (unused passwordHash), ClientUser (ADMIN/CLIENT/CLIENT_STAFF),
  License, Subscription, ApiKey, UsageEvent, AuthEvent.
- /signup + POST /api/signup create User+Client+ClientUser+License+Subscription+ApiKey
  (no password yet). lib/billing/provisioning.
- HealthScanEvent / HealthProfileEvent keyed by clientId (scan has healthLogicUserId, profileId).
- /api/ingest/scan, /api/ingest/profile, /api/client/healthlogic/ingest-* resolve client from API key.
- Real rollups: lib/healthlogic/dashboard.ts, rollups.ts. Exports: /api/client/healthlogic/export/{csv,xlsx,pdf}.
- Guards: requireDashboardRoute, ownerRouteGuard, ControlPlane.canAccess, lib/security/rateLimit, authAudit.
- Sidebar component, /client layout. Profile Tags master (/admin/containers/profile-tags).

## Convert instead of rebuild
- Affiliate auth is the only real outside login (password hash, ts_affiliate_session,
  forgot/reset, getAffiliateSession, affiliateRouteGuard) -> pattern for Enterprise login.
- /a/healthlogic/[code] (store redirect + AffiliateReferral click) and
  /api/affiliate/download-{qr,link,postcard-template} -> User Connect link/QR.
- /affiliate/dashboard -> dashboard shell.
- Grocery demo /client/healthlogic/*, RetailStore/RetailWarehouse -> org locations;
  demo-seed route (Mark Store 50-52, WH-01/02) -> realistic demo seed.

## Needs rework
- getDashboardSession only returns OWNER or DEMO (never CLIENT): /client is owner-only.
- /login links to /client-login and /team-login, which do not exist.
- /api/client/me returns the first Client, not the logged-in one.
- insightsData.ts, profileAnalyticsData.ts, retailIntelligenceData.ts are hard-coded numbers.
- HL server sends all app traffic with one CT API key -> all scans land in one Client;
  no link between an app user and an organization.

## Missing
- Enterprise password/session/logout/reset, CLIENT session scoped to its org.
- Connect link that records which app user joined + app/server change to send the code
  (HL server + OTA only, no store build).
- Member table linking HealthLogic users to organizations (schema change: show Michelle
  before applying on Railway). One household = one profile.
- Dashboard pages on real data, demo seed, tests (signup, login, org scoping, dashboard).

## Verification plan
- Local Postgres + real routes: signup, login, wrong password + rate limit, logout, reset,
  org A cannot see org B, logged-out 403/redirect, owner login stays separate.
  Playwright walkthrough with screenshots.
- Demo org (~3 locations, ~150 anonymous members, ~90 days of scans/profiles using real
  Profile Tags and ingredient names); test every dashboard number against direct DB counts;
  exports match screen; simulated member joins via Connect link; demo org flagged as demo.

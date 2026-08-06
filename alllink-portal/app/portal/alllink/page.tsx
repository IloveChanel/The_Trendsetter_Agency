"use client";

type Platform = {
  category: string;
  name: string;
  label: string;
};

const PLATFORMS: Platform[] = [
  { category: "Communication", name: "Gmail", label: "Gmail · Support inbox" },
  { category: "Communication", name: "Outlook", label: "Outlook · Sales inbox" },
  { category: "Communication", name: "Google Calendar", label: "Google Calendar · Team schedule" },
  { category: "Communication", name: "SMS", label: "SMS · Customer updates" },

  { category: "Social", name: "Instagram", label: "Instagram · Brand feed" },
  { category: "Social", name: "TikTok", label: "TikTok · Short-form video" },
  { category: "Social", name: "LinkedIn", label: "LinkedIn · Hiring & thought leadership" },
  { category: "Social", name: "YouTube", label: "YouTube · Channel uploads" },
  { category: "Social", name: "Facebook Pages", label: "Facebook Pages · Local presence" },

  { category: "Dev & Infra", name: "GitHub", label: "GitHub · AllLink repo" },
  { category: "Dev & Infra", name: "GitLab", label: "GitLab · Legacy projects" },
  { category: "Dev & Infra", name: "Vercel", label: "Vercel · Frontend deploys" },
  { category: "Dev & Infra", name: "Railway", label: "Railway · API services" },
  { category: "Dev & Infra", name: "Render", label: "Render · background workers" },
  { category: "Dev & Infra", name: "Cloudflare", label: "Cloudflare · Edge + DNS" },

  { category: "Ads & Marketing", name: "Google Ads", label: "Google Ads · Search campaigns" },
  { category: "Ads & Marketing", name: "Meta Ads", label: "Meta Ads · Social campaigns" },
  { category: "Ads & Marketing", name: "LinkedIn Ads", label: "LinkedIn Ads · B2B campaigns" },
  { category: "Ads & Marketing", name: "Newsletter", label: "Newsletter · Email marketing" },

  { category: "Finance & Investing", name: "Stripe", label: "Stripe · Payments & subscriptions" },
  { category: "Finance & Investing", name: "QuickBooks", label: "QuickBooks · Accounting" },
  { category: "Finance & Investing", name: "Xero", label: "Xero · Alt accounting" },
  { category: "Finance & Investing", name: "Chase", label: "Chase · Business checking" },
  { category: "Finance & Investing", name: "Wells Fargo", label: "Wells Fargo · Balances & transfers" },
  { category: "Finance & Investing", name: "Robinhood", label: "Robinhood · Stock portfolio" },
  { category: "Finance & Investing", name: "Fidelity", label: "Fidelity · Retirement & investing" },
  { category: "Finance & Investing", name: "Vanguard", label: "Vanguard · Index funds & 401k" },
  { category: "Finance & Investing", name: "Coinbase", label: "Coinbase · Crypto holdings" },
  { category: "Finance & Investing", name: "PayPal", label: "PayPal · Payments received" },
  { category: "Finance & Investing", name: "Venmo", label: "Venmo · Peer payments" },
  { category: "Finance & Investing", name: "Mint", label: "Mint · Budget tracking" },

  { category: "Ops & CRM", name: "Notion", label: "Notion · Docs & wiki" },
  { category: "Ops & CRM", name: "Trello", label: "Trello · Kanban boards" },
  { category: "Ops & CRM", name: "Asana", label: "Asana · Projects" },
  { category: "Ops & CRM", name: "Slack", label: "Slack · Team chat" },
  { category: "Ops & CRM", name: "Microsoft Teams", label: "Teams · Internal collaboration" },
  { category: "Ops & CRM", name: "CRM", label: "CRM · Leads & pipelines" },
  { category: "Ops & CRM", name: "Booking system", label: "Booking · Appointments" },
  { category: "Ops & CRM", name: "Helpdesk", label: "Helpdesk · Tickets & support" },

  { category: "Commerce & Industrial", name: "Shopify", label: "Shopify · Storefront" },
  { category: "Commerce & Industrial", name: "Etsy", label: "Etsy · Marketplace" },
  { category: "Commerce & Industrial", name: "Inventory", label: "Inventory · Stock levels" },
  { category: "Commerce & Industrial", name: "Manufacturing", label: "Manufacturing · plant dashboards" },
];

const CATEGORY_ORDER = [
  "Communication",
  "Social",
  "Dev & Infra",
  "Ads & Marketing",
  "Finance & Investing",
  "Ops & CRM",
  "Commerce & Industrial",
];

const BOARD_TILES = [
  "Google · Search & research",
  "Chat · AI assistant",
  "Email · Combined inbox view",
  "Social · Instagram / TikTok / LinkedIn",
  "Dev · GitHub / CI / deploy",
  "Stocks · Portfolio tracking",
  "Investments · Robinhood / Fidelity / Vanguard",
  "Banking · Chase / Wells Fargo balances",
  "Crypto · Coinbase holdings",
  "CRM · Pipelines & deals",
  "Booking · Calendars & slots",
  "Industrial · Plant / inventory dashboards",
];

function DashboardPreview() {
  return (
    <div
      style={{
        borderRadius: 26,
        border: "1px solid rgba(74,211,255,.5)",
        boxShadow: "0 40px 140px rgba(0,0,0,.65), 0 0 80px rgba(34,211,238,.18)",
        overflow: "hidden",
        pointerEvents: "none",
        userSelect: "none",
      }}
    >
      {/* Fake browser chrome so it reads as a real live app */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          padding: "10px 14px",
          background: "rgba(4,9,26,.95)",
          borderBottom: "1px solid rgba(255,255,255,.08)",
        }}
      >
        <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#fb7185" }} />
        <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#f59e0b" }} />
        <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#34d399" }} />
        <span style={{ marginLeft: 10, fontSize: 11, color: "#9fb0cf" }}>alllink.app/dashboard</span>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "260px minmax(0, 1fr)",
          gap: 18,
          padding: 18,
          background:
            "radial-gradient(circle at 4% 0%, rgba(236,72,153,.22), transparent 34%), radial-gradient(circle at 96% 100%, rgba(34,211,238,.22), transparent 34%), linear-gradient(160deg, rgba(6,11,30,.98), rgba(2,5,16,1))",
        }}
      >
        {/* Sidebar */}
        <aside
          style={{
            borderRadius: 20,
            border: "1px solid rgba(74,211,255,.32)",
            background: "linear-gradient(180deg, rgba(6,15,42,.95), rgba(3,9,28,.98))",
            padding: "16px 14px",
          }}
        >
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              padding: "6px 12px",
              borderRadius: 999,
              border: "1px solid rgba(91,224,255,.7)",
              background: "rgba(5,15,39,.72)",
              fontSize: 10,
              fontWeight: 700,
              letterSpacing: ".1em",
              textTransform: "uppercase",
              color: "#e7f9ff",
              marginBottom: 12,
            }}
          >
            AllLink · Your platforms
          </div>

          <div
            style={{
              marginBottom: 14,
              borderRadius: 16,
              border: "1px solid rgba(139,92,246,.5)",
              background:
                "radial-gradient(circle at 0% 0%, rgba(236,72,153,.4), transparent 40%), radial-gradient(circle at 100% 100%, rgba(34,211,238,.35), transparent 40%), linear-gradient(135deg, rgba(6,12,36,.92), rgba(3,6,22,.98))",
              padding: "12px 12px 14px",
            }}
          >
            <div style={{ fontSize: 11, color: "#d6e9f4", marginBottom: 3 }}>Hello, Visionary —</div>
            <div style={{ fontSize: 14, fontWeight: 800, color: "#ffffff" }}>Welcome to your command center.</div>
            <div style={{ fontSize: 11, color: "#cdd8ee", marginTop: 5 }}>What are we building today?</div>
          </div>

          <div style={{ maxHeight: 360, overflow: "hidden" }}>
            {CATEGORY_ORDER.map((cat) => (
              <div key={cat} style={{ marginBottom: 10 }}>
                <div
                  style={{
                    fontSize: 10,
                    textTransform: "uppercase",
                    letterSpacing: ".1em",
                    color: "#9fb0cf",
                    marginBottom: 5,
                  }}
                >
                  {cat}
                </div>
                {PLATFORMS.filter((p) => p.category === cat)
                  .slice(0, 3)
                  .map((p) => (
                    <div
                      key={p.label}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        gap: 6,
                        padding: "6px 8px",
                        borderRadius: 10,
                        background: "rgba(5,13,36,.9)",
                        border: "1px solid rgba(148,163,184,.32)",
                        marginBottom: 3,
                      }}
                    >
                      <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                        <div
                          style={{
                            width: 20,
                            height: 20,
                            borderRadius: 7,
                            border: "1px solid rgba(74,211,255,.4)",
                            background: "rgba(2,6,23,.8)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: 10,
                            fontWeight: 800,
                            color: "#5de9ff",
                          }}
                        >
                          {p.name.charAt(0)}
                        </div>
                        <div style={{ fontSize: 10, color: "#e8fbff", fontWeight: 600 }}>{p.name}</div>
                      </div>
                      <span style={{ fontSize: 9, color: "#cbd5f5" }}>Linked</span>
                    </div>
                  ))}
              </div>
            ))}
          </div>

          <button
            style={{
              width: "100%",
              minHeight: 36,
              borderRadius: 999,
              border: "1px solid rgba(59,130,246,.6)",
              background: "linear-gradient(135deg, #20d9ff 0%, #31f0b1 48%, #b86cff 100%)",
              color: "#03121b",
              fontWeight: 800,
              fontSize: 11,
              marginTop: 10,
            }}
          >
            + Add platform / service
          </button>
        </aside>

        {/* Main board */}
        <section
          style={{
            borderRadius: 20,
            border: "1px solid rgba(74,211,255,.28)",
            padding: 18,
            background:
              "radial-gradient(circle at 4% 0%, rgba(236,72,153,.24), transparent 34%), radial-gradient(circle at 96% 100%, rgba(34,211,238,.24), transparent 34%), linear-gradient(150deg, rgba(8,13,32,.92), rgba(2,6,18,.98))",
          }}
        >
          <p style={{ fontSize: 10, letterSpacing: ".1em", textTransform: "uppercase", color: "#9aa8d8", marginBottom: 4 }}>
            The Trendsetter Agency · AllLink dashboard
          </p>
          <h3 style={{ fontSize: 20, color: "#ffffff", margin: "0 0 10px" }}>
            Hello, Visionary —{" "}
            <span
              style={{
                background: "linear-gradient(110deg,#55e7ff,#57f3bf 45%,#d28bff)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                color: "transparent",
              }}
            >
              what are we building today?
            </span>
          </h3>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))", gap: 10, marginBottom: 14 }}>
            {BOARD_TILES.map((label) => (
              <div
                key={label}
                style={{
                  borderRadius: 14,
                  border: "1px solid rgba(148,163,184,.45)",
                  background: "linear-gradient(135deg, rgba(15,23,42,.9), rgba(3,7,20,.96))",
                  padding: 10,
                  fontSize: 11,
                  color: "#dbeafe",
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                  <span style={{ fontWeight: 700, fontSize: 11 }}>{label.split("·")[0]}</span>
                  <span
                    style={{
                      borderRadius: 999,
                      padding: "2px 7px",
                      fontSize: 9,
                      border: "1px solid rgba(74,211,255,.5)",
                      background: "rgba(8,13,32,.9)",
                    }}
                  >
                    Add
                  </span>
                </div>
                <div style={{ fontSize: 10, color: "#b9c7df" }}>{label.split("·")[1]}</div>
              </div>
            ))}
          </div>

          <div
            style={{
              borderRadius: 16,
              border: "1px solid rgba(148,163,184,.5)",
              background: "rgba(3,10,32,.92)",
              padding: 12,
            }}
          >
            <div style={{ fontSize: 11, fontWeight: 700, color: "#e8fbff", marginBottom: 5 }}>Recent notifications</div>
            <div style={{ display: "grid", gap: 4, fontSize: 10, color: "#cfd3ff" }}>
              <div><strong style={{ color: "#22c55e" }}>Task completed:</strong> New client workspace provisioned.</div>
              <div><strong style={{ color: "#20d9ff" }}>Deploy passed:</strong> API health checks OK.</div>
              <div><strong style={{ color: "#fb7185" }}>Banking:</strong> Chase balance synced · $ recap ready.</div>
              <div><strong style={{ color: "#8b5cf6" }}>Investing:</strong> Portfolio updated across 3 accounts.</div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default function AllLinkProductPage() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const successUrl = siteUrl + "/portal/alllink-success?session_id={CHECKOUT_SESSION_ID}";
  const cancelUrl = siteUrl + "/portal/alllink";

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const email = formData.get("email") as string;

    const res = await fetch(siteUrl + "/api/create-alllink-checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, successUrl, cancelUrl }),
    });

    if (!res.ok) {
      alert("Something went wrong creating the checkout session.");
      return;
    }

    const { url } = await res.json();
    if (url) {
      window.location.href = url;
    } else {
      alert("No checkout URL returned.");
    }
  }

  return (
    <div className="tts-image-home">
      <link rel="stylesheet" href="/assets/trendsetter-homepage-image-match.css" />
      <div className="tts-page-glow"></div>

      <main className="tts-shell">
        <nav className="tts-nav">
          <a className="tts-brand" href="/" aria-label="The Trendsetter Agency home">
            <span className="tts-brand-mark">T</span>
            <span className="tts-brand-copy">
              <strong>The Trendsetter Agency</strong>
              <em>Passion-led mobile apps • built to truly help people</em>
            </span>
          </a>

          <div className="tts-links">
            <a href="/apps/health-logic/">Health Logic</a>
            <a href="/apps/toppick-resume/">TopPick Resume</a>
            <a href="/apps/my-muse/">My Muse</a>
            <a href="/apps/ad-generator/">Ad Generator</a>
            <a href="/apps/auto-posting/">Auto Posting</a>
            <a href="/about/">About</a>
            <a href="/portal/">Portal</a>
            <a href="/support.html">Support</a>
          </div>
        </nav>

        {/* Hero pitch */}
        <header className="tts-hero">
          <section className="tts-hero-copy">
            <span className="tts-kicker">
              <span>♡</span> Passion-led dashboard • AllLink
            </span>

            <h1>
              AllLink puts powerful control on one screen —{" "}
              <span className="hot">every service</span>, <span className="pink">every platform</span>, and{" "}
              <span className="cyan">every notification</span> in one place.
            </h1>

            <p>
              Email, socials, dev tools, ads, banking, investing, CRMs, booking, and industrial systems — link them
              once and watch your whole operation from a single command center.
            </p>

            <div className="tts-actions">
              <a className="tts-btn tts-btn-primary" href="#subscribe">
                Subscribe – $8.88 / month →
              </a>
              <a className="tts-btn tts-btn-secondary" href="#preview">
                ▷ See it in action
              </a>
            </div>
          </section>

          <div id="preview">
            <DashboardPreview />
          </div>
        </header>

        {/* How it works */}
        <section className="section">
          <h2>How AllLink runs and operates as your one dashboard.</h2>
          <div className="grid">
            <div className="card">
              <h3>Add your platforms</h3>
              <p>
                Pick a category, type in your account info, and AllLink stores it with a launch button and live
                status. Email, social, dev, ads, CRM — add anything.
              </p>
            </div>
            <div className="card">
              <h3>Banking & investing, together</h3>
              <p>
                Link Chase, Wells Fargo, Robinhood, Fidelity, Vanguard, Coinbase, PayPal, and Venmo so your balances,
                portfolio, and cash flow show up next to your business tools.
              </p>
            </div>
            <div className="card">
              <h3>Notifications that don't make you go looking</h3>
              <p>
                In-app alerts, email digests, or webhooks fire the moment a task completes, a deploy passes, a
                payment clears, or a balance updates.
              </p>
            </div>
          </div>
        </section>

        {/* Subscribe */}
        <section className="section" id="subscribe">
          <h2>Subscribe to AllLink and download your dashboard.</h2>
          <div className="grid">
            <div className="card">
              <h3>AllLink subscription</h3>
              <p>
                <strong>$8.88 / month</strong> – cancel anytime. Includes your downloadable AllLink dashboard shell,
                ready to host and connect to your own accounts.
              </p>
              <form onSubmit={handleSubmit} style={{ marginTop: 14, display: "grid", gap: 10, maxWidth: 320 }}>
                <input
                  name="email"
                  type="email"
                  required
                  placeholder="you@example.com"
                  style={{
                    padding: "10px 12px",
                    borderRadius: 8,
                    border: "1px solid rgba(255,255,255,.2)",
                    background: "rgba(4,7,26,.86)",
                    color: "#f9f9ff",
                    fontSize: 14,
                  }}
                />
                <button
                  type="submit"
                  style={{
                    padding: "10px 14px",
                    borderRadius: 999,
                    border: "none",
                    background: "linear-gradient(135deg, #01c2ff, #00d6c8)",
                    color: "#020714",
                    fontWeight: 800,
                    fontSize: 14,
                    cursor: "pointer",
                  }}
                >
                  Subscribe – $8.88/month
                </button>
              </form>
            </div>

            <div className="card">
              <h3>What you get</h3>
              <p>
                Downloadable dashboard shell, sidebar platform linking, banking & investing widgets, notification feed,
                and updates as AllLink improves.
              </p>
            </div>
          </div>
        </section>

        <footer className="footer">
          <p>
            © 2026 The Trendsetter Agency LLC · <a href="/privacy.html">Privacy</a> ·{" "}
            <a href="/terms.html">Terms</a> · <a href="/security.html">Security</a> ·{" "}
            <a href="/data-deletion.html">Data Deletion</a> · <a href="/portal/">Portal</a> ·{" "}
            <a href="/support.html">Support</a>
          </p>
        </footer>
      </main>
    </div>
  );
}

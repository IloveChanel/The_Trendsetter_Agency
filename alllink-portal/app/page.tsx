export default function Home() {
  return (
    <main
      style={{
        minHeight: "100vh",
        backgroundColor: "#020714",
        color: "#f9f9ff",
        fontFamily: "system-ui, -apple-system, Segoe UI, sans-serif",
        padding: "40px 24px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div style={{ maxWidth: 720 }}>
        <p style={{ fontSize: 14, letterSpacing: ".16em", textTransform: "uppercase", color: "#9aa0c8" }}>
          The Trendsetter Agency
        </p>
        <h1
          style={{
            marginTop: 12,
            fontSize: "clamp(28px, 4vw, 40px)",
            lineHeight: 1.1,
          }}
        >
          AllLink — one dashboard for all your services, platforms, and notifications.
        </h1>
        <p
          style={{
            marginTop: 12,
            fontSize: 16,
            color: "#cfd3e6",
            maxWidth: "60ch",
          }}
        >
          Stop jumping between four screens. Connect email, socials, work apps, and cloud platforms in one place and see every notification from one AllLink dashboard.
        </p>

        <div style={{ display: "flex", gap: 12, marginTop: 24, flexWrap: "wrap" }}>
          <a
            href="/portal/alllink"
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "12px 18px",
              borderRadius: 999,
              backgroundColor: "#01696f",
              color: "#ffffff",
              fontWeight: 700,
              textDecoration: "none",
            }}
          >
            Open AllLink
          </a>
          <a
            href="/portal/alllink-success?session_id=test_123"
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "12px 18px",
              borderRadius: 999,
              border: "1px solid #333a5c",
              color: "#cfd3e6",
              textDecoration: "none",
              fontWeight: 600,
            }}
          >
            Test download page
          </a>
        </div>

        <p
          style={{
            marginTop: 18,
            fontSize: 13,
            color: "#8087aa",
          }}
        >
          This app runs separately from your main www.thetrendsetteragency.com site. Once you&apos;re happy with AllLink, you can hook it into your existing layout.
        </p>
      </div>
    </main>
  );
}

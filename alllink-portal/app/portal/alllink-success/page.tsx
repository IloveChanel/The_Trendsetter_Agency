export default async function AllLinkSuccessPage({
  searchParams,
}: {
  searchParams: { session_id?: string };
}) {
  const sessionId = searchParams.session_id;
  if (!sessionId) {
    return <div>Invalid session.</div>;
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  return (
    <div style={{ fontFamily: "system-ui, sans-serif", maxWidth: 720, margin: "40px auto", padding: "0 20px" }}>
      <h1>Welcome to AllLink</h1>
      <p>Your subscription was successful. You can download your dashboard now.</p>

      <div style={{ marginTop: 24, border: "1px solid #ddd", borderRadius: 12, padding: 20 }}>
        <h2>Download AllLink Dashboard</h2>
        <p>Click the button below to download your file. The link is valid for 24 hours.</p>
        <a
          href={siteUrl + "/api/alllink/download?session_id=" + sessionId}
          style={{
            display: "inline-block",
            marginTop: 12,
            padding: "10px 14px",
            borderRadius: 8,
            border: "none",
            background: "#01696f",
            color: "#fff",
            fontWeight: 700,
            textDecoration: "none",
          }}
        >
          Download AllLink
        </a>
      </div>
    </div>
  );
}

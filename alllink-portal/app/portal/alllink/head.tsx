export default function Head() {
  return (
    <>
      <title>AllLink Dashboard | Connect All Your Services & Platforms</title>
      <meta
        name="description"
        content="AllLink is a unified dashboard that connects all your services, platforms, and notifications in one place. Link email, social media, ads, finance, dev tools, CRMs, and more, then trigger in-app alerts, emails, or webhooks when tasks complete or statuses change."
      />
      <meta
        name="keywords"
        content="AllLink, unified dashboard, connect services, connect platforms, notifications, in-app alerts, email alerts, webhook triggers, business dashboard, developer dashboard, social media dashboard, cloud deploy monitoring, Stripe QuickBooks GitHub Notion Trello Slack Microsoft Teams Shopify, multi-account workspace, Trendsetter Agency"
      />
      <meta name="robots" content="index,follow" />
      <meta property="og:title" content="AllLink Dashboard | One Screen for All Your Services" />
      <meta
        property="og:description"
        content="Stop jumping between four screens. Connect Gmail, Outlook, Instagram, TikTok, LinkedIn, GitHub, Stripe, QuickBooks, CRMs, booking tools, and cloud platforms to one AllLink control center."
      />
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://www.thetrendsetteragency.com/portal/alllink" />
      <meta property="og:site_name" content="The Trendsetter Agency" />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            name: "AllLink",
            applicationCategory: "BusinessApplication",
            operatingSystem: "Web",
            url: "https://www.thetrendsetteragency.com/portal/alllink",
            description:
              "AllLink is a premium dashboard that connects all your services and platforms on one screen, with in-app alerts, email notifications, and webhook triggers when tasks complete or statuses change.",
            offers: {
              "@type": "Offer",
              price: "8.88",
              priceCurrency: "USD",
              category: "subscription",
            },
            provider: {
              "@type": "Organization",
              name: "The Trendsetter Agency",
            },
          }),
        }}
      />
    </>
  );
}

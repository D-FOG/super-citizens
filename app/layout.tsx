import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { SiteShell } from "@/components/site-shell";
import { absoluteUrl, createMetadata, defaultDescription, pageSeo, siteName, siteUrl } from "@/lib/seo";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  ...createMetadata(pageSeo.home),
  metadataBase: new URL(siteUrl),
  applicationName: siteName,
  generator: "Next.js",
  keywords: [
    "Supersite Citizens",
    "Kingdom clusters",
    "spiritual growth",
    "skill development",
    "leadership training",
    "cluster system",
    "Kingdom citizens"
  ],
  authors: [{ name: siteName }],
  creator: siteName,
  publisher: siteName,
  category: "Education and community",
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || undefined
  }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteName,
    url: siteUrl,
    description: defaultDescription,
    sameAs: [process.env.NEXT_PUBLIC_WHATSAPP_URL].filter(Boolean)
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteName,
    url: siteUrl,
    potentialAction: {
      "@type": "SearchAction",
      target: `${absoluteUrl("/resources")}?q={search_term_string}`,
      "query-input": "required name=search_term_string"
    }
  };

  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className={inter.variable}>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }} />
        <SiteShell>
          {children}
        </SiteShell>
      </body>
    </html>
  );
}

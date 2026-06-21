import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { SiteShell } from "@/components/site-shell";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "Supersite Citizens",
  description: "A structured Kingdom growth system for spiritual grounding, skill development, leadership, and multiplication."
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className={inter.variable}>
        <SiteShell>
          {children}
        </SiteShell>
      </body>
    </html>
  );
}

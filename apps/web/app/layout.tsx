import { Providers } from "@web/providers";
import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
});

export const metadata: Metadata = {
  title:
    "Git Issue Hunt – Discover Beginner-Friendly GitHub Issues for Open Source Contributions",
  description:
    "Find beginner-friendly GitHub issues (good first issue, help wanted) filtered by language. Perfect for developers starting with open source. Join GitIssueHunt and contribute today!",
  icons: {
    icon: "/icon.png",
  },
  other: {
    "google-site-verification": "o469fcMM1OM5_1XDy-Y9EwmWndXJ8PZWlobWSUg_4R0",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}

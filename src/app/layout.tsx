import type { Metadata } from "next";
import { Noto_Sans_Devanagari, Poppins } from "next/font/google";
import "./globals.css";

const noto = Noto_Sans_Devanagari({
  subsets: ["devanagari", "latin"],
  variable: "--font-noto-devanagari",
  display: "swap",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
});

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: "राष्ट्रीय जनादेश प्रमोशनल काउंसिल",
    template: "%s | राष्ट्रीय जनादेश प्रमोशनल काउंसिल",
  },
  description:
    "राजनीतिक शिक्षा, नेतृत्व विकास व लोकतांत्रिक जागरूकता हेतु उच्च शिक्षण संस्थान — जयपुर।",
  openGraph: {
    type: "website",
    locale: "hi_IN",
    siteName: "राष्ट्रीय जनादेश प्रमोशनल काउंसिल",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="hi" className={`${noto.variable} ${poppins.variable}`}>
      <body className="min-h-screen font-sans">{children}</body>
    </html>
  );
}

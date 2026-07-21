import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/ThemeProvider";
import "@/styles/globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://emmanuelsimbulan.dev"),
  title: "Emmanuel Simbulan — Business Analyst & Software Engineer",
  description:
    "Personal portfolio of Emmanuel Simbulan. Business Analyst & Software Engineer building technology that connects business and people.",
  keywords: [
    "Emmanuel Simbulan",
    "Business Analyst",
    "Software Engineer",
    "Portfolio",
    "Web Developer",
    "Next.js",
    "TypeScript",
    "React",
  ],
  authors: [{ name: "Emmanuel Simbulan" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://emmanuelsimbulan.dev",
    siteName: "Emmanuel Simbulan",
    title: "Emmanuel Simbulan — Business Analyst & Software Engineer",
    description:
      "Building technology that connects business and people.",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Emmanuel Simbulan",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Emmanuel Simbulan — Business Analyst & Software Engineer",
    description:
      "Building technology that connects business and people.",
    images: ["/og.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} antialiased`} suppressHydrationWarning>
      <body className="min-h-screen">
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}

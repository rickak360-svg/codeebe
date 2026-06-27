import type { Metadata } from "next";
import { Hanken_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
import { SiteLayout } from "@/components/layout/SiteLayout";
import "./globals.css";

const hankenGrotesk = Hanken_Grotesk({
  variable: "--font-family-display",
  subsets: ["latin"],
  weight: ["400", "700", "800"],
});

const inter = Inter({
  variable: "--font-family-body",
  subsets: ["latin"],
  weight: ["400", "500"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-family-mono",
  subsets: ["latin"],
  weight: ["500"],
});

export const metadata: Metadata = {
  title: "Codeebe | Premium Product Engineering Studio",
  description:
    "We build SaaS, automation, AI workflows and product platforms with product-first thinking, clean architecture, and launch-ready delivery.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      style={{ colorScheme: "dark" }}
      className={`dark ${hankenGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable} h-full`}
    >
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="flex min-h-full flex-col bg-[var(--background)] font-[family-name:var(--font-family-body)] text-[var(--foreground)] antialiased">
        <SiteLayout>{children}</SiteLayout>
      </body>
    </html>
  );
}

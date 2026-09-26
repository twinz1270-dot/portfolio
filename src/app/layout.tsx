import type { Metadata } from "next";
import { inter, spaceGrotesk } from "./fonts";
import { personalInfo } from "@/lib/constants";
import Providers from "./providers";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: `${personalInfo.name} | ${personalInfo.title}`,
    template: `%s | ${personalInfo.name}`,
  },
  description:
    "Frontend developer and software engineer focused on React, modern web interfaces, UI/UX awareness, and responsive digital products.",
  keywords: [
    "portfolio",
    "developer",
    "web development",
    "React",
    "Next.js",
    "Three.js",
    "TypeScript",
    "creative developer",
  ],
  authors: [{ name: personalInfo.name }],
  creator: personalInfo.name,
  openGraph: {
    title: `${personalInfo.name} | ${personalInfo.title}`,
    description:
      "Frontend development with React, modern web interfaces, UI/UX awareness, and responsive digital products.",
    type: "website",
    locale: "en_US",
    siteName: `${personalInfo.name} Portfolio`,
  },
  twitter: {
    card: "summary_large_image",
    title: `${personalInfo.name} | ${personalInfo.title}`,
    description:
      "Frontend development with React, modern web interfaces, UI/UX awareness, and responsive digital products.",
  },
  robots: {
    index: true,
    follow: true,
  },
  other: {
    google: "notranslate",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      name: personalInfo.name,
      jobTitle: personalInfo.title,
      ...(personalInfo.email ? { email: personalInfo.email } : {}),
      sameAs: personalInfo.socials
        .filter((s) => Boolean(s.url) && !s.url.startsWith("mailto:"))
        .map((s) => s.url),
    },
    {
      "@type": "WebSite",
      name: `${personalInfo.name} — Portfolio`,
      description: personalInfo.subtitle,
      author: { "@type": "Person", name: personalInfo.name },
      inLanguage: "en",
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable}`}>
      <head>
        <meta name="theme-color" content="#8154ff" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="antialiased">
        <a href="#hero" className="skip-to-main">Skip to main content</a>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}

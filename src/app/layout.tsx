import type { Metadata, Viewport } from "next";
import { Inter, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-plex-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://ericbatista.vercel.app"),
  title: "Eric Batista — Developer · Web · AI · Infrastructure",
  description:
    "Full Stack Developer freelance & Next.js Specialist based in Barcelona. Diseño y código donde cada píxel importa.",
  openGraph: {
    title: "Eric Batista — Developer · Web · AI · Infrastructure",
    description: "Cinematic portfolio: from server rooms to your screen. Web, AI & Infrastructure.",
    type: "website",
    url: "https://ericbatista.vercel.app/",
  },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = {
  themeColor: "#05060a",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Eric Batista",
  jobTitle: "Full Stack Developer freelance & Next.js Specialist",
  address: { "@type": "PostalAddress", addressLocality: "Barcelona" },
  url: "https://ericbatista.vercel.app/",
  email: "mailto:ericbatista@gmail.com",
  sameAs: [
    "https://github.com/dev1lsconf",
    "https://www.linkedin.com/in/eric-batista-6978b0118",
  ],
  knowsAbout: ["Next.js", "React", "TypeScript", "DevOps", "Linux", "AI Integration"],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} ${plexMono.variable}`}>
      <head>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </head>
      <body className="font-sans">{children}</body>
    </html>
  );
}

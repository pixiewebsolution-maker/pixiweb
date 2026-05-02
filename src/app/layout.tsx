import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Pixie Webs — Websites That Work. Magic That Connects.",
  description:
    "Award-winning digital agency crafting immersive web experiences, stunning UI/UX, and high-performance digital solutions that convert visitors into customers.",
  keywords: "digital agency, web design, web development, UI/UX, branding, Pixie Webs",
  icons: {
    icon: '/pixie-logo.png?v=2',
    shortcut: '/pixie-logo.png?v=2',
    apple: '/pixie-logo.png?v=2',
  },
  openGraph: {
    title: "Pixie Webs — We Build Experiences",
    description:
      "Premium digital agency delivering world-class websites and digital experiences.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/pixie-logo.png?v=2" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}

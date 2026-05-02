import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Pixie Webs — Websites That Work. Magic That Connects.",
  description:
    "Award-winning digital agency crafting immersive web experiences, stunning UI/UX, and high-performance digital solutions that convert visitors into customers.",
  keywords: "digital agency, web design, web development, UI/UX, branding, Pixie Webs",
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
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}

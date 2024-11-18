import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

export const metadata: Metadata = {
  title: "Personal Blogg",
  description: "A personal blogg",
};

const cmuserif = localFont({
  src: [
    {
      path: "../public/fonts/cmunrm.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/cmunti.ttf",
      weight: "400",
      style: "italic",
    },
    {
      path: "../public/fonts/cmunbx.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../public/fonts/cmunbi.ttf",
      weight: "700",
      style: "italic",
    },
  ],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`antialiased`}>{children}</body>
    </html>
  );
}

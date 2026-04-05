import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Viral Vibe Scanner",
  description: "Upload a photo and see what vibe you give off.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ro">
      <body>{children}</body>
    </html>
  );
}
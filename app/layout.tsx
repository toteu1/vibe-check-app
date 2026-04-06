import "./globals.css";
import type { Metadata } from "next";
import Footer from "@/components/Footer";

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
      <head>
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2496696479529580"
          crossOrigin="anonymous"
        ></script>
      </head>
      <body className="bg-black text-white">
        {children}
        <Footer />
      </body>
    </html>
  );
}
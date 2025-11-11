import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "DriveChain SA - Digital Driver's License Verification",
  description: "Blockchain-based digital driver's license verification platform for South Africa.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen bg-background font-sans antialiased bg-red-500">
        {children}
      </body>
    </html>
  );
}
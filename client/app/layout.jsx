import { Navbar } from "@/components/Navbar";
import "./globals.css";
import { Inter, Manrope } from "next/font/google";

const inter = Inter({ subsets: ["latin"], variable: '--font-inter' });
const manrope = Manrope({ subsets: ["latin"], variable: '--font-manrope' });

export const metadata = {
  title: "CyberDash | Ultimate Digital Footprint Analyzer",
  description: "A unified system that analyzes digital footprints and detects cyber threats seamlessly.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} ${manrope.variable} font-inter min-h-screen flex flex-col antialiased`}>
        <Navbar />
        <main className="flex-1">
          {children}
        </main>
      </body>
    </html>
  );
}

import { Inter } from "next/font/google";
import "./globals.css";
import ParticleBackground from "@/components/ParticleBackground/ParticleBackground";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata = {
  title: "Thuong Nguyen | Front-End Developer",
  description: "Portfolio of Thuong Nguyen, Front-End Developer at FPT Software.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.variable}>
        <ParticleBackground />
        {children}
      </body>
    </html>
  );
}

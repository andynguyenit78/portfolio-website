import { Inter } from "next/font/google";
import "../globals.css";
import ParticleBackground from "@/components/ParticleBackground/ParticleBackground";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import Providers from "@/components/Providers/Providers";
import Navbar from "@/components/Navbar/Navbar";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata = {
  title: "Thuong Nguyen | Front-End Developer",
  description: "Portfolio of Thuong Nguyen, Front-End Developer at FPT Software.",
};

export default async function RootLayout({ children, params }) {
  // Await the params to resolve Next.js 15 async requirement
  const resolvedParams = await params;
  const locale = resolvedParams.locale;

  // Ensure that the incoming `locale` is valid
  if (!routing.locales.includes(locale)) {
    notFound();
  }

  // Providing all messages to the client side
  const messages = await getMessages();

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className={inter.variable}>
        <NextIntlClientProvider messages={messages}>
          <Providers>
            <ParticleBackground />
            <Navbar />
            {children}
          </Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

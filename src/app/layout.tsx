import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { ClerkProvider } from '@clerk/nextjs';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://nextgenpreservationcollab.org'),
  title: {
    default: 'NextGen Preservation Collab Directory - Louisville, KY',
    template: '%s | NextGen Preservation Collab Directory',
  },
  description: 'Find builders, craftspeople, architects, and preservation stakeholders in Louisville\'s historic preservation ecosystem.',
  keywords: 'Louisville preservation, historic renovation, preservation directory, Kentucky heritage, historic buildings',
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: 'website',
    siteName: 'NextGen Preservation Collab Directory',
    locale: 'en_US',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}

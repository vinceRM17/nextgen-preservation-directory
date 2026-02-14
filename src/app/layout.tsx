import type { Metadata } from 'next';
import { ClerkProvider } from '@clerk/nextjs';
import './globals.css';

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
      <html lang="en" className="dark">
        <body className="antialiased">
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}

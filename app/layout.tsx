import type { Metadata } from 'next';
import { ReactQueryProvider } from '@/components/layout/react-query-provider';
import { NoiseOverlay } from '@/components/layout/noise-overlay';
import { GridBackground } from '@/components/layout/grid-background';
import { ToastContainer } from '@/components/ui/toast';
import '@/styles/globals.css';

export const metadata: Metadata = {
  title: {
    template: '%s | Official Musty',
    default:  'Official Musty — Muster Point Protocol',
  },
  description:
    'A precision execution terminal built on the Muster Point Protocol. Not for everyone. For traders who understand that discipline is the edge.',
  keywords: ['trading', 'protocol', 'muster point', 'official musty', 'mpp', 'precision trading'],
  robots: { index: true, follow: true },
  openGraph: {
    title:       'Official Musty — Muster Point Protocol',
    description: 'Precision execution terminal for disciplined traders.',
    type:        'website',
    siteName:    'Official Musty',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      </head>
      <body className="bg-void text-white font-body antialiased">
        <ReactQueryProvider>
          <GridBackground />
          <NoiseOverlay />
          {children}
          <ToastContainer />
        </ReactQueryProvider>
      </body>
    </html>
  );
}

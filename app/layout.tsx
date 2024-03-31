import type { Metadata } from 'next';
import { Nunito } from 'next/font/google';
import './globals.css';

import { ClerkProvider } from '@clerk/nextjs';
import { Toaster } from '@/components/ui/sonner';
import { ExitModal } from '@/components/models/exit-modal';
import { HeartsModal } from '@/components/models/hearts-modal';
import { PracticeModal } from '@/components/models/practice-modal';

const font = Nunito({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={font.className}>
          <Toaster />
          <ExitModal />
          <HeartsModal />
          <PracticeModal />
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}

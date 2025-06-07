import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import PrelineScriptWrapper from './components/PrelineScriptWrapper';
import { AuthProvider } from './context/AuthContext';
import { ReportProvider } from './context/ReportContext';
import { Toaster } from 'react-hot-toast';
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
  title: 'Lost and Found',
  description: 'Find your lost items or report found ones',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthProvider>
          <ReportProvider>
            <Toaster position="top-center" reverseOrder={false} />
            {children}
          </ReportProvider>
        </AuthProvider>
      </body>
      <PrelineScriptWrapper />
    </html>
  );
}

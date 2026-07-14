import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Navbar from '@/components/UI/Navbar';
import Footer from '@/components/UI/Footer';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Portal Desa Smart Eco-Tourism Purbayani Garut',
  description: 'Portal sistem informasi geografis (GIS) pemetaan potensi, direktori wisata, dan tur virtual 360 derajat Desa Purbayani, Garut.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <body className={inter.className}>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
import Navbar from '@/components/ui/Navbar';
import './globals.css';

export const metadata = {
  title: 'Desa Purbayani',
  description: 'Website Resmi Desa Purbayani',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <body>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
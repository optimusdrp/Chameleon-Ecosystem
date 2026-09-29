import type {Metadata} from 'next';
import { Plus_Jakarta_Sans, Space_Grotesk } from 'next/font/google';
import './globals.css';

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Chameleon — Ecossistema de Interfaces Adaptativas Inteligentes',
  description: 'Ecossistema modular plug-and-play que aprende o comportamento e adapta layouts, paletas e atalhos em tempo real para ERP, CRM, Portais e Web Apps.',
  openGraph: {
    title: 'Chameleon — Ecossistema de Interfaces Adaptativas Inteligentes',
    description: 'Interfaces que aprendem e se adaptam ao contexto e comportamento de cada usuário sem linhas de código adicionais.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Chameleon — Ecossistema de Interfaces Adaptativas Inteligentes',
    description: 'Interfaces que aprendem e se adaptam ao contexto e comportamento de cada usuário sem linhas de código adicionais.',
  },
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="pt-BR" className={`${plusJakarta.variable} ${spaceGrotesk.variable} scroll-smooth dark overflow-x-hidden max-w-full`}>
      <body className="bg-slate-950 text-slate-100 font-sans antialiased selection:bg-emerald-500/25 selection:text-emerald-300 min-h-screen overflow-x-hidden max-w-full" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}


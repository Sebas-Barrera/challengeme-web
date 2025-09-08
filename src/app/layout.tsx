import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'ChallengeMe - El anfitrión digital que nunca se queda sin ideas',
  description: 'Transforma cualquier reunión en una experiencia dinámica y memorable. Retos, conversaciones profundas, juegos y más.',
  keywords: 'party app, retos, deeptalks, party games, date ideas, social app, challengeme',
  authors: [{ name: 'TechVision' }],
  creator: 'TechVision',
  publisher: 'TechVision',
  openGraph: {
    title: 'ChallengeMe - El anfitrión digital que nunca se queda sin ideas',
    description: 'Transforma cualquier reunión en una experiencia dinámica y memorable',
    url: 'https://challengeme.app',
    siteName: 'ChallengeMe',
    locale: 'es_ES',
    type: 'website',
    images: [
      {
        url: '/assets/logo-main.svg',
        width: 1200,
        height: 630,
        alt: 'ChallengeMe Logo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ChallengeMe - El anfitrión digital que nunca se queda sin ideas',
    description: 'Transforma cualquier reunión en una experiencia dinámica y memorable',
    images: ['/assets/logo-main.svg'],
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" className="scroll-smooth">
      <head>
        <link rel="icon" href="/assets/logo-icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/assets/logo-icon.svg" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link 
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap" 
          rel="stylesheet" 
        />
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  )
}
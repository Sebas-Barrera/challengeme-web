import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter'
})

export const metadata: Metadata = {
  title: 'ChallengeMe.. | La app que hace que las pláticas valgan la pena',
  description: 'Ya no más conversaciones aburridas. Preguntas que de verdad importan para conectar con tu gente de otra manera.',
  keywords: ['party app', 'conversaciones', 'preguntas profundas', 'amigos', 'parejas', 'juegos sociales'],
  authors: [{ name: 'TechVision' }],
  creator: 'TechVision',
  publisher: 'TechVision',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://challengeme.app'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'ChallengeMe.. | La app que hace que las pláticas valgan la pena',
    description: 'Ya no más conversaciones aburridas. Preguntas que de verdad importan para conectar con tu gente de otra manera.',
    url: 'https://challengeme.app',
    siteName: 'ChallengeMe.',
    images: [
      {
        url: '/assets/og-image.jpg', // Aquí irá tu imagen OG
        width: 1200,
        height: 630,
        alt: 'ChallengeMe. - Conversaciones que valen la pena',
      },
    ],
    locale: 'es_MX',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ChallengeMe. | La app que hace que las pláticas valgan la pena',
    description: 'Ya no más conversaciones aburridas. Preguntas que de verdad importan.',
    images: ['/assets/twitter-image.jpg'], // Tu imagen de Twitter
    creator: '@challengeme_app',
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
  verification: {
    google: 'tu-google-verification-code', // Cambiar por tu código real
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" className={inter.variable}>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/assets/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/assets/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/assets/favicon-16x16.png" />
        <link rel="manifest" href="/assets/site.webmanifest" />
        <meta name="theme-color" content="#7B46F8" />
        <meta name="msapplication-TileColor" content="#7B46F8" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      </head>
      <body className={`${inter.className} antialiased bg-challenge-dark text-white overflow-x-hidden`}>
        <div className="min-h-screen">
          {children}
        </div>
      </body>
    </html>
  )
}
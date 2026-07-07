import type { Metadata } from 'next'
import { Playfair_Display, Cormorant_Garamond, Jost } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { MotionProvider } from '@/components/motion-provider'
import './globals.css'

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
})

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-cormorant',
  display: 'swap',
})

const jost = Jost({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  variable: '--font-jost',
  display: 'swap',
})

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.latelierdamande.com'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    template: "%s | L'Atelier d'Amande",
    default: "L'Atelier d'Amande | Prothésiste Ongulaire à Marcellaz",
  },
  description:
    "Bienvenue dans votre espace de bien-être à Marcellaz, Haute-Savoie. Des prestations soignées, une ambiance cocooning, des ongles qui vous ressemblent. Diplômée Kittycia.",
  keywords: [
    'prothésiste ongulaire',
    'nail art',
    'ongles gel',
    'semi-permanent',
    'manucure',
    'Marcellaz',
    'Haute-Savoie',
    'Bonneville',
    'Annemasse',
    'La Roche-sur-Foron',
    'Sallanches',
    'Cluses',
  ],
  openGraph: {
    title: "L'Atelier d'Amande | Prothésiste Ongulaire",
    description:
      "L'art des ongles, avec soin. Parce que chaque femme mérite de se sentir belle.",
    url: SITE_URL,
    siteName: "L'Atelier d'Amande",
    locale: 'fr_FR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "L'Atelier d'Amande | Prothésiste Ongulaire",
    description:
      "L'art des ongles, avec soin. Prothésiste ongulaire à Marcellaz, Haute-Savoie.",
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
  alternates: {
    canonical: './',
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BeautySalon',
  name: "L'Atelier d'Amande",
  description:
    "Prothésiste ongulaire à Marcellaz, Haute-Savoie. Diplômée Kittycia. Poses gel, semi-permanent, nail art dans un espace privé et raffiné.",
  url: SITE_URL,
  telephone: '+33669036984',
  email: 'latelierdamande74@gmail.com',
  image: `${SITE_URL}/logo-monogramme.png`,
  priceRange: '€€',
  currenciesAccepted: 'EUR',
  paymentAccepted: 'Espèces, carte bancaire',
  address: {
    '@type': 'PostalAddress',
    streetAddress: '217 Route de la Vieille Verne',
    addressLocality: 'Marcellaz',
    postalCode: '74250',
    addressRegion: 'Haute-Savoie',
    addressCountry: 'FR',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 46.1502,
    longitude: 6.3563,
  },
  openingHoursSpecification: [
    { '@type': 'OpeningHoursSpecification', dayOfWeek: 'Monday', opens: '09:00', closes: '19:00' },
    { '@type': 'OpeningHoursSpecification', dayOfWeek: 'Tuesday', opens: '09:00', closes: '11:30' },
    { '@type': 'OpeningHoursSpecification', dayOfWeek: 'Tuesday', opens: '13:30', closes: '19:00' },
    { '@type': 'OpeningHoursSpecification', dayOfWeek: 'Wednesday', opens: '09:00', closes: '19:00' },
    { '@type': 'OpeningHoursSpecification', dayOfWeek: 'Thursday', opens: '09:00', closes: '15:30' },
    { '@type': 'OpeningHoursSpecification', dayOfWeek: 'Thursday', opens: '17:00', closes: '19:00' },
    { '@type': 'OpeningHoursSpecification', dayOfWeek: 'Friday', opens: '09:00', closes: '15:00' },
    { '@type': 'OpeningHoursSpecification', dayOfWeek: 'Saturday', opens: '09:00', closes: '13:00' },
  ],
  sameAs: [
    'https://instagram.com/latelierdamande74',
    'https://www.facebook.com/p/LAtelier-dAmande-61588058220042/',
    'https://www.planity.com/latelier-damande-74250-marcellaz',
  ],
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '5.0',
    reviewCount: '12',
    bestRating: '5',
    worstRating: '1',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="fr"
      className={`${playfair.variable} ${cormorant.variable} ${jost.variable} bg-background scroll-smooth`}
    >
      <body className="font-sans antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <MotionProvider>{children}</MotionProvider>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}

import { MetadataRoute } from 'next'

const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.latelierdamande.fr'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: BASE,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1.0,
      images: [
        `${BASE}/logo-monogramme.png`,
        `${BASE}/about-photo.png`,
      ],
    },
    {
      url: `${BASE}/mentions-legales`,
      lastModified: new Date('2026-05-01'),
      changeFrequency: 'yearly',
      priority: 0.2,
    },
  ]
}

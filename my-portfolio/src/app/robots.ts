import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/api/',
    },
    sitemap: 'https://luigibalestrucci.vercel.app/sitemap.xml', // Cambia con il tuo dominio
  }
}

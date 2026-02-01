# 🚀 Guida Setup SEO Post-Deploy

Dopo aver fatto il deploy su Vercel, segui questi passaggi per completare l'ottimizzazione SEO.

## ✅ Fix Applicati

### 1. Menu Mobile
- ✅ Aumentato max-height da 256px a 384px
- ✅ Ora tutti e 5 i link sono visibili su iPhone 14 Pro
- ✅ Menu si chiude automaticamente dopo il click

### 2. SEO Base
- ✅ Sitemap.xml generato automaticamente
- ✅ Robots.txt configurato
- ✅ Meta tags OpenGraph completi
- ✅ Twitter Card metadata
- ✅ JSON-LD Schema.org Person markup
- ✅ Keywords ottimizzate

## 📋 Passi Post-Deploy (IMPORTANTE!)

### 1. Aggiorna gli URL con il tuo dominio

Dopo il deploy, aggiorna questi file con il tuo URL reale:

**`src/app/layout.tsx`** (linea 5):
```typescript
metadataBase: new URL('https://tuo-dominio.vercel.app'),
```

**`src/app/sitemap.ts`** (linea 4):
```typescript
const baseUrl = 'https://tuo-dominio.vercel.app'
```

**`src/app/robots.ts`** (linea 9):
```typescript
sitemap: 'https://tuo-dominio.vercel.app/sitemap.xml',
```

**`src/app/page.tsx`** (linea 174 e 175):
```typescript
"url": "https://tuo-dominio.vercel.app",
"image": "https://tuo-dominio.vercel.app/images/images-profile.png",
```

### 2. Google Search Console

1. Vai su [Google Search Console](https://search.google.com/search-console)
2. Clicca "Aggiungi proprietà"
3. Inserisci il tuo URL: `https://tuo-dominio.vercel.app`
4. Verifica la proprietà (Vercel lo fa automaticamente)
5. Invia la sitemap: `https://tuo-dominio.vercel.app/sitemap.xml`

### 3. Verifica Google (Opzionale ma Consigliato)

Dopo aver verificato su Search Console:

1. Copia il codice di verifica da Search Console
2. Aggiungi in `src/app/layout.tsx` (linea 62-64):
```typescript
verification: {
  google: 'il-tuo-codice-di-verifica',
},
```
3. Redeploy su Vercel

### 4. Bing Webmaster Tools (Opzionale)

1. Vai su [Bing Webmaster Tools](https://www.bing.com/webmasters)
2. Aggiungi il tuo sito
3. Importa i dati da Google Search Console (più veloce)

### 5. Aggiungi robots.txt personalizzato (se necessario)

Il file `robots.ts` genera automaticamente:
```
User-agent: *
Allow: /
Disallow: /api/

Sitemap: https://tuo-dominio.vercel.app/sitemap.xml
```

## 🎯 Ottimizzazioni SEO Avanzate

### 1. Performance

Vercel ottimizza automaticamente:
- ✅ Image optimization
- ✅ Code splitting
- ✅ Static generation
- ✅ CDN globale

### 2. Social Media

Quando condividi il link:
- Facebook/LinkedIn → Usa i tag OpenGraph
- Twitter → Usa Twitter Card
- WhatsApp → Usa OpenGraph image

### 3. Content Marketing

Per migliorare il ranking:
- Aggiorna regolarmente i progetti
- Aggiungi un blog (opzionale)
- Condividi su social media
- Ottieni backlink (GitHub, LinkedIn, Dev.to)

## 📊 Monitoraggio

### Google Search Console
Controlla ogni settimana:
- Impressioni e click
- Posizione media
- Pagine indicizzate
- Errori di scansione

### Google Analytics (Opzionale)

1. Crea account su [Google Analytics](https://analytics.google.com)
2. Aggiungi il tracking ID in `src/app/layout.tsx`:

```typescript
<Script
  src={`https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID`}
  strategy="afterInteractive"
/>
<Script id="google-analytics" strategy="afterInteractive">
  {`
    window.dataLayer = window.dataLayer || [];
    function gtag(){window.dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'GA_MEASUREMENT_ID');
  `}
</Script>
```

## 🔍 Test SEO

Dopo il deploy, testa:

1. **Meta Tags**: [OpenGraph Debugger](https://www.opengraph.xyz/)
2. **Twitter Card**: [Twitter Card Validator](https://cards-dev.twitter.com/validator)
3. **Mobile-Friendly**: [Google Mobile Test](https://search.google.com/test/mobile-friendly)
4. **PageSpeed**: [PageSpeed Insights](https://pagespeed.web.dev/)
5. **Schema.org**: [Schema Markup Validator](https://validator.schema.org/)

## ⏱️ Timeline Indicizzazione

- **Google**: 1-4 settimane (con Search Console: 1-7 giorni)
- **Bing**: 2-6 settimane
- **Altri motori**: 4-8 settimane

## 🚀 Accelerare l'Indicizzazione

1. **Invia manualmente** la sitemap su Google Search Console
2. **Richiedi indicizzazione** per la home page
3. **Condividi il link** su social media (genera traffico)
4. **Backlink**: Aggiungi il link su:
   - GitHub profile
   - LinkedIn
   - Dev.to
   - Medium
   - Reddit (r/webdev)

## 📱 Test Menu Mobile

Su iPhone:
1. Apri Safari
2. Vai sul tuo sito
3. Click sul menu hamburger ☰
4. Verifica che vedi tutti e 5 i link:
   - Home
   - About
   - Skills
   - Projects
   - Contact ✅ (ora visibile!)

## 🎉 Checklist Finale

Prima di lanciare:
- [ ] Deploy su Vercel completato
- [ ] URL aggiornati in tutti i file
- [ ] Sitemap inviata a Google Search Console
- [ ] Meta tags verificati con OpenGraph Debugger
- [ ] Menu mobile testato su iPhone
- [ ] Immagine profilo caricata
- [ ] Link social verificati
- [ ] Performance test > 90 su PageSpeed

## 📧 Dominio Personalizzato (Opzionale)

Se hai un dominio (es. luigibalestrucci.com):

1. Compra il dominio (Namecheap, GoDaddy, etc.)
2. Su Vercel: Settings → Domains → Add Domain
3. Configura DNS records come indicato da Vercel
4. Aspetta propagazione DNS (24-48h)
5. Aggiorna tutti gli URL nei file sopra

---

## 🆘 Troubleshooting

### Il sito non appare su Google
- Aspetta almeno 2 settimane
- Verifica sitemap su Search Console
- Controlla robots.txt: `tuo-sito.com/robots.txt`
- Verifica che il sito sia pubblico su Vercel

### Menu mobile non funziona
- Svuota cache del browser
- Prova in modalità incognito
- Verifica che il JavaScript sia abilitato

### Meta tags non appaiono su social
- Usa l'OpenGraph debugger per forzare refresh
- Facebook: [Sharing Debugger](https://developers.facebook.com/tools/debug/)
- LinkedIn: [Post Inspector](https://www.linkedin.com/post-inspector/)

---

💡 **Pro Tip**: Dopo 2-3 settimane, cerca "Luigi Balestrucci Full Stack Developer" su Google e dovresti trovare il tuo sito!

🚀 Buona indicizzazione!

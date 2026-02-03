# 🚀 Portfolio Personale - Luigi Balestrucci

Portfolio personale moderno e interattivo costruito con Next.js 15, TypeScript, TailwindCSS e GSAP.

## ✨ Caratteristiche

- 🎨 **Design Moderno**: Interfaccia elegante con gradients e animazioni fluide
- ⚡ **Next.js 15**: Framework React con App Router e Server Components
- 🎭 **Animazioni GSAP**: Animazioni professionali con GSAP e ScrollTrigger
- 📧 **Form Contatti**: Sistema di invio email con Resend
- 📱 **Responsive**: Design completamente responsive per tutti i dispositivi
- 🌑 **Dark Mode**: Tema scuro moderno con accenti viola
- ⚡ **Performance**: Ottimizzato per velocità e SEO
- 🎯 **TypeScript**: Type-safety completo per codice robusto

## 📁 Struttura del Progetto

```
my-portfolio/
├── src/
│   ├── app/
│   │   ├── about/              # Pagina About Me
│   │   │   └── page.tsx
│   │   ├── skills/             # Pagina Skills
│   │   │   └── page.tsx
│   │   ├── projects/           # Pagina Projects
│   │   │   ├── [slug]/         # Pagine dinamiche singoli progetti
│   │   │   │   └── page.tsx
│   │   │   └── page.tsx
│   │   ├── contact/            # Pagina Contact con form
│   │   │   └── page.tsx
│   │   ├── api/
│   │   │   └── contact/        # API route per invio email
│   │   │       └── route.ts
│   │   ├── layout.tsx          # Layout principale
│   │   └── page.tsx            # Home page
│   ├── components/
│   │   ├── Navbar.tsx          # Navbar con menu mobile
│   │   └── ImageCarousel.tsx   # Carosello immagini progetti
│   └── data/
│       └── projects.ts         # Dati centralizzati progetti
├── public/
│   └── images/                 # Immagini e assets
│       └── projects/           # Screenshot progetti
├── .env.example                # Template variabili d'ambiente
└── package.json
```

## 🛠️ Tecnologie Utilizzate

- **Framework**: Next.js 16.1.6
- **Language**: TypeScript
- **Styling**: TailwindCSS 4
- **Animations**: GSAP 3.13
- **Email Service**: Resend
- **Package Manager**: npm

## 🚀 Setup e Installazione

### 1. Clona il repository

```bash
git clone https://github.com/bale231/MyPortfolio_Client.git
cd MyPortfolio_Client/my-portfolio
```

### 2. Installa le dipendenze

```bash
npm install
```

### 3. Configura le variabili d'ambiente

Crea un file `.env.local` nella root del progetto:

```bash
cp .env.example .env.local
```

Modifica `.env.local` e aggiungi la tua Resend API key:

```env
RESEND_API_KEY=re_your_api_key_here
```

#### Come ottenere la Resend API Key:

1. Vai su [resend.com](https://resend.com)
2. Crea un account gratuito
3. Vai su "API Keys" nel dashboard
4. Crea una nuova API key
5. Copia la key nel file `.env.local`

> **Nota**: Per il testing puoi usare `onboarding@resend.dev` come sender email. Per produzione, verifica il tuo dominio su Resend.

### 4. Avvia il server di sviluppo

```bash
npm run dev
```

Apri [http://localhost:3000](http://localhost:3000) nel browser.

## 📦 Script Disponibili

```bash
npm run dev      # Avvia il server di sviluppo con Turbopack
npm run build    # Build per produzione
npm start        # Avvia il server di produzione
npm run lint     # Esegue il linter
```

## 🎨 Personalizzazione

### Aggiorna le informazioni personali

1. **Home Page** (`src/app/page.tsx`):
   - Modifica nome, titolo e descrizione
   - Aggiorna i link social nel footer

2. **About Page** (`src/app/about/page.tsx`):
   - Personalizza la storia e la timeline
   - Aggiorna le statistiche
   - Modifica i valori personali

3. **Skills Page** (`src/app/skills/page.tsx`):
   - Aggiungi/rimuovi competenze
   - Aggiorna i livelli di skill
   - Modifica le categorie

4. **Projects Page** (`src/data/projects.ts`):
   - Aggiungi/modifica i tuoi progetti nel file dati centralizzato
   - Aggiorna link GitHub e demo
   - Modifica categorie e filtri
   - Ogni progetto ha una pagina dedicata con carosello screenshot

5. **Contact Page** (`src/app/contact/page.tsx`):
   - Aggiorna email e contatti
   - Modifica i link social

### Aggiorna l'immagine profilo

Inserisci la tua foto in `public/images/images-profile.png`

### Aggiungere screenshot ai progetti

1. Crea la cartella `public/images/projects/` se non esiste
2. Aggiungi le immagini dei tuoi progetti (es. `public/images/projects/todolist-1.png`)
3. Nel file `src/data/projects.ts`, aggiorna l'array `images` del progetto:

```typescript
images: [
  { src: '/images/projects/todolist-1.png', alt: 'Homepage', caption: 'Schermata principale' },
  { src: '/images/projects/todolist-2.png', alt: 'Dashboard', caption: 'Dashboard utente' },
  { src: '/images/projects/todolist-3.gif', alt: 'Demo', caption: 'Demo animata' },
]
```

> **Importante**: I path devono iniziare con `/images/...` (senza "public"). Next.js serve automaticamente i file dalla cartella public.

### Modifica i colori

Il tema principale usa gradients viola. Per modificarli, cerca e sostituisci in tutti i file:
- `purple-400`, `purple-500`, `purple-600` → i tuoi colori preferiti
- Aggiorna anche i gradienti `from-purple-X to-purple-Y`

## 📧 Configurazione Email

Il form di contatto utilizza Resend per l'invio delle email.

### Setup Base:

1. Crea un account su [resend.com](https://resend.com)
2. Ottieni la tua API key
3. Aggiungila a `.env.local`

### Setup Avanzato (Domini Personalizzati):

1. Vai su Resend Dashboard → Domains
2. Aggiungi il tuo dominio
3. Configura i record DNS (SPF, DKIM, DMARC)
4. Verifica il dominio
5. Aggiorna il sender in `src/app/api/contact/route.ts`:

```typescript
from: 'Portfolio Contact <contatti@tuodominio.com>',
to: ['tua-email@gmail.com'],
```

## 🚀 Deploy

### Vercel (Consigliato)

1. Fai push del codice su GitHub
2. Vai su [vercel.com](https://vercel.com)
3. Importa il repository
4. Aggiungi la variabile d'ambiente `RESEND_API_KEY`
5. Deploy!

### Altri Provider

Puoi fare deploy su qualsiasi provider che supporta Next.js:
- Netlify
- AWS Amplify
- Railway
- Render

Assicurati di configurare:
- Node.js 20+
- Variabile d'ambiente `RESEND_API_KEY`
- Build command: `npm run build`
- Start command: `npm start`

## 📱 Features per Pagina

### 🏠 Home Page
- Hero section animata con effetto typing
- Immagine profilo con glow effect
- Card preview delle sezioni
- Animazioni smooth on scroll
- Footer con social links

### 👨‍💻 About Page
- Storia personale e biografia
- Timeline del percorso professionale
- Statistiche animate
- Sezione valori personali
- CTA verso altre pagine

### ⚡ Skills Page
- Competenze organizzate per categoria
- Progress bar animate per ogni skill
- Filtri interattivi
- Sezione certificazioni
- Design a card con hover effects

### 🚀 Projects Page
- Portfolio progetti con preview
- Filtri per categoria (Full Stack, Frontend, Backend)
- Link a GitHub e demo live
- Badge "Featured" per progetti principali
- Statistiche progetti
- **Pagine dedicate per ogni progetto** con:
  - Carosello screenshot interattivo
  - Descrizione completa
  - Tecnologie utilizzate
  - Sfide affrontate e lezioni apprese
  - Progetti correlati

### 📧 Contact Page
- Form di contatto validato
- Invio email via API
- Card con info di contatto
- Link social diretti
- Feedback visivo sull'invio

## 🎯 Best Practices Implementate

- ✅ Server Components dove possibile
- ✅ Client Components solo quando necessario
- ✅ Type safety completo con TypeScript
- ✅ SEO friendly con metadata
- ✅ Performance ottimizzate
- ✅ Accessibilità (WCAG)
- ✅ Mobile-first design
- ✅ Error handling robusto
- ✅ Validazione form
- ✅ Security best practices

## 🐛 Troubleshooting

### L'email non viene inviata

- Verifica che `RESEND_API_KEY` sia configurata
- Controlla i log in console per errori
- Verifica che l'API key sia valida su resend.com
- Controlla il sender email (usa `onboarding@resend.dev` per test)

### Animazioni non funzionano

- Assicurati che GSAP sia installato correttamente
- Verifica che il componente sia "use client"
- Controlla la console per errori

### Build fallisce

- Esegui `npm install` per installare tutte le dipendenze
- Verifica la versione di Node.js (richiesta 20+)
- Controlla errori TypeScript nel codice

## 📄 Licenza

Questo progetto è open source e disponibile sotto licenza MIT.

## 👤 Autore

**Luigi Balestrucci**

- GitHub: [@bale231](https://github.com/bale231)
- LinkedIn: [Luigi Balestrucci](https://linkedin.com/in/luigi-balestrucci)
- Instagram: [@luigi_bale](https://instagram.com/luigi_bale)
- Email: luigibalestrucci52@gmail.com

## 🙏 Ringraziamenti

- Next.js team per l'eccellente framework
- Vercel per l'hosting
- GSAP per le animazioni
- Resend per il servizio email
- TailwindCSS per lo styling

---

⭐ Se questo progetto ti è stato utile, lascia una stella su GitHub!

🚀 Built with ❤️ and ☕ by Luigi Balestrucci

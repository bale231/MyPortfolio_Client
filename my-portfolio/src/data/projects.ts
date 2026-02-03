export interface ProjectImage {
  src: string;
  alt: string;
  caption?: string;
}

export interface Project {
  slug: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  period: string;
  role: string;
  image: string;
  category: 'frontend' | 'backend' | 'fullstack';
  tags: string[];
  github: string;
  demo: string;
  featured: boolean;
  highlights: string[];
  images: ProjectImage[];
  challenges?: string;
  learnings?: string;
}

export const projects: Project[] = [
  {
    slug: 'todolist-webapp',
    title: 'ToDo WebApp Full-Stack',
    shortDescription: "WebApp TodoList creata completamente con l'AI ChatGPT e Claude Code come esperimento sulle potenzialità dell'utilizzo dell'AI.",
    fullDescription: `Realizzazione di una webapp PWA per la gestione delle attività, con backend Django e Django REST Framework (autenticazione JWT, gestione database e configurazione avanzata tramite settings.py).

Strutturazione modulare del frontend in React con TypeScript, gestione ordinata delle API e configurazione di manifest.json per il supporto PWA completo (inclusa icona e nome personalizzato su dispositivo).

Questo progetto è stato un esperimento per testare le potenzialità dell'AI nello sviluppo software, utilizzando ChatGPT e Claude Code per generare gran parte del codice.`,
    period: 'Maggio 2025',
    role: 'Full Stack Developer',
    image: '/images/todowebapp-icon.png',
    category: 'fullstack',
    tags: ['React.js', 'TypeScript', 'Django', 'Django REST Framework', 'JWT', 'PWA', 'OpenAI', 'Claude Code', 'Gsap', 'Tailwind CSS', 'Firebase'],
    github: 'https://github.com/bale231/todowebapp-frontend-reactts',
    demo: 'https://todowebapp-frontend-reactts-stml.vercel.app/',
    featured: true,
    highlights: [
      'Applicazione PWA installabile su dispositivi',
      'Autenticazione JWT sicura',
      'Backend Django REST Framework',
      'Frontend React con TypeScript',
      'Sviluppo assistito da AI'
    ],
    images: [
      { src: '/images/schermataprincipale-webapp.png', alt: 'ToDo App Home', caption: 'Schermata principale con lista attività' },
      { src: '/images/gestionetask-filtri.png', alt: 'ToDo App Tasks', caption: 'Gestione delle task con filtri' },
      { src: '/images/settaggi-utente.png', alt: 'ToDo App Settings', caption: 'Pagina impostazioni utente' },
    ],
    challenges: "La sfida principale è stata integrare l'autenticazione JWT tra frontend e backend, gestendo correttamente i token refresh e l'invalidazione delle sessioni.",
    learnings: "Ho appreso come strutturare un'applicazione PWA completa e come l'AI può accelerare significativamente lo sviluppo software mantenendo alta la qualità del codice."
  },
  {
    slug: 'iriscolor-studioronin',
    title: 'irisColor by Studioronin',
    shortDescription: 'Sito web per azienda specializzata in pitture e intonaci, sviluppato in team con WordPress.',
    fullDescription: `Abbiamo lavorato in team per sviluppare un sito web utilizzando WordPress, WPBakery e il tema Porto. A ciascuno di noi è stata assegnata una pagina specifica da realizzare.

Durante il progetto, abbiamo riscontrato alcune difficoltà tecniche con il tema Porto, ma grazie alla nostra competenza in HTML, CSS e JavaScript, siamo riusciti a risolverle con successo.

Abbiamo anche creato e implementato shortcode personalizzati per rendere alcuni elementi dinamici. Il sito web è stato progettato per un'azienda specializzata in pitture e intonaci, con una sezione prodotti presentata tramite un layout a griglia. I prodotti, sebbene variabili, non erano acquistabili online, e per questa parte abbiamo utilizzato componenti di WooCommerce.

L'esperienza ci ha messo alla prova e ha rappresentato un'opportunità preziosa per approfondire l'uso avanzato di WordPress, il tutto in un contesto stimolante e collaborativo.`,
    period: 'Novembre 2024 - Dicembre 2024',
    role: 'WordPress Developer (Team)',
    image: '🎨',
    category: 'frontend',
    tags: ['WordPress', 'WPBakery', 'Porto Theme', 'HTML', 'CSS', 'JavaScript', 'WooCommerce', 'Shortcode'],
    github: '#',
    demo: 'https://iriscolor.it/',
    featured: true,
    highlights: [
      'Sviluppo collaborativo in team',
      'Customizzazione avanzata tema WordPress',
      'Creazione shortcode personalizzati',
      'Integrazione WooCommerce per catalogo prodotti',
      'Risoluzione problemi tecnici con Porto theme'
    ],
    images: [
      { src: '/images/HomePage-IrisColor.png', alt: 'irisColor Homepage', caption: 'Homepage con design moderno e colorato' },
      { src: '/images/video-iriscolor.gif', alt: 'Prodotti', caption: 'Catalogo prodotti con griglia responsive' },
      { src: '/images/contacts-iriscolor.png', alt: 'Contatti', caption: 'Pagina contatti aziendale' },
    ],
    challenges: "Le difficoltà tecniche con il tema Porto hanno richiesto interventi manuali in HTML, CSS e JavaScript per adattare il design alle esigenze del cliente.",
    learnings: "Ho approfondito l'uso avanzato di WordPress e WooCommerce, e ho migliorato le mie competenze nel lavoro di squadra e nella gestione di progetti collaborativi."
  },
  {
    slug: 'bycycle-forum',
    title: 'ByCycle Forum',
    shortDescription: 'Piattaforma forum online per amanti delle biciclette, progetto finale del corso.',
    fullDescription: `Questo progetto di creazione di un forum online per amanti delle biciclette ha sfruttato le tecnologie: React, Tailwind CSS, Node.js, MySQL, JavaScript, Trello.

Abbiamo sviluppato un'ottima metodologia Agile con l'utilizzo di Trello e come risultato finale abbiamo ottenuto un forum funzionante e community online attiva.

Come competenze abbiamo assimilato lo Sviluppo front-end/back-end, gestione attività e lavoro di squadra.

Conclusione: Esperienza preziosa con acquisizione di nuove competenze e creazione di un prodotto utile.`,
    period: 'Aprile 2024 - Giugno 2024',
    role: 'Full Stack Developer (Team)',
    image: '/images/logo bycycle round.ico',
    category: 'fullstack',
    tags: ['React.js', 'Tailwind CSS', 'Node.js', 'Express', 'MySQL', 'JavaScript', 'SCSS', 'Trello', 'Agile'],
    github: 'https://github.com/Francesca-Bonato/ByCycle-project',
    demo: '#',
    featured: false,
    highlights: [
      'Forum funzionante con community attiva',
      'Metodologia Agile con Trello',
      'Stack Full-Stack completo',
      'Database MySQL per persistenza dati',
      'Lavoro di squadra efficace'
    ],
    images: [
      { src: '/images/homepage-bycycle.png', alt: 'ByCycle Home', caption: 'Homepage del forum' },
      { src: '/images/community-bycycle.png', alt: 'Forum Threads', caption: 'Discussioni della community' },
      { src: '/images/settingsprofile-bycycle.png', alt: 'User Profile', caption: 'Profilo utente con immagine e modifica dati' },
    ],
    challenges: "Gestire la sincronizzazione tra team members e mantenere la consistenza del codice durante lo sviluppo parallelo.",
    learnings: "Ho appreso l'importanza della metodologia Agile e come Trello può facilitare la gestione di progetti collaborativi."
  },
  {
    slug: 'electronic-arts-clone',
    title: 'Home Page Electronic Arts',
    shortDescription: 'Progetto di clonazione della Homepage Electronic Arts per la scuola di informatica.',
    fullDescription: `Il progetto di clonazione della Homepage di Electronic Arts ha permesso a me e al team di lavoro di approfondire le conoscenze in HTML, CSS e JavaScript, sviluppare competenze di lavoro in gruppo tramite l'utilizzo di Trello e la rotazione del ruolo di Team Leader e realizzare una replica funzionale e visivamente accurata della Homepage di EA.

L'esperienza ha dimostrato l'efficacia dell'approccio collaborativo e la crescita professionale dei membri del team compreso me.

È stato il primo progetto importante durante il corso Develhope, dove abbiamo imparato le basi dello sviluppo web e del lavoro di squadra.`,
    period: 'Gennaio 2024 - Febbraio 2024',
    role: 'Frontend Developer & Team Leader (rotazione)',
    image: '/images/ea-icon.svg',
    category: 'frontend',
    tags: ['HTML', 'CSS', 'JavaScript', 'Trello'],
    github: 'https://github.com/Francesca-Bonato/Electonic-Arts-clone-project',
    demo: 'https://eaclone.netlify.app/',
    featured: false,
    highlights: [
      'Clone pixel-perfect della homepage EA',
      'Rotazione ruolo Team Leader',
      'Utilizzo di Trello per gestione task',
      'Primo progetto collaborativo importante',
      'Fondamenta sviluppo web'
    ],
    images: [
      { src: '/images/homepage-ea.png', alt: 'EA Clone Home', caption: 'Homepage clone Electronic Arts' },
    ],
    challenges: "Replicare fedelmente il design responsive della homepage EA con le conoscenze base di HTML, CSS e JavaScript.",
    learnings: "Ho acquisito le fondamenta dello sviluppo web frontend e l'importanza del lavoro collaborativo con rotazione dei ruoli."
  },
  {
    slug: 'mixout-server',
    title: 'Mixout Server',
    shortDescription: "Backend per Mixout, un'app per la creazione di outfits personalizzati tramite AI.",
    fullDescription: `Repo incentrata sul backend di Mixout, un'applicazione innovativa per la creazione di outfits personalizzati tramite riconoscimento AI-Scan.

Il backend è stato sviluppato utilizzando tecnologie moderne come Docker, OpenAI API, PostgreSQL, MongoDB e Django con Node.js per gestire le varie funzionalità dell'applicazione.

L'integrazione con OpenAI permette il riconoscimento intelligente dei capi d'abbigliamento e suggerimenti personalizzati per la creazione di outfit.`,
    period: '2024',
    role: 'Backend Developer',
    image: '/images/mixout-icon.png',
    category: 'backend',
    tags: ['Docker', 'OpenAI', 'Claude Code', 'PostgreSQL', 'MongoDB', 'Django', 'Node.js'],
    github: '#',
    demo: 'https://mixout.ai',
    featured: true,
    highlights: [
      'Integrazione API OpenAI per AI-Scan',
      'Architettura Docker containerizzata',
      'Database dual: PostgreSQL e MongoDB',
      'Backend scalabile con Django e Node.js',
      'Riconoscimento intelligente capi abbigliamento'
    ],
    images: [
      { src: '👕', alt: 'Mixout App', caption: 'Interfaccia riconoscimento capi' },
      { src: '🤖', alt: 'AI Scan', caption: 'Funzionalità AI-Scan in azione' },
      { src: '👔', alt: 'Outfit Creator', caption: 'Creazione outfit personalizzati' },
    ],
    challenges: "Integrare efficacemente l'API OpenAI per il riconoscimento delle immagini e gestire due database diversi (PostgreSQL e MongoDB) nella stessa applicazione.",
    learnings: "Ho approfondito l'uso di Docker per la containerizzazione e l'integrazione di servizi AI in applicazioni backend."
  },
];

export const getProjectBySlug = (slug: string): Project | undefined => {
  return projects.find(project => project.slug === slug);
};

export const getFeaturedProjects = (): Project[] => {
  return projects.filter(project => project.featured);
};

export const getProjectsByCategory = (category: Project['category']): Project[] => {
  return projects.filter(project => project.category === category);
};

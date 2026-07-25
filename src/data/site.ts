import type { NavLink, SiteConfig, StackDuel, ValueProposition } from "@/types";

export const siteConfig: SiteConfig = {
  name: "Marco Dev",
  role: "Frontend Engineer & Creative Developer",
  tagline: "Siti web veloci, animati e costruiti per convertire",
  description:
    "Sviluppiamo siti e applicazioni web ad alte prestazioni con Next.js, animazioni fluide e architetture scalabili — con o senza database, in base a ciò che serve al tuo progetto.",
  email: "ciao@marcoddev.it",
  phone: "+39 333 123 4567",
  location: "Milano, Italia",
  social: [
    {
      platform: "linkedin",
      href: "https://linkedin.com",
      label: "LinkedIn",
    },
    {
      platform: "github",
      href: "https://github.com",
      label: "GitHub",
    },
  ],
};

export const navLinks: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Progetti", href: "/#projects" },
  { label: "Contatti", href: "/contact" },
];

/** Plain-language explainer under the comparison block */
export const comparisonPlainTalk = {
  eyebrow: "In parole semplici",
  title: "Cosa facciamo per te — senza paroloni",
  intro:
    "Qui sopra abbiamo usato termini tecnici. Qui sotto ti diciamo la stessa cosa come se ne stessimo parlando al bar: cosa ottieni, e perché conta per il tuo business.",
  offerBlocks: [
    {
      id: "clients",
      visual: "clients",
      title: "Un sito che porta clienti",
      text: "Ti costruiamo un sito (o un'app web) pensato per portare clienti: veloce da aprire, chiaro da usare e facile da trovare su Google.",
    },
    {
      id: "aligned",
      visual: "aligned",
      title: "Tecnologia e comunicazione insieme",
      text: "Non ci fermiamo al “sito bello”. Allineiamo tecnologia e comunicazione: il sito e la strategia per farti trovare lavorano insieme, così chi arriva è già interessato a ciò che offri.",
    },
    {
      id: "grow",
      visual: "grow",
      title: "Cresce con il tuo business",
      text: "Quando il business cresce — nuove pagine, nuovi servizi, più visite — non ripartiamo da zero. Aggiorniamo e ampliamo ciò che abbiamo già costruito.",
    },
  ],
  glossaryBlocks: [
    {
      id: "speed",
      visual: "speed",
      term: "Velocità",
      text: "Quanto tempo aspetta una persona prima di vedere la tua pagina. Se aspetta troppo, chiude e va dal concorrente. Un sito veloce tiene le persone lì e aumenta le richieste.",
    },
    {
      id: "security",
      visual: "security",
      term: "Sicurezza",
      text: "Quanto è difficile per qualcuno attaccare o compromettere il sito. Un sito poco protetto può essere bloccato, defacciato o usato per rubare dati — con danni a te e ai tuoi clienti.",
    },
    {
      id: "seo",
      visual: "seo",
      term: "SEO",
      text: "È il modo in cui Google decide di mostrarti (o meno) quando qualcuno cerca i tuoi servizi. “SEO massimizzata” significa: struttuiamo il sito perché tu compaia nelle ricerche giuste, non solo perché “esisti online”.",
    },
    {
      id: "scale",
      visual: "scale",
      term: "Scalabilità",
      text: "La capacità del sito di crescere con te. Più traffico, più contenuti, nuove funzioni: senza dover buttare tutto e rifare il progetto ogni volta che il business fa un passo avanti.",
    },
  ],
  closing:
    "In sintesi: meno rotture tecniche, più chiarezza per chi ti cerca, e un sito che lavora per portarti contatti — non solo per “esserci” su internet.",
} as const;

export type PlainTalkVisualId =
  (typeof comparisonPlainTalk.offerBlocks)[number]["visual"]
  | (typeof comparisonPlainTalk.glossaryBlocks)[number]["visual"];

export const stackDuel: StackDuel = {
  competitor: {
    techId: "wordpress",
    name: "WordPress",
    summary:
      "Siti “in fretta” con temi e plugin già pronti: comodo all’inizio, poi spesso lento e fragile.",
    points: [
      "Lento: plugin e template che fanno abbandonare i visitatori",
      "Vulnerabile agli attacchi hacker",
      "SEO trascurata o venduta a parte",
      "Sito e ads da fornitori diversi",
      "Ogni crescita richiede un rifacimento",
    ],
    stackIds: ["php", "jquery", "elementor", "bootstrap"],
  },
  ours: {
    techId: "nextjs",
    name: "Next.js",
    summary:
      "Strumenti moderni per siti veloci, più sicuri e pronti a durare nel tempo.",
    points: [
      "Completamente flessibile e personalizzabile sulle scelte del cliente",
      "Veloce anche da telefono, più contatti",
      "Stack moderno e più sicuro",
      "SEO integrata dal primo giorno",
      "Dev e strategia pubblicitaria insieme",
      "Cresce con te, senza ripartire da zero",
    ],
    stackIds: ["react", "typescript", "vercel", "cursor"],
  },
};

export const valuePropositions: ValueProposition[] = [
  {
    id: "performance",
    title: "Siti che caricano subito",
    description:
      "Quando una pagina è lenta, le persone se ne vanno prima ancora di leggere la tua offerta. Usiamo tecnologie leggere e ottimizzate: il tuo sito si apre in un attimo anche da telefono, e più visitatori arrivano fino al contatto o all'acquisto.",
    metric: "Velocità",
  },
  {
    id: "seo",
    title: "Ti trovano su Google",
    description:
      "Costruiamo il sito in modo che Google capisca subito chi sei, cosa offri e dove operi. Risultato: compari nelle ricerche di chi sta già cercando i tuoi servizi — clienti nuovi senza dipendere solo dalla pubblicità.",
    metric: "Più visibilità",
  },
  {
    id: "responsive",
    title: "Perfetto su ogni schermo",
    description:
      "Il sito si adatta a smartphone, tablet e desktop: testi leggibili, pulsanti comodi e layout che resta ordinato su ogni dispositivo. Animazioni leggere rendono la navigazione fluida senza appesantire la pagina.",
    metric: "Responsive",
  },
  {
    id: "code",
    title: "Un investimento che dura",
    description:
      "Non costruiamo siti fragili da rifare ogni anno. La base tecnica è solida, sicura e facile da aggiornare quando il tuo business cresce: nuove pagine, nuovi servizi, più traffico — senza ripartire da zero.",
    metric: "Crescita senza stress",
  },
];

export const aboutTeam = {
  eyebrow: "Chi siamo",
  title: "Siamo in due, lavoriamo come uno solo",
  description:
    "Un team affiatato con due ruoli complementari: uno trasforma le idee in software solido e veloce, l'altro fa arrivare il tuo messaggio alle persone giuste. Insieme costruiamo la presenza digitale del tuo business — dal codice alla visibilità online.",
  left: {
    title: "Software Engineering",
    description:
      "Progettiamo e sviluppiamo siti e applicazioni web su misura: veloci, affidabili e pronti a crescere con te. Ogni riga di codice serve a offrire un'esperienza fluida a chi visita il tuo sito.",
  },
  right: {
    title: "Fatti trovare, fatti scegliere",
    description:
      "Curiamo SEO, contenuti e strategia di comunicazione digitale perché il tuo brand emerga su Google e sui canali giusti. Non basta esistere online: serve essere visibili, credibili e convincenti.",
  },
  image: "/images/team-placeholder.svg",
  imageAlt: "Il team — due persone appoggiate schiena a schiena",
};

/** @deprecated Use aboutTeam — kept for content helpers */
export const aboutBrief = aboutTeam.description;

export const aboutDetailed = {
  intro:
    "Ho iniziato a programmare oltre 8 anni fa, spinto dalla curiosità di capire come funzionassero le interfacce che usavo ogni giorno. Oggi lavoro con brand e freelance che vogliono distinguersi online con siti che non solo bello da vedere, ma tecnicamente impeccabili.",
  philosophy:
    "Credo che la migliore UX sia quella che non si nota: caricamenti istantanei, animazioni naturali, zero attrito. Ogni scelta tecnica serve un obiettivo business — conversioni, SEO, fiducia del brand.",
};

export const aboutPage = {
  eyebrow: "About",
  title: aboutTeam.title,
  description: aboutTeam.description,
};

export const aboutMembers = {
  engineer: {
    id: "engineer",
    anchorId: "tecnologie",
    name: "Marco",
    role: "Software Engineer",
    image: "/images/team-engineer.svg",
    imageAlt: "Marco — software engineer",
    bio: "Progetto e sviluppo siti e applicazioni web su misura: architetture solide, performance alte e codice che regge nel tempo. Le olimpiadi di informatica mi hanno formato in C++ e strutture dati avanzate — competenze che applico ogni giorno per scegliere algoritmi efficienti e soluzioni scalabili.",
    expandLabel: "Mostra come funziona il codice",
    collapseLabel: "Nascondi dettagli tecnici",
  },
  advertiser: {
    id: "advertiser",
    anchorId: "comunicazione",
    name: "Andrea",
    role: "Stratega pubblicitario",
    image: "/images/team-advertiser.svg",
    imageAlt: "Andrea — stratega pubblicitario",
    bio: "Traduco obiettivi di business in strategie di visibilità: SEO, campagne e contenuti che portano persone reali sul sito.",
    expandLabel: "Mostra come funziona la comunicazione",
    collapseLabel: "Nascondi dettagli strategici",
  },
} as const;

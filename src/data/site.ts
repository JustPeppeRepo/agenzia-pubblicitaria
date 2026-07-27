import type { NavLink, SiteConfig, StackDuel } from "@/types";

/* -------------------------------------------------------------------------- */
/* Global — layout, header, footer                                            */
/* -------------------------------------------------------------------------- */

export const siteConfig: SiteConfig = {
  name: "Aiello Digital Studio",
  role: "Web Developer & Advertising Strategist",
  tagline: "Siti web veloci, animati e costruiti per convertire",
  description:
    "Sviluppiamo siti e applicazioni web ad alte prestazioni, pensati per aumentare la visibilità che la tua azienda ha online",
  email: "ciao@marcoddev.it",
  phone: "+39 333 123 4567",
  location: "Palermo, Italia",
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

/* -------------------------------------------------------------------------- */
/* Home — ordine visivo                                                       */
/* 1. Hero → siteConfig                                                       */
/* 2. AboutBrief                                                              */
/* 3. ValueProposition (confronto + plain talk)                               */
/* 4. ProjectsGrid → data/projects.ts                                         */
/* 5. ContactCTA → siteConfig                                                 */
/* -------------------------------------------------------------------------- */

export const aboutTeam = {
  eyebrow: "Chi siamo",
  title: "Siamo in due, lavoriamo come uno solo",
  description:
    "Un team affiatato con due ruoli complementari: uno trasforma le idee in software solido e veloce, l'altro fa arrivare il tuo messaggio alle persone giuste. Insieme costruiamo la presenza digitale del tuo business — dal codice alla visibilità online.",
  left: {
    title: "GIUSEPPE - Web Developer",
    description:
      "Progetto siti e applicazioni web su misura: veloci, affidabili e pronti a crescere con te. Ogni riga di codice serve a offrire un'esperienza fluida a chi visita il tuo sito.",
  },
  right: {
    title: "VITO - Advertising Strategist",
    description:
      "Curo la visibilità del sito online, i contenuti e la strategia di comunicazione digitale perché il tuo brand emerga su Google e sui canali giusti. Non basta esistere online: serve essere visibili, credibili e convincenti.",
  },
  image: "/images/team-placeholder.svg",
  imageAlt: "Il team — due persone appoggiate schiena a schiena",
};

/** CompetitiveComparison — WordPress vs Next.js */
export const stackDuel: StackDuel = {
  competitor: {
    techId: "wordpress",
    name: "WordPress",
    summary:
      "Wordpress è una applicazione web che permette di creare siti senza saper programmare, questo si traduce in siti inadatti alla pubblicità e tutti uguali.",
    points: [
      "Sito generico e non personalizzabile",
      "Utilizza plugin che rendono il sito lento e poco sicuro",
      "Più vulnerabile agli attacchi hacker",
      "SEO trascurata o venduta a parte",
      "Difficilmente scalabile o modificabile",
    ],
    stackIds: ["php", "jquery", "elementor", "bootstrap"],
  },
  ours: {
    techId: "nextjs",
    name: "Next.js",
    summary:
      "Next.js è un vero e proprio linguaggio di programmazione che permette le massime performance di velocità e sicurezza e la massima creatività e flessibilità secondo le esigenze del cliente",
    points: [
      "Completamente personalizzabile sulle scelte del cliente",
      "Velocità e performance garantite",
      "Tecnologia moderna e più sicura",
      "SEO integrata nella struttra stessa del sito",
      "Programmazione e pubblicità nello stesso progetto",
      "Completamente scalabile in base al numero di visitatori",
    ],
    stackIds: ["react", "typescript", "vercel", "cursor"],
  },
};

/** PlainTalk — sotto il blocco di confronto */
export const comparisonPlainTalk = {
  eyebrow: "LA VISIBILITÀ",
  title: "Serve veramente avere un sito veloce e professionale?",
  intro:
    "Oggi le alternative economiche e automatizzate non mancano, ma ciò che fa la differenza tra un sito inutile e uno professionale è la capacità di rispondere davvero alle esigenze degli utenti e del mercato web. È qui che interveniamo noi.",
  offerBlocks: [
    {
      id: "responsive",
      visual: "responsive",
      title: "Perfetto su ogni dispositivo",
      text: "Il tuo sito si adatta a smartphone, tablet e computer: stessi contenuti, layout chiaro e leggibile. Chi ti trova da mobile o da desktop vede sempre una versione professionale.",
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
  ]
} as const;

export type PlainTalkVisualId =
  | (typeof comparisonPlainTalk.offerBlocks)[number]["visual"]
  | (typeof comparisonPlainTalk.glossaryBlocks)[number]["visual"];

/* -------------------------------------------------------------------------- */
/* About page                                                                 */
/* -------------------------------------------------------------------------- */

export const aboutPage = {
  eyebrow: "About",
  title: aboutTeam.title,
  description: aboutTeam.description,
};

export const aboutMembers = {
  engineer: {
    id: "engineer",
    anchorId: "tecnologie",
    name: "Giuseppe",
    role: "Full Stack Developer",
    image: "/images/team-engineer.svg",
    imageAlt: "Giuseppe — Web Developer",
    bio: "Sono uno sviluppatore con una solida preparazione logico-strutturata. La **formazione con la Luiss** mi ha fornito basi rigorose in C++ e nell'ottimizzazione estrema delle risorse, sviluppando un'impostazione orientata all'efficienza algoritmica. A questo percorso ho affiancato il **Full Stack Open dell'Università di Helsinki**, completando il mio profilo con le tecnologie e i pattern più moderni per lo sviluppo web full stack.",
    expandLabel: "Mostra come funziona il codice",
    collapseLabel: "Nascondi dettagli tecnici",
  },
  advertiser: {
    id: "advertiser",
    anchorId: "comunicazione",
    name: "Vito",
    role: "Stratega pubblicitario",
    image: "/images/team-advertiser.svg",
    imageAlt: "Vito — stratega pubblicitario",
    bio: "Traduco obiettivi di business in strategie di visibilità: SEO, campagne e contenuti che portano persone reali sul sito.",
    expandLabel: "Mostra come funziona la comunicazione",
    collapseLabel: "Nascondi dettagli strategici",
  },
} as const;

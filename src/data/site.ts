import type { NavLink, SiteConfig, StackDuel } from "@/types";

/* -------------------------------------------------------------------------- */
/* Global — layout, header, footer                                            */
/* -------------------------------------------------------------------------- */

export const siteConfig: SiteConfig = {
  name: "Aiello Digital Studio",
  role: "Frontend Engineer & Marketing Specialist",
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
    title: "VITO - Marketing Specialist",
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
    bio: "Progetto e sviluppo siti e applicazioni web su misura: architetture solide, performance alte e codice che regge nel tempo. Le olimpiadi di informatica mi hanno formato in C++ e strutture dati avanzate — competenze che applico ogni giorno per scegliere algoritmi efficienti e ottimizzati, mentre il corso Full Stack Open mi ha fornito le competenze più moderne e performanti per sviluppare siti web efficienti e scalabili.",
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

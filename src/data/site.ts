import type { NavLink, SiteConfig, ValueProposition } from "@/types";

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

export type NavLink = {
  label: string;
  href: string;
};

export type SocialLink = {
  platform: string;
  href: string;
  label: string;
};

export type PrivacyController = {
  /** Titolare del trattamento — modifica con i dati reali */
  firstName: string;
  lastName: string;
  email: string;
};

export type SiteConfig = {
  name: string;
  /** Canonical site origin, no trailing slash (used by sitemap / metadata). */
  url: string;
  role: string;
  tagline: string;
  description: string;
  email: string;
  phone: string;
  location: string;
  social: SocialLink[];
  /** GDPR — titolare del trattamento (pagina /privacy) */
  privacyController: PrivacyController;
};

export type Technology = {
  id: string;
  name: string;
  icon: string;
  category: "frontend" | "backend" | "tooling" | "marketing";
  shortDescription: string;
  whyChosen: string;
  /** Official docs / product page */
  url?: string;
};

export type AboutMember = {
  id: string;
  anchorId?: string;
  name: string;
  role: string;
  image: string;
  imageAlt: string;
  bio: string;
  expandLabel: string;
  collapseLabel: string;
};

export type StackDuelSide = {
  techId: string;
  name: string;
  /** Short plain-language intro shown before the points list */
  summary: string;
  points: string[];
  /** Extra tech icons shown under the main stack */
  stackIds?: string[];
};

export type StackDuel = {
  competitor: StackDuelSide;
  ours: StackDuelSide;
};

export type ProjectVideoSet = {
  desktop: string;
  mobile: string;
  /** First-frame poster for the mobile video (avoids cover-image flash) */
  mobilePoster?: string;
};

export type Project = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  description: string;
  category: string;
  tags: string[];
  image: string;
  /** Lightweight hover preview on project cards */
  previewVideo?: ProjectVideoSet;
  /** Higher-quality video on the project detail (slug) page */
  detailVideo?: ProjectVideoSet;
  liveUrl?: string;
  repoUrl?: string;
  featured: boolean;
  problem: string;
  solution: string;
  architecture: string[];
  stack: string[];
};

export type NavLink = {
  label: string;
  href: string;
};

export type SocialLink = {
  platform: string;
  href: string;
  label: string;
};

export type SiteConfig = {
  name: string;
  role: string;
  tagline: string;
  description: string;
  email: string;
  phone: string;
  location: string;
  social: SocialLink[];
};

export type Technology = {
  id: string;
  name: string;
  icon: string;
  category: "frontend" | "backend" | "tooling" | "design" | "marketing";
  shortDescription: string;
  whyChosen: string;
  proficiency: number;
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

export type ValueProposition = {
  id: string;
  title: string;
  description: string;
  metric?: string;
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

export type ProjectMetric = {
  id: string;
  label: string;
  before: string;
  after: string;
  improvement: string;
};

export type ProjectChartPoint = {
  month: string;
  visitors: number;
  conversions: number;
  loadTime: number;
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
  previewVideo?: string;
  liveUrl?: string;
  repoUrl?: string;
  featured: boolean;
  problem: string;
  solution: string;
  architecture: string[];
  stack: string[];
  metrics: ProjectMetric[];
  chartData: ProjectChartPoint[];
};

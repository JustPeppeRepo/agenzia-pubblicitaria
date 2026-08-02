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
  /** Canonical site origin, no trailing slash (used by sitemap / metadata). */
  url: string;
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

/** Desktop + mobile sources for project preview / detail videos */
export type ProjectVideoSet = {
  desktop: string;
  mobile: string;
};

export type ProjectVitalRating = "good" | "needs-improvement" | "poor";

export type ProjectVital = {
  id: string;
  label: string;
  value: string;
  rating: ProjectVitalRating;
  description: string;
};

export type ProjectInsightStat = {
  id: string;
  label: string;
  value: string;
  delta?: string;
  deltaLabel?: string;
  /** false = delta is negative/bad (red); default treats delta as positive */
  deltaPositive?: boolean;
};

/** Vercel-style performance & audience snapshot for case studies */
export type ProjectInsights = {
  performanceScore: number;
  vitals: ProjectVital[];
  stats: ProjectInsightStat[];
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
  metrics: ProjectMetric[];
  chartData: ProjectChartPoint[];
  insights?: ProjectInsights;
};

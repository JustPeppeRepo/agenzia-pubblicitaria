export type NavLink = {
  label: string;
  href: string;
};

export type Service = {
  id: string;
  title: string;
  description: string;
  icon: string;
};

export type Project = {
  id: string;
  title: string;
  description: string;
  category: string;
  image: string;
  href?: string;
  tags: string[];
};

export type SiteConfig = {
  name: string;
  tagline: string;
  description: string;
  email: string;
  phone: string;
  address: string;
  social: {
    instagram?: string;
    linkedin?: string;
    behance?: string;
  };
};

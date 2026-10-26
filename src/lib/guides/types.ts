export type GuideBlock = {
  name: string;
  body: string;
};

export type GuideStop = {
  title: string;
  kind: string;
  body: string;
};

export type SiteLink = {
  href: string;
  label: string;
  hint?: string;
};

export type PageGuide = {
  title: string;
  lead: string;
  types: GuideBlock[];
  stops: GuideStop[];
  stopsHeading?: string;
  seoHeading?: string;
  article?: string[];
  links?: SiteLink[];
};

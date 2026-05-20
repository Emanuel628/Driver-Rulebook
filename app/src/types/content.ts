export type MainTab = 'home' | 'guides' | 'checklists' | 'search' | 'saved';

export type GuideCategory =
  | 'quick-start'
  | 'hos'
  | 'hazmat-placards'
  | 'ghs-sds'
  | 'common-situations'
  | 'checklists'
  | 'glossary'
  | 'sources';

export type ContentBlock =
  | { type: 'paragraph'; text: string }
  | { type: 'summary'; title: string; text: string }
  | { type: 'warning'; title: string; text: string }
  | { type: 'checklist'; title: string; items: string[] }
  | { type: 'example'; title: string; text: string }
  | { type: 'steps'; title: string; items: string[] };

export type SourceRef = {
  title: string;
  agency: 'FMCSA' | 'PHMSA' | 'OSHA' | 'eCFR' | 'Other';
  url: string;
  note?: string;
};

export type GuidePage = {
  id: string;
  chapter: number;
  title: string;
  category: GuideCategory;
  summary: string;
  content: ContentBlock[];
  audioScript: string;
  tags: string[];
  sources: SourceRef[];
  lastReviewed: string;
};

export type DrawerGroup = {
  id: string;
  title: string;
  pageIds: string[];
};

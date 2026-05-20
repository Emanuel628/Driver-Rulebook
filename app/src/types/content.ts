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
  | { id: string; type: 'paragraph'; text: string }
  | { id: string; type: 'summary'; title: string; text: string }
  | { id: string; type: 'warning'; title: string; text: string }
  | { id: string; type: 'checklist'; title: string; items: string[] }
  | { id: string; type: 'example'; title: string; text: string }
  | { id: string; type: 'steps'; title: string; items: string[] };

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

export type SavedHighlight = {
  id: string;
  pageId: string;
  pageTitle: string;
  chapter: number;
  paragraphId: string;
  paragraphLabel: string;
  selectedText: string;
  note?: string;
  createdAt: string;
};

export type DrawerGroup = {
  id: string;
  title: string;
  pageIds: string[];
};

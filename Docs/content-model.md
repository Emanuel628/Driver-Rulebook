# Content Model

## Purpose

The app should store guide content as structured local data, not hard-coded screens.

This makes it easier to:

- add pages
- search pages
- generate the hamburger menu
- support Listen Mode
- support saved topics
- show sources and last-reviewed dates

## Guide Page Model

Each guide page should include:

```ts
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
```

## Categories

```ts
export type GuideCategory =
  | 'quick-start'
  | 'hos'
  | 'hazmat-placards'
  | 'ghs-sds'
  | 'common-situations'
  | 'checklists'
  | 'glossary'
  | 'sources';
```

## Content Blocks

Use content blocks so pages can render consistently.

```ts
export type ContentBlock =
  | { type: 'paragraph'; text: string }
  | { type: 'summary'; title: string; text: string }
  | { type: 'warning'; title: string; text: string }
  | { type: 'checklist'; title: string; items: string[] }
  | { type: 'example'; title: string; text: string }
  | { type: 'steps'; title: string; items: string[] };
```

## Source References

```ts
export type SourceRef = {
  title: string;
  agency: 'FMCSA' | 'PHMSA' | 'OSHA' | 'eCFR' | 'Other';
  url: string;
  note?: string;
};
```

## Example Page

```ts
export const numberedPlacards: GuidePage = {
  id: 'numbered-placards',
  chapter: 15,
  title: 'Numbered Placards',
  category: 'hazmat-placards',
  summary: 'Understand when a plain Class 3 placard may not be enough.',
  content: [
    {
      type: 'summary',
      title: 'Plain-English Summary',
      text: 'A numbered placard shows the hazard class and a UN or NA identification number.'
    },
    {
      type: 'warning',
      title: 'Important',
      text: 'A plain FLAMMABLE 3 placard may not be enough if the shipment requires ID-number display.'
    },
    {
      type: 'checklist',
      title: 'Check First',
      items: [
        'Shipping paper',
        'UN/NA number',
        'Hazard class or division',
        'Bulk vs non-bulk packaging',
        'Quantity and package type',
        'Exceptions or special instructions'
      ]
    }
  ],
  audioScript: 'Numbered placards. A numbered placard shows the hazard class and a UN or NA identification number. A plain flammable Class 3 placard may not be enough when the shipment requires ID-number display. Check the shipping paper, packaging type, quantity, and applicable exceptions before agreeing that numbered placards are not needed.',
  tags: ['placards', 'numbered placards', 'UN number', 'NA number', 'Class 3', 'hazmat'],
  sources: [],
  lastReviewed: '2026-05-20'
};
```

## Local Storage Model

Local-only app state:

```ts
export type LocalUserState = {
  savedPageIds: string[];
  recentlyViewedPageIds: string[];
  theme: 'dark' | 'light' | 'system';
  textSize: 'normal' | 'large' | 'extra-large';
  audioSpeed: 0.75 | 1 | 1.25 | 1.5;
  acknowledgedDisclaimer: boolean;
};
```

## No Accounts

Version 1 should not include:

- user accounts
- sign in
- cloud sync
- backend database
- JWT auth
- password reset
- email verification

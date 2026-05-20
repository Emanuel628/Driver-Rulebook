import type { DrawerGroup, GuidePage } from '../types/content';

const placeholderContent = 'Content will be added after source research.';

const makePage = (
  id: string,
  chapter: number,
  title: string,
  category: GuidePage['category'],
  summary: string
): GuidePage => ({
  id,
  chapter,
  title,
  category,
  summary,
  content: [{ type: 'paragraph', text: placeholderContent }],
  audioScript: `${title}. ${summary}. Content will be added after source research.`,
  tags: [title.toLowerCase()],
  sources: [],
  lastReviewed: 'Not reviewed yet'
});

export const guidePages: GuidePage[] = [
  makePage('index-quick-start', 1, 'Index / Quick Start', 'quick-start', 'Jump quickly to the right topic.'),
  makePage('basic-terms', 2, 'Basic Terms', 'quick-start', 'Key terms used throughout the app.'),
  makePage('hos-basics', 3, 'HOS Basics', 'hos', 'Driver hours and duty status fundamentals.'),
  makePage('eleven-hour-rule', 4, '11-Hour Driving Limit', 'hos', 'The basic daily driving limit.'),
  makePage('fourteen-hour-window', 5, '14-Hour Window', 'hos', 'The duty window drivers commonly confuse with drive time.'),
  makePage('thirty-minute-break', 6, '30-Minute Break Rule', 'hos', 'Break timing and common confusion.'),
  makePage('sixty-seventy-recap', 7, '60/70-Hour Rule and Recap', 'hos', 'Cycle hours and recap basics.'),
  makePage('reset-restart', 8, '10-Hour Reset and 34-Hour Restart', 'hos', 'Daily reset versus cycle restart.'),
  makePage('sleeper-berth', 9, 'Sleeper Berth / Split Sleeper', 'hos', 'Advanced sleeper berth concepts.'),
  makePage('hos-exceptions', 10, 'HOS Exceptions', 'hos', 'Special HOS situations and exceptions.'),
  makePage('eld-basics', 11, 'ELD Basics', 'hos', 'What an ELD does and what this app does not replace.'),
  makePage('hazmat-basics', 12, 'Hazmat Basics', 'hazmat-placards', 'Core hazmat concepts for drivers and dock workers.'),
  makePage('shipping-papers', 13, 'Shipping Papers', 'hazmat-placards', 'The starting point for hazmat decisions.'),
  makePage('labels-markings-placards', 14, 'DOT Labels, Markings, and Placards', 'hazmat-placards', 'How labels, markings, placards, and ID displays differ.'),
  makePage('numbered-placards', 15, 'Numbered Placards', 'hazmat-placards', 'When a plain hazard class placard may not be enough.'),
  makePage('bulk-vs-non-bulk', 16, 'Bulk vs Non-Bulk', 'hazmat-placards', 'Why packaging type can change requirements.'),
  makePage('placard-decision-guide', 17, 'Placard Decision Guide', 'hazmat-placards', 'A guided walkthrough for placard questions.'),
  makePage('common-dock-arguments', 18, 'Common Dock Arguments', 'common-situations', 'Real-world dock and driver disputes.'),
  makePage('ghs-basics', 19, 'GHS Basics', 'ghs-sds', 'Workplace chemical label basics.'),
  makePage('ghs-pictograms', 20, 'GHS Pictograms', 'ghs-sds', 'The red diamond symbols and what they point to.'),
  makePage('sds-explained', 21, 'SDS Explained', 'ghs-sds', 'How Safety Data Sheets are organized.'),
  makePage('ghs-vs-dot', 22, 'GHS vs DOT', 'ghs-sds', 'Why workplace labels and transport rules are not the same.'),
  makePage('checklists', 23, 'Checklists', 'checklists', 'Fast field checklists for common situations.'),
  makePage('scenario-examples', 24, 'Scenario Examples', 'common-situations', 'Plain-English examples for confusing situations.'),
  makePage('glossary', 25, 'Glossary', 'glossary', 'Searchable definitions.'),
  makePage('sources-updates', 26, 'Sources / Last Updated / Change Log', 'sources', 'Source tracking and update history.')
];

export const guidePageMap = Object.fromEntries(guidePages.map(page => [page.id, page])) as Record<string, GuidePage>;

export const drawerGroups: DrawerGroup[] = [
  { id: 'quick-start', title: 'Quick Start', pageIds: ['index-quick-start', 'basic-terms', 'sources-updates'] },
  { id: 'hos', title: 'HOS / Driver Hours', pageIds: ['hos-basics', 'eleven-hour-rule', 'fourteen-hour-window', 'thirty-minute-break', 'sixty-seventy-recap', 'reset-restart', 'sleeper-berth', 'hos-exceptions', 'eld-basics'] },
  { id: 'hazmat', title: 'Hazmat / Placards', pageIds: ['hazmat-basics', 'shipping-papers', 'labels-markings-placards', 'numbered-placards', 'bulk-vs-non-bulk', 'placard-decision-guide'] },
  { id: 'ghs', title: 'GHS / SDS', pageIds: ['ghs-basics', 'ghs-pictograms', 'sds-explained', 'ghs-vs-dot'] },
  { id: 'tools', title: 'Tools', pageIds: ['checklists', 'scenario-examples', 'glossary'] }
];

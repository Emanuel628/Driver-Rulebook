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
  content: [{ id: `${id}-p1`, type: 'paragraph', text: placeholderContent }],
  audioScript: `${title}. ${summary}. Content will be added after source research.`,
  tags: [title.toLowerCase()],
  sources: [],
  lastReviewed: 'Not reviewed yet'
});

const indexQuickStartPage: GuidePage = {
  id: 'index-quick-start',
  chapter: 1,
  title: 'Index / Quick Start',
  category: 'quick-start',
  summary: 'Start here when you need to quickly find the right driver-rule topic and verify it with official sources.',
  content: [
    {
      id: 'index-quick-start-p1',
      type: 'summary',
      title: 'What this app is for',
      text: 'Driver Rulebook is a plain-English reference for common trucking, hours-of-service, placarding, GHS, SDS, and dock-question situations. It is designed to help users find the right topic quickly, then verify the answer against official sources.'
    },
    {
      id: 'index-quick-start-p2',
      type: 'warning',
      title: 'Always verify before acting',
      text: 'This app is not official training, legal advice, an ELD, or a replacement for current regulations, shipping papers, SDS documents, company procedures, dispatch instructions, or qualified safety personnel. Rules can change and state or company requirements may be stricter.'
    },
    {
      id: 'index-quick-start-p3',
      type: 'steps',
      title: 'How to use the guide',
      items: [
        'Use the hamburger menu to jump to a chapter.',
        'Use Search when you know the term you are looking for.',
        'Use Listen Mode when you want the page read aloud.',
        'Save important pages for fast return later.',
        'Use highlights and checklists for your own local notes and progress.',
        'Open the Sources page when you need official verification links.'
      ]
    },
    {
      id: 'index-quick-start-p4',
      type: 'example',
      title: 'If the question is about driving time or breaks',
      text: 'Start with the HOS chapter. Federal hours-of-service information comes from FMCSA and 49 CFR Part 395. The app separates basic HOS concepts, the 11-hour driving limit, the 14-hour window, the 30-minute break, cycle limits, resets, sleeper berth topics, exceptions, and ELD basics.'
    },
    {
      id: 'index-quick-start-p5',
      type: 'example',
      title: 'If the question is about placards or transport labels',
      text: 'Start with the Hazmat / Placards chapter. Placarding and many transport communication rules are tied to PHMSA hazardous materials regulations in 49 CFR Part 172. The app keeps shipping papers, labels, markings, placards, numbered placards, and bulk versus non-bulk questions separated so the user does not mix them together.'
    },
    {
      id: 'index-quick-start-p6',
      type: 'example',
      title: 'If the question is about workplace chemical labels or SDS',
      text: 'Start with the GHS / SDS chapter. OSHA Hazard Communication rules cover workplace chemical hazard communication, including labels and Safety Data Sheets. DOT transport labels and OSHA workplace labels are related safety systems, but they are not the same thing.'
    },
    {
      id: 'index-quick-start-p7',
      type: 'checklist',
      title: 'Quick verification checklist',
      items: [
        'Identify whether the situation is HOS, placarding, GHS/SDS, or a company procedure issue.',
        'Open the matching chapter instead of relying on memory.',
        'Read the page warning and source status.',
        'Check official source links when a real compliance decision is being made.',
        'Follow employer procedures when they are stricter than the general guide.'
      ]
    },
    {
      id: 'index-quick-start-p8',
      type: 'paragraph',
      text: 'The safest way to use this app is as a pointer: find the issue, learn the plain-English concept, then confirm the current requirement from the official source or your company safety contact before making a decision.'
    }
  ],
  audioScript: 'Index and quick start. Driver Rulebook is a plain-English reference for common driver-rule questions. It helps you find the right topic quickly, but it is not official training, legal advice, an ELD, or a replacement for current regulations or company procedures. If your question is about driving time or breaks, start with HOS. If it is about placards or transport labels, start with Hazmat and Placards. If it is about workplace chemical labels or Safety Data Sheets, start with GHS and SDS. Use the sources page to verify official information before acting.',
  tags: ['index', 'quick start', 'hos', 'placards', 'ghs', 'sds', 'sources', 'verify'],
  sources: [
    { title: 'Hours of Service', agency: 'FMCSA', url: 'https://www.fmcsa.dot.gov/regulations/hours-of-service', note: 'Official FMCSA HOS topic page.' },
    { title: 'Summary of Hours of Service Regulations', agency: 'FMCSA', url: 'https://www.fmcsa.dot.gov/regulations/hours-service/summary-hours-service-regulations', note: 'FMCSA summary table for property- and passenger-carrying drivers.' },
    { title: 'DOT Chart 16 - Hazardous Materials Markings, Labeling and Placarding Guide', agency: 'PHMSA', url: 'https://www.phmsa.dot.gov/training/hazmat/dot-chart-16-hazardous-materials-markings-labeling-and-placarding-guide', note: 'Official PHMSA chart for markings, labels, and placards.' },
    { title: '49 CFR Section 172.504 - General placarding requirements', agency: 'PHMSA', url: 'https://www.phmsa.dot.gov/regulations/title49/section/172504', note: 'Official PHMSA regulatory text page.' },
    { title: 'Hazard Communication', agency: 'OSHA', url: 'https://www.osha.gov/hazcom/', note: 'Official OSHA Hazard Communication overview.' },
    { title: 'Safety Data Sheets QuickCard', agency: 'OSHA', url: 'https://obis.osha.gov/Publications/HazComm_QuickCard_SafetyData.html', note: 'Official OSHA SDS overview.' }
  ],
  lastReviewed: '2026-05-20'
};

export const guidePages: GuidePage[] = [
  indexQuickStartPage,
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

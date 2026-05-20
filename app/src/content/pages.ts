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
    { id: 'index-quick-start-p1', type: 'summary', title: 'What this app is for', text: 'Driver Rulebook is a plain-English reference for common trucking, hours-of-service, placarding, GHS, SDS, and dock-question situations. It is designed to help users find the right topic quickly, then verify the answer against official sources.' },
    { id: 'index-quick-start-p2', type: 'warning', title: 'Always verify before acting', text: 'This app is not official training, legal advice, an ELD, or a replacement for current regulations, shipping papers, SDS documents, company procedures, dispatch instructions, or qualified safety personnel. Rules can change and state or company requirements may be stricter.' },
    { id: 'index-quick-start-p3', type: 'steps', title: 'How to use the guide', items: ['Use the hamburger menu to jump to a chapter.', 'Use Search when you know the term you are looking for.', 'Use Listen Mode when you want the page read aloud.', 'Save important pages for fast return later.', 'Use highlights and checklists for your own local notes and progress.', 'Open the Sources page when you need official verification links.'] },
    { id: 'index-quick-start-p4', type: 'example', title: 'If the question is about driving time or breaks', text: 'Start with the HOS chapter. Federal hours-of-service information comes from FMCSA and 49 CFR Part 395. The app separates basic HOS concepts, the 11-hour driving limit, the 14-hour window, the 30-minute break, cycle limits, resets, sleeper berth topics, exceptions, and ELD basics.' },
    { id: 'index-quick-start-p5', type: 'example', title: 'If the question is about placards or transport labels', text: 'Start with the Hazmat / Placards chapter. Placarding and many transport communication rules are tied to PHMSA hazardous materials regulations in 49 CFR Part 172. The app keeps shipping papers, labels, markings, placards, numbered placards, and bulk versus non-bulk questions separated so the user does not mix them together.' },
    { id: 'index-quick-start-p6', type: 'example', title: 'If the question is about workplace chemical labels or SDS', text: 'Start with the GHS / SDS chapter. OSHA Hazard Communication rules cover workplace chemical hazard communication, including labels and Safety Data Sheets. DOT transport labels and OSHA workplace labels are related safety systems, but they are not the same thing.' },
    { id: 'index-quick-start-p7', type: 'checklist', title: 'Quick verification checklist', items: ['Identify whether the situation is HOS, placarding, GHS/SDS, or a company procedure issue.', 'Open the matching chapter instead of relying on memory.', 'Read the page warning and source status.', 'Check official source links when a real compliance decision is being made.', 'Follow employer procedures when they are stricter than the general guide.'] },
    { id: 'index-quick-start-p8', type: 'paragraph', text: 'The safest way to use this app is as a pointer: find the issue, learn the plain-English concept, then confirm the current requirement from the official source or your company safety contact before making a decision.' }
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

const basicTermsPage: GuidePage = {
  id: 'basic-terms',
  chapter: 2,
  title: 'Basic Terms',
  category: 'quick-start',
  summary: 'Plain-English definitions for common HOS, hazmat, placard, GHS, SDS, and source-verification terms used throughout the app.',
  content: [
    { id: 'basic-terms-p1', type: 'summary', title: 'Why terms matter', text: 'Many driver-rule mistakes happen because people use similar words as if they mean the same thing. This page gives simple working definitions so the rest of the guide stays clear. These are quick-reference explanations, not full legal definitions.' },
    { id: 'basic-terms-p2', type: 'warning', title: 'Do not use this page as the final rule', text: 'Definitions can have specific legal meaning inside FMCSA, PHMSA, OSHA, and eCFR rules. Use this page to understand the idea, then verify the actual requirement from the official source linked on the relevant page.' },
    { id: 'basic-terms-p3', type: 'paragraph', text: 'CMV means commercial motor vehicle. In this guide, CMV is used broadly for vehicles and operations that may be covered by commercial motor carrier rules. Whether a specific vehicle or trip is covered can depend on weight, passenger capacity, cargo, interstate commerce, intrastate rules, and other details.' },
    { id: 'basic-terms-p4', type: 'paragraph', text: 'Interstate commerce generally means transportation or trade that crosses state or national borders, or is part of a continuous movement across those borders. Intrastate commerce generally means transportation that stays within one state. This matters because federal rules often apply to interstate operations, while states may also have their own intrastate rules.' },
    { id: 'basic-terms-p5', type: 'paragraph', text: 'HOS means hours of service. HOS rules limit how long covered drivers may drive, how duty time is counted, and what rest periods are required. FMCSA describes HOS as rules that specify maximum duty and driving time plus required rest periods to help drivers stay awake and alert.' },
    { id: 'basic-terms-p6', type: 'paragraph', text: 'Driving time is time spent at the driving controls of a commercial motor vehicle in operation. On-duty time is broader. It can include driving plus other work-related time, depending on the rule and situation. Off-duty time is time relieved from work responsibility and free to use for personal activities.' },
    { id: 'basic-terms-p7', type: 'paragraph', text: 'Sleeper berth means a qualifying sleeper area on a CMV. Sleeper-berth time can matter for HOS rest calculations, but the exact split-sleeper rules are more specific than the phrase sounds. Use the sleeper berth chapter before relying on it.' },
    { id: 'basic-terms-p8', type: 'paragraph', text: 'ELD means electronic logging device. An ELD records duty status information for HOS compliance. This app is not an ELD and does not replace a required ELD, paper log, carrier system, or official recordkeeping requirement.' },
    { id: 'basic-terms-p9', type: 'paragraph', text: 'Hazmat means hazardous material. In transportation, hazardous material rules are mainly tied to PHMSA and the Hazardous Materials Regulations. Hazmat decisions should start with the shipping paper, proper shipping name, hazard class or division, identification number, packing group when assigned, quantity, packaging type, and any special provisions.' },
    { id: 'basic-terms-p10', type: 'paragraph', text: 'Placards are large hazard communication displays placed on transport vehicles, freight containers, cargo tanks, or other transport units when required. Labels are smaller hazard communication displays placed on packages. Markings include required written or graphic information such as proper shipping names, identification numbers, orientation arrows, or other required package or bulk-package information.' },
    { id: 'basic-terms-p11', type: 'paragraph', text: 'UN or NA identification numbers are four-digit numbers used to identify hazardous materials in transportation. They may appear on shipping papers, packages, placards, orange panels, or white square-on-point displays depending on the material, packaging, and rule.' },
    { id: 'basic-terms-p12', type: 'paragraph', text: 'Bulk packaging is a transportation packaging category that can change marking, identification-number-display, and placarding decisions. PHMSA describes bulk packaging thresholds using capacity or weight, such as more than 119 gallons for a liquid receptacle. Do not guess bulk versus non-bulk from appearance alone.' },
    { id: 'basic-terms-p13', type: 'paragraph', text: 'Shipping papers are transport documents that communicate key hazardous-material information. They are often the starting point for deciding whether a material is regulated, what hazard class applies, and what labels, markings, placards, or emergency-response information may be required.' },
    { id: 'basic-terms-p14', type: 'paragraph', text: 'GHS means Globally Harmonized System. OSHA describes GHS as an international approach to hazard communication, including criteria for classifying chemical hazards and a standardized approach to label elements and Safety Data Sheets. In workplace settings, OSHA Hazard Communication is the main U.S. framework that uses GHS-style labels and SDS information.' },
    { id: 'basic-terms-p15', type: 'paragraph', text: 'SDS means Safety Data Sheet. OSHA says SDSs are written or printed materials about hazardous chemicals prepared under the Hazard Communication Standard. SDSs are organized into sections and are meant to communicate hazards, protective measures, handling, storage, emergency information, and related details.' },
    { id: 'basic-terms-p16', type: 'warning', title: 'DOT labels are not the same as OSHA/GHS labels', text: 'A DOT transport label or placard and an OSHA/GHS workplace chemical label can both communicate hazards, but they come from different systems and are used for different purposes. Do not treat one as automatically replacing the other.' },
    { id: 'basic-terms-p17', type: 'checklist', title: 'Before using a term to make a decision', items: ['Identify whether the issue is HOS, hazmat transport, workplace chemical communication, or company procedure.', 'Open the chapter that matches the issue.', 'Check whether the term has a specific official definition in that rule system.', 'Use shipping papers, SDS documents, and employer procedures when they apply.', 'Verify against official sources before making a compliance or safety decision.'] }
  ],
  audioScript: 'Basic terms. This page explains common words used throughout Driver Rulebook. CMV means commercial motor vehicle. HOS means hours of service. Driving time is not always the same as on-duty time. Hazmat means hazardous material. Placards, labels, markings, and identification numbers are related, but they do not mean the same thing. GHS and SDS belong to workplace chemical hazard communication. DOT transport labels and OSHA workplace labels are not the same system. Use these explanations as a starting point and verify official sources before making a compliance decision.',
  tags: ['basic terms', 'definitions', 'cmv', 'interstate', 'intrastate', 'hos', 'on duty', 'off duty', 'sleeper berth', 'eld', 'hazmat', 'placard', 'label', 'marking', 'bulk', 'shipping paper', 'ghs', 'sds'],
  sources: [
    { title: 'Hours of Service', agency: 'FMCSA', url: 'https://www.fmcsa.dot.gov/regulations/hours-of-service', note: 'Official FMCSA HOS topic page.' },
    { title: 'Summary of Hours of Service Regulations', agency: 'FMCSA', url: 'https://www.fmcsa.dot.gov/regulations/hours-service/summary-hours-service-regulations', note: 'FMCSA summary page for HOS limits and breaks.' },
    { title: 'Definition of Registration Terms', agency: 'PHMSA', url: 'https://www.phmsa.dot.gov/registration/definition-registration-terms', note: 'PHMSA page defining hazmat registration terms, including bulk packaging.' },
    { title: 'DOT Chart 16 - Hazardous Materials Markings, Labeling and Placarding Guide', agency: 'PHMSA', url: 'https://www.phmsa.dot.gov/training/hazmat/dot-chart-16-hazardous-materials-markings-labeling-and-placarding-guide', note: 'PHMSA guide for markings, labels, and placards.' },
    { title: 'Identifying Hazardous Materials in Your Community', agency: 'PHMSA', url: 'https://www.phmsa.dot.gov/standards-rulemaking/hazmat/identifying-hazardous-materials-in-your-community', note: 'PHMSA explanation of placards, colors, symbols, and identification numbers.' },
    { title: 'Hazard Communication', agency: 'OSHA', url: 'https://www.osha.gov/hazcom/', note: 'Official OSHA Hazard Communication overview.' },
    { title: '29 CFR 1910.1200 - Hazard Communication', agency: 'OSHA', url: 'https://www.osha.gov/laws-regs/regulations/standardnumber/1910/1910.1200', note: 'Official OSHA HazCom regulatory text.' },
    { title: 'Safety Data Sheets QuickCard', agency: 'OSHA', url: 'https://obis.osha.gov/Publications/HazComm_QuickCard_SafetyData.html', note: 'Official OSHA SDS quick reference.' }
  ],
  lastReviewed: '2026-05-20'
};

const hosBasicsPage: GuidePage = {
  id: 'hos-basics',
  chapter: 3,
  title: 'HOS Basics',
  category: 'hos',
  summary: 'A safe starting point for understanding federal hours-of-service concepts before using the detailed HOS pages.',
  content: [
    { id: 'hos-basics-p1', type: 'summary', title: 'What HOS controls', text: 'Hours of service rules limit when covered drivers may drive, how much driving time they may use, when breaks or rest are required, and when weekly or cycle limits stop a driver from driving. The goal is fatigue control, not just paperwork.' },
    { id: 'hos-basics-p2', type: 'warning', title: 'This page is only the foundation', text: 'Do not use this page alone to decide whether a driver may keep driving. HOS depends on the type of operation, duty status history, property versus passenger rules, exceptions, state rules, employer policy, and the driver record. Verify the detailed chapter and official FMCSA sources.' },
    { id: 'hos-basics-p3', type: 'paragraph', text: 'For many property-carrying drivers under the federal rules, the basic pattern is built around three separate ideas: a maximum amount of driving time, a duty window that limits when driving may occur, and a minimum off-duty period before a new duty period starts. These clocks interact, but they are not the same clock.' },
    { id: 'hos-basics-p4', type: 'paragraph', text: 'The 11-hour driving limit is the maximum driving time a covered property-carrying driver may use after the required off-duty period. It is a driving-time limit. It does not mean the driver can be on duty for only 11 hours.' },
    { id: 'hos-basics-p5', type: 'paragraph', text: 'The 14-hour window is a duty-window concept for many property-carrying drivers. After coming on duty following the required off-duty period, the driver generally may not drive beyond the 14th consecutive hour. Off-duty time taken during the day usually does not stop that 14-hour window unless a specific exception applies.' },
    { id: 'hos-basics-p6', type: 'paragraph', text: 'The 30-minute break rule is separate from both the 11-hour limit and the 14-hour window. FMCSA summarizes it as a break required when a driver has driven for 8 cumulative hours without at least a 30-minute interruption. Certain non-driving periods can satisfy the break under current federal rules.' },
    { id: 'hos-basics-p7', type: 'paragraph', text: 'The 60/70-hour limit is a weekly or cycle limit. It is based on on-duty time over 7 or 8 consecutive days, depending on the carrier operation. A driver can have driving time left today and still be unable to drive because the cycle limit has been reached.' },
    { id: 'hos-basics-p8', type: 'paragraph', text: 'A 10-hour off-duty period is the usual reset before a covered property-carrying driver can start a new driving shift. The 34-hour restart is different: it may restart the 60/70-hour cycle calculation when used correctly. Do not confuse a daily reset with a cycle restart.' },
    { id: 'hos-basics-p9', type: 'paragraph', text: 'Sleeper berth and split sleeper rules are advanced HOS topics. They can change how rest periods affect the 14-hour window, but only if the required qualifying periods are used correctly. Drivers should not guess on split sleeper rules from memory.' },
    { id: 'hos-basics-p10', type: 'paragraph', text: 'ELDs and logs record HOS information, but they do not change the basic HOS rules. FMCSA states the ELD final rule does not change the basic hours-of-service rules or exceptions. A driver can still violate HOS even if the device is working, and a device can display status without explaining every exception.' },
    { id: 'hos-basics-p11', type: 'example', title: 'Common mistake', text: 'A driver says, “I still have driving time left, so I can keep driving.” That might be wrong if the 14-hour window has expired, the 30-minute break is overdue, or the 60/70-hour cycle is exhausted.' },
    { id: 'hos-basics-p12', type: 'example', title: 'Another common mistake', text: 'A driver says, “I took a break, so my 14-hour clock restarted.” A normal 30-minute break does not restart the 14-hour window. A full qualifying off-duty period or a specific exception must apply.' },
    { id: 'hos-basics-p13', type: 'checklist', title: 'Quick HOS check', items: ['Is this a property-carrying or passenger-carrying operation?', 'Is the driver subject to federal HOS, a state intrastate rule, or an exception?', 'How much driving time has been used since the last qualifying off-duty period?', 'Where is the driver in the 14-hour or applicable duty window?', 'Has the 30-minute break rule been triggered?', 'Is the driver under the 60/70-hour cycle limit?', 'Does an exception, sleeper-berth rule, or short-haul rule actually apply?'] },
    { id: 'hos-basics-p14', type: 'warning', title: 'Passenger rules are different', text: 'This app separates property-carrying basics from passenger-carrying rules where needed. Do not assume the 11-hour, 14-hour, and 30-minute-break summaries for property-carrying drivers apply the same way to passenger-carrying motor carriers.' }
  ],
  audioScript: 'HOS basics. Hours of service rules limit when covered drivers may drive, how much driving time they may use, when breaks or rest are required, and when cycle limits stop driving. For many property-carrying drivers, the key concepts are the 11-hour driving limit, the 14-hour driving window, the 30-minute break rule, the 60 or 70-hour cycle limit, the 10-hour daily reset, and the 34-hour restart. These clocks are related, but they are not the same. A driver may have driving time left but still be unable to drive because another HOS limit applies. Always verify the detailed page and official FMCSA source before acting.',
  tags: ['hos basics', 'hours of service', '11 hour', '14 hour', '30 minute break', '60 hour', '70 hour', '10 hour reset', '34 hour restart', 'sleeper berth', 'eld', 'property carrying', 'passenger carrying'],
  sources: [
    { title: 'Hours of Service', agency: 'FMCSA', url: 'https://www.fmcsa.dot.gov/regulations/hours-of-service', note: 'Official FMCSA HOS topic page.' },
    { title: 'Summary of Hours of Service Regulations', agency: 'FMCSA', url: 'https://www.fmcsa.dot.gov/regulations/hours-service/summary-hours-service-regulations', note: 'FMCSA summary for property- and passenger-carrying driver HOS rules.' },
    { title: 'Hours of Service Drivers Final Rule', agency: 'FMCSA', url: 'https://www.fmcsa.dot.gov/regulations/hours-service/hours-service-drivers-final-rule', note: 'FMCSA summary of 2020 HOS rule changes.' },
    { title: 'Interstate Truck Driver\'s Guide to Hours of Service', agency: 'FMCSA', url: 'https://www.fmcsa.dot.gov/regulations/hours-service/interstate-truck-drivers-guide-hours-service', note: 'FMCSA guide summarizing Part 395 HOS rules for property-carrying CMVs.' },
    { title: 'Electronic Logging Devices', agency: 'FMCSA', url: 'https://www.fmcsa.dot.gov/hours-service/elds/electronic-logging-devices', note: 'FMCSA ELD page noting ELDs do not change basic HOS rules or exceptions.' },
    { title: '49 CFR Part 395 - Hours of Service of Drivers', agency: 'eCFR', url: 'https://www.ecfr.gov/current/title-49/subtitle-B/chapter-III/subchapter-B/part-395', note: 'Official eCFR regulatory text for federal HOS rules.' }
  ],
  lastReviewed: '2026-05-20'
};

export const guidePages: GuidePage[] = [
  indexQuickStartPage,
  basicTermsPage,
  hosBasicsPage,
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

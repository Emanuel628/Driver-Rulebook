import type { GuidePage } from '../types/content';
import { drawerGroups, guidePages as baseGuidePages } from './pages';
import { sixtySeventyRecapPage } from './chapter7';
import { resetRestartPage } from './chapter8';
import { sleeperBerthPage } from './chapter9';
import { hosExceptionsPage } from './chapter10';
import { eldBasicsPage } from './chapter11';
import { hazmatBasicsPage } from './chapter12';
import { shippingPapersPage } from './chapter13';
import { labelsMarkingsPlacardsPage } from './chapter14';
import { numberedPlacardsPage } from './chapter15';
import { bulkVsNonBulkPage } from './chapter16';
import { placardDecisionGuidePage } from './chapter17';
import { commonDockArgumentsPage } from './chapter18';
import { ghsBasicsPage } from './chapter19';
import { ghsPictogramsPage } from './chapter20';
import { sdsExplainedPage } from './chapter21';
import { ghsVsDotPage } from './chapter22';
import { checklistsPage } from './chapter23';
import { scenarioExamplesPage } from './chapter24';
import { glossaryPage } from './chapter25';
import { sourcesUpdatesPage } from './chapter26';

const researchedPages: GuidePage[] = [
  sixtySeventyRecapPage,
  resetRestartPage,
  sleeperBerthPage,
  hosExceptionsPage,
  eldBasicsPage,
  hazmatBasicsPage,
  shippingPapersPage,
  labelsMarkingsPlacardsPage,
  numberedPlacardsPage,
  bulkVsNonBulkPage,
  placardDecisionGuidePage,
  commonDockArgumentsPage,
  ghsBasicsPage,
  ghsPictogramsPage,
  sdsExplainedPage,
  ghsVsDotPage,
  checklistsPage,
  scenarioExamplesPage,
  glossaryPage,
  sourcesUpdatesPage
];

const phmsaChart16Note = 'Official PHMSA general guidance chart. Verify actual compliance against current 49 CFR hazardous materials regulations.';

function normalizeSourceNotes(page: GuidePage): GuidePage {
  return {
    ...page,
    sources: page.sources.map(source => {
      if (source.title.includes('DOT Chart 16')) {
        return { ...source, note: phmsaChart16Note };
      }

      return source;
    })
  };
}

export const guidePages: GuidePage[] = baseGuidePages.map(page => {
  const researchedPage = researchedPages.find(candidate => candidate.id === page.id) ?? page;
  return normalizeSourceNotes(researchedPage);
});

export const guidePageMap = Object.fromEntries(guidePages.map(page => [page.id, page])) as Record<string, GuidePage>;

export { drawerGroups };

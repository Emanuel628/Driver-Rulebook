import type { GuidePage } from '../types/content';
import { drawerGroups, guidePages as baseGuidePages } from './pages';
import { sixtySeventyRecapPage } from './chapter7';
import { resetRestartPage } from './chapter8';
import { sleeperBerthPage } from './chapter9';
import { hosExceptionsPage } from './chapter10';

const researchedPages: GuidePage[] = [sixtySeventyRecapPage, resetRestartPage, sleeperBerthPage, hosExceptionsPage];

const phmsaChart16Note = 'Official PHMSA general guidance chart. Verify actual compliance against current 49 CFR hazardous materials regulations.';

function normalizeSourceNotes(page: GuidePage): GuidePage {
  return {
    ...page,
    sources: page.sources.map(source =>
      source.title.includes('DOT Chart 16')
        ? { ...source, note: phmsaChart16Note }
        : source
    )
  };
}

export const guidePages: GuidePage[] = baseGuidePages.map(page => {
  const researchedPage = researchedPages.find(candidate => candidate.id === page.id) ?? page;
  return normalizeSourceNotes(researchedPage);
});

export const guidePageMap = Object.fromEntries(guidePages.map(page => [page.id, page])) as Record<string, GuidePage>;

export { drawerGroups };

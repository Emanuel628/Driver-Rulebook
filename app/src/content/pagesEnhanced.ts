import type { GuidePage } from '../types/content';
import { drawerGroups, guidePages as baseGuidePages } from './pages';
import { sixtySeventyRecapPage } from './chapter7';
import { resetRestartPage } from './chapter8';
import { sleeperBerthPage } from './chapter9';

const researchedPages: GuidePage[] = [sixtySeventyRecapPage, resetRestartPage, sleeperBerthPage];

export const guidePages: GuidePage[] = baseGuidePages.map(page => {
  return researchedPages.find(researchedPage => researchedPage.id === page.id) ?? page;
});

export const guidePageMap = Object.fromEntries(guidePages.map(page => [page.id, page])) as Record<string, GuidePage>;

export { drawerGroups };

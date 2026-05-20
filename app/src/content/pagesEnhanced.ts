import { drawerGroups, guidePages as baseGuidePages } from './pages';
import { sixtySeventyRecapPage } from './chapter7';
import { resetRestartPage } from './chapter8';
import { sleeperBerthPage } from './chapter9';

const researchedPages = [sixtySeventyRecapPage, resetRestartPage, sleeperBerthPage];

export const guidePages = baseGuidePages.map(page =>
  researchedPages.find(researchedPage => researchedPage.id === page.id) ?? page
);

export const guidePageMap = Object.fromEntries(guidePages.map(page => [page.id, page]));

export { drawerGroups };

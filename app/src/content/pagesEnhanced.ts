import { drawerGroups, guidePages as baseGuidePages } from './pages';
import { sixtySeventyRecapPage } from './chapter7';

export const guidePages = baseGuidePages.map(page =>
  page.id === sixtySeventyRecapPage.id ? sixtySeventyRecapPage : page
);

export const guidePageMap = Object.fromEntries(guidePages.map(page => [page.id, page]));

export { drawerGroups };

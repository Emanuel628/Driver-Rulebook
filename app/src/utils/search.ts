import type { GuidePage } from '../types/content';

function pageBody(page: GuidePage): string {
  return page.content
    .map(block => {
      if (block.type === 'checklist' || block.type === 'steps') return block.items.join(' ');
      return `${'title' in block ? block.title : ''} ${block.text}`;
    })
    .join(' ');
}

export function searchGuidePages(pages: GuidePage[], query: string): GuidePage[] {
  const normalized = query.trim().toLowerCase();
  if (!normalized) return pages;

  const terms = normalized.split(/\s+/).filter(Boolean);

  return pages
    .map(page => {
      const haystack = [page.title, page.summary, page.tags.join(' '), page.category, pageBody(page)].join(' ').toLowerCase();
      const score = terms.reduce((total, term) => {
        if (page.title.toLowerCase().includes(term)) return total + 5;
        if (page.summary.toLowerCase().includes(term)) return total + 3;
        if (page.tags.join(' ').toLowerCase().includes(term)) return total + 2;
        if (haystack.includes(term)) return total + 1;
        return total;
      }, 0);

      return { page, score };
    })
    .filter(result => result.score > 0)
    .sort((a, b) => b.score - a.score || a.page.chapter - b.page.chapter)
    .map(result => result.page);
}

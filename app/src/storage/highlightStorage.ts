import type { SavedHighlight } from '../types/content';

const memoryStore: SavedHighlight[] = [];

export async function loadHighlights(): Promise<SavedHighlight[]> {
  return [...memoryStore];
}

export async function saveHighlight(highlight: SavedHighlight): Promise<SavedHighlight[]> {
  const next = [highlight, ...memoryStore.filter(item => item.id !== highlight.id)];
  memoryStore.splice(0, memoryStore.length, ...next);
  return [...memoryStore];
}

export async function deleteHighlight(highlightId: string): Promise<SavedHighlight[]> {
  const next = memoryStore.filter(item => item.id !== highlightId);
  memoryStore.splice(0, memoryStore.length, ...next);
  return [...memoryStore];
}

export async function clearHighlightsForParagraph(pageId: string, paragraphId: string): Promise<SavedHighlight[]> {
  const next = memoryStore.filter(item => !(item.pageId === pageId && item.paragraphId === paragraphId));
  memoryStore.splice(0, memoryStore.length, ...next);
  return [...memoryStore];
}

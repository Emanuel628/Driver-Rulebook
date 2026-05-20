import AsyncStorage from '@react-native-async-storage/async-storage';
import type { SavedHighlight } from '../types/content';

const STORAGE_KEY = 'driver-rulebook:saved-highlights';

async function writeHighlights(highlights: SavedHighlight[]): Promise<SavedHighlight[]> {
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(highlights));
  return highlights;
}

export async function loadHighlights(): Promise<SavedHighlight[]> {
  const raw = await AsyncStorage.getItem(STORAGE_KEY);
  if (!raw) return [];

  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export async function saveHighlight(highlight: SavedHighlight): Promise<SavedHighlight[]> {
  const current = await loadHighlights();
  const next = [highlight, ...current.filter(item => item.id !== highlight.id)];
  return writeHighlights(next);
}

export async function deleteHighlight(highlightId: string): Promise<SavedHighlight[]> {
  const current = await loadHighlights();
  const next = current.filter(item => item.id !== highlightId);
  return writeHighlights(next);
}

export async function clearHighlightsForParagraph(pageId: string, paragraphId: string): Promise<SavedHighlight[]> {
  const current = await loadHighlights();
  const next = current.filter(item => !(item.pageId === pageId && item.paragraphId === paragraphId));
  return writeHighlights(next);
}

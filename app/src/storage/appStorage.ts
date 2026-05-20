import AsyncStorage from '@react-native-async-storage/async-storage';
import type { ThemeMode } from '../theme/tokens';

type TextSize = 'normal' | 'large' | 'extra-large';
type AudioSpeed = '0.75x' | '1.0x' | '1.25x' | '1.5x';

export type AppPreferences = {
  theme: ThemeMode;
  textSize: TextSize;
  audioSpeed: AudioSpeed;
  acknowledgedDisclaimer: boolean;
  savedPageIds: string[];
  checklistState: Record<string, boolean>;
};

const STORAGE_KEY = 'driver-rulebook:app-preferences';

export const defaultPreferences: AppPreferences = {
  theme: 'dark',
  textSize: 'normal',
  audioSpeed: '1.0x',
  acknowledgedDisclaimer: false,
  savedPageIds: [],
  checklistState: {}
};

export async function loadPreferences(): Promise<AppPreferences> {
  const raw = await AsyncStorage.getItem(STORAGE_KEY);
  if (!raw) return defaultPreferences;

  try {
    const parsed = JSON.parse(raw) as Partial<AppPreferences>;
    return {
      ...defaultPreferences,
      ...parsed,
      savedPageIds: Array.isArray(parsed.savedPageIds) ? parsed.savedPageIds : [],
      checklistState: parsed.checklistState && typeof parsed.checklistState === 'object' ? parsed.checklistState : {}
    };
  } catch {
    return defaultPreferences;
  }
}

export async function savePreferences(preferences: AppPreferences): Promise<AppPreferences> {
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(preferences));
  return preferences;
}

import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, radius, spacing } from '../theme/tokens';
import type { MainTab } from '../types/content';
import type { ThemeMode } from '../theme/tokens';

type Item = { key: MainTab; label: string; icon: string };

const items: Item[] = [
  { key: 'home', label: 'Home', icon: 'home-outline' },
  { key: 'guides', label: 'Guides', icon: 'book-outline' },
  { key: 'checklists', label: 'Checks', icon: 'checkbox-outline' },
  { key: 'search', label: 'Search', icon: 'search-outline' },
  { key: 'saved', label: 'Saved', icon: 'bookmark-outline' }
];

type BottomNavProps = {
  activeTab: MainTab;
  theme: ThemeMode;
  onChange: (tab: MainTab) => void;
};

export function BottomNav({ activeTab, theme, onChange }: BottomNavProps) {
  const palette = colors[theme];

  return (
    <View style={[styles.wrap, { backgroundColor: palette.bg, borderTopColor: palette.border }]}> 
      {items.map(item => {
        const active = activeTab === item.key;
        return (
          <Pressable key={item.key} onPress={() => onChange(item.key)} style={[styles.item, active && { backgroundColor: palette.accentSoft }]}> 
            <Ionicons name={item.icon as any} size={20} color={active ? palette.text : palette.textSubtle} />
            <Text style={[styles.label, { color: active ? palette.text : palette.textSubtle }]}>{item.label}</Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    borderTopWidth: 1,
    flexDirection: 'row',
    gap: spacing.xs,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.sm
  },
  item: {
    alignItems: 'center',
    borderRadius: radius.lg,
    flex: 1,
    gap: 2,
    paddingVertical: spacing.sm
  },
  label: {
    fontSize: 11,
    fontWeight: '700'
  }
});

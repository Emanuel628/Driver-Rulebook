import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, radius, spacing } from '../theme/tokens';
import type { ThemeMode } from '../theme/tokens';
import type { GuidePage } from '../types/content';

type ListScreenProps = {
  theme: ThemeMode;
  title: string;
  subtitle: string;
  pages: GuidePage[];
  emptyLabel?: string;
  onOpenPage: (pageId: string) => void;
};

export function ListScreen({ theme, title, subtitle, pages, emptyLabel = 'No items yet.', onOpenPage }: ListScreenProps) {
  const palette = colors[theme];

  return (
    <ScrollView style={[styles.screen, { backgroundColor: palette.bg }]} contentContainerStyle={styles.content}> 
      <View style={styles.header}> 
        <Text style={[styles.title, { color: palette.text }]}>{title}</Text>
        <Text style={[styles.subtitle, { color: palette.textMuted }]}>{subtitle}</Text>
      </View>

      {pages.length === 0 ? (
        <View style={[styles.empty, { backgroundColor: palette.surface, borderColor: palette.border }]}> 
          <Text style={[styles.emptyText, { color: palette.textMuted }]}>{emptyLabel}</Text>
        </View>
      ) : (
        <View style={styles.list}> 
          {pages.map(page => (
            <Pressable key={page.id} onPress={() => onOpenPage(page.id)} style={[styles.row, { backgroundColor: palette.surface, borderColor: palette.border }]}> 
              <View style={styles.rowCopy}> 
                <Text style={[styles.rowTitle, { color: palette.text }]}>{page.title}</Text>
                <Text numberOfLines={2} style={[styles.rowSubtitle, { color: palette.textSubtle }]}>{page.summary}</Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color={palette.textSubtle} />
            </Pressable>
          ))}
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1
  },
  content: {
    gap: spacing.lg,
    padding: spacing.lg,
    paddingBottom: spacing.xxl
  },
  header: {
    gap: spacing.sm,
    paddingTop: spacing.md
  },
  title: {
    fontSize: 30,
    fontWeight: '900'
  },
  subtitle: {
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 23
  },
  list: {
    gap: spacing.md
  },
  row: {
    alignItems: 'center',
    borderRadius: radius.lg,
    borderWidth: 1,
    flexDirection: 'row',
    gap: spacing.md,
    padding: spacing.lg
  },
  rowCopy: {
    flex: 1,
    gap: 4
  },
  rowTitle: {
    fontSize: 16,
    fontWeight: '800'
  },
  rowSubtitle: {
    fontSize: 13,
    fontWeight: '600',
    lineHeight: 18
  },
  empty: {
    borderRadius: radius.lg,
    borderWidth: 1,
    padding: spacing.xl
  },
  emptyText: {
    fontSize: 15,
    fontWeight: '700',
    textAlign: 'center'
  }
});

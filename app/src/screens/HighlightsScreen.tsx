import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, radius, spacing } from '../theme/tokens';
import type { ThemeMode } from '../theme/tokens';
import type { SavedHighlight } from '../types/content';

type HighlightsScreenProps = {
  theme: ThemeMode;
  highlights: SavedHighlight[];
  onOpenHighlight: (highlight: SavedHighlight) => void;
  onDeleteHighlight: (highlightId: string) => void;
};

export function HighlightsScreen({ theme, highlights, onOpenHighlight, onDeleteHighlight }: HighlightsScreenProps) {
  const palette = colors[theme];

  return (
    <ScrollView style={[styles.screen, { backgroundColor: palette.bg }]} contentContainerStyle={styles.content}> 
      <View style={styles.header}> 
        <Text style={[styles.title, { color: palette.text }]}>Saved Highlights</Text>
        <Text style={[styles.subtitle, { color: palette.textMuted }]}>Highlighted text saved locally on this device.</Text>
      </View>

      {highlights.length === 0 ? (
        <View style={[styles.empty, { backgroundColor: palette.surface, borderColor: palette.border }]}> 
          <Ionicons name="create-outline" size={28} color={palette.textSubtle} />
          <Text style={[styles.emptyTitle, { color: palette.text }]}>No highlights yet</Text>
          <Text style={[styles.emptyText, { color: palette.textMuted }]}>Long-press a paragraph in a guide page to save it here.</Text>
        </View>
      ) : (
        <View style={styles.list}> 
          {highlights.map(highlight => (
            <View key={highlight.id} style={[styles.card, { backgroundColor: palette.surface, borderColor: palette.border }]}> 
              <Pressable onPress={() => onOpenHighlight(highlight)} style={styles.cardMain}> 
                <Text style={[styles.meta, { color: palette.accent }]}>Chapter {highlight.chapter} • {highlight.paragraphLabel}</Text>
                <Text style={[styles.pageTitle, { color: palette.text }]}>{highlight.pageTitle}</Text>
                <Text numberOfLines={4} style={[styles.highlightText, { color: palette.textMuted }]}>{highlight.selectedText}</Text>
              </Pressable>
              <Pressable onPress={() => onDeleteHighlight(highlight.id)} style={[styles.deleteButton, { backgroundColor: palette.bgAlt }]}> 
                <Ionicons name="trash-outline" size={18} color={palette.danger} />
                <Text style={[styles.deleteText, { color: palette.danger }]}>Delete</Text>
              </Pressable>
            </View>
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
  empty: {
    alignItems: 'center',
    borderRadius: radius.lg,
    borderWidth: 1,
    gap: spacing.sm,
    padding: spacing.xl
  },
  emptyTitle: {
    fontSize: 17,
    fontWeight: '900'
  },
  emptyText: {
    fontSize: 14,
    fontWeight: '600',
    lineHeight: 20,
    textAlign: 'center'
  },
  list: {
    gap: spacing.md
  },
  card: {
    borderRadius: radius.lg,
    borderWidth: 1,
    gap: spacing.md,
    padding: spacing.lg
  },
  cardMain: {
    gap: spacing.sm
  },
  meta: {
    fontSize: 12,
    fontWeight: '900',
    letterSpacing: 0.7,
    textTransform: 'uppercase'
  },
  pageTitle: {
    fontSize: 17,
    fontWeight: '900'
  },
  highlightText: {
    fontSize: 15,
    fontWeight: '600',
    lineHeight: 22
  },
  deleteButton: {
    alignItems: 'center',
    alignSelf: 'flex-start',
    borderRadius: radius.pill,
    flexDirection: 'row',
    gap: spacing.xs,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm
  },
  deleteText: {
    fontSize: 12,
    fontWeight: '900'
  }
});

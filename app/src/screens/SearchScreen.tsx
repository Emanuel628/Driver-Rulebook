import { ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { colors, radius, spacing } from '../theme/tokens';
import type { ThemeMode } from '../theme/tokens';
import type { GuidePage } from '../types/content';
import { ListScreen } from './ListScreen';

type SearchScreenProps = {
  theme: ThemeMode;
  query: string;
  results: GuidePage[];
  onQueryChange: (query: string) => void;
  onOpenPage: (pageId: string) => void;
};

export function SearchScreen({ theme, query, results, onQueryChange, onOpenPage }: SearchScreenProps) {
  const palette = colors[theme];

  return (
    <ScrollView style={[styles.screen, { backgroundColor: palette.bg }]} contentContainerStyle={styles.content}> 
      <View style={styles.header}> 
        <Text style={[styles.title, { color: palette.text }]}>Search</Text>
        <Text style={[styles.subtitle, { color: palette.textMuted }]}>Search titles, summaries, tags, and page body text.</Text>
      </View>
      <TextInput
        value={query}
        onChangeText={onQueryChange}
        placeholder="Search HOS, placards, GHS, SDS..."
        placeholderTextColor={palette.textSubtle}
        autoCorrect={false}
        autoCapitalize="none"
        style={[styles.input, { backgroundColor: palette.surface, borderColor: palette.border, color: palette.text }]}
      />
      <View style={styles.resultsWrap}> 
        <ListScreen
          theme={theme}
          title={query.trim() ? `${results.length} result${results.length === 1 ? '' : 's'}` : 'All pages'}
          subtitle={query.trim() ? 'Best matches first.' : 'Start typing to narrow the list.'}
          pages={results}
          emptyLabel="No matching pages found."
          onOpenPage={onOpenPage}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1
  },
  content: {
    gap: spacing.lg,
    paddingBottom: spacing.xxl
  },
  header: {
    gap: spacing.sm,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.lg
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
  input: {
    borderRadius: radius.lg,
    borderWidth: 1,
    fontSize: 16,
    fontWeight: '700',
    marginHorizontal: spacing.lg,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md
  },
  resultsWrap: {
    marginTop: -spacing.lg
  }
});

import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { colors, spacing } from '../theme/tokens';
import type { ThemeMode } from '../theme/tokens';
import { TopicCard } from '../components/TopicCard';
import { InfoCard } from '../components/InfoCard';

type HomeScreenProps = {
  theme: ThemeMode;
  onOpenPage: (pageId: string) => void;
};

export function HomeScreen({ theme, onOpenPage }: HomeScreenProps) {
  const palette = colors[theme];

  return (
    <ScrollView style={[styles.screen, { backgroundColor: palette.bg }]} contentContainerStyle={styles.content}> 
      <View style={styles.hero}> 
        <Text style={[styles.kicker, { color: palette.accent }]}>Local-first guide</Text>
        <Text style={[styles.title, { color: palette.text }]}>Open. Search. Understand.</Text>
        <Text style={[styles.subtitle, { color: palette.textMuted }]}>A clean mobile shell for HOS, placards, GHS, SDS, checklists, and common driver situations.</Text>
      </View>

      <InfoCard theme={theme} title="Content placeholder" body="Guide text is intentionally empty until source research is completed." tone="warning" />

      <View style={styles.grid}> 
        <TopicCard theme={theme} title="HOS Rules" subtitle="Clocks, breaks, resets" icon="time-outline" onPress={() => onOpenPage('hos-basics')} />
        <TopicCard theme={theme} title="Placards" subtitle="DOT markings and IDs" icon="diamond-outline" onPress={() => onOpenPage('numbered-placards')} />
        <TopicCard theme={theme} title="GHS / SDS" subtitle="Symbols and sheets" icon="document-text-outline" onPress={() => onOpenPage('ghs-basics')} />
        <TopicCard theme={theme} title="Common Situations" subtitle="Dock and driver confusion" icon="alert-circle-outline" onPress={() => onOpenPage('common-dock-arguments')} />
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
    padding: spacing.lg,
    paddingBottom: spacing.xxl
  },
  hero: {
    gap: spacing.sm,
    paddingVertical: spacing.lg
  },
  kicker: {
    fontSize: 13,
    fontWeight: '900',
    letterSpacing: 1,
    textTransform: 'uppercase'
  },
  title: {
    fontSize: 34,
    fontWeight: '900',
    lineHeight: 38
  },
  subtitle: {
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 24
  },
  grid: {
    gap: spacing.md
  }
});

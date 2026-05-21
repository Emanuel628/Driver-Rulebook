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
        <Text style={[styles.kicker, { color: palette.accent }]}>Local-first driver reference</Text>
        <Text style={[styles.title, { color: palette.text }]}>Find the rule. Verify the source.</Text>
        <Text style={[styles.subtitle, { color: palette.textMuted }]}>A plain-English guide for HOS, ELD, hazmat placards, GHS labels, SDS questions, dock disputes, and quick field checks.</Text>
      </View>

      <InfoCard theme={theme} title="Always verify before acting" body="This app is a guide, not official training, legal advice, an ELD, or a replacement for current regulations, shipping papers, SDS documents, employer procedures, or qualified safety personnel." tone="warning" />

      <View style={styles.grid}> 
        <TopicCard theme={theme} title="Start Here" subtitle="Index and basic terms" icon="compass-outline" onPress={() => onOpenPage('index-quick-start')} />
        <TopicCard theme={theme} title="HOS / ELD" subtitle="Clocks, breaks, logs" icon="time-outline" onPress={() => onOpenPage('hos-basics')} />
        <TopicCard theme={theme} title="Hazmat / Placards" subtitle="Shipping papers and displays" icon="diamond-outline" onPress={() => onOpenPage('hazmat-basics')} />
        <TopicCard theme={theme} title="GHS / SDS" subtitle="Workplace chemical info" icon="document-text-outline" onPress={() => onOpenPage('ghs-basics')} />
        <TopicCard theme={theme} title="Checklists" subtitle="Fast verification steps" icon="checkbox-outline" onPress={() => onOpenPage('checklists')} />
        <TopicCard theme={theme} title="Scenarios" subtitle="Common real-world confusion" icon="alert-circle-outline" onPress={() => onOpenPage('scenario-examples')} />
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
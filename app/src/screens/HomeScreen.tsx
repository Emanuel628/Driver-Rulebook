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
        <Text style={[styles.kicker, { color: palette.accent }]}>Pick what you need</Text>
        <Text style={[styles.title, { color: palette.text }]}>What are you trying to check?</Text>
        <Text style={[styles.subtitle, { color: palette.textMuted }]}>Tap the situation. Read the plain-English answer. Use the checklist. Open the official source if it matters.</Text>
      </View>

      <View style={styles.grid}> 
        <TopicCard theme={theme} title="Driving hours" subtitle="HOS clocks, breaks, resets" icon="time-outline" onPress={() => onOpenPage('hos-basics')} />
        <TopicCard theme={theme} title="Placards" subtitle="Shipping papers, labels, IDs" icon="diamond-outline" onPress={() => onOpenPage('placard-decision-guide')} />
        <TopicCard theme={theme} title="SDS / GHS" subtitle="Chemical labels and sheets" icon="document-text-outline" onPress={() => onOpenPage('ghs-vs-dot')} />
        <TopicCard theme={theme} title="Dock argument" subtitle="When driver, freight, or papers disagree" icon="alert-circle-outline" onPress={() => onOpenPage('common-dock-arguments')} />
        <TopicCard theme={theme} title="Quick checklist" subtitle="Step-by-step checks" icon="checkbox-outline" onPress={() => onOpenPage('checklists')} />
        <TopicCard theme={theme} title="Official sources" subtitle="FMCSA, PHMSA, OSHA, eCFR" icon="shield-checkmark-outline" onPress={() => onOpenPage('sources-updates')} />
      </View>

      <InfoCard theme={theme} title="Simple rule" body="This app points you to the right answer. It does not replace current regulations, shipping papers, SDS documents, employer procedures, or qualified safety personnel." tone="warning" />
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
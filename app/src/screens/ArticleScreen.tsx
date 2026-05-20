import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { colors, spacing } from '../theme/tokens';
import type { ThemeMode } from '../theme/tokens';
import type { GuidePage } from '../types/content';
import { InfoCard } from '../components/InfoCard';
import { AudioPlayer } from '../components/AudioPlayer';

type ArticleScreenProps = {
  theme: ThemeMode;
  page: GuidePage;
  showAudio: boolean;
  isPlaying: boolean;
  onPlayPause: () => void;
  onStop: () => void;
  onBack: () => void;
  onForward: () => void;
};

export function ArticleScreen({ theme, page, showAudio, isPlaying, onPlayPause, onStop, onBack, onForward }: ArticleScreenProps) {
  const palette = colors[theme];

  return (
    <ScrollView style={[styles.screen, { backgroundColor: palette.bg }]} contentContainerStyle={styles.content}> 
      <View style={styles.header}> 
        <Text style={[styles.chapter, { color: palette.accent }]}>Chapter {page.chapter}</Text>
        <Text style={[styles.title, { color: palette.text }]}>{page.title}</Text>
        <Text style={[styles.summary, { color: palette.textMuted }]}>{page.summary}</Text>
      </View>

      {showAudio && (
        <AudioPlayer
          theme={theme}
          title={page.title}
          isPlaying={isPlaying}
          onPlayPause={onPlayPause}
          onStop={onStop}
          onBack={onBack}
          onForward={onForward}
        />
      )}

      <InfoCard theme={theme} title="Plain-English Summary" body="This page is ready for researched content." />
      <InfoCard theme={theme} title="Research needed" body="No rule explanations have been added yet. The screen is only a layout and interaction skeleton." tone="warning" />
      <InfoCard theme={theme} title="Source status" body={`Last reviewed: ${page.lastReviewed}`} />
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
  chapter: {
    fontSize: 12,
    fontWeight: '900',
    letterSpacing: 1,
    textTransform: 'uppercase'
  },
  title: {
    fontSize: 30,
    fontWeight: '900',
    lineHeight: 35
  },
  summary: {
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 24
  }
});

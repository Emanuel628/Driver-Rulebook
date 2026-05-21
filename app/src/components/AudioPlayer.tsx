import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, radius, spacing } from '../theme/tokens';
import type { ThemeMode } from '../theme/tokens';

type AudioPlayerProps = {
  theme: ThemeMode;
  title: string;
  isPlaying: boolean;
  currentSegment: number;
  totalSegments: number;
  currentSegmentText: string;
  onPlayPause: () => void;
  onStop: () => void;
  onBack: () => void;
  onForward: () => void;
};

export function AudioPlayer({
  theme,
  title,
  isPlaying,
  currentSegment,
  totalSegments,
  currentSegmentText,
  onPlayPause,
  onStop,
  onBack,
  onForward
}: AudioPlayerProps) {
  const palette = colors[theme];
  const safeTotal = Math.max(totalSegments, 1);
  const progress = Math.min(((currentSegment + 1) / safeTotal) * 100, 100);
  const segmentLabel = `${Math.min(currentSegment + 1, safeTotal)} of ${safeTotal}`;

  return (
    <View style={[styles.wrap, { backgroundColor: palette.surfaceRaised, borderColor: palette.border }]}> 
      <Text style={[styles.caption, { color: palette.textSubtle }]}>Read aloud</Text>
      <Text numberOfLines={1} style={[styles.title, { color: palette.text }]}>{title}</Text>
      <Text style={[styles.helper, { color: palette.textMuted }]}>Uses your phone’s built-in voice. Change the voice quality in iOS or Android accessibility/speech settings.</Text>
      <View style={styles.trackRow}> 
        <Text style={[styles.time, { color: palette.textSubtle }]}>{segmentLabel}</Text>
        <View style={[styles.track, { backgroundColor: palette.border }]}> 
          <View style={[styles.trackFill, { backgroundColor: palette.accent, width: `${progress}%` }]} />
        </View>
        <Text style={[styles.time, { color: palette.textSubtle }]}>{isPlaying ? 'Reading' : 'Stopped'}</Text>
      </View>
      <Text numberOfLines={2} style={[styles.segmentText, { color: palette.textMuted }]}>{currentSegmentText}</Text>
      <View style={styles.controls}> 
        <Pressable onPress={onBack} style={styles.controlButton}> 
          <Ionicons name="play-back" size={22} color={palette.text} />
          <Text style={[styles.controlLabel, { color: palette.textSubtle }]}>Back</Text>
        </Pressable>
        <Pressable onPress={onPlayPause} style={[styles.primaryButton, { backgroundColor: palette.accent }]}> 
          <Ionicons name={isPlaying ? 'pause' : 'play'} size={24} color="#FFFFFF" />
        </Pressable>
        <Pressable onPress={onStop} style={styles.controlButton}> 
          <Ionicons name="stop" size={22} color={palette.text} />
          <Text style={[styles.controlLabel, { color: palette.textSubtle }]}>Stop</Text>
        </Pressable>
        <Pressable onPress={onForward} style={styles.controlButton}> 
          <Text style={[styles.controlLabel, { color: palette.textSubtle }]}>Next</Text>
          <Ionicons name="play-forward" size={22} color={palette.text} />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    borderRadius: radius.lg,
    borderWidth: 1,
    gap: spacing.sm,
    padding: spacing.lg
  },
  caption: {
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 0.8,
    textTransform: 'uppercase'
  },
  title: {
    fontSize: 16,
    fontWeight: '900'
  },
  helper: {
    fontSize: 13,
    fontWeight: '600',
    lineHeight: 18
  },
  trackRow: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: spacing.sm
  },
  track: {
    borderRadius: radius.pill,
    flex: 1,
    height: 8,
    overflow: 'hidden'
  },
  trackFill: {
    borderRadius: radius.pill,
    height: 8
  },
  segmentText: {
    fontSize: 13,
    fontWeight: '600',
    lineHeight: 18
  },
  time: {
    fontSize: 12,
    fontWeight: '700'
  },
  controls: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  controlButton: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 2,
    minWidth: 56,
    justifyContent: 'center'
  },
  controlLabel: {
    fontSize: 11,
    fontWeight: '800'
  },
  primaryButton: {
    alignItems: 'center',
    borderRadius: radius.pill,
    height: 52,
    justifyContent: 'center',
    width: 52
  }
});
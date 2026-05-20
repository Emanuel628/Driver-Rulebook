import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, radius, spacing } from '../theme/tokens';
import type { ThemeMode } from '../theme/tokens';

type AudioPlayerProps = {
  theme: ThemeMode;
  title: string;
  isPlaying: boolean;
  onPlayPause: () => void;
  onStop: () => void;
  onBack: () => void;
  onForward: () => void;
};

export function AudioPlayer({ theme, title, isPlaying, onPlayPause, onStop, onBack, onForward }: AudioPlayerProps) {
  const palette = colors[theme];

  return (
    <View style={[styles.wrap, { backgroundColor: palette.surfaceRaised, borderColor: palette.border }]}> 
      <Text style={[styles.caption, { color: palette.textSubtle }]}>Listening</Text>
      <Text numberOfLines={1} style={[styles.title, { color: palette.text }]}>{title}</Text>
      <View style={styles.trackRow}> 
        <Text style={[styles.time, { color: palette.textSubtle }]}>0:00</Text>
        <View style={[styles.track, { backgroundColor: palette.border }]}> 
          <View style={[styles.trackFill, { backgroundColor: palette.accent }]} />
        </View>
        <Text style={[styles.time, { color: palette.textSubtle }]}>--:--</Text>
      </View>
      <View style={styles.controls}> 
        <Pressable onPress={onBack} style={styles.controlButton}> 
          <Ionicons name="play-back" size={22} color={palette.text} />
          <Text style={[styles.controlLabel, { color: palette.textSubtle }]}>15</Text>
        </Pressable>
        <Pressable onPress={onPlayPause} style={[styles.primaryButton, { backgroundColor: palette.accent }]}> 
          <Ionicons name={isPlaying ? 'pause' : 'play'} size={24} color="#FFFFFF" />
        </Pressable>
        <Pressable onPress={onStop} style={styles.controlButton}> 
          <Ionicons name="stop" size={22} color={palette.text} />
        </Pressable>
        <Pressable onPress={onForward} style={styles.controlButton}> 
          <Text style={[styles.controlLabel, { color: palette.textSubtle }]}>15</Text>
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
    height: 8,
    width: '24%'
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
    minWidth: 46,
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

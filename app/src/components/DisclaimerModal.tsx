import { Pressable, StyleSheet, Text, View } from 'react-native';
import { colors, radius, spacing } from '../theme/tokens';
import type { ThemeMode } from '../theme/tokens';

type DisclaimerModalProps = {
  visible: boolean;
  theme: ThemeMode;
  onAccept: () => void;
};

export function DisclaimerModal({ visible, theme, onAccept }: DisclaimerModalProps) {
  if (!visible) return null;

  const palette = colors[theme];

  return (
    <View style={[styles.overlay, { backgroundColor: palette.overlay }]}> 
      <View style={[styles.card, { backgroundColor: palette.surface, borderColor: palette.border }]}> 
        <Text style={[styles.kicker, { color: palette.warning }]}>Educational reference only</Text>
        <Text style={[styles.title, { color: palette.text }]}>Before using Driver Rulebook</Text>
        <Text style={[styles.body, { color: palette.textMuted }]}>This app is a plain-English reference. It is not official training, an ELD, or a replacement for shipping papers, SDS documents, company procedures, current regulations, or qualified safety personnel.</Text>
        <Text style={[styles.body, { color: palette.textMuted }]}>Confirm requirements before making compliance decisions.</Text>
        <Pressable onPress={onAccept} style={[styles.button, { backgroundColor: palette.accent }]}> 
          <Text style={styles.buttonText}>Got it</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    alignItems: 'center',
    bottom: 0,
    justifyContent: 'center',
    left: 0,
    padding: spacing.lg,
    position: 'absolute',
    right: 0,
    top: 0,
    zIndex: 50
  },
  card: {
    borderRadius: radius.lg,
    borderWidth: 1,
    gap: spacing.md,
    padding: spacing.xl,
    width: '100%'
  },
  kicker: {
    fontSize: 12,
    fontWeight: '900',
    letterSpacing: 1,
    textTransform: 'uppercase'
  },
  title: {
    fontSize: 26,
    fontWeight: '900',
    lineHeight: 31
  },
  body: {
    fontSize: 15,
    fontWeight: '600',
    lineHeight: 23
  },
  button: {
    alignItems: 'center',
    borderRadius: radius.pill,
    marginTop: spacing.sm,
    paddingVertical: spacing.md
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '900'
  }
});

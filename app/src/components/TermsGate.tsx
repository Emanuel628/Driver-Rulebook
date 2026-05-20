import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { colors, radius, spacing } from '../theme/tokens';
import type { ThemeMode } from '../theme/tokens';

type TermsGateProps = {
  visible: boolean;
  theme: ThemeMode;
  onAccept: () => void;
};

export function TermsGate({ visible, theme, onAccept }: TermsGateProps) {
  if (!visible) return null;

  const palette = colors[theme];

  return (
    <View style={[styles.screen, { backgroundColor: palette.bg }]}> 
      <ScrollView contentContainerStyle={styles.content}> 
        <Text style={[styles.kicker, { color: palette.accent }]}>Required before use</Text>
        <Text style={[styles.title, { color: palette.text }]}>Terms of Service</Text>
        <Text style={[styles.body, { color: palette.textMuted }]}>By using Driver Rulebook, you agree that this app is an educational reference only. It is not official training, legal advice, an ELD, or a replacement for current regulations, company procedures, shipping papers, SDS documents, or qualified safety personnel.</Text>

        <View style={[styles.card, { backgroundColor: palette.surface, borderColor: palette.border }]}> 
          <Text style={[styles.cardTitle, { color: palette.text }]}>Privacy & local storage</Text>
          <Text style={[styles.cardBody, { color: palette.textMuted }]}>Version 1 is local-first. The app saves preferences, saved pages, checklist status, highlights, and this agreement on this device. No account is required.</Text>
        </View>

        <View style={[styles.card, { backgroundColor: palette.surface, borderColor: palette.border }]}> 
          <Text style={[styles.cardTitle, { color: palette.text }]}>User responsibility</Text>
          <Text style={[styles.cardBody, { color: palette.textMuted }]}>You are responsible for confirming requirements before making safety, transport, hazmat, HOS, workplace, or compliance decisions.</Text>
        </View>

        <View style={[styles.card, { backgroundColor: palette.surface, borderColor: palette.border }]}> 
          <Text style={[styles.cardTitle, { color: palette.text }]}>No guarantee</Text>
          <Text style={[styles.cardBody, { color: palette.textMuted }]}>Content may become outdated or incomplete. Always verify with current official sources and your employer's procedures.</Text>
        </View>

        <Pressable onPress={onAccept} style={[styles.button, { backgroundColor: palette.accent }]}> 
          <Text style={styles.buttonText}>I agree and continue</Text>
        </Pressable>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    bottom: 0,
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
    zIndex: 100
  },
  content: {
    gap: spacing.lg,
    minHeight: '100%',
    padding: spacing.xl,
    paddingTop: spacing.xxl * 2
  },
  kicker: {
    fontSize: 12,
    fontWeight: '900',
    letterSpacing: 1,
    textTransform: 'uppercase'
  },
  title: {
    fontSize: 34,
    fontWeight: '900',
    lineHeight: 39
  },
  body: {
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 24
  },
  card: {
    borderRadius: radius.lg,
    borderWidth: 1,
    gap: spacing.sm,
    padding: spacing.lg
  },
  cardTitle: {
    fontSize: 17,
    fontWeight: '900'
  },
  cardBody: {
    fontSize: 15,
    fontWeight: '600',
    lineHeight: 22
  },
  button: {
    alignItems: 'center',
    borderRadius: radius.pill,
    marginTop: spacing.sm,
    paddingVertical: spacing.lg
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '900'
  }
});

import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { colors, radius, spacing } from '../theme/tokens';
import type { ThemeMode } from '../theme/tokens';

type TermsGateProps = {
  visible: boolean;
  theme: ThemeMode;
  onAccept: () => void;
};

const legalSections = [
  {
    title: 'Educational reference only',
    body: 'Driver Rulebook is a plain-English educational reference. It is not official training, legal advice, an ELD, a compliance certification tool, or a replacement for current regulations, company procedures, shipping papers, SDS documents, dispatch instructions, carrier safety policies, or qualified safety personnel.'
  },
  {
    title: 'User responsibility',
    body: 'You are responsible for verifying requirements before making safety, transport, hazmat, HOS, workplace, routing, placarding, inspection, or compliance decisions. Rules can vary by operation, cargo, state, route, employer policy, and current regulatory updates.'
  },
  {
    title: 'Privacy: local-only app data',
    body: 'This app does not require an account. It does not ask for your name, email address, phone number, location, contacts, photos, camera, microphone, advertising ID, or payment information. It does not intentionally track you, sell data, or use analytics.'
  },
  {
    title: 'What is saved on this device',
    body: 'Driver Rulebook saves app preferences, theme, text size, audio speed, saved pages, checklist progress, highlights, Terms acceptance status, Terms version, and Terms acceptance time in local device storage so the app can remember your choices.'
  },
  {
    title: 'Security and device storage',
    body: 'Because saved data stays on this device, protect your phone with a passcode, Face ID, Touch ID, or device lock. Local app storage may be included in device backups depending on your iOS or Android settings. Deleting the app may delete local app data.'
  },
  {
    title: 'No tracking or data sale',
    body: 'Driver Rulebook does not use ad tracking, behavioral tracking, third-party analytics, cross-app tracking, or data sale features. If future versions add accounts, cloud sync, analytics, crash reporting, ads, payments, or support forms, this notice and the app store disclosures must be updated before release.'
  },
  {
    title: 'Official sources',
    body: 'The app may link to official government and regulatory sources so you can verify information. External websites are controlled by their own operators and may have their own privacy practices.'
  },
  {
    title: 'No guarantee of completeness',
    body: 'Regulations and guidance can change. Content may be incomplete, outdated, or simplified. Always verify with current official sources and your employer before relying on information.'
  }
];

export function TermsGate({ visible, theme, onAccept }: TermsGateProps) {
  if (!visible) return null;

  const palette = colors[theme];

  return (
    <View style={[styles.screen, { backgroundColor: palette.bg }]}> 
      <ScrollView contentContainerStyle={styles.content}> 
        <Text style={[styles.kicker, { color: palette.accent }]}>Required before use</Text>
        <Text style={[styles.title, { color: palette.text }]}>Terms, Privacy & Security</Text>
        <Text style={[styles.body, { color: palette.textMuted }]}>You must agree before entering the app. Your agreement is saved locally on this device.</Text>

        {legalSections.map(section => (
          <View key={section.title} style={[styles.card, { backgroundColor: palette.surface, borderColor: palette.border }]}> 
            <Text style={[styles.cardTitle, { color: palette.text }]}>{section.title}</Text>
            <Text style={[styles.cardBody, { color: palette.textMuted }]}>{section.body}</Text>
          </View>
        ))}

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

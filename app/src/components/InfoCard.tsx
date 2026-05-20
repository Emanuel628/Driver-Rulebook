import { StyleSheet, Text, View } from 'react-native';
import { colors, radius, spacing } from '../theme/tokens';
import type { ThemeMode } from '../theme/tokens';

type InfoCardProps = {
  title: string;
  body: string;
  theme: ThemeMode;
  tone?: 'normal' | 'warning';
};

export function InfoCard({ title, body, theme, tone = 'normal' }: InfoCardProps) {
  const palette = colors[theme];
  const borderColor = tone === 'warning' ? palette.warning : palette.border;

  return (
    <View style={[styles.card, { backgroundColor: palette.surface, borderColor }]}> 
      <Text style={[styles.title, { color: tone === 'warning' ? palette.warning : palette.text }]}>{title}</Text>
      <Text style={[styles.body, { color: palette.textMuted }]}>{body}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: radius.lg,
    borderWidth: 1,
    gap: spacing.sm,
    padding: spacing.lg
  },
  title: {
    fontSize: 15,
    fontWeight: '900'
  },
  body: {
    fontSize: 15,
    lineHeight: 22
  }
});

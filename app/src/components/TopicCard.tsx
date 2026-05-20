import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, radius, spacing } from '../theme/tokens';
import type { ThemeMode } from '../theme/tokens';

type TopicCardProps = {
  title: string;
  subtitle: string;
  icon: string;
  theme: ThemeMode;
  onPress: () => void;
};

export function TopicCard({ title, subtitle, icon, theme, onPress }: TopicCardProps) {
  const palette = colors[theme];

  return (
    <Pressable onPress={onPress} style={[styles.card, { backgroundColor: palette.surface, borderColor: palette.border }]}> 
      <View style={[styles.iconWrap, { backgroundColor: palette.accentSoft }]}> 
        <Ionicons name={icon as any} size={22} color={palette.text} />
      </View>
      <View style={styles.copy}> 
        <Text style={[styles.title, { color: palette.text }]}>{title}</Text>
        <Text style={[styles.subtitle, { color: palette.textSubtle }]}>{subtitle}</Text>
      </View>
      <Ionicons name="chevron-forward" size={20} color={palette.textSubtle} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    alignItems: 'center',
    borderRadius: radius.lg,
    borderWidth: 1,
    flexDirection: 'row',
    gap: spacing.md,
    padding: spacing.lg
  },
  iconWrap: {
    alignItems: 'center',
    borderRadius: radius.md,
    height: 44,
    justifyContent: 'center',
    width: 44
  },
  copy: {
    flex: 1,
    gap: 3
  },
  title: {
    fontSize: 16,
    fontWeight: '800'
  },
  subtitle: {
    fontSize: 13,
    fontWeight: '600'
  }
});

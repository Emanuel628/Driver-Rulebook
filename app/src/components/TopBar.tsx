import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, radius, spacing } from '../theme/tokens';
import type { ThemeMode } from '../theme/tokens';

type TopBarProps = {
  title: string;
  theme: ThemeMode;
  onMenuPress: () => void;
  onListenPress?: () => void;
};

export function TopBar({ title, theme, onMenuPress, onListenPress }: TopBarProps) {
  const palette = colors[theme];

  return (
    <View style={[styles.wrap, { backgroundColor: palette.bg, borderBottomColor: palette.border }]}> 
      <Pressable accessibilityLabel="Open menu" onPress={onMenuPress} style={[styles.iconButton, { backgroundColor: palette.surfaceRaised }]}> 
        <Ionicons name="menu" size={24} color={palette.text} />
      </Pressable>
      <Text numberOfLines={1} style={[styles.title, { color: palette.text }]}>{title}</Text>
      <Pressable accessibilityLabel="Listen to this page" onPress={onListenPress} style={[styles.iconButton, { backgroundColor: palette.surfaceRaised }]}> 
        <Ionicons name="volume-high-outline" size={22} color={palette.text} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    alignItems: 'center',
    borderBottomWidth: 1,
    flexDirection: 'row',
    gap: spacing.md,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md
  },
  iconButton: {
    alignItems: 'center',
    borderRadius: radius.pill,
    height: 44,
    justifyContent: 'center',
    width: 44
  },
  title: {
    flex: 1,
    fontSize: 18,
    fontWeight: '800'
  }
});

import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, radius, spacing } from '../theme/tokens';
import type { ThemeMode } from '../theme/tokens';
import type { DrawerGroup, GuidePage } from '../types/content';

type HamburgerDrawerProps = {
  visible: boolean;
  theme: ThemeMode;
  groups: DrawerGroup[];
  pageMap: Record<string, GuidePage>;
  onClose: () => void;
  onSelectPage: (pageId: string) => void;
  onOpenSettings: () => void;
};

export function HamburgerDrawer({ visible, theme, groups, pageMap, onClose, onSelectPage, onOpenSettings }: HamburgerDrawerProps) {
  if (!visible) return null;

  const palette = colors[theme];

  return (
    <View style={[styles.overlay, { backgroundColor: palette.overlay }]}> 
      <View style={[styles.drawer, { backgroundColor: palette.bg, borderRightColor: palette.border }]}> 
        <View style={styles.header}> 
          <View>
            <Text style={[styles.brand, { color: palette.text }]}>Driver Rulebook</Text>
            <Text style={[styles.subtitle, { color: palette.textSubtle }]}>App structure preview</Text>
          </View>
          <Pressable onPress={onClose} style={[styles.closeButton, { backgroundColor: palette.surfaceRaised }]}> 
            <Ionicons name="close" size={22} color={palette.text} />
          </Pressable>
        </View>

        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}> 
          {groups.map(group => (
            <View key={group.id} style={styles.group}> 
              <Text style={[styles.groupTitle, { color: palette.textSubtle }]}>{group.title}</Text>
              {group.pageIds.map(pageId => {
                const page = pageMap[pageId];
                if (!page) return null;
                return (
                  <Pressable key={pageId} onPress={() => onSelectPage(pageId)} style={[styles.pageLink, { backgroundColor: palette.surface }]}> 
                    <Text numberOfLines={1} style={[styles.pageTitle, { color: palette.text }]}>{page.title}</Text>
                    <Ionicons name="chevron-forward" size={16} color={palette.textSubtle} />
                  </Pressable>
                );
              })}
            </View>
          ))}

          <View style={styles.group}> 
            <Text style={[styles.groupTitle, { color: palette.textSubtle }]}>Settings</Text>
            <Pressable onPress={onOpenSettings} style={[styles.pageLink, { backgroundColor: palette.surface }]}> 
              <Text style={[styles.pageTitle, { color: palette.text }]}>Display, Listen Mode, About</Text>
              <Ionicons name="settings-outline" size={16} color={palette.textSubtle} />
            </Pressable>
          </View>
        </ScrollView>
      </View>
      <Pressable style={styles.backdrop} onPress={onClose} />
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    bottom: 0,
    flexDirection: 'row',
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
    zIndex: 30
  },
  drawer: {
    borderRightWidth: 1,
    height: '100%',
    maxWidth: 360,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.xl,
    width: '86%'
  },
  backdrop: {
    flex: 1
  },
  header: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.lg
  },
  brand: {
    fontSize: 22,
    fontWeight: '900'
  },
  subtitle: {
    fontSize: 13,
    fontWeight: '700',
    marginTop: 3
  },
  closeButton: {
    alignItems: 'center',
    borderRadius: radius.pill,
    height: 42,
    justifyContent: 'center',
    width: 42
  },
  scroll: {
    gap: spacing.lg,
    paddingBottom: spacing.xxl
  },
  group: {
    gap: spacing.sm
  },
  groupTitle: {
    fontSize: 12,
    fontWeight: '900',
    letterSpacing: 1,
    textTransform: 'uppercase'
  },
  pageLink: {
    alignItems: 'center',
    borderRadius: radius.md,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md
  },
  pageTitle: {
    flex: 1,
    fontSize: 14,
    fontWeight: '700'
  }
});

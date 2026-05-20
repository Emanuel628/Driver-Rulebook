import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, radius, spacing } from '../theme/tokens';
import type { ThemeMode } from '../theme/tokens';
import type { ContentBlock } from '../types/content';

type ContentBlockRendererProps = {
  theme: ThemeMode;
  block: ContentBlock;
  pageId: string;
  label: string;
  isHighlighted: boolean;
  checklistState: Record<string, boolean>;
  onSaveHighlight: () => void;
  onEraseHighlight: () => void;
  onToggleChecklistItem: (itemKey: string) => void;
};

export function ContentBlockRenderer({
  theme,
  block,
  pageId,
  label,
  isHighlighted,
  checklistState,
  onSaveHighlight,
  onEraseHighlight,
  onToggleChecklistItem
}: ContentBlockRendererProps) {
  const palette = colors[theme];
  const title = 'title' in block ? block.title : label;
  const tone = block.type === 'warning' ? 'warning' : block.type === 'summary' ? 'summary' : 'normal';
  const borderColor = isHighlighted ? palette.accent : tone === 'warning' ? palette.warning : palette.border;
  const backgroundColor = isHighlighted ? palette.accentSoft : palette.surface;

  return (
    <View style={[styles.card, { backgroundColor, borderColor }]}> 
      <View style={styles.header}> 
        <Text style={[styles.title, { color: tone === 'warning' ? palette.warning : palette.text }]}>{title}</Text>
        <Pressable onPress={isHighlighted ? onEraseHighlight : onSaveHighlight} onLongPress={onSaveHighlight} style={[styles.highlightButton, { backgroundColor: palette.surfaceRaised }]}> 
          <Ionicons name={isHighlighted ? 'eraser-outline' : 'create-outline'} size={18} color={isHighlighted ? palette.warning : palette.text} />
          <Text style={[styles.highlightButtonText, { color: isHighlighted ? palette.warning : palette.textSubtle }]}>{isHighlighted ? 'Erase' : 'Highlight'}</Text>
        </Pressable>
      </View>

      {renderBlockBody({ block, pageId, palette, checklistState, onToggleChecklistItem, onSaveHighlight })}
    </View>
  );
}

function renderBlockBody({
  block,
  pageId,
  palette,
  checklistState,
  onToggleChecklistItem,
  onSaveHighlight
}: {
  block: ContentBlock;
  pageId: string;
  palette: typeof colors.dark;
  checklistState: Record<string, boolean>;
  onToggleChecklistItem: (itemKey: string) => void;
  onSaveHighlight: () => void;
}) {
  if (block.type === 'checklist' || block.type === 'steps') {
    return (
      <View style={styles.list}> 
        {block.items.map((item, index) => {
          const itemKey = `${pageId}:${block.id}:${index}`;
          const checked = Boolean(checklistState[itemKey]);
          return (
            <Pressable key={itemKey} onPress={() => onToggleChecklistItem(itemKey)} style={styles.listItem}> 
              <Ionicons name={checked ? 'checkmark-circle' : 'ellipse-outline'} size={22} color={checked ? palette.success : palette.textSubtle} />
              <Text style={[styles.body, { color: checked ? palette.textSubtle : palette.textMuted, textDecorationLine: checked ? 'line-through' : 'none' }]}>{item}</Text>
            </Pressable>
          );
        })}
      </View>
    );
  }

  if (block.type === 'example') {
    return <Text selectable onLongPress={onSaveHighlight} style={[styles.body, { color: palette.textMuted }]}>{block.text}</Text>;
  }

  return <Text selectable onLongPress={onSaveHighlight} style={[styles.body, { color: palette.textMuted }]}>{block.text}</Text>;
}

export function blockToPlainText(block: ContentBlock): string {
  if (block.type === 'checklist' || block.type === 'steps') return block.items.join('\n');
  return block.text;
}

const styles = StyleSheet.create({
  card: {
    borderRadius: radius.lg,
    borderWidth: 1,
    gap: spacing.md,
    padding: spacing.lg
  },
  header: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: spacing.md,
    justifyContent: 'space-between'
  },
  title: {
    flex: 1,
    fontSize: 15,
    fontWeight: '900'
  },
  body: {
    flex: 1,
    fontSize: 15,
    fontWeight: '600',
    lineHeight: 23
  },
  highlightButton: {
    alignItems: 'center',
    borderRadius: radius.pill,
    flexDirection: 'row',
    gap: spacing.xs,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm
  },
  highlightButtonText: {
    fontSize: 12,
    fontWeight: '900'
  },
  list: {
    gap: spacing.md
  },
  listItem: {
    alignItems: 'flex-start',
    flexDirection: 'row',
    gap: spacing.sm
  }
});

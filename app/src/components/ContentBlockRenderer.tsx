import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, radius, spacing } from '../theme/tokens';
import type { ThemeMode } from '../theme/tokens';
import type { ContentBlock } from '../types/content';

type TextSize = 'normal' | 'large' | 'extra-large';

type ContentBlockRendererProps = {
  theme: ThemeMode;
  textSize: TextSize;
  block: ContentBlock;
  pageId: string;
  label: string;
  isHighlighted: boolean;
  checklistState: Record<string, boolean>;
  onSaveHighlight: () => void;
  onEraseHighlight: () => void;
  onToggleChecklistItem: (itemKey: string) => void;
};

function textScale(textSize: TextSize): number {
  if (textSize === 'extra-large') return 1.22;
  if (textSize === 'large') return 1.12;
  return 1;
}

export function ContentBlockRenderer({
  theme,
  textSize,
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
  const scale = textScale(textSize);
  const title = 'title' in block ? block.title : label;
  const tone = block.type === 'warning' ? 'warning' : block.type === 'summary' ? 'summary' : 'normal';
  const borderColor = isHighlighted ? palette.accent : tone === 'warning' ? palette.warning : palette.border;
  const backgroundColor = isHighlighted ? palette.accentSoft : palette.surface;

  return (
    <View style={[styles.card, { backgroundColor, borderColor }]}> 
      <View style={styles.header}> 
        <Text style={[styles.title, { color: tone === 'warning' ? palette.warning : palette.text, fontSize: 15 * scale }]}>{title}</Text>
        <Pressable onPress={isHighlighted ? onEraseHighlight : onSaveHighlight} onLongPress={onSaveHighlight} style={[styles.highlightButton, { backgroundColor: palette.surfaceRaised }]}> 
          <Ionicons name={isHighlighted ? 'eraser-outline' : 'create-outline'} size={18} color={isHighlighted ? palette.warning : palette.text} />
          <Text style={[styles.highlightButtonText, { color: isHighlighted ? palette.warning : palette.textSubtle }]}>{isHighlighted ? 'Erase' : 'Highlight'}</Text>
        </Pressable>
      </View>

      {renderBlockBody({ block, pageId, palette, checklistState, onToggleChecklistItem, onSaveHighlight, scale })}
    </View>
  );
}

function renderBlockBody({
  block,
  pageId,
  palette,
  checklistState,
  onToggleChecklistItem,
  onSaveHighlight,
  scale
}: {
  block: ContentBlock;
  pageId: string;
  palette: typeof colors.dark;
  checklistState: Record<string, boolean>;
  onToggleChecklistItem: (itemKey: string) => void;
  onSaveHighlight: () => void;
  scale: number;
}) {
  const bodyStyle = { fontSize: 15 * scale, lineHeight: 23 * scale };

  if (block.type === 'checklist' || block.type === 'steps') {
    return (
      <View style={styles.list}> 
        {block.items.map((item, index) => {
          const itemKey = `${pageId}:${block.id}:${index}`;
          const checked = Boolean(checklistState[itemKey]);
          return (
            <Pressable key={itemKey} onPress={() => onToggleChecklistItem(itemKey)} style={styles.listItem}> 
              <Ionicons name={checked ? 'checkmark-circle' : 'ellipse-outline'} size={22 * scale} color={checked ? palette.success : palette.textSubtle} />
              <Text style={[styles.body, bodyStyle, { color: checked ? palette.textSubtle : palette.textMuted, textDecorationLine: checked ? 'line-through' : 'none' }]}>{item}</Text>
            </Pressable>
          );
        })}
      </View>
    );
  }

  return <Text selectable onLongPress={onSaveHighlight} style={[styles.body, bodyStyle, { color: palette.textMuted }]}>{block.text}</Text>;
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
    fontWeight: '900'
  },
  body: {
    flex: 1,
    fontWeight: '600'
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

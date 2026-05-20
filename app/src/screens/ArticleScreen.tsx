import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, radius, spacing } from '../theme/tokens';
import type { ThemeMode } from '../theme/tokens';
import type { ContentBlock, GuidePage, SavedHighlight } from '../types/content';
import { InfoCard } from '../components/InfoCard';
import { AudioPlayer } from '../components/AudioPlayer';

type ArticleScreenProps = {
  theme: ThemeMode;
  page: GuidePage;
  showAudio: boolean;
  isPlaying: boolean;
  highlights: SavedHighlight[];
  onPlayPause: () => void;
  onStop: () => void;
  onBack: () => void;
  onForward: () => void;
  onSaveHighlight: (block: ContentBlock, selectedText: string) => void;
  onEraseHighlight: (pageId: string, paragraphId: string) => void;
};

export function ArticleScreen({ theme, page, showAudio, isPlaying, highlights, onPlayPause, onStop, onBack, onForward, onSaveHighlight, onEraseHighlight }: ArticleScreenProps) {
  const palette = colors[theme];

  return (
    <ScrollView style={[styles.screen, { backgroundColor: palette.bg }]} contentContainerStyle={styles.content}> 
      <View style={styles.header}> 
        <Text style={[styles.chapter, { color: palette.accent }]}>Chapter {page.chapter}</Text>
        <Text style={[styles.title, { color: palette.text }]}>{page.title}</Text>
        <Text style={[styles.summary, { color: palette.textMuted }]}>{page.summary}</Text>
      </View>

      {showAudio && (
        <AudioPlayer
          theme={theme}
          title={page.title}
          isPlaying={isPlaying}
          onPlayPause={onPlayPause}
          onStop={onStop}
          onBack={onBack}
          onForward={onForward}
        />
      )}

      <InfoCard theme={theme} title="Highlight mode" body="Long-press a paragraph block to save it as a highlight. Native drag-selection capture will be wired later with a platform text-selection bridge." tone="warning" />

      {page.content.map((block, index) => (
        <HighlightableBlock
          key={block.id}
          theme={theme}
          block={block}
          pageId={page.id}
          label={`Paragraph ${index + 1}`}
          isHighlighted={highlights.some(item => item.pageId === page.id && item.paragraphId === block.id)}
          onSave={() => onSaveHighlight(block, blockToText(block))}
          onErase={() => onEraseHighlight(page.id, block.id)}
        />
      ))}

      <InfoCard theme={theme} title="Source status" body={`Last reviewed: ${page.lastReviewed}`} />
    </ScrollView>
  );
}

type HighlightableBlockProps = {
  theme: ThemeMode;
  pageId: string;
  block: ContentBlock;
  label: string;
  isHighlighted: boolean;
  onSave: () => void;
  onErase: () => void;
};

function HighlightableBlock({ theme, block, label, isHighlighted, onSave, onErase }: HighlightableBlockProps) {
  const palette = colors[theme];
  const text = blockToText(block);
  const title = 'title' in block ? block.title : label;

  return (
    <View style={[styles.highlightCard, { backgroundColor: isHighlighted ? palette.accentSoft : palette.surface, borderColor: isHighlighted ? palette.accent : palette.border }]}> 
      <View style={styles.highlightHeader}> 
        <Text style={[styles.blockTitle, { color: palette.text }]}>{title}</Text>
        <Pressable onPress={isHighlighted ? onErase : onSave} onLongPress={onSave} style={[styles.highlightButton, { backgroundColor: palette.surfaceRaised }]}> 
          <Ionicons name={isHighlighted ? 'eraser-outline' : 'create-outline'} size={18} color={isHighlighted ? palette.warning : palette.text} />
          <Text style={[styles.highlightButtonText, { color: isHighlighted ? palette.warning : palette.textSubtle }]}>{isHighlighted ? 'Erase' : 'Highlight'}</Text>
        </Pressable>
      </View>
      <Text selectable onLongPress={onSave} style={[styles.blockText, { color: palette.textMuted }]}>{text}</Text>
    </View>
  );
}

function blockToText(block: ContentBlock): string {
  if (block.type === 'checklist' || block.type === 'steps') {
    return block.items.join('\n');
  }

  return block.text;
}

const styles = StyleSheet.create({
  screen: {
    flex: 1
  },
  content: {
    gap: spacing.lg,
    padding: spacing.lg,
    paddingBottom: spacing.xxl
  },
  header: {
    gap: spacing.sm,
    paddingTop: spacing.md
  },
  chapter: {
    fontSize: 12,
    fontWeight: '900',
    letterSpacing: 1,
    textTransform: 'uppercase'
  },
  title: {
    fontSize: 30,
    fontWeight: '900',
    lineHeight: 35
  },
  summary: {
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 24
  },
  highlightCard: {
    borderRadius: radius.lg,
    borderWidth: 1,
    gap: spacing.md,
    padding: spacing.lg
  },
  highlightHeader: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: spacing.md,
    justifyContent: 'space-between'
  },
  blockTitle: {
    flex: 1,
    fontSize: 15,
    fontWeight: '900'
  },
  blockText: {
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
  }
});

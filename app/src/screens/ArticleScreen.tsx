import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
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
  currentSegment: number;
  totalSegments: number;
  currentSegmentText: string;
  previousPageTitle?: string;
  nextPageTitle?: string;
  onPreviousPage: () => void;
  onNextPage: () => void;
  onPlayPause: () => void;
  onStop: () => void;
  onBack: () => void;
  onForward: () => void;
  onSaveHighlight: (block: ContentBlock, selectedText: string) => void;
  onEraseHighlight: (pageId: string, paragraphId: string) => void;
};

const SWIPE_DISTANCE = 72;
const SWIPE_VELOCITY = 520;
const VERTICAL_FAIL_DISTANCE = 48;

export function ArticleScreen({
  theme,
  page,
  showAudio,
  isPlaying,
  highlights,
  currentSegment,
  totalSegments,
  currentSegmentText,
  previousPageTitle,
  nextPageTitle,
  onPreviousPage,
  onNextPage,
  onPlayPause,
  onStop,
  onBack,
  onForward,
  onSaveHighlight,
  onEraseHighlight
}: ArticleScreenProps) {
  const palette = colors[theme];

  const swipeGesture = Gesture.Pan()
    .activeOffsetX([-24, 24])
    .failOffsetY([-VERTICAL_FAIL_DISTANCE, VERTICAL_FAIL_DISTANCE])
    .onEnd(event => {
      const isHorizontal = Math.abs(event.translationX) > Math.abs(event.translationY) * 1.4;
      if (!isHorizontal) return;

      const isStrongSwipe = Math.abs(event.translationX) > SWIPE_DISTANCE || Math.abs(event.velocityX) > SWIPE_VELOCITY;
      if (!isStrongSwipe) return;

      if (event.translationX < 0 && nextPageTitle) {
        onNextPage();
        return;
      }

      if (event.translationX > 0 && previousPageTitle) {
        onPreviousPage();
      }
    });

  return (
    <GestureDetector gesture={swipeGesture}>
      <View style={[styles.screen, { backgroundColor: palette.bg }]}> 
        <ScrollView style={styles.scroll} contentContainerStyle={styles.content}> 
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
              currentSegment={currentSegment}
              totalSegments={totalSegments}
              currentSegmentText={currentSegmentText}
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

          <View style={styles.pageControls}> 
            <PageControlButton
              theme={theme}
              label="Previous"
              title={previousPageTitle ?? 'First page'}
              icon="chevron-back"
              disabled={!previousPageTitle}
              onPress={onPreviousPage}
            />
            <PageControlButton
              theme={theme}
              label="Next"
              title={nextPageTitle ?? 'Last page'}
              icon="chevron-forward"
              disabled={!nextPageTitle}
              onPress={onNextPage}
              iconRight
            />
          </View>
        </ScrollView>
      </View>
    </GestureDetector>
  );
}

type PageControlButtonProps = {
  theme: ThemeMode;
  label: string;
  title: string;
  icon: string;
  disabled: boolean;
  iconRight?: boolean;
  onPress: () => void;
};

function PageControlButton({ theme, label, title, icon, disabled, iconRight = false, onPress }: PageControlButtonProps) {
  const palette = colors[theme];
  const content = (
    <>
      {!iconRight && <Ionicons name={icon as any} size={18} color={disabled ? palette.textSubtle : palette.text} />}
      <View style={styles.pageControlCopy}> 
        <Text style={[styles.pageControlLabel, { color: disabled ? palette.textSubtle : palette.accent }]}>{label}</Text>
        <Text numberOfLines={1} style={[styles.pageControlTitle, { color: disabled ? palette.textSubtle : palette.text }]}>{title}</Text>
      </View>
      {iconRight && <Ionicons name={icon as any} size={18} color={disabled ? palette.textSubtle : palette.text} />}
    </>
  );

  return (
    <Pressable
      disabled={disabled}
      onPress={onPress}
      style={[styles.pageControlButton, { backgroundColor: disabled ? palette.bgAlt : palette.surface, borderColor: disabled ? palette.border : palette.accentSoft, opacity: disabled ? 0.58 : 1 }]}
    >
      {content}
    </Pressable>
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
  scroll: {
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
  },
  pageControls: {
    flexDirection: 'row',
    gap: spacing.md
  },
  pageControlButton: {
    alignItems: 'center',
    borderRadius: radius.lg,
    borderWidth: 1,
    flex: 1,
    flexDirection: 'row',
    gap: spacing.sm,
    minHeight: 74,
    padding: spacing.md
  },
  pageControlCopy: {
    flex: 1,
    gap: 3
  },
  pageControlLabel: {
    fontSize: 11,
    fontWeight: '900',
    letterSpacing: 0.6,
    textTransform: 'uppercase'
  },
  pageControlTitle: {
    fontSize: 13,
    fontWeight: '800'
  }
});

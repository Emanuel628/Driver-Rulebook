import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import { colors, radius, spacing } from '../theme/tokens';
import type { ThemeMode } from '../theme/tokens';
import type { ContentBlock, GuidePage, SavedHighlight } from '../types/content';
import { AudioPlayer } from '../components/AudioPlayer';
import { blockToPlainText, ContentBlockRenderer } from '../components/ContentBlockRenderer';

type TextSize = 'normal' | 'large' | 'extra-large';

type ArticleScreenProps = {
  theme: ThemeMode;
  textSize: TextSize;
  page: GuidePage;
  showAudio: boolean;
  isPlaying: boolean;
  highlights: SavedHighlight[];
  currentSegment: number;
  totalSegments: number;
  currentSegmentText: string;
  previousPageTitle?: string;
  nextPageTitle?: string;
  checklistState: Record<string, boolean>;
  isSaved: boolean;
  onPreviousPage: () => void;
  onNextPage: () => void;
  onPlayPause: () => void;
  onStop: () => void;
  onBack: () => void;
  onForward: () => void;
  onToggleSavedPage: () => void;
  onToggleChecklistItem: (itemKey: string) => void;
  onResetPageChecklist: () => void;
  onSaveHighlight: (block: ContentBlock, selectedText: string) => void;
  onEraseHighlight: (pageId: string, paragraphId: string) => void;
};

const SWIPE_DISTANCE = 72;
const SWIPE_VELOCITY = 520;
const VERTICAL_FAIL_DISTANCE = 48;

export function ArticleScreen(props: ArticleScreenProps) {
  const {
    theme,
    textSize,
    page,
    showAudio,
    isPlaying,
    highlights,
    currentSegment,
    totalSegments,
    currentSegmentText,
    previousPageTitle,
    nextPageTitle,
    checklistState,
    isSaved,
    onPreviousPage,
    onNextPage,
    onPlayPause,
    onStop,
    onBack,
    onForward,
    onToggleSavedPage,
    onToggleChecklistItem,
    onResetPageChecklist,
    onSaveHighlight,
    onEraseHighlight
  } = props;

  const palette = colors[theme];
  const swipeGesture = Gesture.Pan()
    .activeOffsetX([-24, 24])
    .failOffsetY([-VERTICAL_FAIL_DISTANCE, VERTICAL_FAIL_DISTANCE])
    .onEnd(event => {
      const isHorizontal = Math.abs(event.translationX) > Math.abs(event.translationY) * 1.4;
      const isStrongSwipe = Math.abs(event.translationX) > SWIPE_DISTANCE || Math.abs(event.velocityX) > SWIPE_VELOCITY;
      if (!isHorizontal || !isStrongSwipe) return;
      if (event.translationX < 0 && nextPageTitle) onNextPage();
      if (event.translationX > 0 && previousPageTitle) onPreviousPage();
    });

  return (
    <GestureDetector gesture={swipeGesture}>
      <View style={[styles.screen, { backgroundColor: palette.bg }]}> 
        <ScrollView style={styles.scroll} contentContainerStyle={styles.content}> 
          <View style={styles.header}> 
            <View style={styles.headerTop}> 
              <Text style={[styles.chapter, { color: palette.accent }]}>Chapter {page.chapter}</Text>
              <Pressable onPress={onToggleSavedPage} style={[styles.saveButton, { backgroundColor: palette.surfaceRaised }]}> 
                <Ionicons name={isSaved ? 'bookmark' : 'bookmark-outline'} size={18} color={isSaved ? palette.warning : palette.text} />
                <Text style={[styles.saveText, { color: isSaved ? palette.warning : palette.textSubtle }]}>{isSaved ? 'Saved' : 'Save'}</Text>
              </Pressable>
            </View>
            <Text style={[styles.title, { color: palette.text }]}>{page.title}</Text>
            <Text style={[styles.summary, { color: palette.textMuted }]}>{page.summary}</Text>
          </View>

          {showAudio && (
            <AudioPlayer theme={theme} title={page.title} isPlaying={isPlaying} currentSegment={currentSegment} totalSegments={totalSegments} currentSegmentText={currentSegmentText} onPlayPause={onPlayPause} onStop={onStop} onBack={onBack} onForward={onForward} />
          )}

          {page.content.map((block, index) => (
            <ContentBlockRenderer key={block.id} theme={theme} textSize={textSize} block={block} pageId={page.id} label={`Paragraph ${index + 1}`} isHighlighted={highlights.some(item => item.pageId === page.id && item.paragraphId === block.id)} checklistState={checklistState} onSaveHighlight={() => onSaveHighlight(block, blockToPlainText(block))} onEraseHighlight={() => onEraseHighlight(page.id, block.id)} onToggleChecklistItem={onToggleChecklistItem} />
          ))}

          <View style={[styles.sourceCard, { backgroundColor: palette.surface, borderColor: palette.border }]}> 
            <Text style={[styles.sourceTitle, { color: palette.text }]}>Source status</Text>
            <Text style={[styles.sourceText, { color: palette.textMuted }]}>Last reviewed: {page.lastReviewed}</Text>
            <Pressable onPress={onResetPageChecklist} style={[styles.resetButton, { backgroundColor: palette.bgAlt }]}> 
              <Ionicons name="refresh" size={16} color={palette.textSubtle} />
              <Text style={[styles.resetText, { color: palette.textSubtle }]}>Reset this page checklist</Text>
            </Pressable>
          </View>

          <View style={styles.pageControls}> 
            <PageControlButton theme={theme} label="Previous" title={previousPageTitle ?? 'First page'} icon="chevron-back" disabled={!previousPageTitle} onPress={onPreviousPage} />
            <PageControlButton theme={theme} label="Next" title={nextPageTitle ?? 'Last page'} icon="chevron-forward" disabled={!nextPageTitle} onPress={onNextPage} iconRight />
          </View>
        </ScrollView>
      </View>
    </GestureDetector>
  );
}

type PageControlButtonProps = { theme: ThemeMode; label: string; title: string; icon: string; disabled: boolean; iconRight?: boolean; onPress: () => void };

function PageControlButton({ theme, label, title, icon, disabled, iconRight = false, onPress }: PageControlButtonProps) {
  const palette = colors[theme];
  return (
    <Pressable disabled={disabled} onPress={onPress} style={[styles.pageControlButton, { backgroundColor: disabled ? palette.bgAlt : palette.surface, borderColor: disabled ? palette.border : palette.accentSoft, opacity: disabled ? 0.58 : 1 }]}> 
      {!iconRight && <Ionicons name={icon as any} size={18} color={disabled ? palette.textSubtle : palette.text} />}
      <View style={styles.pageControlCopy}> 
        <Text style={[styles.pageControlLabel, { color: disabled ? palette.textSubtle : palette.accent }]}>{label}</Text>
        <Text numberOfLines={1} style={[styles.pageControlTitle, { color: disabled ? palette.textSubtle : palette.text }]}>{title}</Text>
      </View>
      {iconRight && <Ionicons name={icon as any} size={18} color={disabled ? palette.textSubtle : palette.text} />}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1 },
  scroll: { flex: 1 },
  content: { gap: spacing.lg, padding: spacing.lg, paddingBottom: spacing.xxl },
  header: { gap: spacing.sm, paddingTop: spacing.md },
  headerTop: { alignItems: 'center', flexDirection: 'row', gap: spacing.md, justifyContent: 'space-between' },
  chapter: { flex: 1, fontSize: 12, fontWeight: '900', letterSpacing: 1, textTransform: 'uppercase' },
  saveButton: { alignItems: 'center', borderRadius: radius.pill, flexDirection: 'row', gap: spacing.xs, paddingHorizontal: spacing.md, paddingVertical: spacing.sm },
  saveText: { fontSize: 12, fontWeight: '900' },
  title: { fontSize: 30, fontWeight: '900', lineHeight: 35 },
  summary: { fontSize: 16, fontWeight: '600', lineHeight: 24 },
  sourceCard: { borderRadius: radius.lg, borderWidth: 1, gap: spacing.sm, padding: spacing.lg },
  sourceTitle: { fontSize: 15, fontWeight: '900' },
  sourceText: { fontSize: 14, fontWeight: '600' },
  resetButton: { alignItems: 'center', alignSelf: 'flex-start', borderRadius: radius.pill, flexDirection: 'row', gap: spacing.xs, marginTop: spacing.xs, paddingHorizontal: spacing.md, paddingVertical: spacing.sm },
  resetText: { fontSize: 12, fontWeight: '900' },
  pageControls: { flexDirection: 'row', gap: spacing.md },
  pageControlButton: { alignItems: 'center', borderRadius: radius.lg, borderWidth: 1, flex: 1, flexDirection: 'row', gap: spacing.sm, minHeight: 74, padding: spacing.md },
  pageControlCopy: { flex: 1, gap: 3 },
  pageControlLabel: { fontSize: 11, fontWeight: '900', letterSpacing: 0.6, textTransform: 'uppercase' },
  pageControlTitle: { fontSize: 13, fontWeight: '800' }
});

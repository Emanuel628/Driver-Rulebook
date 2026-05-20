import { useEffect, useMemo, useState } from 'react';
import { SafeAreaView, StatusBar, StyleSheet, View } from 'react-native';
import * as Speech from 'expo-speech';
import { BottomNav } from './components/BottomNav';
import { HamburgerDrawer } from './components/HamburgerDrawer';
import { TopBar } from './components/TopBar';
import { drawerGroups, guidePageMap, guidePages } from './content/pages';
import { colors } from './theme/tokens';
import type { ThemeMode } from './theme/tokens';
import type { ContentBlock, MainTab, SavedHighlight } from './types/content';
import { ArticleScreen } from './screens/ArticleScreen';
import { HighlightsScreen } from './screens/HighlightsScreen';
import { HomeScreen } from './screens/HomeScreen';
import { ListScreen } from './screens/ListScreen';
import { SettingsScreen } from './screens/SettingsScreen';
import { clearHighlightsForParagraph, deleteHighlight, loadHighlights, saveHighlight } from './storage/highlightStorage';
import { clampSegmentIndex, splitAudioScript } from './utils/listenMode';

export default function App() {
  const [theme, setTheme] = useState<ThemeMode>('dark');
  const [activeTab, setActiveTab] = useState<MainTab>('home');
  const [activePageId, setActivePageId] = useState('index-quick-start');
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [highlightsOpen, setHighlightsOpen] = useState(false);
  const [audioOpen, setAudioOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSegment, setCurrentSegment] = useState(0);
  const [textSize, setTextSize] = useState<'normal' | 'large' | 'extra-large'>('normal');
  const [audioSpeed, setAudioSpeed] = useState<'0.75x' | '1.0x' | '1.25x' | '1.5x'>('1.0x');
  const [highlights, setHighlights] = useState<SavedHighlight[]>([]);

  const palette = colors[theme];
  const activePage = guidePageMap[activePageId] ?? guidePages[0];
  const audioSegments = useMemo(() => splitAudioScript(activePage.audioScript), [activePage.audioScript]);
  const activeAudioSegment = audioSegments[currentSegment] ?? audioSegments[0] ?? '';

  useEffect(() => {
    loadHighlights().then(setHighlights).catch(() => setHighlights([]));
  }, []);

  useEffect(() => {
    Speech.stop();
    setIsPlaying(false);
    setCurrentSegment(0);
  }, [activePageId]);

  const pageTitle = useMemo(() => {
    if (settingsOpen) return 'Settings';
    if (highlightsOpen) return 'Saved Highlights';
    if (activeTab === 'home') return 'Driver Rulebook';
    if (activeTab === 'guides') return activePage.title;
    if (activeTab === 'checklists') return 'Checklists';
    if (activeTab === 'search') return 'Search';
    if (activeTab === 'saved') return 'Saved';
    return activePage.title;
  }, [activePage.title, activeTab, highlightsOpen, settingsOpen]);

  const openPage = (pageId: string) => {
    stopSpeech();
    setActivePageId(pageId);
    setActiveTab('guides');
    setSettingsOpen(false);
    setHighlightsOpen(false);
    setDrawerOpen(false);
    setAudioOpen(false);
    setCurrentSegment(0);
  };

  const speakSegment = (segmentIndex: number) => {
    const safeIndex = clampSegmentIndex(segmentIndex, audioSegments.length);
    const text = audioSegments[safeIndex];
    if (!text) return;

    Speech.stop();
    setCurrentSegment(safeIndex);
    setAudioOpen(true);
    setIsPlaying(true);
    const rate = Number(audioSpeed.replace('x', ''));

    Speech.speak(text, {
      rate,
      onDone: () => {
        const nextIndex = safeIndex + 1;
        if (nextIndex < audioSegments.length) {
          speakSegment(nextIndex);
          return;
        }

        setIsPlaying(false);
      },
      onStopped: () => setIsPlaying(false),
      onError: () => setIsPlaying(false)
    });
  };

  const stopSpeech = () => {
    Speech.stop();
    setIsPlaying(false);
  };

  const playOrPause = () => {
    if (isPlaying) {
      stopSpeech();
      return;
    }

    speakSegment(currentSegment);
  };

  const playPreviousSegment = () => {
    speakSegment(currentSegment - 1);
  };

  const playNextSegment = () => {
    speakSegment(currentSegment + 1);
  };

  const handleSaveHighlight = async (block: ContentBlock, selectedText: string) => {
    const highlight: SavedHighlight = {
      id: `${activePage.id}:${block.id}:${Date.now()}`,
      pageId: activePage.id,
      pageTitle: activePage.title,
      chapter: activePage.chapter,
      paragraphId: block.id,
      paragraphLabel: getParagraphLabel(activePage.content, block.id),
      selectedText,
      createdAt: new Date().toISOString()
    };

    const next = await saveHighlight(highlight);
    setHighlights(next);
  };

  const handleEraseParagraphHighlights = async (pageId: string, paragraphId: string) => {
    const next = await clearHighlightsForParagraph(pageId, paragraphId);
    setHighlights(next);
  };

  const handleDeleteHighlight = async (highlightId: string) => {
    const next = await deleteHighlight(highlightId);
    setHighlights(next);
  };

  const openHighlights = () => {
    stopSpeech();
    setSettingsOpen(false);
    setHighlightsOpen(true);
    setDrawerOpen(false);
    setAudioOpen(false);
  };

  const renderMain = () => {
    if (settingsOpen) {
      return (
        <SettingsScreen
          theme={theme}
          textSize={textSize}
          audioSpeed={audioSpeed}
          onThemeChange={setTheme}
          onTextSizeChange={setTextSize}
          onAudioSpeedChange={setAudioSpeed}
        />
      );
    }

    if (highlightsOpen) {
      return (
        <HighlightsScreen
          theme={theme}
          highlights={highlights}
          onOpenHighlight={highlight => openPage(highlight.pageId)}
          onDeleteHighlight={handleDeleteHighlight}
        />
      );
    }

    if (activeTab === 'home') {
      return <HomeScreen theme={theme} onOpenPage={openPage} />;
    }

    if (activeTab === 'guides') {
      return (
        <ArticleScreen
          theme={theme}
          page={activePage}
          showAudio={audioOpen}
          isPlaying={isPlaying}
          highlights={highlights}
          currentSegment={currentSegment}
          totalSegments={audioSegments.length}
          currentSegmentText={activeAudioSegment}
          onPlayPause={playOrPause}
          onStop={stopSpeech}
          onBack={playPreviousSegment}
          onForward={playNextSegment}
          onSaveHighlight={handleSaveHighlight}
          onEraseHighlight={handleEraseParagraphHighlights}
        />
      );
    }

    if (activeTab === 'checklists') {
      const pages = guidePages.filter(page => page.category === 'checklists');
      return <ListScreen theme={theme} title="Checklists" subtitle="Visual shell for future checklist tools." pages={pages} onOpenPage={openPage} />;
    }

    if (activeTab === 'search') {
      return <ListScreen theme={theme} title="Search" subtitle="Search UI shell. Indexing comes after final content is added." pages={guidePages} onOpenPage={openPage} />;
    }

    const savedPages = guidePages.slice(0, 0);
    return <ListScreen theme={theme} title="Saved" subtitle="Saved topics will live on-device." pages={savedPages} emptyLabel="No saved topics yet." onOpenPage={openPage} />;
  };

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: palette.bg }]}> 
      <StatusBar barStyle={theme === 'dark' ? 'light-content' : 'dark-content'} />
      <View style={[styles.app, { backgroundColor: palette.bg }]}> 
        <TopBar
          title={pageTitle}
          theme={theme}
          onMenuPress={() => setDrawerOpen(true)}
          onListenPress={() => {
            setActiveTab('guides');
            setSettingsOpen(false);
            setHighlightsOpen(false);
            setAudioOpen(true);
          }}
        />
        <View style={styles.main}>{renderMain()}</View>
        <BottomNav
          activeTab={activeTab}
          theme={theme}
          onChange={tab => {
            stopSpeech();
            setSettingsOpen(false);
            setHighlightsOpen(false);
            setActiveTab(tab);
            setAudioOpen(false);
          }}
        />
        <HamburgerDrawer
          visible={drawerOpen}
          theme={theme}
          groups={drawerGroups}
          pageMap={guidePageMap}
          onClose={() => setDrawerOpen(false)}
          onSelectPage={openPage}
          onOpenHighlights={openHighlights}
          onOpenSettings={() => {
            stopSpeech();
            setDrawerOpen(false);
            setHighlightsOpen(false);
            setSettingsOpen(true);
          }}
        />
      </View>
    </SafeAreaView>
  );
}

function getParagraphLabel(content: ContentBlock[], paragraphId: string): string {
  const index = content.findIndex(block => block.id === paragraphId);
  return `Paragraph ${index + 1}`;
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1
  },
  app: {
    flex: 1,
    position: 'relative'
  },
  main: {
    flex: 1
  }
});

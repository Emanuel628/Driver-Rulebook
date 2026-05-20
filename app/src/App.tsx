import { useEffect, useMemo, useState } from 'react';
import { SafeAreaView, StatusBar, StyleSheet, View } from 'react-native';
import * as Speech from 'expo-speech';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { BottomNav } from './components/BottomNav';
import { DisclaimerModal } from './components/DisclaimerModal';
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
import { SearchScreen } from './screens/SearchScreen';
import { SettingsScreen } from './screens/SettingsScreen';
import { clearHighlightsForParagraph, deleteHighlight, loadHighlights, saveHighlight } from './storage/highlightStorage';
import { defaultPreferences, loadPreferences, savePreferences, type AppPreferences } from './storage/appStorage';
import { clampSegmentIndex, splitAudioScript } from './utils/listenMode';
import { searchGuidePages } from './utils/search';

export default function App() {
  const [preferences, setPreferences] = useState<AppPreferences>(defaultPreferences);
  const [theme, setTheme] = useState<ThemeMode>(defaultPreferences.theme);
  const [activeTab, setActiveTab] = useState<MainTab>('home');
  const [activePageId, setActivePageId] = useState('index-quick-start');
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [highlightsOpen, setHighlightsOpen] = useState(false);
  const [audioOpen, setAudioOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSegment, setCurrentSegment] = useState(0);
  const [textSize, setTextSize] = useState<AppPreferences['textSize']>(defaultPreferences.textSize);
  const [audioSpeed, setAudioSpeed] = useState<AppPreferences['audioSpeed']>(defaultPreferences.audioSpeed);
  const [highlights, setHighlights] = useState<SavedHighlight[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  const palette = colors[theme];
  const activePage = guidePageMap[activePageId] ?? guidePages[0];
  const activePageIndex = guidePages.findIndex(page => page.id === activePage.id);
  const previousPage = activePageIndex > 0 ? guidePages[activePageIndex - 1] : undefined;
  const nextPage = activePageIndex >= 0 && activePageIndex < guidePages.length - 1 ? guidePages[activePageIndex + 1] : undefined;
  const audioSegments = useMemo(() => splitAudioScript(activePage.audioScript), [activePage.audioScript]);
  const activeAudioSegment = audioSegments[currentSegment] ?? audioSegments[0] ?? '';
  const searchResults = useMemo(() => searchGuidePages(guidePages, searchQuery), [searchQuery]);
  const savedPages = useMemo(
    () => preferences.savedPageIds.map(pageId => guidePageMap[pageId]).filter(Boolean),
    [preferences.savedPageIds]
  );
  const activePageSaved = preferences.savedPageIds.includes(activePage.id);

  useEffect(() => {
    loadHighlights().then(setHighlights).catch(() => setHighlights([]));
    loadPreferences()
      .then(loaded => {
        setPreferences(loaded);
        setTheme(loaded.theme);
        setTextSize(loaded.textSize);
        setAudioSpeed(loaded.audioSpeed);
      })
      .catch(() => undefined);
  }, []);

  useEffect(() => {
    Speech.stop();
    setIsPlaying(false);
    setCurrentSegment(0);
  }, [activePageId]);

  const updatePreferences = (patch: Partial<AppPreferences>) => {
    setPreferences(current => {
      const next = { ...current, ...patch };
      savePreferences(next).catch(() => undefined);
      return next;
    });
  };

  const handleThemeChange = (nextTheme: ThemeMode) => {
    setTheme(nextTheme);
    updatePreferences({ theme: nextTheme });
  };

  const handleTextSizeChange = (nextTextSize: AppPreferences['textSize']) => {
    setTextSize(nextTextSize);
    updatePreferences({ textSize: nextTextSize });
  };

  const handleAudioSpeedChange = (nextAudioSpeed: AppPreferences['audioSpeed']) => {
    setAudioSpeed(nextAudioSpeed);
    updatePreferences({ audioSpeed: nextAudioSpeed });
  };

  const handleAcceptDisclaimer = () => {
    updatePreferences({ acknowledgedDisclaimer: true });
  };

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

  const openPreviousPage = () => {
    if (!previousPage) return;
    openPage(previousPage.id);
  };

  const openNextPage = () => {
    if (!nextPage) return;
    openPage(nextPage.id);
  };

  const toggleSavedPage = () => {
    const savedPageIds = activePageSaved
      ? preferences.savedPageIds.filter(pageId => pageId !== activePage.id)
      : [activePage.id, ...preferences.savedPageIds];

    updatePreferences({ savedPageIds });
  };

  const toggleChecklistItem = (itemKey: string) => {
    updatePreferences({
      checklistState: {
        ...preferences.checklistState,
        [itemKey]: !preferences.checklistState[itemKey]
      }
    });
  };

  const resetPageChecklist = () => {
    const pagePrefix = `${activePage.id}:`;
    const nextState = Object.fromEntries(Object.entries(preferences.checklistState).filter(([key]) => !key.startsWith(pagePrefix)));
    updatePreferences({ checklistState: nextState });
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
          onThemeChange={handleThemeChange}
          onTextSizeChange={handleTextSizeChange}
          onAudioSpeedChange={handleAudioSpeedChange}
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
          previousPageTitle={previousPage?.title}
          nextPageTitle={nextPage?.title}
          checklistState={preferences.checklistState}
          isSaved={activePageSaved}
          onPreviousPage={openPreviousPage}
          onNextPage={openNextPage}
          onPlayPause={playOrPause}
          onStop={stopSpeech}
          onBack={playPreviousSegment}
          onForward={playNextSegment}
          onToggleSavedPage={toggleSavedPage}
          onToggleChecklistItem={toggleChecklistItem}
          onResetPageChecklist={resetPageChecklist}
          onSaveHighlight={handleSaveHighlight}
          onEraseHighlight={handleEraseParagraphHighlights}
        />
      );
    }

    if (activeTab === 'checklists') {
      const pages = guidePages.filter(page => page.category === 'checklists');
      return <ListScreen theme={theme} title="Checklists" subtitle="Interactive checklists and checklist guide pages." pages={pages} onOpenPage={openPage} />;
    }

    if (activeTab === 'search') {
      return <SearchScreen theme={theme} query={searchQuery} results={searchResults} onQueryChange={setSearchQuery} onOpenPage={openPage} />;
    }

    return <ListScreen theme={theme} title="Saved" subtitle="Pages saved locally on this device." pages={savedPages} emptyLabel="No saved pages yet." onOpenPage={openPage} />;
  };

  return (
    <GestureHandlerRootView style={styles.root}> 
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
          <DisclaimerModal visible={!preferences.acknowledgedDisclaimer} theme={theme} onAccept={handleAcceptDisclaimer} />
        </View>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}

function getParagraphLabel(content: ContentBlock[], paragraphId: string): string {
  const index = content.findIndex(block => block.id === paragraphId);
  return `Paragraph ${index + 1}`;
}

const styles = StyleSheet.create({
  root: {
    flex: 1
  },
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

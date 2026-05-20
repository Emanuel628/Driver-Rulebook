import { useMemo, useState } from 'react';
import { SafeAreaView, StatusBar, StyleSheet, View } from 'react-native';
import * as Speech from 'expo-speech';
import { BottomNav } from './components/BottomNav';
import { HamburgerDrawer } from './components/HamburgerDrawer';
import { TopBar } from './components/TopBar';
import { drawerGroups, guidePageMap, guidePages } from './content/pages';
import { colors } from './theme/tokens';
import type { ThemeMode } from './theme/tokens';
import type { MainTab } from './types/content';
import { ArticleScreen } from './screens/ArticleScreen';
import { HomeScreen } from './screens/HomeScreen';
import { ListScreen } from './screens/ListScreen';
import { SettingsScreen } from './screens/SettingsScreen';

export default function App() {
  const [theme, setTheme] = useState<ThemeMode>('dark');
  const [activeTab, setActiveTab] = useState<MainTab>('home');
  const [activePageId, setActivePageId] = useState('index-quick-start');
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [audioOpen, setAudioOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [textSize, setTextSize] = useState<'normal' | 'large' | 'extra-large'>('normal');
  const [audioSpeed, setAudioSpeed] = useState<'0.75x' | '1.0x' | '1.25x' | '1.5x'>('1.0x');

  const palette = colors[theme];
  const activePage = guidePageMap[activePageId] ?? guidePages[0];

  const pageTitle = useMemo(() => {
    if (settingsOpen) return 'Settings';
    if (activeTab === 'home') return 'Driver Rulebook';
    if (activeTab === 'guides') return 'Guides';
    if (activeTab === 'checklists') return 'Checklists';
    if (activeTab === 'search') return 'Search';
    if (activeTab === 'saved') return 'Saved';
    return activePage.title;
  }, [activePage.title, activeTab, settingsOpen]);

  const openPage = (pageId: string) => {
    stopSpeech();
    setActivePageId(pageId);
    setActiveTab('guides');
    setSettingsOpen(false);
    setDrawerOpen(false);
    setAudioOpen(false);
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

    setAudioOpen(true);
    setIsPlaying(true);
    const rate = Number(audioSpeed.replace('x', ''));
    Speech.speak(activePage.audioScript, {
      rate,
      onDone: () => setIsPlaying(false),
      onStopped: () => setIsPlaying(false),
      onError: () => setIsPlaying(false)
    });
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
          onPlayPause={playOrPause}
          onStop={stopSpeech}
          onBack={() => undefined}
          onForward={() => undefined}
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
          onOpenSettings={() => {
            stopSpeech();
            setDrawerOpen(false);
            setSettingsOpen(true);
          }}
        />
      </View>
    </SafeAreaView>
  );
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

import type { ReactNode } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { colors, radius, spacing } from '../theme/tokens';
import type { ThemeMode } from '../theme/tokens';

type SettingsScreenProps = {
  theme: ThemeMode;
  textSize: 'normal' | 'large' | 'extra-large';
  audioSpeed: '0.75x' | '1.0x' | '1.25x' | '1.5x';
  onThemeChange: (theme: ThemeMode) => void;
  onTextSizeChange: (size: SettingsScreenProps['textSize']) => void;
  onAudioSpeedChange: (speed: SettingsScreenProps['audioSpeed']) => void;
};

export function SettingsScreen({ theme, textSize, audioSpeed, onThemeChange, onTextSizeChange, onAudioSpeedChange }: SettingsScreenProps) {
  const palette = colors[theme];

  return (
    <ScrollView style={[styles.screen, { backgroundColor: palette.bg }]} contentContainerStyle={styles.content}> 
      <Text style={[styles.title, { color: palette.text }]}>Settings</Text>
      <Text style={[styles.subtitle, { color: palette.textMuted }]}>Only the settings this app actually needs. Changes are saved locally on this device.</Text>

      <SettingGroup theme={theme} title="Display">
        <Segment theme={theme} label="Theme" value={theme} options={['dark', 'light']} onChange={value => onThemeChange(value as ThemeMode)} />
        <Segment theme={theme} label="Text size" value={textSize} options={['normal', 'large', 'extra-large']} onChange={value => onTextSizeChange(value as SettingsScreenProps['textSize'])} />
      </SettingGroup>

      <SettingGroup theme={theme} title="Listen Mode">
        <Segment theme={theme} label="Voice speed" value={audioSpeed} options={['0.75x', '1.0x', '1.25x', '1.5x']} onChange={value => onAudioSpeedChange(value as SettingsScreenProps['audioSpeed'])} />
      </SettingGroup>

      <SettingGroup theme={theme} title="Safety / Legal">
        <Text style={[styles.body, { color: palette.textMuted }]}>Educational reference only. Not legal advice, not official training, and not an ELD.</Text>
      </SettingGroup>
    </ScrollView>
  );
}

type SettingGroupProps = { theme: ThemeMode; title: string; children: ReactNode };

function SettingGroup({ theme, title, children }: SettingGroupProps) {
  const palette = colors[theme];

  return (
    <View style={[styles.group, { backgroundColor: palette.surface, borderColor: palette.border }]}> 
      <Text style={[styles.groupTitle, { color: palette.text }]}>{title}</Text>
      {children}
    </View>
  );
}

type SegmentProps = {
  theme: ThemeMode;
  label: string;
  value: string;
  options: string[];
  onChange: (value: string) => void;
};

function Segment({ theme, label, value, options, onChange }: SegmentProps) {
  const palette = colors[theme];

  return (
    <View style={styles.segmentWrap}> 
      <Text style={[styles.label, { color: palette.textMuted }]}>{label}</Text>
      <View style={[styles.segment, { backgroundColor: palette.bgAlt }]}> 
        {options.map(option => {
          const active = option === value;
          return (
            <Pressable key={option} onPress={() => onChange(option)} style={[styles.segmentButton, active && { backgroundColor: palette.accent }]}> 
              <Text style={[styles.segmentText, { color: active ? '#FFFFFF' : palette.textSubtle }]}>{option}</Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
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
  title: {
    fontSize: 30,
    fontWeight: '900'
  },
  subtitle: {
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 23
  },
  group: {
    borderRadius: radius.lg,
    borderWidth: 1,
    gap: spacing.lg,
    padding: spacing.lg
  },
  groupTitle: {
    fontSize: 17,
    fontWeight: '900'
  },
  segmentWrap: {
    gap: spacing.sm
  },
  label: {
    fontSize: 13,
    fontWeight: '800'
  },
  segment: {
    borderRadius: radius.md,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.xs,
    padding: spacing.xs
  },
  segmentButton: {
    borderRadius: radius.sm,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm
  },
  segmentText: {
    fontSize: 13,
    fontWeight: '800',
    textTransform: 'capitalize'
  },
  body: {
    fontSize: 15,
    fontWeight: '600',
    lineHeight: 22
  }
});

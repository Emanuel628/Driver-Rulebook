# Listen Mode

## Purpose

Listen Mode lets users hear guide pages, scenarios, checklists, and glossary explanations read aloud.

This is a core accessibility and convenience feature, especially for users who prefer audio while parked, waiting, loading, unloading, or reviewing information during a break.

## Safety Rule

The app must not encourage active interaction while driving.

Recommended safety text:

> Do not interact with this app while driving. Use Listen Mode only when safely parked or when permitted by applicable hands-free laws and company policy.

## Page-Level Audio

Every content page should include a small speaker icon in the top bar.

Example top bar:

```text
☰   Numbered Placards                      🔊
```

Tapping the icon opens a compact audio player for the current page.

## Audio Controls

The audio player should include:

- Play / pause
- Stop
- Rewind 15 seconds
- Forward 15 seconds
- Progress track
- Current time / total time

## MVP Behavior

For version 1:

- Use device text-to-speech
- Do not generate or store AI audio files
- Do not require a backend
- Do not require an account
- Audio stops when the user leaves the page
- Audio uses the page audio script, not raw visible page text

## Audio Script Requirement

Each content page should have a dedicated `audioScript` field.

The visible page content may use headings, cards, bullets, and source notes. Reading that directly can sound awkward. The audio script should be written naturally for spoken explanation.

Example content model:

```json
{
  "id": "numbered-placards",
  "title": "Numbered Placards",
  "section": "Hazmat / Placards",
  "summary": "Understand when a plain Class 3 placard may not be enough.",
  "content": "...",
  "audioScript": "Numbered placards. A numbered placard includes the hazard class and a UN or NA identification number..."
}
```

## Expanded Player Concept

```text
Listening: Numbered Placards

0:42 ━━━━━●──────── 3:18

↩15     Pause     Stop     15↪
```

## Collapsed Player Concept

```text
↩15   ▶   ■   15↪      0:42 / 3:18
```

## Future Enhancements

Possible later features:

- Background audio
- Offline saved audio
- Voice selection
- Adjustable speaking speed
- Saved audio progress
- Premium AI narration

These should not be part of the first build.

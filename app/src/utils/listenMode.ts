export function splitAudioScript(script: string): string[] {
  return script
    .replace(/\s+/g, ' ')
    .split(/(?<=[.!?])\s+/)
    .map(segment => segment.trim())
    .filter(Boolean);
}

export function clampSegmentIndex(index: number, total: number): number {
  if (total <= 0) return 0;
  return Math.min(Math.max(index, 0), total - 1);
}

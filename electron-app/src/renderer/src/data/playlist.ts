export interface Track {
  id: string
  title: string
  artist: string
  duration: number // seconds
  src: string
  albumArt?: string
}

function formatDuration(seconds: number): string {
  const m = Math.floor(seconds / 60)
  const s = Math.floor(seconds % 60)
  return `${m}:${s.toString().padStart(2, '0')}`
}

export { formatDuration }

// Mock playlist – replace with real tracks and album art
import demoSongSrc from '../assets/Fujii Kaze - masshiro (pure white) [Official Audio].mp3'

export const playlist: Track[] = [
  { id: '1', title: 'masshiro', artist: 'fujii kaze', duration: 292, src: demoSongSrc },
  { id: '2', title: 'Shinunoga E-Wa', artist: 'fujii kaze', duration: 195, src: demoSongSrc },
  { id: '3', title: 'Kirari', artist: 'fujii kaze', duration: 260, src: demoSongSrc },
  { id: '4', title: 'Matsuri', artist: 'fujii kaze', duration: 228, src: demoSongSrc },
  { id: '5', title: 'Grace', artist: 'fujii kaze', duration: 244, src: demoSongSrc },
  { id: '6', title: 'damn', artist: 'fujii kaze', duration: 198, src: demoSongSrc },
  { id: '7', title: 'Mo-Eh-Yo', artist: 'fujii kaze', duration: 215, src: demoSongSrc },
  { id: '8', title: 'Hana', artist: 'fujii kaze', duration: 262, src: demoSongSrc },
]

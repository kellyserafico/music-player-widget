import AudioPlayer from './AudioPlayer'
import type { Track } from '../data/playlist'

interface PlayerPageProps {
  track: Track
  onBack: () => void
}

function PlayerPage({ track, onBack }: PlayerPageProps): JSX.Element {
  return (
    <div className="relative z-10 flex h-full flex-col">
      <button
        type="button"
        onClick={onBack}
        className="no-drag absolute left-2 top-2 z-20 flex h-8 w-8 items-center justify-center text-white transition focus:outline-none focus:ring-0"
        aria-label="Back"
      >
        <svg
          className="h-5 w-5"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden
        >
          <path d="M15 18l-6-6 6-6" />
        </svg>
      </button>
      <p className="no-drag relative z-10 p-2 pt-12 text-center text-2xl text-white">
        {track.title} – {track.artist}
      </p>
      <AudioPlayer
        src={track.src}
        className="no-drag absolute left-2 right-2 bottom-4 z-10"
      />
    </div>
  )
}

export default PlayerPage

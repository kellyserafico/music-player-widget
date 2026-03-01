import { playlist } from '../data/playlist'
import type { Track } from '../data/playlist'
import PlaylistView from './PlaylistView'

interface PlaylistPageProps {
  onBack: () => void
  onSelectTrack: (track: Track) => void
}

function PlaylistPage({ onBack, onSelectTrack }: PlaylistPageProps): JSX.Element {
  return (
    <div className="relative z-10 flex h-full flex-col overflow-hidden px-4 pb-4 pt-2">
      <header className="shrink-0 pb-3">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onBack}
            className="no-drag flex h-8 w-8 shrink-0 items-center justify-center text-white transition focus:outline-none focus:ring-0"
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
          <h1 className="text-xl font-bold tracking-tight text-white">My Playlist</h1>
        </div>
      </header>
      <PlaylistView onSelectTrack={onSelectTrack} />
    </div>
  )
}

export default PlaylistPage

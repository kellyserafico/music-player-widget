import { playlist, formatDuration, type Track } from '../data/playlist'

interface PlaylistViewProps {
  onSelectTrack: (track: Track) => void
}

function PlaylistView({ onSelectTrack }: PlaylistViewProps): JSX.Element {
  return (
    <ul className="no-drag min-h-0 flex-1 space-y-2 overflow-y-auto">
      {playlist.map((track) => (
        <li key={track.id}>
          <button
            type="button"
            onClick={() => onSelectTrack(track)}
            className="flex w-full items-center gap-3 rounded-xl bg-white/10 px-3 py-2.5 text-left transition hover:bg-white/15 focus:outline-none focus:ring-2 focus:ring-white/40"
          >
            <span
              className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-white/15 text-xl text-white/70"
              aria-hidden
            >
              ♪masshi
            </span>
            <div className="min-w-0 flex-1">
              <div className="truncate font-semibold text-white">{track.title}</div>
              <div className="truncate text-sm text-white/70">{track.artist}</div>
            </div>
            <span className="shrink-0 text-sm tabular-nums text-white/80">
              {formatDuration(track.duration)}
            </span>
          </button>
        </li>
      ))}
    </ul>
  )
}

export default PlaylistView

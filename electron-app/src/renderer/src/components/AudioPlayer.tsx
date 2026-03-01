import { useRef, useState, useEffect } from 'react'
import backIcon from '../assets/back.svg'
import forwardIcon from '../assets/forward.svg'
import pauseIcon from '../assets/pause.svg'
import playIcon from '../assets/play.svg'

function formatTime(seconds: number): string {
  if (!Number.isFinite(seconds) || seconds < 0) return '0:00'
  const m = Math.floor(seconds / 60)
  const s = Math.floor(seconds % 60)
  return `${m}:${s.toString().padStart(2, '0')}`
}

interface AudioPlayerProps {
  src: string
  className?: string
}

function AudioPlayer({ src, className = '' }: AudioPlayerProps): JSX.Element {
  const audioRef = useRef<HTMLAudioElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)

  const SKIP_SECONDS = 10

  useEffect(() => {
    const el = audioRef.current
    if (!el) return

    const onTimeUpdate = (): void => setCurrentTime(el.currentTime)
    const onLoadedMetadata = (): void => setDuration(el.duration)
    const onEnded = (): void => setIsPlaying(false)
    const onPlay = (): void => setIsPlaying(true)
    const onPause = (): void => setIsPlaying(false)

    el.addEventListener('timeupdate', onTimeUpdate)
    el.addEventListener('loadedmetadata', onLoadedMetadata)
    el.addEventListener('ended', onEnded)
    el.addEventListener('play', onPlay)
    el.addEventListener('pause', onPause)

    return () => {
      el.removeEventListener('timeupdate', onTimeUpdate)
      el.removeEventListener('loadedmetadata', onLoadedMetadata)
      el.removeEventListener('ended', onEnded)
      el.removeEventListener('play', onPlay)
      el.removeEventListener('pause', onPause)
    }
  }, [])

  const togglePlay = (): void => {
    const el = audioRef.current
    if (!el) return
    if (el.paused) {
      el.play().catch(() => {})
    } else {
      el.pause()
    }
  }

  const skipBack = (): void => {
    const el = audioRef.current
    if (!el) return
    el.currentTime = Math.max(0, el.currentTime - SKIP_SECONDS)
    setCurrentTime(el.currentTime)
  }

  const skipForward = (): void => {
    const el = audioRef.current
    if (!el || !Number.isFinite(el.duration)) return
    el.currentTime = Math.min(el.duration, el.currentTime + SKIP_SECONDS)
    setCurrentTime(el.currentTime)
  }

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>): void => {
    const el = audioRef.current
    if (!el || !Number.isFinite(el.duration)) return
    const rect = e.currentTarget.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width
    el.currentTime = x * el.duration
    setCurrentTime(el.currentTime)
  }

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0

  return (
    <div
      className={`flex flex-col gap-2 rounded-xl p-3 ${className}`}
      role="region"
      aria-label="Audio player"
    >
      <audio ref={audioRef} src={src} preload="metadata" />

      <div className="flex items-center gap-3">
        <span className="shrink-0 text-sm tabular-nums text-white/90">
          {formatTime(currentTime)}
        </span>
        <div
          className="group h-2 min-w-0 flex-1 cursor-pointer rounded-full bg-white/20 transition hover:bg-white/25"
          onClick={handleSeek}
          role="slider"
          aria-label="Seek"
          aria-valuemin={0}
          aria-valuemax={duration}
          aria-valuenow={currentTime}
          tabIndex={0}
          onKeyDown={(e) => {
            const el = audioRef.current
            if (!el) return
            const step = e.shiftKey ? 10 : 5
            if (e.key === 'ArrowLeft') {
              el.currentTime = Math.max(0, el.currentTime - step)
            } else if (e.key === 'ArrowRight') {
              el.currentTime = Math.min(el.duration, el.currentTime + step)
            }
          }}
        >
          <div
            className="h-full rounded-full bg-white/90 transition-all"
            style={{ width: `${progress}%` }}
          />
        </div>
        <span className="shrink-0 text-sm tabular-nums text-white/90">{formatTime(duration)}</span>
      </div>
      <div className="flex items-center justify-center gap-3">
        <button
          type="button"
          onClick={skipBack}
          className="flex h-10 w-10 shrink-0 items-center justify-center text-white transition focus:outline-none focus:ring-0"
          aria-label={`Skip back ${SKIP_SECONDS} seconds`}
        >
          <img src={backIcon} alt="" className="h-10 w-10" aria-hidden />
        </button>
        <button
          type="button"
          onClick={togglePlay}
          className="flex h-10 w-10 shrink-0 items-center justify-center text-white transition focus:outline-none focus:ring-0 mx-2"
          aria-label={isPlaying ? 'Pause' : 'Play'}
        >
          {isPlaying ? (
            <img src={pauseIcon} alt="" className="h-10 w-10" aria-hidden />
          ) : (
            <img src={playIcon} alt="" className="h-10 w-10" aria-hidden />
          )}
        </button>
        <button
          type="button"
          onClick={skipForward}
          className="flex h-10 w-10 shrink-0 items-center justify-center text-white transition focus:outline-none focus:ring-0"
          aria-label={`Skip forward ${SKIP_SECONDS} seconds`}
        >
          <img src={forwardIcon} alt="" className="h-10 w-10" aria-hidden />
        </button>
      </div>
    </div>
  )
}

export default AudioPlayer

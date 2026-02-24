import { useRef, useState, useEffect } from 'react'
import backIcon from '../assets/back.svg'
import forwardIcon from '../assets/forward.svg'

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
  const [volume, setVolume] = useState(1)

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

  useEffect(() => {
    const el = audioRef.current
    if (el) el.volume = volume
  }, [volume])

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
      className={`flex flex-col gap-2 rounded-xl bg-black/30 p-3 backdrop-blur-sm ${className}`}
      role="region"
      aria-label="Audio player"
    >
      <audio ref={audioRef} src={src} preload="metadata" />

      <div className="flex items-center gap-2">
        <svg
          className="h-4 w-4 shrink-0 text-white/70"
          viewBox="0 0 24 24"
          fill="currentColor"
          aria-hidden
        >
          <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
        </svg>
        <input
          type="range"
          min={0}
          max={1}
          step={0.05}
          value={volume}
          onChange={(e) => setVolume(Number(e.target.value))}
          className="h-1.5 w-20 cursor-pointer appearance-none rounded-full bg-white/20 accent-white"
          aria-label="Volume"
        />
      </div>

      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={skipBack}
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/20 text-white transition hover:bg-white/30 focus:outline-none focus:ring-2 focus:ring-white/50"
          aria-label={`Skip back ${SKIP_SECONDS} seconds`}
        >
          <img src={backIcon} alt="" className="h-5 w-5" aria-hidden />
        </button>
        <button
          type="button"
          onClick={togglePlay}
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/20 text-white transition hover:bg-white/30 focus:outline-none focus:ring-2 focus:ring-white/50"
          aria-label={isPlaying ? 'Pause' : 'Play'}
        >
          {isPlaying ? (
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
              <rect x="6" y="4" width="4" height="16" rx="1" />
              <rect x="14" y="4" width="4" height="16" rx="1" />
            </svg>
          ) : (
            <svg className="ml-0.5 h-5 w-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
              <path d="M8 5v14l11-7L8 5z" />
            </svg>
          )}
        </button>
        <button
          type="button"
          onClick={skipForward}
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/20 text-white transition hover:bg-white/30 focus:outline-none focus:ring-2 focus:ring-white/50"
          aria-label={`Skip forward ${SKIP_SECONDS} seconds`}
        >
          <img src={forwardIcon} alt="" className="h-5 w-5" aria-hidden />
        </button>
        <span className="shrink-0 text-sm tabular-nums text-white/90">
          {formatTime(currentTime)}
        </span>
        <div
          className="group min-w-0 flex-1 cursor-pointer rounded-full bg-white/20 transition hover:bg-white/25"
          style={{ height: 8 }}
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
        <span className="shrink-0 text-sm tabular-nums text-white/90">
          {formatTime(duration)}
        </span>
      </div>
    </div>
  )
}

export default AudioPlayer

import { useState } from 'react'
import bg from './assets/bg.svg'
import cloud1 from './assets/clouds/cloud1.png'
import cloud2 from './assets/clouds/cloud2.png'
import cloud3 from './assets/clouds/cloud3.png'
import PlaylistPage from './components/PlaylistPage'
import PlayerPage from './components/PlayerPage'
import type { Track } from './data/playlist'

function App(): JSX.Element {
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null)

  const showPlayer = currentTrack !== null

  return (
    <div className="drag relative w-full h-full min-h-screen">
      <img
        src={bg}
        alt=""
        className="absolute inset-0 w-full h-full object-cover object-center"
        aria-hidden
      />
      <img
        src={cloud1}
        alt=""
        className="pointer-events-none absolute bottom-0 left-0 z-[2] h-[20vh] max-w-[28%] w-auto object-contain object-left-bottom opacity-90"
        aria-hidden
      />
      <img
        src={cloud2}
        alt=""
        className="pointer-events-none absolute right-0 h-[20vh] max-w-[28%] top-[10vh] z-[1] object-contain object-right-top opacity-90"
        aria-hidden
      />
      <img
        src={cloud3}
        alt=""
        className="pointer-events-none absolute top-0 left-1/4 z-[1] h-[20vh] max-w-[28%] -translate-x-1/2 object-contain object-bottom opacity-85"
        aria-hidden
      />

      {showPlayer ? (
        <PlayerPage
          track={currentTrack}
          onBack={() => setCurrentTrack(null)}
        />
      ) : (
        <PlaylistPage
          onBack={() => window.electron?.ipcRenderer.send('back')}
          onSelectTrack={(track) => setCurrentTrack(track)}
        />
      )}
    </div>
  )
}

export default App

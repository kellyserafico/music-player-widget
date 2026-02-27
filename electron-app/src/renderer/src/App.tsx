import bg from './assets/bg.svg'
import cloud1 from './assets/clouds/cloud1.png'
import cloud2 from './assets/clouds/cloud2.png'
import cloud3 from './assets/clouds/cloud3.png'
import demoSong from './assets/Fujii Kaze - masshiro (pure white) [Official Audio].mp3'
import AudioPlayer from './components/AudioPlayer'

function App(): JSX.Element {
  const handleBack = (): void => {
    // Wire to previous track, navigation, or IPC as needed
    window.electron?.ipcRenderer.send('back')
  }

  return (
    <div className="drag relative w-full h-full min-h-screen">
      <img
        src={bg}
        alt=""
        className="absolute inset-0 w-full h-full object-cover object-center"
        aria-hidden
      />
      <img src={cloud1} alt="" className="absolute left-0" aria-hidden />
      <img
        src={cloud2}
        alt=""
        className="pointer-events-none absolute right-0 top-0 z-[1] w-full object-contain object-right-top opacity-90"
        aria-hidden
      />
      <img
        src={cloud3}
        alt=""
        className="pointer-events-none absolute bottom-0 left-1/4 z-[1] w-full -translate-x-1/2 object-contain object-bottom opacity-85"
        aria-hidden
      />
      <button
        type="button"
        onClick={handleBack}
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
      <p className="relative z-10 p-2 text-white text-center text-2xl">fujii kaze - masshiro</p>
      <AudioPlayer src={demoSong} className="no-drag absolute left-2 right-2 z-10" />
    </div>
  )
}

export default App

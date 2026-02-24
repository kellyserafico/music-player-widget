import bg from './assets/bg.svg'
import demoSong from './assets/Fujii Kaze - masshiro (pure white) [Official Audio].mp3'
import AudioPlayer from './components/AudioPlayer'

function App(): JSX.Element {
  return (
    <div className="relative w-full h-full min-h-screen">
      <img
        src={bg}
        alt=""
        className="absolute inset-0 w-full h-full object-cover object-center"
        aria-hidden
      />
      <p className="relative z-10 p-2 text-white">fujii kaze - masshiro</p>
      <AudioPlayer src={demoSong} className="absolute bottom-2 left-2 right-2 z-10" />
    </div>
  )
}

export default App

import bg from './assets/bg.svg'
import demoSong from './assets/Fujii Kaze - masshiro (pure white) [Official Audio].mp3'

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
      <audio
        controls
        src={demoSong}
        className="relative z-10"
        style={{ position: 'absolute', bottom: 8, left: 8, right: 8, width: 'calc(100% - 16px)' }}
      />
    </div>
  )
}

export default App

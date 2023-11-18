import './Home.css'
import Home from '../../components/main/Main'
import Game from '../game/Game'
import ScoreModal from '../scores/ScoreModal'
import ModalLoggin from '../../components/modalLoggin/ModalLoggin'


function App() {
  return (
    <main>
      <section className='layout'>
        {/* Renderizado condicional */}
        {/* <Home /> */}
        {/* <Game /> */}
        <ScoreModal />
      </section>
    </main>
  )
}

export default App

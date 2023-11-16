import './Home.css'
import Home from '../../components/main/Main'
import Game from '../game/Game'


function App() {
  return (
    <main>
      <section className='layout'>
        {/* Renderizado condicional */}
        {/* <Home /> */}
        <Game />
      </section>
    </main>
  )
}

export default App

import React from 'react'
import ReactDOM from 'react-dom/client'
import Home from './pages/home/Home'
import Game from './pages/game/Game';
import ScorePage from './pages/scores/ScorePage';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ScoreModal from './components/scoreModal/ScoreModal'



const router = createBrowserRouter([
  {
    path: '/',
    element:<Home />
  }, 
  {
    path: '/game',
    element: <Game />
  },
  {
    path: '/scoreModal',
    element: <ScoreModal />
  },
  {
    path: '/scorePage',
    element: <ScorePage />
  }
]);


ReactDOM.createRoot(document.getElementById('root')).render(
    <RouterProvider router={router}>
      <Home />
    </RouterProvider>
)


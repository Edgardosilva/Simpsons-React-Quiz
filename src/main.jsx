import React from 'react'
import ReactDOM from 'react-dom/client'
import Home from './pages/home/Home'
import Game from './pages/game/Game';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ScoreModal from './pages/scores/ScoreModal';


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
    path: '/gameOverModal',
    element: <ScoreModal />
  }
]);


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}>
      <Home />
    </RouterProvider>
  </React.StrictMode>,
)


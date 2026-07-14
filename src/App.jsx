import { Routes, Route } from 'react-router-dom'
import { GameProvider } from './contexts/GameContext'
import AppShell from './components/AppShell'
import Dashboard from './pages/Dashboard'
import Library from './pages/Library'
import AddGame from './pages/AddGame'
import GameDetails from './pages/GameDetails'
import EditGame from './pages/EditGame'
import Settings from './pages/Settings'
import NotFound from './pages/NotFound'

function App() {
  return (
    <GameProvider>
      <AppShell>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/library" element={<Library />} />
          <Route path="/add" element={<AddGame />} />
          <Route path="/games/:id" element={<GameDetails />} />
          <Route path="/games/:id/edit" element={<EditGame />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AppShell>
    </GameProvider>
  )
}

export default App

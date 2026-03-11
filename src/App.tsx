import { useState } from 'react'
import { TooltipProvider } from '@/components/ui/tooltip'
import { Sidebar } from './components/Sidebar'
import { SettingsPage } from './components/SettingsPage'
import { DinoGame } from './dino-game'

function App() {
  const [showGame, setShowGame] = useState(false)

  if (showGame) {
    return (
      <div style={{ position: 'relative' }}>
        <button
          onClick={() => setShowGame(false)}
          style={{
            position: 'fixed',
            top: 16,
            left: 16,
            zIndex: 50,
            padding: '6px 16px',
            fontSize: 13,
            fontWeight: 700,
            fontFamily: '"Courier New", monospace',
            letterSpacing: 1,
            color: '#535353',
            backgroundColor: '#f7f7f7',
            border: '2px solid #535353',
            cursor: 'pointer',
          }}
        >
          ← BACK
        </button>
        <DinoGame />
      </div>
    )
  }

  return (
    <TooltipProvider>
      <div className="flex h-screen overflow-hidden">
        <Sidebar />
        <main className="flex-1 overflow-y-auto">
          <SettingsPage />
        </main>
        <button
          onClick={() => setShowGame(true)}
          style={{
            position: 'fixed',
            bottom: 16,
            right: 16,
            zIndex: 50,
            padding: '8px 20px',
            fontSize: 13,
            fontWeight: 700,
            fontFamily: '"Courier New", monospace',
            letterSpacing: 1,
            color: '#f7f7f7',
            backgroundColor: '#535353',
            border: '2px solid #535353',
            cursor: 'pointer',
          }}
        >
          🦕 DINO GAME
        </button>
      </div>
    </TooltipProvider>
  )
}

export default App

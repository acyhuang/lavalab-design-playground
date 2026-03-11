import { TooltipProvider } from '@/components/ui/tooltip'
import { Sidebar } from './components/Sidebar'
import { SettingsPage } from './components/SettingsPage'

function App() {
  return (
    <TooltipProvider>
      <div className="flex h-screen overflow-hidden">
        <Sidebar />
        <main className="flex-1 overflow-y-auto">
          <SettingsPage />
        </main>
      </div>
    </TooltipProvider>
  )
}

export default App

import { createRoot } from 'react-dom/client'
import { App } from './pages/App'
import '../style.scss'
import { PokeProvider } from './Context/PokeContext'
import { StrictMode } from 'react'

createRoot(document.getElementById('root') as Element).render(
  <StrictMode>
    <PokeProvider>
      <App />
    </PokeProvider>
  </StrictMode>
)

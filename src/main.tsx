import { createRoot } from 'react-dom/client'
import { App } from './pages/App'
import '../style.scss'

createRoot(document.getElementById('root') as Element).render(<App />)

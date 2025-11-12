import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import DanceApp from './DanceApp.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <DanceApp />
  </StrictMode>,
)

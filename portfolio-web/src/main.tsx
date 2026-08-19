import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/global.css'
import App from './App'

const rootElement = document.getElementById('root') ?? document.getElementById('app')

if (!rootElement) {
  throw new Error('Root element not found. Make sure index.html has a <div id="root">.')
}

createRoot(rootElement).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

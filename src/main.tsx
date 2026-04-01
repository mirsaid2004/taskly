import { StrictMode } from 'react'
import { Provider } from './components/ui/provider'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

async function enableMockServiceWorker() {
  if (import.meta.env.VITE_MOCK_SERVISE_WORKER) {
    const { worker } = await import('./mocks/browser.ts')
    await worker.start()
    // write console log with green color
    console.log('%c Mock Service Worker enabled', 'color: green; font-weight: bold;')
  }
}

enableMockServiceWorker().then(() => {
  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <Provider>
        <App />
      </Provider>
    </StrictMode>
  )
})

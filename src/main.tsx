import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { ChakraProvider, Theme } from '@chakra-ui/react'
import { system } from './components/ui/theme.tsx'
import './index.css'

async function enableMockServiceWorker() {
  const { worker } = await import('./mocks/browser.ts')
  await worker.start()
}

enableMockServiceWorker().then(() => {
  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <ChakraProvider value={system}>
        <Theme colorPalette={'purple'} appearance="light">
          <App />
        </Theme>
      </ChakraProvider>
    </StrictMode>
  )
})

import { render, screen } from '@testing-library/react'
import App from '../App'
import { ChakraProvider, defaultSystem } from '@chakra-ui/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()

const renderWithProviders = (ui: React.ReactElement) => {
  return render(
    <ChakraProvider value={defaultSystem}>
      <QueryClientProvider client={queryClient}>{ui}</QueryClientProvider>
    </ChakraProvider>
  )
}

describe('App component', () => {
  it('renders the creation button', () => {
    renderWithProviders(<App />)
    expect(screen.getByRole('button', { name: /Создать задачу/i })).toBeInTheDocument()
  })

  // The counter test is no longer relevant as App was changed
})

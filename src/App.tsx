import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex items-center justify-center h-screen">
        <h1 className="text-4xl! text-center text-red-600">Hello world!!!</h1>
      </div>
    </QueryClientProvider>
  )
}

export default App

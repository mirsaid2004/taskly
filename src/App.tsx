import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import DialogForm from './components/form'

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="z-5 relative flex flex-col items-center gap-5 justify-center h-screen">
        <h1 className="text-4xl! text-center text-red-600">Hello world!!!</h1>
        <DialogForm />
      </div>
    </QueryClientProvider>
  )
}

export default App

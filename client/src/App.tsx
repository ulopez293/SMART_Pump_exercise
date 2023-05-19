import { httpBatchLink } from "@trpc/client"
import { trpc } from './utils/trpc'
import { useState } from "react"
import { QueryClientProvider, QueryClient } from "@tanstack/react-query"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import { ProtectedRoute } from "./components/protected/ProtectedRoute"
import { Login } from "./pages/login/Login"
import { NavigateBar } from "./components/navigate/NavigateBar"
import { Home } from "./pages/home/Home"
import { Footing } from "./components/footer/Footing"

function App() {
  const [queryClient] = useState(() => new QueryClient())
  const [trpcClient] = useState(() => {
    return trpc.createClient({
      links: [
        httpBatchLink({
          url: 'http://localhost:3000/trpc'
        })
      ],
    })
  })

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <ProtectedRoute><NavigateBar /></ProtectedRoute>
          <Routes>
            <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
            <Route path="/login" element={<Login />} />
            <Route path="*" element={<h1>404 Not Found</h1>} />
          </Routes>
          <ProtectedRoute><Footing /></ProtectedRoute>
        </BrowserRouter>
      </QueryClientProvider>
    </trpc.Provider>
  )
}

export default App

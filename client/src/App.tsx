import { httpBatchLink } from "@trpc/client"
import { trpc } from './utils/trpc'
import { useState } from "react"
import { QueryClientProvider, QueryClient } from "@tanstack/react-query"
import { UserList } from "./components/UserList"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import { ProtectedRoute } from "./components/protected/ProtectedRoute"

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
        {/* <UserList /> */}
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<ProtectedRoute><h1>/home</h1></ProtectedRoute>} />
            <Route path="/balance" element={<ProtectedRoute><h1>/balance</h1></ProtectedRoute>} />
            <Route path="/login" element={<h1 className="text-3xl font-bold underline">/login</h1>} />
            <Route path="*" element={<h1>404 Not Found</h1>} />
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    </trpc.Provider>
  )
}

export default App

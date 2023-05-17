import { httpBatchLink } from "@trpc/client"
import { trpc } from './utils/trpc'
import { useState } from "react"
import { QueryClientProvider, QueryClient } from "@tanstack/react-query"
import { UserList } from "./components/UserList"

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
        <UserList />
      </QueryClientProvider>
    </trpc.Provider>
  )
}

export default App

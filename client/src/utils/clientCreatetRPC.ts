import { httpBatchLink } from "@trpc/client"
import { trpc } from "./trpc"

export const clientCreatetRPC = (token: string) => trpc.createClient({
    links: [
        httpBatchLink({
            url: 'http://localhost:3000/trpc',
            headers() {
                return {
                    Authorization: token,
                }
            },
        })
    ]
})
import { initTRPC } from "@trpc/server"
import * as trpcExpress from "@trpc/server/adapters/express"

const trpc = initTRPC.context().create()

export const createContext = ({ req, res }: trpcExpress.CreateExpressContextOptions) => {
    console.log(req)
    console.log(res)   
    return ({})
}

export const router = trpc.router
export const middleware = trpc.middleware
export const publicProcedure = trpc.procedure
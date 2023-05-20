import express from "express"
import morgan from "morgan"
//import * as trpc from "@trpc/server"
import * as trpcExpress from "@trpc/server/adapters/express"
import { router, createContext } from "./trpc.ts"
import { usersRouter } from "./api/usersRouter.ts"
import { usersRouterProtect } from "./api/usersRouterProtect.ts"
import cors from "cors"

const app = express()
app.use(cors())
app.use(morgan(`dev`))

const appRouter = router({
    user: usersRouter,
    protectedUser: usersRouterProtect
})

app.use(`/trpc`, trpcExpress.createExpressMiddleware({
    router: appRouter,
    createContext
}))

export type AppRouter = typeof appRouter

export { app }
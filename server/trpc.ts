import { TRPCError, inferAsyncReturnType, initTRPC } from "@trpc/server"
import * as trpcExpress from "@trpc/server/adapters/express"
import jwt from "jsonwebtoken"
import { SecretKey } from "./enums/SecretKey"

export const createContext = ({ req }: trpcExpress.CreateExpressContextOptions) => {   
    console.log(`headers`,req.headers.authorization)
    return {
        token: req.headers.authorization
    }
}
type Context = inferAsyncReturnType<typeof createContext>

const trpc = initTRPC.context<Context>().create()

export const router = trpc.router
export const middleware = trpc.middleware
export const publicProcedure = trpc.procedure

const validateToken = middleware(async (opts) => {
    const { ctx, next } = opts
    if (ctx.token) {
        try {
            jwt.verify(ctx.token, SecretKey.JWT)
        } catch (err) {
            throw new TRPCError({ code: 'UNAUTHORIZED' })
        }
    } else {
        throw new TRPCError({ code: 'UNAUTHORIZED' })
    }
    return next({ ctx: { token: ctx.token } })
})

export const tokenProcedure = trpc.procedure.use(validateToken)
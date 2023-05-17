import { getConnection } from "../database/database.ts"
import { publicProcedure, router } from "../trpc.ts"

const getUsers = publicProcedure.query(async ()=>{
    const db = await getConnection()
    if (db === undefined) return []
    return [...db.data]
})

export const usersRouter = router({
    getAll: getUsers,
})
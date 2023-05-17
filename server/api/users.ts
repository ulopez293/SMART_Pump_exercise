import { getConnection } from "../database/database.ts"
import { UsersArraySchema } from "../schemas/UserSchema.ts"
import { publicProcedure, router } from "../trpc.ts"

const getUsers = publicProcedure.query(async () => {
    const db = await getConnection()
    try {
        const validatedUsers = db?.data.users
        const users = UsersArraySchema.parse(validatedUsers)
        return users
    } catch (error) {
        console.error(`Error validating users array: ${error}`)
        return []
    }
})

export const usersRouter = router({
    getAll: getUsers,
})
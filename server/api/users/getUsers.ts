
import { getConnection } from "../../database/database"
import { publicProcedure } from "../../trpc"
import { UsersArraySchema } from "../../schemas/UserSchema"

export const getUsers = publicProcedure.query(async () => {
    try {
        const db = await getConnection()
        const users = UsersArraySchema.parse(db?.data.users)
        return users
    } catch (error) {
        throw new Error(`Error ${error}`)
    }
})

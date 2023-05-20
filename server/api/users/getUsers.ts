
import z from "zod"
import { getConnection } from "../../database/database"
import { UsersArraySchema } from "../../schemas/UserSchema"
import { tokenProcedure } from "../../trpc"

export const getUsers = tokenProcedure.input(
    z.object({
        prueba: z.string().trim().nonempty("prueba field is empty")
    }).strict()
).query(async (opts) => {
    //const { ctx, input } = opts    
    try {
        const db = await getConnection()
        const users = UsersArraySchema.parse(db?.data.users)
        return users
    } catch (error) {
        throw new Error(`Error ${error}`)
    }
})

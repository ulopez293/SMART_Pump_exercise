import z from "zod"
import { getConnection } from "../../database/database"
import { publicProcedure } from "../../trpc"
import { UsersArraySchema } from "../../schemas/UserSchema"

export const getUserData = publicProcedure.input(
    z.object({
        email: z.string().trim().nonempty("email field is empty").email(),
        token: z.string().trim().nonempty("token field is empty").optional()
    }).strict()
).query(async ({ input }) => {
    try {
        const db = await getConnection()
        const users = UsersArraySchema.parse(db?.data.users)
        const user = users.find(user => user.email === input.email)
        if (!user) throw new Error(`User with email ${input.email} not found`)
        return user
    } catch (error) {
        throw new Error(`Error ${error}`)
    }
})
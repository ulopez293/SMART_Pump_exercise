import z from "zod"
import { getConnection } from "../../database/database"
import { publicProcedure } from "../../trpc"
import { UserSchema, UsersArraySchema } from "../../schemas/UserSchema"
import jwt from "jsonwebtoken"
import { SecretKey } from "../../enums/SecretKey"

export const getUserLogged = publicProcedure.input(
    z.object({
        username: z.string().trim().nonempty("username/email field is empty").transform(value => value.toLowerCase()),
        password: z.string().trim().nonempty("password field is empty")
    }).strict()
).mutation(async ({ input }) => {
    try {
        const db = await getConnection()
        const users = UsersArraySchema.parse(db?.data.users)
        const foundUser = users.find((user) => {
            const fullName = `${user.name.first} ${user.name.last}`.toLowerCase()
            return (fullName === input.username || input.username === user.email.toLocaleLowerCase()) && user.password === input.password
        }) 
        const user = UserSchema.parse(foundUser)
        const token = jwt.sign({ sub: user.email }, SecretKey.JWT)
        return { user, token }
    } catch (error) {
        throw new Error(`Error ${error}`)
    }
})
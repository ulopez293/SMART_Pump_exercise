import z from "zod"
import { getConnection } from "../database/database.ts"
import { UserSchema, UsersArraySchema } from "../schemas/UserSchema.ts"
import { publicProcedure, router } from "../trpc.ts"

const getUsers = publicProcedure.query(async () => {
    try {
        const db = await getConnection()
        const users = UsersArraySchema.parse(db?.data.users)
        return users
    } catch (error) {
        throw new Error(`Error ${error}`)
    }
})

const getUserLogged = publicProcedure.input(
        z.object({
            username: z.string().trim().nonempty("fisrt name field is empty"),
            password: z.string().trim().nonempty("password field is empty")
        })
    ).mutation(async ({ input }) => {
    try {
        const db = await getConnection()
        const users = UsersArraySchema.parse(db?.data.users)
        const foundUser = users.find((user) => {
            const fullName = `${user.name.first} ${user.name.last}`.toLowerCase()
            return fullName === input.username.toLocaleLowerCase() && user.password === input.password
        }) 
        const user = UserSchema.parse(foundUser)
        return user
    } catch (error) {
        throw new Error(`Error ${error}`)
    }
})

const updateUser = publicProcedure.mutation(({ input }) => {
    console.log(input)
    return input
})

export const usersRouter = router({
    get: getUsers,
    signIn: getUserLogged,
    update: updateUser
})
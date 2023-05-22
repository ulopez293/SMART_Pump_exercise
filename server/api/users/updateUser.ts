import z from "zod"
import { getConnection } from "../../database/database"
import { UserSchema, UsersArraySchema } from "../../schemas/UserSchema"
import { tokenProcedure } from "../../trpc"

export const updateUser = tokenProcedure.input(
    z.object({
        age: z.number().optional(),
        eyeColor: z.string().trim().nonempty("eyeColor field is empty").optional(),
        name: z.object({
            first: z.string().trim().nonempty("fisrt name field is empty"),
            last: z.string().trim().nonempty("last name field is empty").optional(),
        }).optional(),
        company: z.string().trim().nonempty("company field is empty").optional(),
        email: z.string().trim().nonempty("email field is empty").email(),
        phone: z.string().trim().nonempty("phone field is empty").refine(value => /^[\d()+\- ]+$/.test(value), {
            message: 'The input must be a valid number without letters',
        }).optional(),
        address: z.string().trim().nonempty("address field is empty").optional(),
        isActive: z.boolean().optional(),
        token: z.string().trim().nonempty("token field is empty").optional()
    }).strict()
).mutation(async ({ input }) => {
    try {
        const { token, ...restData } = input
        const db = await getConnection()
        if (!db) throw new Error("Error DB")
        const users = UsersArraySchema.parse(db?.data.users)
        const userIndex = users.findIndex(user => user.email === input.email)
        if (userIndex === -1) throw new Error(`User with email ${input.email} not found`)
        const updatedUser = {
            ...users[userIndex],
            ...restData,
            name: {
                ...users[userIndex]?.name,
                ...restData.name
            }
        }
        const newUserParse = UserSchema.parse(updatedUser)
        users[userIndex] = newUserParse

        db.data.users = users
        await db.write()

        return users
    } catch (error) {
        console.error(`Error ${error}`)
        return input
    }
})
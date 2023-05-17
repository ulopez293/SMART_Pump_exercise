import { getConnection } from "../database/database.ts"
import { UsersArraySchema } from "../schemas/UserSchema.ts"
import { publicProcedure, router } from "../trpc.ts"

// const validateTypeUsers = async () => {
//     try {
//         const db = await getConnection()
//         const validatedUsers = db?.data.users
//         const users = UsersArraySchema.parse(validatedUsers)
//         return users
//     } catch (error) {
//         console.error(`Error validating users array: ${error}`)
//         return []
//     }
// }

const getUsers = publicProcedure.query(async () => {
    try {
        const db = await getConnection()
        const validatedUsers = db?.data.users
        const users = UsersArraySchema.parse(validatedUsers)
        return users
    } catch (error) {
        console.error(`Error validating users array: ${error}`)
        return []
    }
    // const db = await getConnection()
    // const users = validateTypeUsers(db)
    // return users
})

export const usersRouter = router({
    getAll: getUsers,
})
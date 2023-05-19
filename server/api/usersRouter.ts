import { router } from "../trpc.ts"
import { getUserData } from "./users/getUserData.ts"
import { getUserLogged } from "./users/getUserLogged.ts"
import { getUsers } from "./users/getUsers.ts"
import { updateUser } from "./users/updateUser.ts"

export const usersRouter = router({
    get: getUsers,
    signIn: getUserLogged,
    getUser: getUserData,
    update: updateUser
})
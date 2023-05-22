import { router } from "../trpc.ts"
import { getUserLogged } from "./users/getUserLogged.ts"

export const usersRouter = router({
    signIn: getUserLogged
})
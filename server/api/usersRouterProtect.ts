import { router, tokenProcedure } from "../trpc"
import { getUsers } from "./users/getUsers"


export const usersRouterProtect = router({
    secretPlace: tokenProcedure.query((opts) => 'a key'),
    get: getUsers,
})
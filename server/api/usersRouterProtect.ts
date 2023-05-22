import { router, tokenProcedure } from "../trpc"
import { getUserData } from "./users/getUserData"
import { getUsers } from "./users/getUsers"
import { updateUser } from "./users/updateUser"


export const usersRouterProtect = router({
    //secretPlace: tokenProcedure.query((opts) => 'a key'),
    get: getUsers,
    getUser: getUserData,
    update: updateUser
})
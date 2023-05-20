import { trpc } from "../utils/trpc"

//const users = trpc.user.get.useQuery()
export const UserList = () => {
    const users = trpc.protectedUser.get.useQuery({ prueba: `hello world` })
    return (
        <h1>{JSON.stringify(users.data)}</h1>
    )
}
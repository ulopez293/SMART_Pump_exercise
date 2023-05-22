import { trpc } from "../utils/trpc"

export const UserList = () => {
    const users = trpc.protectedUser.get.useQuery({ prueba: `hello world` })
    return (
        <h1>{JSON.stringify(users.data)}</h1>
    )
}
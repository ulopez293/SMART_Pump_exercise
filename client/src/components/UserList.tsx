import { trpc } from "../utils/trpc"

export const UserList = () => {

    const users = trpc.user.get.useQuery()
    return (
        <h1>{JSON.stringify(users.data)}</h1>
    )
}
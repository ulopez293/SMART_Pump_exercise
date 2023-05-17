import { trpc } from "../utils/trpc"

export const UserList = () => {

    const users = trpc.user.getAll.useQuery()
    return (
        <h1>{JSON.stringify(users)}</h1>
    )
}
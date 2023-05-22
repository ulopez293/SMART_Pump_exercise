import { useAtom } from "jotai"
import { userDataAtom } from "../../../atoms/userDataAtom"
import { trpc } from "../../../utils/trpc"
import { UserList } from "../../../components/UserList"


export const BalanceSection = () => {
    const [userData,] = useAtom(userDataAtom)
    const { isLoading, error, data } = trpc.protectedUser.getUser.useQuery({ email: userData.email })
    if (isLoading) return <h1>Loading...</h1>
    if (error) return <h1>An error has occurred: {error.message}</h1>
    
    return (
        <div className="bg-gray-200 min-h-screen">
            <div className="container mx-auto p-4">
                <h1 className="text-3xl font-bold mb-4">Information</h1>
                <div className="bg-white rounded-lg p-4 shadow-md">
                    <h2 className="text-xl font-semibold mb-2">Balance</h2>
                    <p className="text-2xl">{data.isActive ? data?.balance : `you are not active user`}</p>
                </div>
                {/* <UserList /> */}
            </div>
        </div>
    )
}
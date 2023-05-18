import { useAtom } from "jotai"
import { userDataAtom } from "../../../atoms/userDataAtom"


export const BalanceSection = () => {
    const [userData,] = useAtom(userDataAtom)
    return (
        <div className="bg-gray-200 min-h-screen">
            <div className="container mx-auto p-4">
                <h1 className="text-3xl font-bold mb-4">Information</h1>
                <div className="bg-white rounded-lg p-4 shadow-md">
                    <h2 className="text-xl font-semibold mb-2">Balance</h2>
                    <p className="text-2xl">{userData.isActive ? userData?.balance : `you are not active user`}</p>
                </div>
            </div>
        </div>
    )
}
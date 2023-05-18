import { useAtom } from "jotai"
import { Navigate } from "react-router-dom"
import { userDataAtom } from "../../atoms/userDataAtom"
import { Footing } from "../footer/Footing"

interface ChildrenProps {
    children: React.ReactNode
}

export const ProtectedRoute = ({ children }: ChildrenProps) => {
    const [userData,] = useAtom(userDataAtom)
    if (!userData.login) return <Navigate to="/" replace />
    return <div>
        {children}
        <Footing />
    </div>
}

import { useAtom } from "jotai"
import { Navigate } from "react-router-dom"
import { userDataAtom } from "../../atoms/userDataAtom"

interface ChildrenProps {
    children: React.ReactNode
}

export const ProtectedRoute = ({ children }: ChildrenProps) => {
    const [userData,] = useAtom(userDataAtom)
    if (!userData.login) return <Navigate to="/login" replace />
    
    return <div>{children}</div>
}

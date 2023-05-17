import { useAtom } from "jotai"
import { Navigate, redirect } from "react-router-dom"
import { userDataAtom } from "../../atoms/userDataAtom"

interface ChildrenProps {
    children: React.ReactNode
}

export const ProtectedRoute = ({ children }: ChildrenProps) => {
    const [cartData,] = useAtom(userDataAtom)
    if (!cartData.login) return <Navigate to="/login" replace />
    return <div>{children}</div>
}

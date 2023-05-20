import { FormEvent, useEffect, useState } from 'react'
import logo from '../../assets/logo.png'
import { trpc } from '../../utils/trpc'
import { userDataAtom } from '../../atoms/userDataAtom'
import { useAtom } from 'jotai'
import { useNavigate } from 'react-router-dom'

export const Login = () => {
    const navigate = useNavigate()
    const [userData, setUserData] = useAtom(userDataAtom)
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const { mutate } = trpc.user.signIn.useMutation()
    
    useEffect(() => { if (userData.login) navigate('/') }, [userData.login, navigate])
    if (userData.login) return null


    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        mutate({ username, password }, {
            onSuccess: (data) => {
                const { user, token } = data
                const { password, ...restData } = user
                setUserData((prev) => ({ 
                    ...prev, 
                    login: true, 
                    email: restData.email ,
                    token: token
                }))
                navigate(`/`)
            },
            onError: (error) => {
                console.log(error)
                alert(`fields do not match`)
            }
        })
    }

    return (
        <div className="flex items-center justify-center h-screen">
            <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit}>
                <div className="mb-3 flex items-center justify-center">
                    <img src={logo} alt="Logo de la company" className="h-32 w-40 mb-4" />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                        Username or Email
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="username"
                        type="text"
                        placeholder="Username (first and last)"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                        pattern="[A-Za-z].{1,}"
                        minLength={3}
                    />
                </div>
                <div className="mb-8">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                        Password
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="password"
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        minLength={3}
                    />
                </div>
                <div className="flex items-center justify-between">
                    <button
                        className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline block mx-auto"
                        type="submit"
                    >
                        LOGIN
                    </button>
                </div>
            </form>
        </div>
    )
}

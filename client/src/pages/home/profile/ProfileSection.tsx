import { useAtom } from 'jotai'
import { AiFillEdit, AiOutlineEye } from 'react-icons/ai'
import { HiLocationMarker, HiMail, HiPhone, HiUserCircle } from 'react-icons/hi'
import { FaBirthdayCake } from 'react-icons/fa'
import { userDataAtom } from '../../../atoms/userDataAtom'
import { useState } from 'react';
import { EditProfile } from './EditProfile'
import { trpc } from '../../../utils/trpc'

export const ProfileSection = () => {
  const [userData,] = useAtom(userDataAtom)
  const [modal, setModal] = useState(false)
  const { isLoading, error, data } = trpc.protectedUser.getUser.useQuery({ email: userData.email })
  if (isLoading) return <h1>Loading...</h1>
  if (error) return <h1>An error has occurred: {error.message}</h1>
  
  return (
    <>
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
          <div className="flex items-center justify-center mb-6">
            <div className="w-20 h-20 rounded-full overflow-hidden">
              <img
                src={data.picture}
                alt="Profile Picture"
                className="object-cover w-full h-full"
              />
            </div>
          </div>
          <h1 className="text-2xl font-bold mb-2">{data.name?.first} {data.name?.last}</h1>
          <p className="text-gray-500">{data.company}</p>
          <div className="mt-6">
            <div className="flex items-center mb-3">
              <HiUserCircle className="w-6 h-6 text-gray-400 mr-2" />
              <span className="text-gray-600">Username: {data.name?.first} {data.name?.last}</span>
            </div>
            <div className="flex items-center mb-3">
              <AiOutlineEye className="w-6 h-6 text-blue-400 mr-2" />
              <span className="text-gray-600">Eye Color: {data.eyeColor}</span>
            </div>
            <div className="flex items-center mb-3">
              <FaBirthdayCake className="w-6 h-6 text-red-400 mr-2" />
              <span className="text-gray-600">Age: {data.age}</span>
            </div>
            <div className="flex items-center mb-3">
              <HiMail className="w-6 h-6 text-gray-400 mr-2" />
              <span className="text-gray-600">Email: {data.email}</span>
            </div>
            <div className="flex items-center mb-3">
              <HiPhone className="w-6 h-6 text-green-400 mr-2" />
              <span className="text-gray-600">Phone: {data.phone}</span>
            </div>
            <div className="flex items-center mb-3">
              <HiLocationMarker className="w-6 h-6 text-purple-400 mr-2" />
              <span className="text-gray-600">Address: {data.address}</span>
            </div>
          </div>
          <button onClick={()=>setModal(true)} className="flex items-center mt-6 bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded">
            <AiFillEdit className="w-4 h-4 text-white mr-2" />
            <span>Edit Profile</span>
          </button>
        </div>
      </div>
      <EditProfile modal={modal} setModal={setModal}/>
    </>
  )
}
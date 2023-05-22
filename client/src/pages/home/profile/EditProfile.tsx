import { useAtom } from 'jotai'
import { HiMail } from 'react-icons/hi'
import { userDataAtom } from '../../../atoms/userDataAtom'
import { Label, Modal, Select, TextInput, Textarea, ToggleSwitch } from 'flowbite-react'
import { Dispatch, SetStateAction, useState, useEffect } from 'react';
import { trpc } from '../../../utils/trpc'

interface EditProfileProps {
    modal: boolean,
    setModal: Dispatch<SetStateAction<boolean>>
}

export const EditProfile = ({ modal, setModal }: EditProfileProps) => {
    const [userData, ] = useAtom(userDataAtom)
    const [toggle, setToggle] = useState(false)
    const { isLoading, error, data, refetch } = trpc.protectedUser.getUser.useQuery({ email: userData.email ?? `` })
    const { mutate } = trpc.protectedUser.update.useMutation()
    useEffect(() => { if (data?.isActive) setToggle(data.isActive) }, [data])

    useEffect(() => { refetch() } , [modal, data])

    if (isLoading) return <h1>Loaading...</h1>
    if (error) return <h1>An error has occurred: {error.message}</h1>
    
    return (
        <Modal
            show={modal}
            onClose={() => setModal(false)}
        >
            <Modal.Header>Edit User</Modal.Header>
            <Modal.Body>
                <div className="flex flex-col gap-4">
                    <div className="flex">
                        <div className="w-1/2 mr-4">
                            <div className="mb-2 block">
                                <Label htmlFor="firstname" value="First Name" />
                            </div>
                            <TextInput
                                defaultValue={data.name.first}
                                onBlur={(e) => mutate({ email: data.email, name: { first: e.currentTarget.value } })}
                                id="firstname" type="text" sizing="sm" />
                        </div>
                        <div className="w-1/2">
                            <div className="mb-2 block">
                                <Label htmlFor="lastname" value="Last Name" />
                            </div>
                            <TextInput
                                defaultValue={data.name.last}
                                onBlur={(e) => mutate({ email: data.email, name: { first: data.name.first, last: e.currentTarget.value } })}
                                id="lastname" type="text" sizing="sm" />
                        </div>
                    </div>
                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="company" value="Company Name" />
                        </div>
                        <TextInput
                            defaultValue={data.company}
                            onBlur={(e) => mutate({ email: data.email, company: e.currentTarget.value })}
                            id="company" type="text" sizing="sm" />
                    </div>
                    <div className="flex">
                        <div className="w-1/2 mr-4">
                            <div id="select">
                                <div className="mb-2 block">
                                    <Label htmlFor="eyes" value="Eye color" />
                                </div>
                                <Select id="eyes"
                                    defaultValue={data.eyeColor}
                                    onChange={(e) => mutate({ email: data.email, eyeColor: e.currentTarget.value })}
                                    required={true}>
                                    <option value="black">black</option>
                                    <option value="brown">brown</option>
                                    <option value="green">green</option>
                                    <option value="blue">blue</option>
                                </Select>
                            </div>
                        </div>
                        <div className="w-1/2">
                            <div className="mb-5 block">
                                <Label htmlFor="toggle" value="Is Active User" />
                            </div>
                            <ToggleSwitch id="toggle"
                                checked={toggle}
                                label="Change"
                                onChange={(e) => {
                                    mutate({ email: data.email, isActive: e })
                                    setToggle(!toggle)
                                }} />
                        </div>
                    </div>
                    <div className="flex">
                        <div className="w-1/4 mr-4">
                            <div className="mb-2 block">
                                <Label htmlFor="age" value="Age" />
                            </div>
                            <TextInput id="age"
                                defaultValue={data.age}
                                onChange={(e) => {
                                    mutate({ email: data.email, age: parseInt(e.currentTarget.value, 10) })
                                    refetch()
                                }}
                                type="number" sizing="sm" min={14} max={130} />
                        </div>
                        <div className="w-3/4">
                            <div className="mb-2 block">
                                <Label htmlFor="phone" value="Phone Number" />
                            </div>
                            <TextInput
                                defaultValue={data.phone}
                                onBlur={(e) => mutate({ email: data.email, phone: e.currentTarget.value })}
                                id="phone" type="text" sizing="sm" />
                        </div>
                    </div>
                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="address" value="Address" />
                        </div>
                        <Textarea defaultValue={data.address} id="address" rows={2} required={true} />
                    </div>
                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="email4" value="Your email" />
                        </div>
                        <TextInput id="email4" defaultValue={data.email} type="email" icon={HiMail} rightIcon={HiMail} placeholder="mail@namedomain.domain" disabled={true} />
                    </div>
                </div>
            </Modal.Body>
            <Modal.Footer></Modal.Footer>
        </Modal>
    )
}
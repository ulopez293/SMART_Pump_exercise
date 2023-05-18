import { useAtom } from 'jotai'
import { HiMail } from 'react-icons/hi'
import { userDataAtom } from '../../../atoms/userDataAtom'
import { Label, Modal, Select, TextInput } from 'flowbite-react'
import { Dispatch, SetStateAction } from 'react'

interface EditProfileProps {
    modal: boolean,
    setModal: Dispatch<SetStateAction<boolean>>
}

export const EditProfile = ({ modal, setModal }: EditProfileProps) => {
    const [userData,] = useAtom(userDataAtom)
    return (
        <Modal
            show={modal}
            onClose={() => setModal(false)}
        >
            <Modal.Header>
                Edit User
            </Modal.Header>
            <Modal.Body>
                <div className="flex flex-col gap-4">
                    <div className="flex">
                        <div className="w-1/2 mr-4">
                            <div className="mb-2 block">
                                <Label htmlFor="small" value="First Name" />
                            </div>
                            <TextInput id="small" type="text" sizing="sm" />
                        </div>
                        <div className="w-1/2">
                            <div className="mb-2 block">
                                <Label htmlFor="small" value="Last Name" />
                            </div>
                            <TextInput id="small" type="text" sizing="sm" />
                        </div>
                    </div>
                    <div id="select">
                        <div className="mb-2 block">
                            <Label
                                htmlFor="eyes"
                                value="Select your eye color"
                            />
                        </div>
                        <Select
                            id="eyes"
                            required={true}
                        >
                            <option>
                                black
                            </option>
                            <option>
                                brown
                            </option>
                            <option>
                                green
                            </option>
                            <option>
                                blue
                            </option>
                        </Select>
                    </div>
                    <div className="flex">
                        <div className="w-1/2 mr-4">
                            <div className="mb-2 block">
                                <Label
                                    htmlFor="small"
                                    value="Age"
                                />
                            </div>
                            <TextInput
                                id="small"
                                type="number"
                                sizing="sm"
                                min={14}
                                max={130}
                            />
                        </div>
                        <div className="w-1/2">
                            <div className="mb-2 block">
                                <Label
                                    htmlFor="small"
                                    value="Phone Number"
                                />
                            </div>
                            <TextInput
                                id="small"
                                type="text"
                                sizing="sm"
                            />
                        </div>
                    </div>
                    <div>
                        <div className="mb-2 block">
                            <Label
                                htmlFor="small"
                                value="Address"
                            />
                        </div>
                        <TextInput
                            id="small"
                            type="text"
                            sizing="sm"
                        />
                    </div>
                    <div>
                        <div className="mb-2 block">
                            <Label
                                htmlFor="email4"
                                value="Your email"
                            />
                        </div>
                        <TextInput
                            id="email4"
                            type="email"
                            icon={HiMail}
                            rightIcon={HiMail}
                            placeholder="name@flowbite.com"
                            required={true}
                        />
                    </div>
                    <div>
                        <div className="mb-2 block">
                            <Label
                                htmlFor="password1"
                                value="Your password"
                            />
                        </div>
                        <TextInput
                            id="password1"
                            type="password"
                            required={true}
                        />
                    </div>
                </div>
            </Modal.Body>
            <Modal.Footer></Modal.Footer>
        </Modal>
    )
}
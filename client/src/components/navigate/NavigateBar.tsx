import { Avatar, Dropdown, Navbar } from "flowbite-react"
import logo from "../../assets/logo.png"
import { useAtom } from "jotai"
import { userDataAtom } from "../../atoms/userDataAtom"
import { AiFillEdit } from "react-icons/ai"

export const NavigateBar = () => {
    const [userData, setUserData] = useAtom(userDataAtom)
    if (!userData.login) return null

    return (
        <Navbar
            fluid={true}
            rounded={true}
        >
            <Navbar.Brand href="https://github.com/ulopez293/SMART_Pump_exercise" target="_blank">
                <img
                    src={logo}
                    className="mr-3 h-6 sm:h-9"
                    alt="Flowbite Logo"
                />
                <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
                    SMART Pump
                </span>
            </Navbar.Brand>
            <div className="flex md:order-2">
                <Dropdown
                    arrowIcon={false}
                    inline={true}
                    label={<Avatar alt="User settings" img={userData.picture} rounded={true} />}
                >
                    <Dropdown.Header>
                        <span className="block text-sm">
                            {userData.name?.first} {userData.name?.last}
                        </span>
                        <span className="block truncate text-sm font-medium">
                            {userData.email}
                        </span>
                    </Dropdown.Header>
                    <Dropdown.Item>
                        <AiFillEdit className="mr-2"/> Edit Profile
                    </Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Item onClick={() => setUserData({ login: false })}>
                        Sign out
                    </Dropdown.Item>
                </Dropdown>
                <Navbar.Toggle />
            </div>
            <Navbar.Collapse>
                <Navbar.Link
                    href="/"
                    active={true}
                >
                    Home
                </Navbar.Link>
                <Navbar.Link disabled={true}>
                    Other Route
                </Navbar.Link>
            </Navbar.Collapse>
        </Navbar>
    )
}
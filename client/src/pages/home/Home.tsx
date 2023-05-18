import { Tabs } from "flowbite-react"
import { HiAdjustments, HiClipboardList, HiUserCircle } from 'react-icons/hi'
import { MdDashboard } from 'react-icons/md'
import { ProfileSection } from "./profile/ProfileSection"
import { BalanceSection } from "./balance/BalanceSection"

export const Home = () => {
    return (
        <Tabs.Group
            aria-label="Tabs with icons"
            style="underline"
        >
            <Tabs.Item
                title="Profile"
                icon={HiUserCircle}
            >
                <ProfileSection />
            </Tabs.Item>
            <Tabs.Item
                active={true}
                title="Dashboard"
                icon={MdDashboard}
            >
                <BalanceSection />
            </Tabs.Item>
            <Tabs.Item
                title="Settings"
                icon={HiAdjustments}
                disabled={true}
            >
                Settings content
            </Tabs.Item>
            <Tabs.Item
                title="Contacts"
                icon={HiClipboardList}
                disabled={true}
            >
                Contacts content
            </Tabs.Item>
        </Tabs.Group>
    )
}
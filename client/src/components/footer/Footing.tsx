import { Footer } from "flowbite-react"

export const Footing = () => {
    return (
        <Footer container={true}>
            <div className="w-full text-center">
                <div className="w-full justify-center sm:flex sm:items-center sm:justify-center">
                    <Footer.LinkGroup>
                        <Footer.Link href="https://github.com/ulopez293/SMART_Pump_exercise" target="_blank">
                            About
                        </Footer.Link>
                        <Footer.Link href="https://github.com/ulopez293/SMART_Pump_exercise" target="_blank">
                            Privacy Policy
                        </Footer.Link>
                        <Footer.Link href="https://github.com/ulopez293/SMART_Pump_exercise" target="_blank">
                            Licensing
                        </Footer.Link>
                        <Footer.Link href="https://github.com/ulopez293/SMART_Pump_exercise" target="_blank">
                            Contact
                        </Footer.Link>
                    </Footer.LinkGroup>
                </div>
                <Footer.Divider />
                <Footer.Copyright
                    href="https://github.com/ulopez293/SMART_Pump_exercise"
                    by="SMART Pump™"
                    year={new Date().getFullYear()}
                />
            </div>
        </Footer>
    )
}

import Navbar from "@/components/Navbar";
import { LayoutProps } from "@/types";

const PatientLayout: React.FC<LayoutProps> = ({ children }) => {
    const navLinks = [
        { name: 'Dashboard', path: '/patient/dashboard' },
        { name: 'Cases History', path: '/patient/cases-history' },
        { name: 'Medical Information', path: '/patient/medical-info' },
        { name: 'Chat', path: '/patient/chat' },
    ];
    return (
        <>
            <div className="max-h-screen h-screen flex flex-col">
                <Navbar navLinks={navLinks} />
                <div className="grow p-8">
                    {children}
                </div>
            </div>
        </>
    );
}

export default PatientLayout;
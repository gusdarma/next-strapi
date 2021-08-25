import { ReactText } from "react";
import Navbar from "./elements/navbar";
import Footer from "./elements/footer";

interface typesReact{
    children: object;
    global: {
        navbar: {
            logo: {
                url: string;
                alternativeText: string;
                width: number;
                height: number;
            };
            links: ReactText[];
            button: {
                id: number;
                url: string;
                text: string;
                newTab: boolean;
                type: string;
            };
        };
        footer: {
            logo: {
                url: string;
                alternativeText: string;
                width: number;
                height: number;
            };
            smallText: string;
            columns: ReactText[];
        };
        notificationBanner: {
            text: string;
            type: string;
        };
    };
    pageContext: {
        localizedPaths: string;
    };
}

const Layout: React.FC<typesReact> = ({ children, global, pageContext }) => {
    const { navbar, footer, notificationBanner } = global;
    return (
        <div className="flex flex-col justify-between min-h-screen">
            {/* Aligned to the top */}
            <div className="flex-1">
                <Navbar navbar={navbar} pageContext={pageContext} notificationBanner={notificationBanner}/>
                <div className="py-8"></div>
                <div>{children}</div>
            </div>
            {/* Aligned to the bottom */}
            <Footer footer={footer} />
        </div>
    );
};

export default Layout;

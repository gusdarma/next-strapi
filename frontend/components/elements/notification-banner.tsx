import Markdown from "react-markdown";
import classNames from "classnames";
import { MdClose } from "react-icons/md";

const NotificationBanner = ({ data: { text, type }, closeSelf }) => {
    return (
        <div
            className={classNames(
                // Common classes
                "text-white px-2 py-2",
                {
                    // Apply theme based on notification type
                    "bg-blue-600": type === "info",
                    "bg-orange-600": type === "warning",
                    "bg-red-600": type === "alert",
                },
            )}
        >
            <div className="container flex flex-row items-center justify-between ">
                <div className="flex-1 rich-text-banner">
                    <Markdown>{text}</Markdown>
                </div>
                <button onClick={closeSelf} className="flex-shrink-0 px-1 py-1">
                    <MdClose className="w-auto h-6" color="#fff" />
                </button>
            </div>
        </div>
    );
};

export default NotificationBanner;

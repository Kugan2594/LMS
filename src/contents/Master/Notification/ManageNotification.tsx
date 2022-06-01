import React from "react";
import INotification from "./InterfaceNotification";
import Notification from "./Notification";

function ManageNotification(props: INotification) {
    const mockData = [
        { employeeName: "kuru", shortmsg: "djhs" },
        { employeeName: "sam", shortmsg: "djhs" },
        { employeeName: "mike", shortmsg: "djhs" },
        { employeeName: "vagh", shortmsg: "djhs" },
    ];

    return (
        <div>
            {mockData.map((data) => {
                return (
                    <Notification
                        employeeName={data.employeeName}
                        shortmsg={data.shortmsg}
                    />
                );
            })}
        </div>
    );
}

export default ManageNotification;

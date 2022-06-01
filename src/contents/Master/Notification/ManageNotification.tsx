import { Divider, Grid } from "@mui/material";
import React from "react";
import { PageTitleWrapper } from "src/components/organism";
import PageTitle from "src/components/organism/PageTitle";
import INotification from "./InterfaceNotification";
import Notification from "./Notification";

function ManageNotification(props: INotification) {
    const mockData = [
        {
            //employeeName: "kuru",
            shortmsg: "you have recieved a Leave Request",
            date: new Date("Mar 25 2015"),
            id: "1",
        },
        {
            //employeeName: "sam",
            shortmsg: "you have recieved a Leave Request",
            date: new Date("Mar 25 2015"),
            id: "2",
        },
        {
            //employeeName: "mike",
            shortmsg: "you have recieved a Leave Request",
            date: new Date("Mar 25 2015"),
            id: "3",
        },
        {
            // employeeName: "vagh",
            shortmsg: "You have recieved a Leave Request",
            date: new Date("Mar 25 2015"),
            id: "4",
        },
    ];

    return (
        <div>
            {" "}
            <PageTitleWrapper>
                <PageTitle
                    heading="Notifications"
                    subHeading="Master/LeaveRequest"
                    isButton={false}
                />
            </PageTitleWrapper>
            <Divider />
            <Grid container>
                <Grid item xs={1}></Grid>
                <Grid item xs={10}>
                    {mockData.map((data) => {
                        return (
                            <Notification
                                date={data.date.toLocaleString()}
                                // employeeName={data.employeeName}
                                shortmsg={data.shortmsg}
                                key={data.id}
                            />
                        );
                    })}
                </Grid>
                <Grid item xs={1}></Grid>
            </Grid>
        </div>
    );
}

export default ManageNotification;

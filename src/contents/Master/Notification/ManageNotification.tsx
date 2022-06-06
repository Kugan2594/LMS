import { Box, Dialog, DialogContent, DialogContentText, DialogTitle, Divider, Grid } from "@mui/material";
import React, { useState } from "react";
import { PageTitleWrapper } from "src/components/organism";
import PageTitle from "src/components/organism/PageTitle";
import ViewHistory from "../History/ViewHistory";
import INotification from "./InterfaceNotification";
import Notification from "./Notification";

function ManageNotification(props: INotification) {

    const mockData = [
        {
            //employeeName: "kuru",
            shortmsg: " 1 you have recieved a Leave Request jkhjhg",
            date: new Date("Mar 25 2015"),
            id: "1",
            status: false,
            leaveRequestId: 9
        },
        {
            //employeeName: "sam",
            shortmsg: "2 you have recieved a Leave Request",
            date: new Date("Mar 25 2015"),
            id: "2",
            status: false,
            leaveRequestId: 9
        },
        {
            //employeeName: "mike",
            shortmsg: "3 you have recieved a Leave Request",
            date: new Date("Mar 25 2015"),
            id: "3",
            status: true,
            leaveRequestId: 9
        },
        {
            // employeeName: "vagh",
            shortmsg: "4 You have recieved a Leave Request",
            date: new Date("Mar 25 2015"),
            id: "4",
            status: false,
            leaveRequestId: 9
        },
        {
            // employeeName: "vagh",
            shortmsg: "5 You have recieved a Leave Request",
            date: new Date("Mar 25 2015"),
            id: "5",
            status: true,
            leaveRequestId: 9
        },
        {
            //employeeName: "kuru",
            shortmsg: " 1 you have recieved a Leave Request jkhjhg",
            date: new Date("Mar 25 2015"),
            id: "1",
            status: false,
            leaveRequestId: 9
        },
        {
            //employeeName: "sam",
            shortmsg: "2 you have recieved a Leave Request",
            date: new Date("Mar 25 2015"),
            id: "2",
            status: false,
            leaveRequestId: 9
        },
        {
            //employeeName: "mike",
            shortmsg: "3 you have recieved a Leave Request",
            date: new Date("Mar 25 2015"),
            id: "3",
            status: true,
            leaveRequestId: 9
        },
        {
            // employeeName: "vagh",
            shortmsg: "4 You have recieved a Leave Request",
            date: new Date("Mar 25 2015"),
            id: "4",
            status: false,
            leaveRequestId: 9
        },
        {
            // employeeName: "vagh",
            shortmsg: "5 You have recieved a Leave Request",
            date: new Date("Mar 25 2015"),
            id: "5",
            status: true,
            leaveRequestId: 9
        },
    ];

    const isNewNotification = (index) => {
        return mockData[index].status === false;
      };

      const [leaveDetails, setLeaveDetails] = useState({});
      const [openDetails, setOpenDetails] = useState(false);

      const handleOpenLeaveDetails = (data) => {
        console.log("NNNNNNNN.... ",data)
        setOpenDetails(true);
        setLeaveDetails(data);
      };

      const handleClose = () => {
        setOpenDetails(false);
    };

    return (
        <div>
            {props.isTitle && (
                <PageTitleWrapper>
                    <PageTitle
                        heading="Notifications"
                        subHeading="Master/notifications"
                        isButton={false}
                    />
                </PageTitleWrapper>
            )}
            
            {props.isDivider && <Divider />}

            <Box marginTop={2} >
                <Grid container>
                    <Grid item xs={3}></Grid>
                    <Grid item xs={5}>
                    <div>
                    {mockData.map((data, index) => {
                        const cardProps: {
                            background?: string;
                          } = {};
                          if (isNewNotification(index)) {
                            cardProps.background = "rgba(26, 140, 255, 0.25)";
                          }
                        return (
                            <Notification
                            isNew={cardProps}
                                date={data.date.toLocaleString()}
                                // employeeName={data.employeeName}
                                shortmsg={data.shortmsg}
                                key={data.id}
                                onClickHandler={() =>
                                    handleOpenLeaveDetails(data)
                                }
                            />
                        );
                    })}
                    </div>
                    </Grid>
                    </Grid>
                    </Box>
                    <Dialog
            open={openDetails}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            maxWidth="md"
          >
            <DialogTitle id="alert-dialog-title">{""}</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                <ViewHistory
                  details={leaveDetails}
                  isEmployeeDetail={true}
                  isResponseButtons={false}
                  cancel={handleClose}
                />
              </DialogContentText>
            </DialogContent>
          </Dialog>
        </div>
    );
}

export default ManageNotification;
